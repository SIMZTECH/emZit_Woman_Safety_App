/* eslint-disable space-infix-ops */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View,Dimensions,TouchableOpacity,Alert, ScrollView} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ContactRow from '../../components/ContactRow';
import { saveToDatabse,deleteItemFromDatabase,GetFromDatabse} from '../../database/SQLite_DB';
import { ContactsModel } from '../../database/Model';
import { openDatabase } from 'react-native-sqlite-storage';
import { woman,sister,brother,auntie,friend,other,man,uncle} from '../../../assets/imgaes/UIDesign/OtherImages';

const db=openDatabase({ name:'emergencyApp', location: 'default' });

const Contacts = () => {
  const [contactsRetrievedDB,setContactsRetrievedDB]=useState([]);
  
  const Navigation=useNavigation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {width,height}=Dimensions.get('screen');

  useLayoutEffect(() => {
    Navigation.setOptions({
      headerShown:false,
    })
    
  },);

  // handle format icons
  const formatIcon=(name:string)=>{
    let icon;

    switch (name) {
      case 'Mother':
        icon=woman;
        break;
      
      case 'Father':
        icon=man;

        break;

      case 'Sister':
        icon=sister;

        break;

      case 'Uncle':
        icon=uncle;

        break;

      case 'Auntie':
        icon=auntie;

        break;

      case 'Friend':
        icon=friend;

        break;

      case 'Other':
        icon=other;

        break;

      case 'Brother':
        icon=brother;

        break;
    
      case 'Other':
        icon=other;

        break;
    }
    return icon;
  };

  const HandleRetrieveData=async()=>{
    // retrieve from db
    await GetFromDatabse('contacts','',await db)
    .then((res)=>{
      // console.log(res);
      setContactsRetrievedDB(res);
    });
  };

  useEffect(()=>{
    HandleRetrieveData();

  },[contactsRetrievedDB]);

  // HandleRetrieveData();

  /* Events methods*/
  const onPressedAddContact=async()=>{
    Navigation.navigate('AddContact');
  };

  return (
    <SafeAreaView
    className='bg-white flex-1 px-5 pt-5 pb-5'
    style={[styles.SafeAreaContainer,{width:width,height:height}]}
    >
      <Text className='b text-[24px] font-semibold text-black mt-3'>Contacts</Text>
      {/* add new contact */}
      <View className='flex-row space-x-4 items-center mt-7'>
        <TouchableOpacity 
        onPress={onPressedAddContact}
        className='b w-12 h-12 bg-[#ff6c6c] rounded-full items-center justify-center'>
          <AntDesign name='plus' size={24} color='white'/>
        </TouchableOpacity>
        <View>
          <Text className='text-[#ff6c6c] font-medium text-[16px]'>Add new</Text>
          <Text className='text-[#c3c6d3] text-[16px]'>Max 5 contacts</Text>
        </View>
      </View>
      {/* conitacts list */}
      <ScrollView className='mt-10'
      showsVerticalScrollIndicator={false}
      >
        {/* components */}
        {contactsRetrievedDB.map((item,index)=>{
            return ( 
              <ContactRow 
              data={item} key={item.contactID} 
              icon={formatIcon(item.nameTitle)} />  
            );
          })
        }

      </ScrollView>
    </SafeAreaView>
  )
}

export default Contacts;

const styles = StyleSheet.create({
  SafeAreaContainer:{

  }
})