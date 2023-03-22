/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line eslint-comments/no-unused-disable
// eslint-disable-next-line prettier/prettier
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { creatTable } from './src/database/SQLite_DB';
import DrawerNavigation from './src/navigations/DrawerNavigation';
import { GlobalStateProvider,AppContext } from './global/GlobalState';

const App = () => {

  useEffect(()=>{
    creatTable('contacts','');
    // dropTable('contacts','');
  })

  return (
    <GlobalStateProvider>
       <NavigationContainer>
          <DrawerNavigation />
      </NavigationContainer>
    </GlobalStateProvider>
      
  );
};

export default App;
