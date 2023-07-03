/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
import { Alert, Pressable, StyleSheet, Text,View } from 'react-native';
import React, {useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-picker/picker';
import { Appearance } from 'react-native';
import { ContactsModelModified } from '../../database/Model';
import {SaveContactToDatabse,RetrieveSingleContactFromDatabse} from '../../database/SQLite_DB';
import { AppContext } from '../../../global/GlobalState';

type propsType={
  route:any,
}

const SelectedContactsScreen = ({route}:propsType)=>{

  const {displayName,jobTitle,phoneNumbers,company,recordID} = route.params.data;
  const [prority,setPriority]=useState<string>('High');
  const [singleContact,setSingleContact]=useState<ContactsModelModified[]>([]);
  const [theme, setTheme]=React.useState(Appearance.getColorScheme);

  const validatedPhonenumber=(phoneNumbers[0]===undefined)?'delete this contact':phoneNumbers[0].number;

  const Navigation=useNavigation();

  const {renderKey,setRenderKey}:number= React.useContext(AppContext);

  useLayoutEffect(() => {
    Navigation.setOptions({
      headerShown:false,
    });
  });

  const getSingleContact=useMemo(async() => {
      await RetrieveSingleContactFromDatabse('contacts','',recordID)
      .then((value)=>{
        console.log('single Contact Obtained from DB');
        console.log(value);
        setSingleContact(value);
      });

  },[recordID])

  useEffect(() => {
    
    getSingleContact;

    Appearance.addChangeListener((scheme)=>{
      setTheme(scheme.colorScheme);
    });

    console.log("key incremented:"+renderKey);
  },[getSingleContact, renderKey]);
  

  const onPressedSave=async()=>{
    // perform validation to check if number is null or is already saved
    if(validatedPhonenumber === 'delete this contact'){
      Alert.alert('Error!!!','This number cannot be saved, edit or delete it from device');
    }else{
      // check if contact exists as priority before saving
      if(singleContact?.length>0){
        if(singleContact[0].recordID==recordID){
          Alert.alert(
            'Error!!',
            `This number is already set as ${(singleContact[0].contactPriority)?'High':'Low'} Priority`,
          );
        }
      }else{
        // save the data
        let data:ContactsModelModified = {
          recordID: recordID,
          contactPriority: (prority === 'High') ? true : false,
          rowID: 0,
          createdAt: '',
          contactName:displayName,
          contactNumber:validatedPhonenumber
        };
        await SaveContactToDatabse('contacts', data, '');
        // increament render key
        setRenderKey(renderKey+1);
        Navigation.goBack();
      }
    }
  };

  return (
    <View className={`flex-1 `}>
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
              <Text className={`${(theme === 'dark') ? 'text-[#a5a5a6]' : 'text-[#a5a5a6]'} text-[15px]`}>{'+26 '+validatedPhonenumber}</Text>
              <Text className={`${(theme === 'dark') ? 'text-[#a5a5a6]' : 'text-[#a5a5a6]'} text-[15px]`}>Primary Number</Text>
            </View>
          </View>
          <Feather name='message-circle' size={22} color={'#f00100'} />
        </View>

        <View className=' bg-white h-[55px] rounded-md shadow-md flex-row items-center justify-between px-3'>
          <View className='flex-row items-center space-x-4'>
            <Ionicons name="videocam" size={22} color={'#f00100'} />
            <Text className={`${(theme === 'dark') ? 'text-[#a5a5a6]' : 'text-[#a5a5a6]'} text-[15px]`}>{'+26 '+validatedPhonenumber}</Text>
          </View>
          <Ionicons name="videocam" size={22} color={'#f00100'} />
        </View>

        <View className=' bg-white h-[55px] rounded-md shadow-md flex-row items-center justify-between px-3'>
          <View className='flex-row items-center space-x-4'>
            <Ionicons name="logo-whatsapp" size={22} color={'#f00100'} />
            <Text className={`${(theme === 'dark') ? 'text-[#a5a5a6]' : 'text-[#a5a5a6]'} text-[15px]`}>{'+26 '+validatedPhonenumber}</Text>
          </View>
          <Ionicons name="logo-whatsapp" size={22} color={'#f00100'} />
        </View>

        {/* add priority */}
        <View className=' bg-white h-[55px] rounded-md shadow-md flex-row items-center justify-between px-3'>
          <Text className={`${(theme === 'dark') ? 'text-[#a5a5a6]' : 'text-[#a5a5a6]'} text-[15px]`}> Set Priority </Text>
          <Picker
            style={{
              width: '40%',
              color:(theme==='dark'?'#a5a5a6':'#a5a5a6')
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
          onPress={(()=>onPressedSave())}
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

const styles = StyleSheet.create({})
