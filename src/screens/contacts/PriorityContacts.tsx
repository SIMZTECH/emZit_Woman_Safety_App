/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { GetContactsFromDatabse, deleteContactFromDatabase } from '../../database/SQLite_DB';
import PrioritySingleContact from './PrioritySingleContact';
import { AppContext } from '../../../global/GlobalState';
import { ContactsModelModified } from '../../database/Model';

type propsContext={
  priorityContacts:ContactsModelModified[],
  setPriorityContacts:any,

}

const PriorityContacts = () => {
  // get global state data
  const {
    priorityContacts,
    setPriorityContacts,
  }:propsContext = React.useContext(AppContext);

  const removeItemFromUIContent=(_ID:String)=>{
    let copyObject=priorityContacts;
    let res=copyObject.findIndex((value)=>value.recordID==_ID);
    copyObject.splice(res,1);
    setPriorityContacts(copyObject);
    console.log('deletedIndex:'+res);
    console.log(copyObject);
  };

  const handleDeleteContact=((_data:String)=>{

    deleteContactFromDatabase('contacts',_data,'');
    removeItemFromUIContent(_data);
    console.log("record deleted:" + _data);
  });

  useEffect(()=>{

  },[priorityContacts,setPriorityContacts]);
  // console.log(contactsRetrieved);

  return (
    <View className='pt-4 px-2 flex-1 bg-[#eff2fa]'>
      <View className='b flex-row justify-between pb-2 pt-2'>
        <Text className='b text-[#c3c6d3] text-[15px]'>Max 5</Text>
        <Text className='b text-[#c3c6d3] text-[15px]'>Total {priorityContacts?.length}/5</Text>
      </View>
      <View className='flex-1 pt-4'>
        {(priorityContacts?.length > 0) ? (
          priorityContacts.map((value,index) => <PrioritySingleContact data={value} key={value.rowID} operation={handleDeleteContact}/>)
        ) : (
          <View className='mt-24 items-center'>
            <Text className='b text-[24px] text-center text-[#ffffffa1] font-bold'> NO PRIORITY CONTACTS ADDED </Text>
          </View>
        )
        }
      </View>
    </View>
  );
}

export default PriorityContacts;

const styles = StyleSheet.create({});