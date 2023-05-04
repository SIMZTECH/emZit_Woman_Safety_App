/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ActivityIndicator } from 'react-native';

const LoaderScreen = () => {
  return (
    <View className='flex-1 items-center bg-white'>
      <View className='b bg-[#eff2fa] w-14 h-14 mt-[200px] items-center justify-center rounded-full shadow-md'>
        <ActivityIndicator size={34} color={"#f00100"}/>
      </View>
    </View>
  )
}

export default LoaderScreen

const styles = StyleSheet.create({})