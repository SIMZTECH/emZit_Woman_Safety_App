/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

type propsType={
    headerTitle:String,
}

const ScreenHeader = ({headerTitle}:propsType) => {

    const Navigation=useNavigation();
    
  return (
      <View className="b px-3 pt-3 pb-2 flex-row space-x-8 items-center border-b-[0.5px] border-[#c3c6d3]">
          <TouchableOpacity
              onPress={() => Navigation.goBack()}
              className="flex-row items-center">

              <Entypo name="chevron-thin-left" size={25} color={'#f00100'} />
              <Text className="text-[17px] text-[#f00100] font-medium">Back</Text>

          </TouchableOpacity>
          <Text className="text-[20px] font-medium text-black">{headerTitle}</Text>
      </View>
  );
}

export default ScreenHeader;

const styles = StyleSheet.create({});