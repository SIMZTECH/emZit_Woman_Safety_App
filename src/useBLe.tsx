/* eslint-disable space-infix-ops */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Platform, PermissionsAndroid, Alert} from 'react-native';
import { BleError, BleManager, Characteristic, Device } from 'react-native-ble-plx';
import {useState, useContext} from 'react';
import { atob } from 'react-native-quick-base64';
import base64 from 'react-native-base64';
import { AppContext } from '../global/GlobalState';
import DeviceInfo from 'react-native-device-info';

const SERVICE_UUID="8ccbd4e6-bd76-11ed-afa1-0242ac120002";
const DATA_CHARACTERISTIC_UUID="9d99dafc-bd76-11ed-afa1-0242ac120002";
const BOX_CHARACTERISTIC_UUID="222f72a8-bd78-11ed-afa1-0242ac120002";

/* eslint-disable prettier/prettier */
type PermissionCallback=(result:boolean)=>void;

const bleManager=new BleManager();

interface BluetoothLowEnergyApi{
    requestPermissions(callback:PermissionCallback):Promise<void>;
    requestContactsPermissions(callback:PermissionCallback):Promise<void>;
    connectToDevice(device:Device):Promise<void>;
    scanForDevices():void;
    bluetoothDeviceServices(periperial:Device):void;
    allDevices:Device[];
    getDeviceInfor():void;
}

// const [allDevices,setAllDevices] = useState<Device[]>([]);

export default function useBLE():BluetoothLowEnergyApi{
    const [allDevices,setAllDevices] = useState<Device[]>([]);

    const{
        setIsDeviceConnected,
        isDeviceConnected,
        setMessageData,
        availableBluetoothDevices,
        setAvailableBluetoothDevices,
        setDeviceInformation,
    }=useContext(AppContext);

    // request permissions method
    const requestPermissions = async(callback:PermissionCallback)=>{
        if(Platform.OS==='android'){
            const grantedStatus=await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            callback(grantedStatus === PermissionsAndroid.RESULTS.GRANTED);

            console.log(grantedStatus);
        }else{
            callback(true);
        }
    };//end of request permission method

    const requestContactsPermissions=async(callback:PermissionCallback)=>{
        if(Platform.OS==='android'){
            const grantedStatus=await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
            callback(grantedStatus === PermissionsAndroid.RESULTS.GRANTED);
        }else{
            callback(true);
        }
    };//end of request permission method

    // check for duplicates
    const isDuplicateDevice=(devices:Device[],nextDevice:Device)=>{
        if(availableBluetoothDevices){
            return devices.findIndex((device)=>nextDevice.id === device.id) > -1;
        }
    };

    // scan for devices
    const scanForDevices=()=>{
        bleManager.startDeviceScan(null, null, (error, device)=>{
            if(error){
                if(isDeviceConnected){
                    console.log(error);
                    return;
                }else{
                    console.log(error);
                    Alert.alert('Opps!!',error.message);
                }
            }
            if(device && device.name?.includes('ESP32-R')){
                // console.log(device.name)
                setAvailableBluetoothDevices(
                    (prevState: Device[])=>{
                    if (!isDuplicateDevice(prevState,device)){
                        return [...prevState,device];
                    }
                    return prevState;
                })

            }
            // stop scanning
            bleManager.stopDeviceScan();
        })
    };

    // connect to device
    const connectToDevice=async(device:Device)=>{
        try {
            const deviceConnection=await bleManager.connectToDevice(device.id);
            // setConnectedDevice(deviceConnection);
            setIsDeviceConnected(true);//set connection status to true

            console.log(deviceConnection);

            bleManager.stopDeviceScan();

            await deviceConnection.discoverAllServicesAndCharacteristics();

            startStreamingData(device);

        } catch (error) {
            console.log('ERROR TO CONNECT', error);
        }
    };

    //
    const bluetoothDeviceServices =async(periperial:Device)=>{
        if(await periperial.isConnected()){
            // disconnect
            periperial.cancelConnection();
            setIsDeviceConnected(false)//set connection status to false

            setAvailableBluetoothDevices([]); //clear state
            // clear global state
            setMessageData('no data');

            console.log(`${periperial?.name}\t Disconnected Successfully`); 
        }else{
            // connect to device
            connectToDevice(periperial);
        }

    };

    // streaming the data
    const startStreamingData=async(device:Device)=>{
        if(device){
            device.monitorCharacteristicForService(
                SERVICE_UUID,DATA_CHARACTERISTIC_UUID,
                onStreamedDataUpdate,
            )

        }else{
            console.log("NO DEVICE CONNECTED");
        }

    };

    const onStreamedDataUpdate=(error:BleError|null, characteristic:Characteristic|null)=>{
        if(error){
            console.log(error);
            return;
        }else if(!characteristic?.value){
            console.error('No Characteristic found');
            return;
        }
        setMessageData(base64.decode(characteristic?.value));
        // const decodedValue=base64.decode(characteristic?.value);
        console.log(base64.decode(characteristic?.value));

        // console.log(parseFloat(decodedValue));
    };

    //read the phones devices
    const getDeviceInfor=async()=>{
        DeviceInfo.getDeviceName()
        .then((value)=>{
            setDeviceInformation(value);
        });
    };

    return {
        requestPermissions,
        scanForDevices,
        connectToDevice,
        allDevices,
        bluetoothDeviceServices,
        getDeviceInfor,
        requestContactsPermissions  
    };
};
