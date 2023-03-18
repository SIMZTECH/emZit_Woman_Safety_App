/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import 'react-native-gesture-handler';
import { StyleSheet} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigationRoute from './src/navigations/TabNavigationRoute';
import DrawerNavigation from './src/navigations/DrawerNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  )
};

export default App;

const styles = StyleSheet.create({});