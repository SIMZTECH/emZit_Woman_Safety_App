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
import { Appearance } from 'react-native';
import SingleContactComponent from './SingleContactComponent';

type propsType={
  navigation:any
}

const AllUserContactsScreen = ({navigation}:propsType) => {
 
  const[allUserContacts,setAllUserContacts]=useState<Contact[]>([]);
  const [theme, setTheme]=React.useState(Appearance.getColorScheme);

  const getUserContacts=useCallback(async()=>{
    getAll()
    .then((contacts) => {
      if (true) {
        setAllUserContacts(contacts);
      } 
      return
    })
    .catch((e) => {
      Alert.alert('Warning!', e.message());
    });
  },[]);


  useEffect(() => {
    getUserContacts();

    Appearance.addChangeListener((scheme)=>{
      setTheme(scheme.colorScheme);
    });
   
  },[getUserContacts]);



  const getItem=(_data, index)=>{
    return _data[index];
  };

  // console.log("data\t"+JSON.stringify(allUserContacts));

  return (
    <View className={`flex-1 pt-4 ${(theme === 'dark') ? 'bg-black' : 'bg-[#eff2fa]'} `}>
      {(allUserContacts.length > 0 ) ? (
          <VirtualizedList
            data={allUserContacts}
            initialNumToRender={9}
            renderItem={(contact) =><SingleContactComponent userData={contact.item} key={contact.index} navigation={navigation} theme={theme}/>}
            getItemCount={(data)=>data.length}
            keyExtractor={(contact:Contact)=>contact.recordID}
            getItem={getItem}
            refreshing={true}
          />

        ) : (
          <View className="items-center mt-10 w-12 h-12 bg-[#eff2fa] justify-center rounded-full shadow-md self-center">
            <ActivityIndicator size={30} color={'#f00100'} />
          </View>
        )
      }
    </View>
    
  );
};

export default AllUserContactsScreen;

const styles = StyleSheet.create({});
