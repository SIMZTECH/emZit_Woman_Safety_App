/* eslint-disable quotes */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable space-infix-ops */
/* eslint-disable keyword-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
  // scan for devices
import { PermissionsAndroid, Platform} from 'react-native';
import React, { useContext } from 'react'
import { BleError, BleManager, Characteristic, Device} from 'react-native-ble-plx';
import base64 from 'react-native-base64';
import UUID from '../assets/constants/UUID';
import { AppContext } from '../global/GlobalState';

const {BOX_CHARACTERISTIC_UUID,DATA_CHARACTERISTIC_UUID,SERVICE_UUID} = UUID;

type PermissionCallback = (result: boolean) => void;

const bleManager = new BleManager();

// request permissions method
export const requestPermissions = async (callback: PermissionCallback) => {
    if (Platform.OS === 'android') {
        const grantedStatus = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'Bluetooth Low Energy Needs Location Permission',
                buttonNegative: 'cancel',
                buttonPositive: 'ok',
                buttonNeutral: 'Maybe Later'
            }
        );
        callback(grantedStatus === PermissionsAndroid.RESULTS.GRANTED);
    } else {
        callback(true);
    }
};//end of request permission method

// connect to device
export const connectToDevice = async(device: Device,_methode:Function) => {
    try {
        const deviceConnection = await bleManager.connectToDevice(device.id);
        _methode(deviceConnection);
        bleManager.stopDeviceScan();
        await deviceConnection.discoverAllServicesAndCharacteristics();
        startStreamingData(device);

        console.log("connected")
        
    } catch (error) {
        console.log('ERROR TO CONNECT', error);
    }
};

// scan
export const scanForDevices = (_method:Function) => {
    bleManager.startDeviceScan(null, null, (error, device) => {
        if (error) {
            console.log(error);
        }

        if(device && device.name?.includes('ESP32-R')) {
            console.log(Device?.name);
            _method(
                (prevState: Device[]) => {
                    if (!isDuplicateDevice(prevState, device)) {
                        return [...prevState, device];
                    }
                    return prevState;
                });
        }
    });
};

// streaming the data
export const startStreamingData = async (device: Device) => {
    if (device) {
        device.monitorCharacteristicForService(
            SERVICE_UUID, DATA_CHARACTERISTIC_UUID,
            onStreamedDataUpdate,
        );

    } else {
        console.log('NO DEVICE CONNECTED');
    }
};

export const onStreamedDataUpdate = (error: BleError | null, characteristic: Characteristic | null) => {
    const {   
        messageData,
        setMessageData,
    } = useContext(AppContext);

    if (error) {
        console.log(error);
        return;
    } else if (!characteristic?.value) {
        console.error('No Characteristic found');
        return;
    }
    setMessageData(base64.decode(characteristic?.value));
};

// check for duplicates
export const isDuplicateDevice = (devices: Device[], nextDevice: Device) => {
    return devices.findIndex((device) => nextDevice.id === device.id) > -1;
};

export default {onStreamedDataUpdate,startStreamingData,isDuplicateDevice,connectToDevice,requestPermissions};

  
  
  