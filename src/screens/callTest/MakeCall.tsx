/* eslint-disable prettier/prettier */
import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import RNImmediatePhoneCall from 'react-native-immediate-phone-call';


const MakeCall = () => {

    const MakePhoneCall=()=>{

        RNImmediatePhoneCall.immediatePhoneCall('0965719469');
    };

  return (
    <View>
      <Text>MakeCall</Text>

      <Button title='Call' onPress={(()=>MakePhoneCall())}/>
    </View>
  )
}

export default MakeCall;

const styles = StyleSheet.create({});