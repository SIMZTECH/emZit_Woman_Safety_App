#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>

// BLE section

BLEServer *pServer=NULL;

BLECharacteristic *data_characteristic=NULL;
BLECharacteristic *box_characteristic=NULL;

String boxvalue="0";

bool deviceConnected=false;
int LEDpin=2;

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

class CharacteristicsCallbacks:public BLECharacteristicCallbacks{
  void onWrite(BLECharacteristic *pCharacteristic){
    Serial.print("Value written");
    Serial.println(pCharacteristic->getValue().c_str());
    if(pCharacteristic==box_characteristic){
      boxvalue=pCharacteristic->getValue().c_str();
      box_characteristic->setValue(const_cast<char *>(boxvalue.c_str()));
      box_characteristic->notify();
    }

  }

};//end of characteristics callbak class

void setup() {
  Serial.begin(115200);
  pinMode(LEDpin,OUTPUT);
  // Create the BLE Device
  BLEDevice::init("ESP32-R");

  // Create the BLE Server
  pServer=BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // Create the BLE Service
  BLEService *pService=pServer->createService(SERVICE_UUID);
  delay(100);

  // Create a BLE Characteristic
  data_characteristic=pService->createCharacteristic(
    DATA_CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_READ|
    BLECharacteristic::PROPERTY_WRITE|
    BLECharacteristic::PROPERTY_NOTIFY|
    BLECharacteristic::PROPERTY_INDICATE
  );

  box_characteristic=pService->createCharacteristic(
    BOX_CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_READ|
    BLECharacteristic::PROPERTY_WRITE|
    BLECharacteristic::PROPERTY_NOTIFY|
    BLECharacteristic::PROPERTY_INDICATE
  );

  // Start the BLE Serice
  pService->start();

  // Start advertising
  pServer->getAdvertising()->start();

  data_characteristic->setValue("high");
  data_characteristic->setCallbacks(new CharacteristicsCallbacks());

  box_characteristic->setValue("0");
  box_characteristic->setCallbacks(new CharacteristicsCallbacks());

  Serial.println("Waiting for a client connection to notify....");
}

void loop() {
  // check if devices is connected
  if(deviceConnected){
    digitalWrite(LEDpin,HIGH);
    // logic to get readings from the sensors

    data_characteristic->setValue("high");
    data_characteristic->notify();
    delay(1000);

    data_characteristic->setValue("high1");
    data_characteristic->notify();
    delay(1000);

  }else{
    digitalWrite(LEDpin,LOW);
  }

}