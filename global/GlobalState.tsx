/* eslint-disable prettier/prettier */
import React from 'react';

export const AppContext=React.createContext();

export const GlobalStateProvider=({children})=>{
    const [isDeviceConnected,setIsDeviceConnected]= React.useState<Boolean>(false);
    const [userData,setUserData]= React.useState([]);
    const [totalUserContacts,setTotalUserContacts]= React.useState<number>(0);
    const [locationPermission,SetLocationPermission]= React.useState<Boolean>(false);
    const [bluetoothPermission,SetBluetoothPermission]= React.useState<Boolean>(false);

  return (
    <AppContext.Provider value={{
        isDeviceConnected,setIsDeviceConnected,
        userData,setUserData,
        totalUserContacts,setTotalUserContacts,
        locationPermission,SetLocationPermission,
        bluetoothPermission,SetBluetoothPermission
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default {AppContext,GlobalStateProvider};
