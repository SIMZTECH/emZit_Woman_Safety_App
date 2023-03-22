/* eslint-disable prettier/prettier */
/* eslint-disable jsx-quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { StyleSheet} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Map from '../screens/home/Map';
import Home from '../screens/home/Home';
import BlueToothScreen from '../screens/home/BlueToothScreen';
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
    <Stack.Screen name='HomeScreen' component={Home}/>
    <Stack.Screen name='Map' component={Map}/>
    <Stack.Screen name='BlueToothScreen' component={BlueToothScreen}/>
  </Stack.Navigator>
  );
}

export default HomeStack;

const styles = StyleSheet.create({})