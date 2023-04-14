/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import { StyleSheet} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {AllUserContactsScreen,PriorityContacts} from '../screens/contacts/index';
import { useNavigation } from '@react-navigation/native';

const TopNavigation=createMaterialTopTabNavigator();

const ContactScreenTopNavigation = () => {
  const Navigation=useNavigation();

  useLayoutEffect(() => {
    Navigation.setOptions({
      headerShown:false,
    })
  });
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