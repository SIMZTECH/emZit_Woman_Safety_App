/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import { StyleSheet} from 'react-native';
import React from 'react';
import Home from '../screens/home/Home';
import Profile from '../screens/profile/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ContactStack from './ContactStack';

const Tab = createBottomTabNavigator();


const TabNavigationRoute = ({navigation}) => {
  return (
    <>
        <Tab.Navigator
      screenOptions={({route})=>({
        tabBarIcon:({focused,size,color})=>{
          let iconName;
          if(route.name==='Home'){
            iconName=focused?'home':'home';
          }else if(route.name==='Contacts'){
            iconName=focused?'call':'call';
          }else if(route.name==='Profile'){
            iconName=focused?'ios-person-circle-sharp' : 'ios-person-circle-sharp';
          }
          return <Ionicons name={`${iconName}`} size={size} color={color}/>
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
      >
            <Tab.Screen name='Home' component={Home}/>
            <Tab.Screen name='Contacts' component={ContactStack}/>
            <Tab.Screen name='Profile' component={Profile}/>
        </Tab.Navigator>
    </>
  )
}

export default TabNavigationRoute;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({})