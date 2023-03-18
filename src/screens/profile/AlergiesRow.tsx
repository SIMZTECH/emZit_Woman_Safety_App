/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AlergiesRow = ({iconName,title,description,color,borderSizeTop,borderSizeBottom}) => {
  return (
    <View className={`flex-row items-center border-[#eff2fa] relative border-b-[${borderSizeBottom}px] border-t-[${borderSizeTop}px]`}>
      <View className='flex-row w-[40%] space-x-2 items-center border-r-[1px] border-[#eff2fa] pt-1 pb-1'>
        <MaterialCommunityIcons name={iconName} color={color} size={22}/>
        <Text className='text-[17px] font-medium text-black'>{title}</Text>
      </View>
      <Text className='flex-1 text-[16px] text-[#c3c6d3] px-3'>{description}</Text>
    </View>
  );
};

export default AlergiesRow;

const styles = StyleSheet.create({})