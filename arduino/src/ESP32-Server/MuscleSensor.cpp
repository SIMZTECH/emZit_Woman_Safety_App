#include <Arduino.h>
#include <Wire.h>
#include "MuscleSensor.h"

MuscleSensor::MuscleSensor(int emgPin_port,int emgThreshold){
    CONSTANT_THRESHOLD=emgThreshold;
    emgPin=emgPin_port;
};

void MuscleSensor::RunMuscleSensorLogic(){
    int readValue=analogRead(emgPin);
    if(readValue<CONSTANT_THRESHOLD){
        SetEmgReading(readValue);
    }
};

void MuscleSensor::SetEmgReading(int readingEmg){
    emgSensedValue=readingEmg;
};

int MuscleSensor::GetEmgReading(){
    return emgSensedValue;
};