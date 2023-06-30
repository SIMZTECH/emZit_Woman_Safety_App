/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { StyleSheet} from 'react-native';
import React, { useCallback, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeStack from './HomeStack';
import { SliderScreen } from '../pages/onBoardScreen/index';
import { PermissionModel } from '../database/Model';
import {GetPermissionsFromDatabse,GetContactsFromDatabse} from '../database/SQLite_DB';
import LoaderScreen from '../pages/indicatorScreen/LoaderScreen';
import { AppContext } from '../../global/GlobalState';
import { Contact, getAll} from 'react-native-contacts';

const Stack=createStackNavigator();

const MainRouteNavigation = () => {

  const [permissionsData,setPermissionsData]=React.useState<PermissionModel[]>([]);
  const [checker,setChecker]=React.useState<Boolean>(false);

    // get global state data
  const {
    setPriorityContacts,
    setAllUserContacts,
  } = React.useContext(AppContext);

  

  const handleRetriveData=useCallback(()=>{
    GetPermissionsFromDatabse('permissions','')
    .then((res)=>{
        setPermissionsData(res);
        setChecker(true);
    });
  },[]);


  const retrieveAllUserContacts = React.useCallback(() => {
    // get all user contacts
    getAll()
      .then((value) => {
        setAllUserContacts(value);
        console.log('all user contacts loaded');
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [setAllUserContacts]);

  useEffect(() => {

    handleRetriveData();

    // get all priority contacts from databse
    GetContactsFromDatabse('contacts','')
    .then((value)=>{
      console.log(value.length>0?value:'no priotity contacts set');
      setPriorityContacts(value);
    })
    .catch((e)=>{
      console.log(e.message);
    });

  },[handleRetriveData, setPriorityContacts]);
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="SliderScreen" component={SliderScreen} />
      <Stack.Screen name="HomeStack" component={HomeStack} />
    </Stack.Navigator>
  );

}

export default MainRouteNavigation;

const styles = StyleSheet.create({});