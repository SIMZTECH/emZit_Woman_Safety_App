/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line eslint-comments/no-unused-disable
// eslint-disable-next-line prettier/prettier
import React, { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { creatTable, dropTable,creatPermissionTable} from './src/database/SQLite_DB';
import { GlobalStateProvider,AppContext } from './global/GlobalState';
import MainRouteNavigation from './src/navigations/MainRouteNavigation';
import {enableLatestRenderer} from 'react-native-maps';
import { enableScreens } from 'react-native-screens';
import SMS from './src/screens/smsTesting/SMS';
enableScreens(false);


const App = () => {
  // enableLatestRenderer();

  const tableCreation = useCallback(() => {

    creatTable('contacts', '');
    creatPermissionTable('permissions', '');

  }, []);

  useEffect(() => {

    tableCreation();
    // dropTable('contacts','');
    // dropTable('permissions','');
  }, [tableCreation]);

  return (
    <GlobalStateProvider>
      <NavigationContainer>
        <MainRouteNavigation />
      </NavigationContainer>
      {/* <SMS /> */}
    </GlobalStateProvider>

  );
};

export default App;
