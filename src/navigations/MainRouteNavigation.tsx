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