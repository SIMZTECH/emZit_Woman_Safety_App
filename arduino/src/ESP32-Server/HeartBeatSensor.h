#ifndef HeartBeatSensor_h
#define HeartBeatSensor_h

#include <Arduino.h>
#include <Wire.h>
#include "MAX30105.h"
#include "heartRate.h"

#define DHTTYPE DHT11

class HeartBeatSensor
{
    public:
    HeartBeatSensor(int pin);
    void InitializeSensor();
    void RunSensorLogic();
    float GetBeatsPerMinute();
    float SetBeatsPerMinute(float beat);
    long GetBeatAverage();
    long SetBeatAverage(long beat);
    void CalculateAverage();

    private:
      int BLINK_LED_PIN;
      int RATE_SIZE=4;
      byte rates[4];
      byte rateSpot=0;
      long lastbeat=0;
      MAX30105 *particleSensor;
      long irValue;
      float beatsPerMinute;
      long avgBeatsPerMinute;
};
#endif
