/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, Image, Pressable, Alert} from 'react-native';
import React, { useCallback, useEffect } from 'react';
import {woman} from '../../../assets/imgaes/UIDesign/OtherImages';
import { ContactsModelModified} from '../../database/Model';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Contact,getAll} from 'react-native-contacts';

type propsType={
  data:ContactsModelModified,
  operation:(recordID:String)=>void,
};


const PrioritySingleContact= ({data,operation}:propsType) => {
  const[matchedContacts,setMatchedContacts]=React.useState<Contact|null>();

  const searchForContact= useCallback((_contactObject:Contact[])=>{
    const res=_contactObject.find((value)=>value.recordID==data.recordID);
    if(res){
      setMatchedContacts(res);
    }
  },[data.recordID]);

  const getUserContacts=useCallback(async()=>{
    getAll()
    .then((contacts) => {
      if (true) {
        searchForContact(contacts);
      } 
      return
    })
    .catch((e) => {
      Alert.alert('Warning!', e.message());
    });
  },[searchForContact]);

  useEffect(() => {
    getUserContacts();
 
  },[getUserContacts]);

  // console.log(matchedContacts);

  return (
    <View className='flex-row items-center h-14  px-2 pt-2 pb-2 mt-3 bg-white shadow-md rounded-md'>
      <View className='b flex-row items-center space-x-5 flex-1'>
        <View className='b w-10 h-10 border-[#f00100] border-[1px] rounded-full'>
          <Image source={woman} className='w-full h-full' resizeMode='contain' />
        </View>
        <View className='b space-y-1 flex-1'>
          <View className='flex-row items-center space-x-2'>
            <Text className='b text-[15px] font-normal'>{matchedContacts?.displayName} </Text>
            <View className='b flex-row space-x-3'>
              <Text  className='b text-[15px] font-normal'>Priority</Text>
              <Text className=" bg-[#82b296] px-2 text-[13px] text-white rounded-sm">{(data.contactPriority?.toString() === '1') ? 'HIGH' : 'LOW'}</Text>
            </View>
          </View>
          <View className='b flex-row items-center space-x-3'>
            <Ionicons name='call' size={20} color="gray" />
            <Text className='text-[15px] font-normal'>{(matchedContacts?.phoneNumbers===undefined)?'null':matchedContacts.phoneNumbers[0].number}</Text>
          </View>
        </View>
      </View>
      <Pressable
      onPress={()=>operation(data.recordID)}
       className="h-full items-center justify-center w-12"
      >
        <AntDesign name="delete" size={20} color='#ff6c6c'/>
      </Pressable>
    </View>
  )
}

export default PrioritySingleContact;

const styles = StyleSheet.create({});