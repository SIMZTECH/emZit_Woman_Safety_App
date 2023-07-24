/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React, { useLayoutEffect } from 'react';
import Profile from '../screens/profile/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsScreen from '../screens/settings/SettingsScreen';
import Home from '../screens/home/Home';
import ContactScreenTopNavigation from './ContactScreenTopNavigation';
import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();


const TabNavigationRoute = ({navigation}) => {

  const Navigation=useNavigation();
  
  useLayoutEffect(() => {
    Navigation.setOptions({
      headerShown:false,
    })
    
  },);

  return (
    <>
      <Tab.Navigator
      barStyle={{
        paddingVertical:0,
        backgroundColor:"white",
        paddingBottom:0,
      }}
      activeColor='#f00100'

      screenOptions={({route})=>({
        tabBarIcon:({focused,size,color})=>{
          let iconName;
          if(route.name==='Home'){
            iconName=focused?'home':'home';
          }else if(route.name==='Contacts'){
            iconName=focused?'call':'call';
          }else if(route.name==='Profile'){
            iconName=focused?'ios-person-circle-sharp' : 'ios-person-circle-sharp';
          }else if(route.name==='Settings'){
            iconName=focused?'md-settings' : 'md-settings';
          }
          return <Ionicons name={`${iconName}`} size={25} color={"grey"}/>
        },
        // tabBarActiveTintColor: 'tomato',
        // tabBarInactiveTintColor: 'gray',
      })}
      >
            <Tab.Screen name='Home' component={Home}/>
            <Tab.Screen name='Contacts' component={ContactScreenTopNavigation}/>
            <Tab.Screen name='Profile' component={Profile}/>
            <Tab.Screen name='Settings' component={SettingsScreen}/>
        </Tab.Navigator>
    </>
  )
}

export default TabNavigationRoute;
