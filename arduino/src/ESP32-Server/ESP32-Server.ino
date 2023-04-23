#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
// sensor data
#include <Wire.h>
#include "MAX30105.h"
#include "heartRate.h"
#include "HeartBeatSensor.h"

// BLE section
BLEServer *pServer = NULL;
BLECharacteristic *data_characteristic = NULL;

bool deviceConnected = false;
int LEDpin = 2;
int BLINK_PIN = 36;

bool oldDeviceConnected = false;
float beatsPerMinute = 0;
long averageBeatsPerMinute = 0;

float newBeatsPerMinute = 0;
long newAverageBeatsPerMinute = 0;

#define SERVICE_UUID "8ccbd4e6-bd76-11ed-afa1-0242ac120002"

#define DATA_CHARACTERISTIC_UUID "9d99dafc-bd76-11ed-afa1-0242ac120002"
#define BOX_CHARACTERISTIC_UUID "222f72a8-bd78-11ed-afa1-0242ac120002"

HeartBeatSensor sensor(BLINK_PIN);

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
  pinMode(LEDpin, OUTPUT);

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
    sensor.RunSensorLogic();

    // get readings
    newBeatsPerMinute=sensor.GetBeatsPerMinute();
    newAverageBeatsPerMinute=sensor.GetBeatAverage();

    if(beatsPerMinute!=newBeatsPerMinute){
      beatsPerMinute=newBeatsPerMinute;

      // pick high threshold
      if(beatsPerMinute>75){
        data_characteristic->setValue("danger");
        data_characteristic->notify(); 
      }else{
        data_characteristic->setValue("no danger");
        data_characteristic->notify(); 
      }

      Serial.print(", BPM=");
      Serial.print(beatsPerMinute);
    }

    if(averageBeatsPerMinute!=newAverageBeatsPerMinute){
      averageBeatsPerMinute=newAverageBeatsPerMinute;

          Serial.print(", Avg BPM=");
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
