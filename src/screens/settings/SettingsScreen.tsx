/* eslint-disable prettier/prettier */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native-gesture-handler';

const SettingsScreen = () => {
  const Navigation=useNavigation();
  const[toggleleft,setToggleLeft]=useState<number>(6);

  useLayoutEffect(()=>{
    Navigation.setOptions({
      headerShown:false,

    });

  });

  const handleToggleBtn=()=>{
    if(toggleleft==6){
      setToggleLeft(0);
    }else{
      setToggleLeft(6);
    }

  };

  return (
    <View className='px-5 pt-8 bg-white flex-1'>
      <Text className='text-[19px] font-medium text-[#f00100] mb-4'>Settings</Text>
      <View className=' space-y-2'>
        <Text className='text-[#ff6c6c] font-normal'>SECURITY</Text>
        <View className='flex-row items-center justify-center space-x-2 h-10 bg-[#f00100] rounded-md'>
          <Ionicons name='logo-google' size={15} color={'white'}/>
          <Text className='text-white text-[15px]'>Sign in with Google</Text>
        </View>
      </View>

      <View className=' space-y-2 mt-5'>
        <Text className='text-[#ff6c6c] font-normal'>PERMISSIONS</Text>
        {/* Catch*/}
        <View className='flex-row h-10 bg-[#eff2fa] rounded-md items-center'>
          <View className='flex-row items-center px-2 space-x-2'>
            <Ionicons name='md-location-outline' size={20} color={'#ff6c6c'}/>
            <Text>Allow location</Text>
          </View>
          {/* toggle */}
          <View className='h-full flex-1 items-end justify-center pr-3'>
            <Pressable 
              onPress={handleToggleBtn}
              className='h-6 w-12 px-0.5 pt-0.5 pb-0.5 bg-orange-400 rounded-full bg-[#f00100] relative transition-all'>
              <Text className={`h-full w-5 bg-white rounded-full left-${toggleleft} transition`}></Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View className=' space-y-2 mt-5'>
        <Text className='text-[#ff6c6c] font-normal'>REPLACEMENTS</Text>
        {/* Catch*/}
        <View className='flex-row h-10 bg-[#eff2fa] rounded-md items-center'>
          <View className='flex-row items-center pl-2 space-x-2 h-full'>
            <FontAwesome5 name='heartbeat' size={20} color={'#ff6c6c'}/>
            <Text>Healthy replacement app </Text>
          </View>
          <View className='h-full flex items-end justify-center flex-1 pr-2'>
            <Ionicons name='chevron-forward' size={20} color={'#ff6c6c'}/>
          </View>
        </View>

      </View>
      
    </View>
  )
}

export default SettingsScreen;

const styles = StyleSheet.create({})