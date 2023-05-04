/* eslint-disable prettier/prettier */
import { StyleSheet} from 'react-native';
import React, { useCallback, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import { SliderScreen } from '../pages/onBoardScreen/index';
import { PermissionModel } from '../database/Model';
import {GetPermissionsFromDatabse} from '../database/SQLite_DB';
import LoaderScreen from '../pages/indicatorScreen/LoaderScreen';

const Stack=createStackNavigator();

const MainRouteNavigation = () => {

  const [permissionsData,setPermissionsData]=React.useState<PermissionModel[]>([]);
  const [checker,setChecker]=React.useState<Boolean>(false);

  const handleRetriveData=useCallback(()=>{
    GetPermissionsFromDatabse('permissions','')
    .then((res)=>{

        setPermissionsData(res);
        setChecker(true);
    });
  },[]);

  useEffect(() => {
    handleRetriveData();
   
  }, [handleRetriveData])
  

  console.log(permissionsData);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {(checker) ? (
        (permissionsData.length > 0) ? (
          (permissionsData[0].permissionState && permissionsData[1].permissionState && permissionsData[2].permissionState) ? (
            <>
              <Stack.Screen name="DrawerNavigation" component={DrawerNavigation}/>
              <Stack.Screen name="SliderScreen" component={SliderScreen}/>
            </>
          ) : (
            <>
              <Stack.Screen name="SliderScreen" component={SliderScreen}/>
              <Stack.Screen name="DrawerNavigation" component={DrawerNavigation}/>
            </>
          )
        ) : (
            <>
              <Stack.Screen name="SliderScreen" component={SliderScreen} />
              <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
            </>
        )
      ) : (
        <>
          <Stack.Screen name="LoaderScreen" component={LoaderScreen}/>
        </>
        
      )
      }
    </Stack.Navigator>
  )
}

export default MainRouteNavigation;

const styles = StyleSheet.create({})