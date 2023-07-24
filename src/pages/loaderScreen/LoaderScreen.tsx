/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';

const LoaderScreen = () => {
  return (
    <View className='b flex-1 items-center justify-center'>
      <ActivityIndicator size={25} color={"red"}/>
    </View>
  )
}

export default LoaderScreen;

const styles = StyleSheet.create({})