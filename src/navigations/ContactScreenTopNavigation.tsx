/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import { StyleSheet} from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {AllUserContactsScreen,PriorityContacts} from '../screens/contacts/index';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../global/GlobalState';
import { GetContactsFromDatabse } from '../database/SQLite_DB';

const TopNavigation=createMaterialTopTabNavigator();

const ContactScreenTopNavigation = () => {
  const Navigation=useNavigation();

  const {
    priorityContacts,
    setPriorityContacts,
  } = React.useContext(AppContext);

  useLayoutEffect(() => {
    Navigation.setOptions({
      headerShown:false,
    })
  });

  useEffect(() => {
    GetContactsFromDatabse('contacts', '')
      .then((value) => {
        setPriorityContacts(value);
        console.log('am in priority parent tab, contact loaded');
      });
  },[setPriorityContacts]);

  return (
    <TopNavigation.Navigator
      screenOptions={({route})=>({
       tabBarIndicatorStyle:{
        borderColor:'#ff6c6c',
        backgroundColor:'#ff6c6c',
       },
       tabBarActiveTintColor:'#f00100',

      })}

    >
      <TopNavigation.Screen name='All' component={AllUserContactsScreen}/>
      <TopNavigation.Screen name='Priority' component={PriorityContacts}/>
    </TopNavigation.Navigator>
  )
};

export default ContactScreenTopNavigation;

const styles = StyleSheet.create({});