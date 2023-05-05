/* eslint-disable quotes */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable space-infix-ops */
/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View,SafeAreaView, ActivityIndicator, Pressable, Alert} from 'react-native';
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { AppContext } from '../../../global/GlobalState';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import BlueToothDevice from './BlueToothDevice';
import useBLE from '../../useBLe';


// remove indicator global scope
const handleRemoveLoader=(status:Boolean, time:number,method:Function)=>{
    setTimeout(() => {
      method(status);
    },time);
  }

const BlueToothScreen = () => {
    const{requestLocationPermissions,scanForDevices,bluetoothDeviceServices}=useBLE();

    const [internalLoader,setInternalLoader]= useState<Boolean>(false);
    const [mainlLoader,setMainLoader]= useState<Boolean>(true);
    const Navigation=useNavigation();

    const {
        isDeviceConnected, setIsDeviceConnected,
        availableBluetoothDevices, setAvailableBluetoothDevices,
        deviceInformation,
        SetBluetoothPermission,
    } = useContext(AppContext);

    useLayoutEffect(()=>{
        Navigation.setOptions({
            headerShown:false,
        })
    });

    const scanCallBack=useCallback(()=>{
        scanForDevices();
    },[scanForDevices]);

    useEffect(() => {

        // request permission
        requestLocationPermissions((isGranted: boolean) => {
            SetBluetoothPermission(isGranted);
        });

        // scan for devices
        scanCallBack();
    }, [SetBluetoothPermission, requestLocationPermissions, scanCallBack]);
    
    // console.log("Set:\t"+bluetoothPermission);
    if (availableBluetoothDevices?.length > 0) {
        console.log("set:\t" + availableBluetoothDevices[0].id + "\t" + availableBluetoothDevices[0].name);
    } else {

    };

   console.log(deviceInformation);

  return (
      <SafeAreaView className="bg-[#eff2fa] flex-1">
          <View className="b px-3 pt-3 pb-2 flex-row space-x-8 items-center border-b-[0.5px] border-[#c3c6d3]">
              <TouchableOpacity
                  onPress={() => Navigation.goBack()}
                  className="flex-row items-center">
                  <Entypo name="chevron-thin-left" size={25} color={'#f00100'} />
                  <Text className="text-[17px] text-[#f00100] font-medium">Back</Text>
              </TouchableOpacity>
              <Text className="text-[20px] font-medium text-black">Bluetooth</Text>
          </View>

          <View className="px-3">
              <View className="mt-8">
                  <Text className="text-black text-[18px]">Device name</Text>
                  <Text className="text-[#b4b7c2] text-[15px]">{deviceInformation}</Text>
              </View>

              <View className="flex-row justify-between pr-4 mt-3">
                  <Text className="text-[#f00100] text-[16px] font-medium">Available devices</Text>
                  <View>
                      {mainlLoader ? (
                          <ActivityIndicator size={24} color={'#f00100'} />
                      ) : (
                          <Ionicons color={'#f00100'} size={24} name="refresh" />
                      )
                      }
                  </View>
              </View>
              <View className="mt-3 flex-[50%] pb-3">
                  {(availableBluetoothDevices?.length > 0)?(
                      <Pressable
                          onPress={async () => {
                              bluetoothDeviceServices(availableBluetoothDevices[0]);
                              if (isDeviceConnected) {
                                  setInternalLoader(true);
                              } else {
                                  setInternalLoader(true);
                              }
                              handleRemoveLoader(false, 2000, setInternalLoader);
                          }}>
                          <BlueToothDevice
                              bleStatus={isDeviceConnected}
                              internalLoader={internalLoader}
                              data={availableBluetoothDevices[0]}
                              key={availableBluetoothDevices[0].id}
                          />
                      </Pressable>
                  ) : (
                      <Text className="mt-10"> NO AVAILABLE DEVICES </Text>
                  )
                  }
              </View>

              <View className="flex-row space-x-4">
                  <Ionicons name="information-circle-outline" size={25} color={'black'} />
                  <Text className="text-[#c3c6d3] text-[16px] flex-1">
                      When Bluetooth is turned on,
                      your device can communicate with other
                      nearby Bluetooth devices.
                  </Text>
              </View>
          </View>
      </SafeAreaView>
  )
}

export default BlueToothScreen;
