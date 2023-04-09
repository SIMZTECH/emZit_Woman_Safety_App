/* eslint-disable prettier/prettier */
import { StyleSheet} from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import SliderScreen from '../pages/SliderScreen';

const Stack=createStackNavigator();

const MainRouteNavigation = () => {


  return (
    <Stack.Navigator
    screenOptions={{
        headerShown:false
    }}
    >
      <Stack.Screen name='SliderScreen' component={SliderScreen} />
      <Stack.Screen name='DrawerNavigation' component={DrawerNavigation} />
    </Stack.Navigator>
  )
}

export default MainRouteNavigation

const styles = StyleSheet.create({})