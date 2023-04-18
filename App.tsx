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


const App = () => {

  const tableCreation=useCallback(()=>{
    
    creatTable('contacts','');
    creatPermissionTable('permissions','');

  },[]);

  useEffect(()=>{

    tableCreation();
    // dropTable('contacts','');
    // dropTable('permissions','');
  },[tableCreation]);

  return (
    <GlobalStateProvider>
       <NavigationContainer>
          <MainRouteNavigation />
      </NavigationContainer>
    </GlobalStateProvider>
      
  );
};

export default App;
