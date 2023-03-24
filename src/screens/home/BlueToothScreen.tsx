/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View,SafeAreaView, ActivityIndicator} from 'react-native';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { AppContext } from '../../../global/GlobalState';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import BlueToothDevice from './BlueToothDevice';
import { ScrollView } from 'react-native';

// remove indicator global scope
const handleRemoveLoader=(status:Boolean, time:number,method:Function)=>{
    setTimeout(() => {
      method(status);
    },time);
  }


const BlueToothScreen = () => {
    const{isDeviceConnected,setIsDeviceConnected}=useContext(AppContext);
    const [internalLoader,setInternalLoader]= useState<Boolean>(false);

    const Navigation=useNavigation();

    useLayoutEffect(()=>{
        Navigation.setOptions({
            headerShown:false,
        })

    });

    /* methods */
    const onConnectPressed=()=>{
        if(isDeviceConnected){
            setIsDeviceConnected(false);
            setInternalLoader(true);
        }else{
            setIsDeviceConnected(true);
            setInternalLoader(true);
        }
        handleRemoveLoader(false,2000,setInternalLoader);
    };

    /* methods */


  return (
      <SafeAreaView className='b bg-[#eff2fa] flex-1'>
          <View className='b px-3 pt-3 pb-2 flex-row space-x-8 items-center border-b-[0.5px] border-[#c3c6d3]'>
              <TouchableOpacity
                  onPress={() => Navigation.goBack()}
                  className='flex-row items-center'>
                  <Entypo name='chevron-thin-left' size={25} color={'#f00100'} />
                  <Text className='text-[17px] text-[#f00100] font-medium'>Back</Text>
              </TouchableOpacity>
              <Text className='text-[20px] font-medium text-black'>Bluetooth</Text>
          </View>

          <View className='px-3'>
              <View className='mt-8'>
                  <Text className='text-black text-[18px]'>Device name</Text>
                  <Text className='text-[#b4b7c2] text-[15px]'>{'Infinix NOTE 7 Lite'}</Text>
              </View>

              <View className='flex-row justify-between pr-4 mt-3'>
                  <Text className='text-[#f00100] text-[16px] font-medium'>Available devices</Text>
                  <ActivityIndicator color={'#f00100'} size={20} />
              </View>
              <ScrollView className='mt-3 flex-[50%] pb-3'>
                <BlueToothDevice 
                    bleStatus={isDeviceConnected} 
                    onPress={onConnectPressed} 
                    internalLoader={internalLoader} />
              </ScrollView>
              <View className='flex-row space-x-4'>
                  <Ionicons name='information-circle-outline' size={25} color={'black'} />
                  <Text className='text-[#c3c6d3] text-[16px] flex-1'>
                      When Bluetooth is turned on,
                      your device can communicate with other
                      nearby Bluetooth devices.
                  </Text>
              </View>

          </View>

        </SafeAreaView>
  )
}

export default BlueToothScreen;
