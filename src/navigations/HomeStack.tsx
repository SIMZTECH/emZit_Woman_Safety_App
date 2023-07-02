/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useLayoutEffect, useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Map from '../screens/home/Map';
import BlueToothScreen from '../screens/home/BlueToothScreen';
import TabNavigationRoute from './TabNavigationRoute';
import { SelectedContactsScreen } from '../screens/contacts';
import { useNavigation } from '@react-navigation/native';
import { Contact,getAll } from 'react-native-contacts';
import { AppContext } from '../../global/GlobalState';
import { GetContactsFromDatabse } from '../database/SQLite_DB';
import SearchContactSreen from '../screens/contacts/searchScreen/SearchContactSreen';

 // get global state data
 type propsContext={
  allUserContacts:Contact[],
  setAllUserContacts:any, 
}

const Stack = createStackNavigator();

const HomeStack = () => {
    
  const Navigation=useNavigation();

  const {
    allUserContacts,
    setAllUserContacts,
  }: propsContext = useContext(AppContext);


  useEffect(()=>{

    getAll()
      .then((value) => {
        setAllUserContacts(value);
        console.log('all contacts loaded successfully');
      })
      .catch((e) => {
        console.log(e.message);
      });

  },[setAllUserContacts]);

  
  useLayoutEffect(() => {
    Navigation.setOptions({
      headerShown: false,
    });

  },);

  return (
  <Stack.Navigator>
    <Stack.Screen name='TabNavigationRoute' component={TabNavigationRoute}/>
    <Stack.Screen name='Map' component={Map}/>
    <Stack.Screen name='BlueToothScreen' component={BlueToothScreen}/>
    <Stack.Screen name='SelectedScreen' component={SelectedContactsScreen}/>
    <Stack.Screen name='SearchContactsScreen' component={SearchContactSreen}/>
  </Stack.Navigator>
  );
}

export default HomeStack;
