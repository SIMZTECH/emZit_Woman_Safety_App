/* eslint-disable prettier/prettier */
/* eslint-disable jsx-quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Map from '../screens/home/Map';
import BlueToothScreen from '../screens/home/BlueToothScreen';
import TabNavigationRoute from './TabNavigationRoute';
import { SelectedContactsScreen } from '../screens/contacts';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

const HomeStack = () => {
    
    const Navigation=useNavigation();
  
    useLayoutEffect(() => {
      Navigation.setOptions({
        headerShown:false,
      })
      
    },);

  return (
  <Stack.Navigator>
    <Stack.Screen name='TabNavigationRoute' component={TabNavigationRoute}/>
    <Stack.Screen name='Map' component={Map}/>
    <Stack.Screen name='BlueToothScreen' component={BlueToothScreen}/>
    <Stack.Screen name='SelectedScreen' component={SelectedContactsScreen}/>
  </Stack.Navigator>
  );
}

export default HomeStack;
