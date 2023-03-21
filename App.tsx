/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line eslint-comments/no-unused-disable
// eslint-disable-next-line prettier/prettier
import 'react-native-gesture-handler';
import { StyleSheet} from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/navigations/DrawerNavigation';
import { creatTable,dropTable } from './src/database/SQLite_DB';

const App = () => {

  useEffect(()=>{
    creatTable('contacts','');
    // dropTable('contacts','');
  })

  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  )
};

export default App;

const styles = StyleSheet.create({});