/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

type propsType={
    headerTitle:String,
}


const RegistrationScreenHeader = ({headerTitle}:propsType) => {

    const Navigation=useNavigation();

  return (
    <View className="b px-3 pt-3 pb-2 flex-row items-center ">
          <TouchableOpacity
              onPress={() => Navigation.goBack()}
              className="flex-row items-center w-10 h-10">
              <Entypo name="chevron-thin-left" size={28} color={'#3c5a7d'} />
          </TouchableOpacity>
          <Text className="text-[20px] font-medium text-[#3c5a7d] px-16">{headerTitle}</Text>
      </View>
  )
}

export default RegistrationScreenHeader;

const styles = StyleSheet.create({})