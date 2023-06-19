#ifndef MuscleSensor_h
#define MuscleSensor_h

#include <Arduino.h>
#include <Wire.h>


class MuscleSensor
{
    // class attributes and methods
    private:
      int CONSTANT_THRESHOLD;
      int emgPin;
      int emgSensedValue;
      
    public:
    MuscleSensor(int emgPin_port,int emgThreshold);
    void RunMuscleSensorLogic();
    int GetEmgReading();
    void SetEmgReading(int readingEmg);
};
#endif