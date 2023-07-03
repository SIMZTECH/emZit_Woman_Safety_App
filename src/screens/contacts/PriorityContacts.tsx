/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View } from 'react-native';
import React, {useContext, useEffect, useMemo } from 'react';
import { GetContactsFromDatabse, DeleteContactFromDatabase } from '../../database/SQLite_DB';
import PrioritySingleContact from './PrioritySingleContact';
import { AppContext } from '../../../global/GlobalState';
import { ContactsModelModified } from '../../database/Model';
import { useNavigation } from '@react-navigation/native';

type propsContext={
  priorityContacts:ContactsModelModified[],
  setPriorityContacts:any,
}


const PriorityContacts = () => {

  const Navigation=useNavigation();

  const [allPriority,setAllPriority]=React.useState<ContactsModelModified[]>([]);

  const {
    allUserContacts,
    setAllUserContacts,
    renderKey,setRenderKey
  }: propsContext = useContext(AppContext);

  const removeItemFromUIContent = (_ID: String) => {
    let copyObject = [...allPriority];
    let res = copyObject.findIndex((value) => value.recordID == _ID);
    copyObject.splice(res, 1);
    setAllPriority(copyObject);

    // complete logic to successfully delete this
    setRenderKey(renderKey+1);

  };

  const handleDeleteContact = (async (_data: String) => {
    await DeleteContactFromDatabase('contacts', _data, '')
    removeItemFromUIContent(_data);
  });

  const HandleRetrivePriorityContactsFromDB=useMemo(()=>{
    if (renderKey>=0) {
      GetContactsFromDatabse('contacts', '')
        .then((value) => {
          setAllPriority(value);
          // console.log('am in priority contacts page, contact loaded');
        });
    }
  }, [renderKey]);

  useEffect(() => {

    // console.log(allPriority);

    console.log("Priority render key page:"+renderKey);
    
  },[allPriority, renderKey]);


  return (
    <View className='pt-4 px-2 flex-1 bg-[#eff2fa]'>
      <View className='b flex-row justify-between pb-2 pt-2'>
        <Text className='b text-[#c3c6d3] text-[15px]'>Max 5</Text>
        <Text className='b text-[#c3c6d3] text-[15px]'>Total {allPriority?.length}/5</Text>
      </View>
      <View className='flex-1 pt-4'>
        {(allPriority?.length > 0) ? (
          allPriority.map((value,index) => <PrioritySingleContact data={value} key={value.rowID} operation={handleDeleteContact}/>)
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