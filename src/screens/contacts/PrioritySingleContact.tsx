/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import { other } from '../../../assets/imgaes/UIDesign/OtherImages';
import { ContactsModel } from '../../database/Model';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { deleteItemFromDatabase } from '../../database/SQLite_DB';

type ContactDataProps={
  data:ContactsModel;
};

const PrioritySingleContact:React.FC<ContactDataProps> = ({data}) => {
  const handleDeleteContact=()=>{
    // delete contact
   deleteItemFromDatabase('contacts',data.contactID,'');
    console.log(data);
    // if(){

    // }
  };

  return (
    <View className='flex-row items-center h-14  px-2 pt-2 pb-2 mt-3 mb-3 border-b-[0.5px] border-b-[#fff] '>
      <View className='b flex-row items-center space-x-5 flex-1'>
        <View className='b w-10 h-10 border-[#f00100] border-[1px] rounded-full'>
          <Image source={other} className='w-full h-full' resizeMode='contain' />
        </View>
        <View className='b space-y-1 flex-1'>
          <View className='flex-row items-center space-x-7'>
            <Text className='b text-[16px] font-normal'>{data.contactName} </Text>
            <View className='b flex-row space-x-2'>
              <Text  className='b text-[16px] font-normal'>Priority</Text>
              <Text className=" bg-[#82b296] px-3 text-white rounded-sm">{(data.contactPriority?.toString() === '1') ? 'HIGH' : 'LOW'}</Text>
            </View>
          </View>
          <View className='b flex-row items-center space-x-3'>
            <Ionicons name='call' size={24} color="gray" />
            <Text className='text-[16px] font-normal'>{data.contactNumber}</Text>
          </View>
        </View>
      </View>
      <Pressable
      onPress={handleDeleteContact}
       className="h-full items-center justify-center w-12"
      >
        <AntDesign name="delete" size={20} color='#ff6c6c'/>
      </Pressable>
    </View>
  )
}

export default PrioritySingleContact;

const styles = StyleSheet.create({});