/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { StyleSheet} from 'react-native';
import React, { useCallback, useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeStack from './HomeStack';
import { SliderScreen } from '../pages/onBoardScreen/index';
import UserProfileRegistration from './UserProfileRegistration';
import { GetUserProfile } from '../database/SQLite_DB';
import LoaderScreen from '../pages/indicatorScreen/LoaderScreen';

const Stack=createStackNavigator();

const MainRouteNavigation = () => {
  const [pageSwitcher, setPageSwitcher] = useState<Boolean>(false);
  const [loaderStatus, setLoaderStatus] = useState<Boolean>(false);

  const GetUserProfileFromDB=()=>{
    
    GetUserProfile("profile","")
    .then((_data)=>{
      if(_data.length>0){
       
        setLoaderStatus(true);
      }else{
        setLoaderStatus(false);
      }

      setPageSwitcher(true);
    })
    .catch((_error)=>{

    });

  };


  const HandleCheckUserRegistration=useCallback(()=>{

    setTimeout(() => {
      GetUserProfileFromDB();
    }, 7000);

  },[]);

  useEffect(()=>{
    HandleCheckUserRegistration();

  },[HandleCheckUserRegistration]);


  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {(!pageSwitcher) ? (
        <Stack.Screen name="LoaderScreen" component={LoaderScreen} />
      ) : (loaderStatus ? (
        <Stack.Screen name="HomeStack" component={HomeStack} />
      ) : (
        <>
          <Stack.Screen name="SliderScreen" component={SliderScreen} />
          <Stack.Screen name="UserProfileRegistration" component={UserProfileRegistration} />
          <Stack.Screen name="HomeStack" component={HomeStack} />
        </>
      )

      )
      }
    </Stack.Navigator >
  );
}

export default MainRouteNavigation;

const styles = StyleSheet.create({});