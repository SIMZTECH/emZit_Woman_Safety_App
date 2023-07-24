/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type propType={
    navigateTo:String;
    operation:(args:String)=>void,
    status:boolean
}

const NextButton = ({navigateTo,operation,status}:propType) => {

  return (
      <TouchableOpacity
          onPress={() =>operation(navigateTo)}
          disabled={status?false:true}
          className={`w-[30%] items-center h-[50px] relative self-end  ${status?'border-[#f00100]':'border-[#3c5a7d]'} border-[1.5px] rounded-md justify-center`}
        >
          <View className={`relative h-[40px] w-[90%] rounded-md items-center ${status?'bg-[#f00100]':'bg-[#eff2fa]'} pt-1`}>
              <Text className={`text-[16px] font-normal ${status?'text-[#fff]':'text-[#3c5a7d]'}`}>NEXT</Text>
              <View className="b absolute top-2">
                  <MaterialIcons name="arrow-right-alt" size={40} color={status?'white':'#3c5a7d'} />
              </View>
          </View>
          {/* hide conners */}
          <Text className="b absolute bg-[#fff] w-[75%] h-1 -top-0.5"></Text>
          <Text className="b absolute bg-[#fff] w-[75%] h-1 -bottom-0.5"></Text>
          <Text className="b absolute bg-[#fff] h-[70%] w-1 -left-0.5"></Text>
          <Text className="b absolute bg-[#fff] h-[70%] w-1 -right-0.5"></Text>
      </TouchableOpacity>
  )
}

export default NextButton;

const styles = StyleSheet.create({})