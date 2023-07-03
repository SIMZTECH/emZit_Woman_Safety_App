/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-extra-semi */
/* eslint-disable keyword-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useMemo, useState} from 'react';
import { Alert,StyleSheet, Text, View,ActivityIndicator,FlatList,VirtualizedList, TouchableOpacity, TextInput} from 'react-native';
import {Contact, getAll} from 'react-native-contacts';
import { Appearance } from 'react-native';
import SingleContactComponent from './SingleContactComponent';
import { AppContext } from '../../../global/GlobalState';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

type propsType={
  navigation:any
}

type propsContextType={
  allUserContacts:Contact[],
  setAllUserContacts:any,
  renderKey:number,
  setRenderKey:any,
}

const AllUserContactsScreen = ({navigation}:propsType) => {
 
  const [theme, setTheme]=React.useState(Appearance.getColorScheme);
  const [searchText, setSearchText] = React.useState<string>('');

  const {
    allUserContacts,
    setAllUserContacts,
    renderKey,
    setRenderKey
  }:propsContextType = React.useContext(AppContext);

  const getItem=(_data:any, index:number)=>{
    return _data[index];
  };

  const HandleOnPressSearch=()=>{
    navigation.navigate('SearchContactsScreen');
  };

  // statement to perform search
  const searchFilterData = searchText ?
    allUserContacts.filter((_object) => _object.displayName.toLowerCase().includes(searchText.toLowerCase()))
    :
    allUserContacts;

  useEffect(() => {

    Appearance.addChangeListener((scheme)=>{
      setTheme(scheme.colorScheme);
    });

    console.log('current key:'+renderKey);
   
  },[]);

  // console.log("data\t"+JSON.stringify(allUserContacts));
  return (
    <View className={`flex-1 pt-4 ${(theme === 'dark') ? 'bg-black' :'bg-white'} pb-8`}>

      <View className="b px-3 mt-3 ">

        <View className="b flex-row h-10 shadow-md rounded-md">
          <View className="b w-12 h-full items-center justify-center bg-[#e7e7e7] rounded-tl-md rounded-bl-md">
            <AntDesign name="search1" color={'#f00100'} size={30} />
          </View>
          <TextInput
            placeholder="Search...."
            value={searchText}
            onChangeText={((textValue) => setSearchText(textValue))}
            placeholderTextColor={'white'}
            className="b bg-[#f98181] text-[17px] flex-1 rounded-tr-md rounded-br-md px-4 text-white"
          />
        </View>
      </View>

      <View className="b mt-5 flex-1">
        <VirtualizedList
          data={searchFilterData}
          initialNumToRender={20}
          renderItem={(contact) => <SingleContactComponent userData={contact.item} key={contact.index} navigation={navigation} theme={theme} />}
          getItemCount={(data) => data.length}
          keyExtractor={(contact: Contact) => contact.recordID}
          getItem={getItem}
          refreshing={true}
        />
      </View>

    </View>
    
  );
};

export default AllUserContactsScreen;

const styles = StyleSheet.create({});
