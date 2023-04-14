/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
import { Pressable, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { AppContext } from '../../../global/GlobalState';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-picker/picker';

const SelectedContactsScreen = ()=>{
  // context states
  const {
    singleContactDetails
  } = React.useContext(AppContext);

  const {displayName,jobTitle,phoneNumbers,company} = singleContactDetails;
  // const {number,label}=phoneNumbers[0];
  const [prority,setPriority]=useState<string>('High');

  const Navigation=useNavigation();

  useLayoutEffect(() => {
    Navigation.setOptions({
      headerShown:false,
    });
  });

  const onPressedSave=()=>{
    ToastAndroid.show(`Contact Set as ${prority} Priority`,ToastAndroid.SHORT);
    Navigation.goBack();
  };
 
  // console.log(singleContactDetails);

  return (
    <View className='flex-1'>
      <View className=' bg-[#ff6c6c] px-4 h-[350px] relative items-center justify-center'>
        <Pressable 
          onPress={()=>Navigation.goBack()}
          className='w-12 h-12 bg-[#f00100] items-center justify-center rounded-full absolute top-4 left-4'>
          <Ionicons name="chevron-back" size={30} color={'white'}/>
        </Pressable>

        <FontAwesome name='user-o' size={110} color={'#efa3a3'}/>
        <Text className='absolute bottom-7 left-8 font-normal text-[30px] text-white'>{displayName}</Text>
      </View>
      <View className='px-5 pt-3 space-y-3 relative'>
        <View className=' bg-white h-[55px] rounded-md shadow-md flex-row items-center justify-between px-3'>
          <View className='flex-row items-center space-x-4'>
            <Ionicons name="call" size={22} color={'#f00100'} />
            <View>
              <Text>{'+260 969 718 806'}</Text>
              <Text>Primary Number</Text>
            </View>
          </View>
          <Feather name='message-circle' size={22} color={'#f00100'} />
        </View>

        <View className=' bg-white h-[55px] rounded-md shadow-md flex-row items-center justify-between px-3'>
          <View className='flex-row items-center space-x-4'>
            <Ionicons name="videocam" size={22} color={'#f00100'} />
            <Text>{'+260 969 718 806'}</Text>
          </View>
          <Ionicons name="videocam" size={22} color={'#f00100'} />
        </View>

        <View className=' bg-white h-[55px] rounded-md shadow-md flex-row items-center justify-between px-3'>
          <View className='flex-row items-center space-x-4'>
            <Ionicons name="logo-whatsapp" size={22} color={'#f00100'} />
            <Text>{'+260 969 718 806'}</Text>
          </View>
          <Ionicons name="logo-whatsapp" size={22} color={'#f00100'} />
        </View>

        {/* add priority */}
        <View className=' bg-white h-[55px] rounded-md shadow-md flex-row items-center justify-between px-3'>
          <Text className='b text-[16px]'> Set Priority </Text>
          <Picker
            style={{
              width: '40%',
            }}
            selectedValue={prority}
            onValueChange={(itemValue, itemIndex) =>
              setPriority(itemValue)
            }>
            <Picker.Item label="High" value={'High'} />
            <Picker.Item label="Low" value={'Low'} />
          </Picker>
        </View>

        {/* submit */}
        <Pressable 
          onPress={onPressedSave}
          className='w-14 h-14 border-[#f00100] border-[1px] self-center rounded-full items-center justify-center'
        >
          <View className='b w-12 h-12 bg-[#ff6c6c] rounded-full items-center justify-center'>
            <Text className='text-white text-[16px]'>save</Text>
          </View>
        </Pressable>

      </View>

    </View>
  );
};

export default SelectedContactsScreen;

const styles = StyleSheet.create({});