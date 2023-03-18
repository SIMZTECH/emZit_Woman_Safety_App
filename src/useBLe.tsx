/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Platform, PermissionsAndroid} from 'react-native';
import { BleError, BleManager, Characteristic, Device } from 'react-native-ble-plx';
import {useState} from 'react';
import { atob } from 'react-native-quick-base64';

const SERVICE_UUID="8ccbd4e6-bd76-11ed-afa1-0242ac120002";
const DATA_CHARACTERISTIC_UUID="9d99dafc-bd76-11ed-afa1-0242ac120002";
const BOX_CHARACTERISTIC_UUID="222f72a8-bd78-11ed-afa1-0242ac120002";

/* eslint-disable prettier/prettier */
type PermissionCallback=(result:boolean)=>void;

const bleManager=new BleManager();

interface BluetoothLowEnergyApi{
    requestPermissions(callback:PermissionCallback):Promise<void>;
    connectToDevice(device:Device):Promise<void>;
    scanForDevices():void;
    // allDevices:Device[];
}

// const [allDevices,setAllDevices] = useState<Device[]>([]);

export default function useBLE():BluetoothLowEnergyApi{
    // const [allDevices,setAllDevices] = useState<Device[]>([]);
    // const[connectedDevice,setConnectedDevice]=useState<Device|null>(null);
    // const[streamedData,setStreamedData]=useState<number>(0);



    // request permissions method
    const requestPermissions = async(callback:PermissionCallback)=>{
        if(Platform.OS==='android'){
            const grantedStatus=await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title:'Location Permission',
                    message:'Bluetooth Low Energy Needs Location Permission',
                    buttonNegative:'cancel',
                    buttonPositive:'ok',
                    buttonNeutral:'Maybe Later'
                }
            );
            callback(grantedStatus === PermissionsAndroid.RESULTS.GRANTED);
        }else{
            callback(true);
        }
    };//end of request permission method

    // check for duplicates
    const isDuplicateDevice=(devices:Device[],nextDevice:Device)=>{
        return devices.findIndex((device)=>nextDevice.id === device.id) > -1;
    }

    // scan for devices
    const scanForDevices=()=>{
        bleManager.startDeviceScan(null, null, (error, device)=>{
            if(error){
                console.log(error);
            }

            if(device && device.name?.includes('ESP32-R')){
                console.log(Device.name)
                // setAllDevices(
                //     (prevState)=>{
                //     if (!isDuplicateDevice(prevState,device)){
                //         return [...prevState,device];
                //     }
                //     return prevState;
                // })
            }
        })
    };

    // connect to device
    const connectToDevice=async(device:Device)=>{
        try {
            const deviceConnection=await bleManager.connectToDevice(device.id);
            // setConnectedDevice(deviceConnection);
            bleManager.stopDeviceScan();
            await deviceConnection.discoverAllServicesAndCharacteristics();
            startStreamingData(device);
        } catch (error) {
            console.log('ERROR TO CONNECT', error);
        }
    }

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

    }

    const onStreamedDataUpdate=(error:BleError|null, characteristic:Characteristic|null)=>{
        if(error){
            console.log(error);
            return;
        }else if(!characteristic?.value){
            console.error('No Characteristic found');
            return;
        }

        const rawData=atob(characteristic.value);
        let data=-1;
        // return data(Number(rawData[1]))
    }

    return {
        requestPermissions,
        scanForDevices,
        connectToDevice,
        // allDevices,
    };
    
}
