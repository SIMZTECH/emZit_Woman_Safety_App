/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { GetFromDatabse } from '../../database/SQLite_DB';
import { openDatabase } from 'react-native-sqlite-storage';
import { ContactsModel } from '../../database/Model';
import PrioritySingleContact from './PrioritySingleContact';
const db=openDatabase({ name:'emergencyApp', location: 'default' });

const PriorityContacts = () => {
  const [contactsRetrieved,setContactsRetrieved]=React.useState<ContactsModel[]>([]);

  const handleRetrieveData=useCallback(async()=>{
    // retrieve data
    await GetFromDatabse('contacts','')
    .then((value)=>{
      setContactsRetrieved(value);
    });

  },[]);

  useEffect(()=>{
    // retrieve data
    handleRetrieveData();
  });

  return (
    <View className='pt-4 px-2 flex-1 bg-[#eff2fa]'>
      <View className='b flex-row justify-between pb-2 pt-2'>
        <Text className='b text-[#c3c6d3] text-[15px]'>Max 5</Text>
        <Text className='b text-[#c3c6d3] text-[15px]'>Total {contactsRetrieved?.length}/5</Text>
      </View>
      <View className='flex-1 pt-4'>
        {(contactsRetrieved?.length > 0) ? (
          contactsRetrieved.map((value,index) => <PrioritySingleContact data={value} key={value.contactID} />)
        ) : (
          <View className='mt-24 items-center'>
            <Text className='b text-[24px] text-center text-[#ffffff8a] font-bold'> NO PRIORITY CONTACTS ADDED </Text>
          </View>
        )
        }
      </View>
    </View>
  );
}

export default PriorityContacts;

const styles = StyleSheet.create({});