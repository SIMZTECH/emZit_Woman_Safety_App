/* eslint-disable prettier/prettier */
import React from 'react';
import { Device } from 'react-native-ble-plx';
import {Contact} from 'react-native-contacts';
import { ContactsModelModified } from '../src/database/Model';

type contextStates={
  isDeviceConnected:Boolean,
  userData:any,
  totalUserContacts:number,
  locationPermission:Boolean,
  contactsPermission:Boolean,
  locationCoordination:any,
  bluetoothPermission:Boolean,
  connectedDevice:Device,
  availableBluetoothDevices:Device[],
  messageData:string,
  singleContactDetails:Contact[],
  deviceInformation:any,
  smsPermissions:Boolean,
  currentRoute:string

};

export const AppContext=React.createContext();

export const GlobalStateProvider=({children})=>{

    const [isDeviceConnected,setIsDeviceConnected] = React.useState<Boolean>(false);
    const [userData,setUserData]= React.useState([]);
    const [totalUserContacts,setTotalUserContacts] = React.useState<number>(0);
    const [locationPermission,setLocationPermission] = React.useState<Boolean>(false);
    const [contactsPermission,setContactsPermission] = React.useState<Boolean>(false);
    const [locationCoordination,SetLocationCoordination] = React.useState(null);
    const [bluetoothPermission,SetBluetoothPermission] = React.useState<Boolean>(false);
    const [smsPermissions,setSmsPermissions] = React.useState<Boolean>(false);
    const [connectedDevice,setConnectedDevice] = React.useState<Device>();
    const [availableBluetoothDevices,setAvailableBluetoothDevices] = React.useState<Device[]>([]);
    const [messageData,setMessageData] = React.useState<string>('nothing');
    const [singleContactDetails,setSingleContactDetails] = React.useState<Contact[]>([]);
    const [deviceInformation,setDeviceInformation] = React.useState();
    const [boxValue,setBoxValue] = React.useState<number>(0);
    const [currentRoute,setCurrentRoute] = React.useState<string>('');
    const [priorityContacts,setPriorityContacts] = React.useState<ContactsModelModified[]>([]);
    const [allUserContacts,setAllUserContacts]=React.useState<Contact[]>([]);
    const [renderKey,setRenderKey]=React.useState<number>(0);

  return (
    <AppContext.Provider value={{
        isDeviceConnected,setIsDeviceConnected,
        userData,setUserData,
        totalUserContacts,setTotalUserContacts,
        locationPermission,setLocationPermission,
        bluetoothPermission,SetBluetoothPermission,
        connectedDevice,setConnectedDevice,
        availableBluetoothDevices,setAvailableBluetoothDevices,
        messageData,setMessageData,
        locationCoordination,SetLocationCoordination,
        boxValue,setBoxValue,
        deviceInformation,setDeviceInformation,
        contactsPermission,setContactsPermission,
        singleContactDetails,setSingleContactDetails,
        smsPermissions,setSmsPermissions,
        currentRoute,setCurrentRoute,
        priorityContacts,setPriorityContacts,
        allUserContacts,setAllUserContacts,  
        renderKey,setRenderKey
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default {AppContext,GlobalStateProvider};
