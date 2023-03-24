/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View,Image, TouchableOpacity, Alert, ToastAndroid} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {deleteItemFromDatabase} from '../database/SQLite_DB';

const ContactRow = ({data,icon}) => {
    /**Methods to handle events**/
    const onPressedCall = ()=>{
        Alert.alert('am calling');
    };

    const onPressedDeletContact = ()=>{
      Alert.alert(
        'Warning!',
        `Are you sure, you want to delete +26 ${data.phoneNumber}`,
        [
          {text:'Yes', onPress:(()=>{
            deleteItemFromDatabase('contacts',data.contactID,'');
            ToastAndroid.show(`Contact deleted successfully +26 ${data.phoneNumber}`,ToastAndroid.SHORT);
          })},
          {text:'No', onPress:(()=>{return}) }
        ]
      );
    };

    const formatPriorityToString=()=>{
      if(data.priority==1){
        return 'HIGH';
      }else{
        return 'LOW';
      }
    };
    /****/

  return (
    <View className="flex-row items-center mb-6">
      <View className="w-12 h-12 rounded-full">
        <Image source={icon}
        className="w-full h-full object-contain"
        resizeMode="contain"
        />
      </View>
      <View className="ml-4 flex-1 space-y-1">
        <View className="flex-row space-x-4 items-center">
            <Text className="text-[19px] font-bold text-black">{data.nameTitle}</Text>
            <Text className="p-1 bg-[#82b296] text-white font-medium rounded-sm">{'Priority'+' '+formatPriorityToString()} </Text>
        </View>
        <View className="flex-row items-center space-x-1">
            <TouchableOpacity
            onPress={onPressedCall}
            >
                <Ionicons name="call-outline" size={24} color="black"/>
            </TouchableOpacity>

            <Text className="text=[17px] text-black font-semibold">{'+260' + ' ' + data.phoneNumber}</Text>
        </View>
      </View>
      <TouchableOpacity
      onPress={onPressedDeletContact}
      className="p-1 rounded-md"
      >
        <MaterialCommunityIcons name="delete" size={23} color="#ff6c6c"/>
      </TouchableOpacity>
    </View>
  );
};

export default ContactRow;

const styles = StyleSheet.create({});
