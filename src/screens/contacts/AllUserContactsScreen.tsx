/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-extra-semi */
/* eslint-disable keyword-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState} from 'react';
import { Alert,StyleSheet, Text, View,ActivityIndicator,FlatList,VirtualizedList} from 'react-native';
import {Contact, getAll} from 'react-native-contacts';
import { AppContext } from '../../../global/GlobalState';
import SingleContactComponent from './SingleContactComponent';

const AllUserContactsScreen = ({navigation}) => {
  // context states
  const {
    contactsPermission
  } = React.useContext(AppContext);

  const[allUserContacts,setAllUserContacts]=useState<Contact[]>([]);

  useEffect(()=>{
    // read and update all contacts
    getAll()
    .then((contacts)=>{
      if(contactsPermission){
        setAllUserContacts(contacts);
      };
    })
    .catch((e)=>{
      Alert.alert('Warning!', e.message());
    });

  },[]);

  const getItem=(_data, index)=>{
    return _data[index];
  };

  console.log("data\t"+JSON.stringify(allUserContacts));

  return (
    <View className="flex-1 pt-4 bg-[#eff2fa]">
      {(allUserContacts.length > 0 ) ? (
          <VirtualizedList
            data={allUserContacts}
            initialNumToRender={9}
            renderItem={(contact) =><SingleContactComponent userData={contact} key={contact.index} navigation={navigation} />}
            getItemCount={(data)=>data.length}
            keyExtractor={(contact:Contact)=>contact.recordID}
            getItem={getItem}
          />

        ) : (
          <View className="items-center mt-10 w-12 h-12 bg-white justify-center rounded-full shadow-md self-center">
            <ActivityIndicator size={30} color={'#f00100'} />
          </View>
        )
      }
    </View>
    
  );
};

export default AllUserContactsScreen;

const styles = StyleSheet.create({});

