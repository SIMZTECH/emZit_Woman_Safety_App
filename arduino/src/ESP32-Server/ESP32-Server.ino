#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
// sensor data
#include <Wire.h>
#include "MAX30105.h"
#include "heartRate.h"
#include "HeartBeatSensor.h"
#include "MuscleSensor.h"

// BLE section
BLEServer *pServer = NULL;
BLECharacteristic *data_characteristic = NULL;

bool deviceConnected = false;
int LEDpin = 2;//LED pin to indicate connected
int BLINK_PIN = 36;//LED pin to indicate pick-ups counts
int MuscleSensorPin=34;//esp32 pin for Muscle Sensor
int LED_DANGER_INDICATOR_PIN = 4;

bool oldDeviceConnected = false;
float beatsPerMinute = 0;
long averageBeatsPerMinute = 0;
int BEATS_PER_MINUTE_THRESHOLD = 75;

float newBeatsPerMinute = 0;
long newAverageBeatsPerMinute = 0;

int MUSCLE_SENSOR_THRESHOLD=4000;
int newMuscleSensorReading=0;
int muscleSensorReading=0;

#define SERVICE_UUID "8ccbd4e6-bd76-11ed-afa1-0242ac120002"

#define DATA_CHARACTERISTIC_UUID "9d99dafc-bd76-11ed-afa1-0242ac120002"
#define BOX_CHARACTERISTIC_UUID "222f72a8-bd78-11ed-afa1-0242ac120002"

HeartBeatSensor sensor(BLINK_PIN);//heartBeat sensor instatiating
MuscleSensor muscleSensor(MuscleSensorPin,MUSCLE_SENSOR_THRESHOLD);//muscle sensor instatiating 

class MyServerCallbacks : public BLEServerCallbacks
{
  void onConnect(BLEServer *pServer)
  {
    Serial.println("Connected");
    deviceConnected = true;
  }

  void onDisconnect(BLEServer *pServer)
  {
    Serial.println("Disconnected");
    deviceConnected = false;
  }
};

void initBLE()
{

  BLEDevice::init("ESP32-R");

  // Create the BLE Server
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // Create the BLE Service
  BLEService *pService = pServer->createService(SERVICE_UUID);

  data_characteristic = pService->createCharacteristic(
      DATA_CHARACTERISTIC_UUID,
      BLECharacteristic::PROPERTY_READ |
          BLECharacteristic::PROPERTY_WRITE |
          BLECharacteristic::PROPERTY_NOTIFY |
          BLECharacteristic::PROPERTY_INDICATE);

  pService->start();
};

void startAdvertising()
{
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);

  BLEDevice::startAdvertising();
  Serial.println("Waiting for a client connection to notify....");
}

void setup()
{
  Serial.begin(115200);
  pinMode(LEDpin, OUTPUT);//connection indicator
  pinMode(LED_DANGER_INDICATOR_PIN, OUTPUT);//danger indicator 

  Serial.println("Start server");
  initBLE();
  startAdvertising();

  // initalize sensor
  sensor.InitializeSensor();
};
  
void loop()
{
  if (deviceConnected)
  {
    digitalWrite(LEDpin,HIGH);
    // TODO:: Add delay before sensor data pick ups begins

    sensor.RunSensorLogic();//run logic for heartBeat sensor
    muscleSensor.RunMuscleSensorLogic();//run logic for muscle sensor

    // get readings for heartBeat sensor
    newBeatsPerMinute=sensor.GetBeatsPerMinute();
    newAverageBeatsPerMinute=sensor.GetBeatAverage();

    // get readings for muscle sensor
    newMuscleSensorReading=muscleSensor.GetEmgReading();

    // pick high threshold
    if (beatsPerMinute>BEATS_PER_MINUTE_THRESHOLD && muscleSensorReading<MUSCLE_SENSOR_THRESHOLD)
    {
      data_characteristic->setValue("danger");
      data_characteristic->notify();

      // blink LED
      digitalWrite(LED_DANGER_INDICATOR_PIN, HIGH);
      delay(50);
      digitalWrite(LED_DANGER_INDICATOR_PIN, LOW); 
    }
    else
    {
      data_characteristic->setValue("no danger");
      data_characteristic->notify();
      // turn off LED
      digitalWrite(LED_DANGER_INDICATOR_PIN, LOW);
    }

    if(beatsPerMinute!=newBeatsPerMinute){
      beatsPerMinute=newBeatsPerMinute;

      Serial.print(", BPM:");
      Serial.print(beatsPerMinute);
    }

    if(muscleSensorReading!=newMuscleSensorReading){
      muscleSensorReading=newMuscleSensorReading;
      Serial.print(", emgReading:");
      Serial.print(muscleSensorReading);
    }

    if(averageBeatsPerMinute!=newAverageBeatsPerMinute){
      averageBeatsPerMinute=newAverageBeatsPerMinute;

          Serial.print(", Avg BPM:");
          Serial.print(averageBeatsPerMinute);
    }

    delay(3);

  };

  if(!deviceConnected ){
    digitalWrite(LEDpin,LOW);
  }

  if (!deviceConnected && oldDeviceConnected)
  {
    delay(200);
    pServer->startAdvertising();
    Serial.println("start advertising");
    oldDeviceConnected = deviceConnected;
  }

  if (deviceConnected && !oldDeviceConnected)
  {
    oldDeviceConnected = deviceConnected;
  }

};
