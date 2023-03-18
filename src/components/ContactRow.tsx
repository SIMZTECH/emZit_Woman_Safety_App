/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View,Image, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Title } from 'react-native-paper';



const ContactRow = ({urlImage,phone,name,priority}) => {


    /**Methods to handle events**/
    const onPressedCall = ()=>{
        Alert.alert('am calling');
    };

    const onPressedDeletContact = ()=>{
        Alert.alert('am deleting');
    };

    /****/

  return (
    <View className="flex-row items-center mb-6">
      <View className="w-12 h-12 rounded-full">
        <Image source={{uri:urlImage}}
        className="w-full h-full object-contain"
        resizeMode="contain"
        />
      </View>
      <View className="ml-4 flex-1 space-y-1">
        <View className="flex-row space-x-4 items-center">
            <Text className="text-[19px] font-bold text-black">{name}</Text>
            <Text className="p-1 bg-[#82b296] text-white font-medium rounded-sm">{priority} </Text>
        </View>
        <View className="flex-row items-center space-x-1">
            <TouchableOpacity
            onPress={onPressedCall}
            >
                <Ionicons name="call-outline" size={24} color="black"/>
            </TouchableOpacity>

            <Text className="b text=[17px] text-black font-semibold">{'+260' + ' ' + phone}</Text>
        </View>
      </View>
      <TouchableOpacity
      onPress={onPressedDeletContact}
      >
        <MaterialCommunityIcons name="dots-vertical" size={27} color="black"/>
      </TouchableOpacity>
    </View>
  );
};

export default ContactRow;

const styles = StyleSheet.create({});
