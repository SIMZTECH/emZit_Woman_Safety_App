/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View,TextInput} from 'react-native';
import React from 'react';

const InputContainer = ({placeholder,value,setValue,keyboardType}) => {
  return (
    <View className=' border-[#ff6c6c] border-[0.5px] h-[50px] px-2 mt-3 mb-3 rounded-md items-start bg-white shadow-md'>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        className="w-full"
        keyboardType={keyboardType}
      />
    </View>
  )
}

export default InputContainer;

const styles = StyleSheet.create({})