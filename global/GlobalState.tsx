/* eslint-disable prettier/prettier */
import React from 'react';
import { Device } from 'react-native-ble-plx';

export const AppContext=React.createContext();

export const GlobalStateProvider=({children})=>{
    const [isDeviceConnected,setIsDeviceConnected]= React.useState<Boolean>(false);
    const [userData,setUserData]= React.useState([]);
    const [totalUserContacts,setTotalUserContacts]= React.useState<number>(0);
    const [locationPermission,SetLocationPermission]= React.useState<Boolean>(false);
    const [bluetoothPermission,SetBluetoothPermission]= React.useState<Boolean>(false);
    const [connectedDevice,setConnectedDevice] = React.useState<Device>();
    const [availableBluetoothDevices,setAvailableBluetoothDevices] = React.useState<Device[]>([]);
    const [messageData,setMessageData] = React.useState<string>('no data');
    const [deviceInformation,setDeviceInformation] = React.useState();
    const [boxValue,setBoxValue] = React.useState<string>('no box value');

  return (
    <AppContext.Provider value={{
        isDeviceConnected,setIsDeviceConnected,
        userData,setUserData,
        totalUserContacts,setTotalUserContacts,
        locationPermission,SetLocationPermission,
        bluetoothPermission,SetBluetoothPermission,
        connectedDevice,setConnectedDevice,
        availableBluetoothDevices,setAvailableBluetoothDevices,
        messageData,setMessageData,
        boxValue,setBoxValue,
        deviceInformation,setDeviceInformation
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default {AppContext,GlobalStateProvider};
