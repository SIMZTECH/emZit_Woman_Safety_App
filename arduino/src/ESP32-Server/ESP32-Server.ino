#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
// sensor headers
#include <Wire.h>
#include "MAX30105.h"
#include "heartRate.h"

// PINS Configurations
#define LED_CONNECTION_STATUS 27
#define LED_DANGER_INDICATOR 25
#define MUSCLE_SENSOR_PIN_SIGNAL 34
#define LED_SENSOR_INDICATOR 23

// Threshold Configurations
#define BEATS_PER_MINUTE_THRESHOLD 50
#define MUSCLE_SENSOR_THRESHOLD 4000

// create MAX30105 instance
MAX30105 particleSensor;

// BLE section
BLEServer *pServer=NULL;
BLECharacteristic *data_characteristic=NULL;

bool deviceConnected = false;

bool oldDeviceConnected = false;
float beatsPerMinute = 0;
long averageBeatsPerMinute = 0;

float newBeatsPerMinute = 0;
long newAverageBeatsPerMinute = 0;

int newMuscleSensorReading = 0;
int muscleSensorReading = 0;

// sensor variables
const byte RATE_SIZE=4;
byte rates[RATE_SIZE];
byte rateSpot=0;
long lastbeat=0;

#define SERVICE_UUID "8ccbd4e6-bd76-11ed-afa1-0242ac120002"

#define DATA_CHARACTERISTIC_UUID "9d99dafc-bd76-11ed-afa1-0242ac120002"
#define BOX_CHARACTERISTIC_UUID "222f72a8-bd78-11ed-afa1-0242ac120002"


class MyServerCallbacks:public BLEServerCallbacks{
  void onConnect(BLEServer *pServer){
    Serial.println("Connected");
    deviceConnected=true;
  }

  void onDisconnect(BLEServer *pServer){
    Serial.println("Disconnected");
    deviceConnected=false;
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

void InitHeartBeatSensor()
{
  // Initialize sensor
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) // Use default I2C port, 400kHz speed
  {
    Serial.println("MAX30105 was not found. Please check wiring/power. ");
    while (1);
  }

  Serial.println("Place your index finger on the sensor with steady pressure.");

  particleSensor.setup();                    // Configure sensor with default settings
  particleSensor.setPulseAmplitudeRed(0x0A); // Turn Red LED to low to indicate sensor is running
  particleSensor.setPulseAmplitudeGreen(0);  // Turn off Green LED
};

void setup() {
  Serial.begin(115200);

  pinMode(LED_CONNECTION_STATUS, OUTPUT);
  pinMode(LED_DANGER_INDICATOR, OUTPUT);
  pinMode(LED_SENSOR_INDICATOR, OUTPUT);

  Serial.println("Starting Server");
  initBLE();

  startAdvertising();

  // init sensor
  InitHeartBeatSensor();
}

void loop()
{

  if (deviceConnected)
  {
    digitalWrite(LED_CONNECTION_STATUS, HIGH);

   
    long irValue = particleSensor.getIR();
    
    int newMuscleSensorReading=analogRead(MUSCLE_SENSOR_PIN_SIGNAL);

    if (checkForBeat(irValue) == true)
    {
      // We sensed a beat!
      long delta = millis() - lastbeat;
      lastbeat = millis();

      newBeatsPerMinute = 60 / (delta / 1000.0);
      if (newBeatsPerMinute != beatsPerMinute)
      {
        beatsPerMinute = newBeatsPerMinute;
      }

      if (beatsPerMinute < 255 && beatsPerMinute > 20)
      {
        rates[rateSpot++] = (byte)beatsPerMinute; // Store this reading in the array
        rateSpot %= RATE_SIZE;                    // Wrap variable

        // Take average of readings
        averageBeatsPerMinute = 0;
        for (byte x = 0; x < RATE_SIZE; x++)
        {
          averageBeatsPerMinute += rates[x];
          averageBeatsPerMinute /= RATE_SIZE;
        }
      }

      // delay(3);
    } // end of running logic

    if (irValue < 50000)
    {
      // TODO::add LED to indicate finger attached to sensor
      Serial.print(" No finger?");
      Serial.print("\n");
      digitalWrite(LED_SENSOR_INDICATOR, LOW);

      // notify zero 
      data_characteristic->setValue("No Readings");
      data_characteristic->notify();
      digitalWrite(LED_DANGER_INDICATOR, LOW);
    }
    else
    {
      digitalWrite(LED_SENSOR_INDICATOR, HIGH);
      Serial.print("BPM:");
      Serial.print(beatsPerMinute);
      Serial.print("\n");
      Serial.print("Muscle Reading:");
      Serial.print(newMuscleSensorReading);
      Serial.print("\n");

      // TODO::Broadcast Readings to the App
      if(beatsPerMinute>BEATS_PER_MINUTE_THRESHOLD && newMuscleSensorReading<MUSCLE_SENSOR_THRESHOLD){
        digitalWrite(LED_DANGER_INDICATOR, HIGH);
        data_characteristic->setValue("1");
        data_characteristic->notify();
        
      }else{
        data_characteristic->setValue("0");
        data_characteristic->notify();
        digitalWrite(LED_DANGER_INDICATOR, LOW);
      }

    }
  } // end of connection

  if(!deviceConnected)
  {
    digitalWrite(LED_CONNECTION_STATUS, LOW);
    digitalWrite(LED_DANGER_INDICATOR, LOW);
  }

  if (!deviceConnected && oldDeviceConnected)
  {
    delay(5);
    startAdvertising();
    Serial.println("start advertising");
    oldDeviceConnected = deviceConnected;
  }

  if (deviceConnected && !oldDeviceConnected)
  {
    oldDeviceConnected = deviceConnected;
  }

} // end of loop
