#include <Arduino.h>
#include <Wire.h>
#include "MAX30105.h"
#include "heartRate.h"
#include "HeartBeatSensor.h"


HeartBeatSensor::HeartBeatSensor(int pin){
    BLINK_LED_PIN=pin;
    particleSensor=new MAX30105;
};

void HeartBeatSensor::InitializeSensor(){
    if(!particleSensor->begin(Wire,I2C_SPEED_FAST)){
          Serial.println("MAX30102 Sensor was not found.......");

          while(1);
    }else
    {
          Serial.println("Place your index finger on the sensor");
          particleSensor->setup();                    
          particleSensor->setPulseAmplitudeRed(0x0A); 
          particleSensor->setPulseAmplitudeGreen(0);  
    }
};

void HeartBeatSensor::RunSensorLogic()
{
    irValue = particleSensor->getIR();

    if (irValue > 50000)
    {
          if (checkForBeat(irValue) == true)
          {
              long delta = millis() - lastbeat;
              lastbeat = millis();

              SetBeatsPerMinute(60/(delta/1000.0));

              if (GetBeatsPerMinute() < 255 && GetBeatsPerMinute() > 20)
              {
                  rates[rateSpot++] = (byte)GetBeatsPerMinute(); 
                  rateSpot %= RATE_SIZE; 
                  // Take average of readings
                  CalculateAverage();
              }
          }
    }else{
         Serial.print(" No finger?");
         Serial.println();
    }
};

float HeartBeatSensor::GetBeatsPerMinute(){
    return beatsPerMinute;
};

long HeartBeatSensor::GetBeatAverage(){
    return avgBeatsPerMinute;
};

float HeartBeatSensor::SetBeatsPerMinute(float beat){
    beatsPerMinute=beat;
};

long HeartBeatSensor::SetBeatAverage(long beat){
    avgBeatsPerMinute=beat;
};

void HeartBeatSensor::CalculateAverage(){
    SetBeatAverage(0);
    for(int x=0;x<RATE_SIZE;x++){
        avgBeatsPerMinute+=rates[x];
        avgBeatsPerMinute/=RATE_SIZE;
    }
};
