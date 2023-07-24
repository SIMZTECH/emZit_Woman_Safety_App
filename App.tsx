/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line eslint-comments/no-unused-disable
// eslint-disable-next-line prettier/prettier
import React, { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { creatContactsTable,creatUserProfileTable, dropTable} from './src/database/SQLite_DB';
import { GlobalStateProvider,AppContext } from './global/GlobalState';
import MainRouteNavigation from './src/navigations/MainRouteNavigation';
import { enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';


enableScreens(false);


const App = () => {
  // enableLatestRenderer();

  const tableCreation = useCallback(() => {

    creatContactsTable('contacts', '');
    creatUserProfileTable('profile','');
    // creatPermissionTable('permissions', '');
  }, []);

  useEffect(() => {

    tableCreation();
    // dropTable('contacts','');
    // dropTable('permissions','');
    // dropTable('profile','');

    setTimeout(() => {
      SplashScreen.hide();
    },2000);
  }, [tableCreation]);

  

  return (
    <GlobalStateProvider>
      <NavigationContainer>
        <MainRouteNavigation />
      </NavigationContainer>
      {/* <SMS /> */}
      {/* <MakeCall /> */}
    </GlobalStateProvider>

  );
};

export default App;
