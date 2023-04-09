/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import { StyleSheet,View } from 'react-native'
import React from 'react';

const Pagination = ({sliderIndex,loopIndex}) => {
  return (
    <View className={`w-2 h-2  ${sliderIndex==loopIndex?'bg-[#f00100]':'bg-[#3c5a7d]'} rounded-sm mx-1`}>
      
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({})