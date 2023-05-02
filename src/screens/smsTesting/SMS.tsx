/* eslint-disable prettier/prettier */
import { PermissionsAndroid, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { NativeModules } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Pressable } from 'react-native';

let DirectSms = NativeModules.DirectSms;

const SMS = () => {
    const [mobileNumber, setMobileNumber]=useState('');
    const [bodySMS, setBodySMS]=useState('EM-ZIT:Help help!!!, am in danger');

    // async function to call the Java native method
  const sendDirectSms = async () => {
    if (mobileNumber) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.SEND_SMS);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          DirectSms.sendDirectSms(mobileNumber, bodySMS);
          alert('SMS sent');
        } else {
          alert('SMS permission denied');
        }
      } catch (error) {
        console.warn(error);
        alert(error.message());
      }
    }else{
        alert("Number is empty!");
    }
  };

  return (

    <View className='b px-2'>
        <Text className='b mt-3 mb-3 text-[20px] self-center text-black'>Bridge Example to send SMS</Text>
          <View className='b space-y-1 mb-2 mt-2'>
              <Text>Enter Recepient phone number</Text>
              <TextInput
              value={mobileNumber}
              placeholder='Enter contact to call'
              onChangeText={(valenc)=>setMobileNumber(valenc)}
              keyboardType='numeric'
              />
          </View>

          <View className='b space-y-1 mb-2 mt-2'>
              <Text>Enter Emmergency message</Text>
              <TextInput
              value={bodySMS}
              placeholder='Enter SMS body'
              onChangeText={(valenc)=>setBodySMS(valenc)}
              />
          </View>
          <Pressable
          className='h-12 items-center justify-center bg-blue-400'
          onPress={()=>{
            sendDirectSms();
            console.log('pressed');
          }}>
            <Text className='b text-white text-[17px]'>Send SMS</Text>
          </Pressable>
    </View>
  )
}

export default SMS;

const styles = StyleSheet.create({});
