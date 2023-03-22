/* eslint-disable jsx-quotes */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useLayoutEffect, useState } from 'react';
import {
  Alert, Dimensions, Image, LogBox, Pressable, SafeAreaView, StyleSheet,
  Text, TouchableOpacity, View
} from 'react-native';
import base64 from 'react-native-base64';
import { BleError, BleManager, Characteristic, Device } from 'react-native-ble-plx';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UUID from '../../../assets/constants/UUID';
import { friend, imageMap } from '../../../assets/imgaes/UIDesign/OtherImages';
import useBLE from '../../useBLe';
import { AppContext } from '../../../global/GlobalState';

  const {BOX_CHARACTERISTIC_UUID,DATA_CHARACTERISTIC_UUID,SERVICE_UUID} = UUID;
  const bleManager = new BleManager();

  const {width,height} = Dimensions.get('screen');



  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {requestPermissions,connectToDevice} = useBLE();

  LogBox.ignoreLogs(['new NativeEventEmitter']);

  const App = ({navigation}) => {
    /*my initiative code added*/
    const [connectedDevices,setConnectedDevice] = useState<Device|null>(null);
    const [allDevices,setAllDevices] = useState<Device[]>([]);
    const [messageData,setMessageData] = useState('Low');
    const [boxValue,setBoxValue] = useState<Boolean>(false);
    // get global state data
    const{isDeviceConnected,setIsDeviceConnected}=useContext(AppContext);

    const Navigation=useNavigation();

    useLayoutEffect(()=>{
      Navigation.setOptions({
        headerShown:false,
      })

    });

     // check for duplicates
    const isDuplicateDevice = (devices:Device[],nextDevice:Device)=>{
      return devices.findIndex((device)=>nextDevice.id === device.id) > -1;
   };

    // scan for devices
    const scanForDevices = ()=>{
      bleManager.startDeviceScan(null, null, (error, device)=>{
          if (error){
              console.log(error);
          }

          if (device && device.name?.includes('ESP32-R')){
              console.log(Device?.name);
              setAllDevices(
                  (prevState)=>{
                  if (!isDuplicateDevice(prevState,device)){
                      return [...prevState,device];
                  }
                  return prevState;
              });
          }
      });
    };

    // connect to device
    const connectToDevice = async(device:Device)=>{
      try {
          const deviceConnection = await bleManager.connectToDevice(device.id);
          setConnectedDevice(deviceConnection);
          bleManager.stopDeviceScan();
          await deviceConnection.discoverAllServicesAndCharacteristics();
          startStreamingData(device);
      } catch (error) {
          console.log('ERROR TO CONNECT', error);
      }
    };

      // streaming the data
      const startStreamingData = async(device:Device)=>{
        if (device){
            device.monitorCharacteristicForService(
                SERVICE_UUID,DATA_CHARACTERISTIC_UUID,
                onStreamedDataUpdate,
            );

        } else {
            console.log('NO DEVICE CONNECTED');
        }
    };

    const onStreamedDataUpdate = (error:BleError|null, characteristic:Characteristic|null)=>{
        if (error){
            console.log(error);
            return;
        } else if (!characteristic?.value){
            console.error('No Characteristic found');
            return;
        }
        setMessageData(base64.decode(characteristic?.value));
    };

    const handleConnect = ()=>{
      allDevices.map((device)=>{
        if (device.name === 'ESP32-R'){
          connectToDevice(device);
          console.log(device);
        }
      });
    };

    /*my initiative code added**/

    // const openModal = async()=>{
    //   requestPermissions((isGranted:boolean)=>{
    //     Alert.alert('Android Permission is granted?' + isGranted);
    //     if (isGranted){
    //       scanForDevices();
    //     }
    //   });
    // };

    /* new code*/
    const handleOnPressConnect=()=>{
      // setIsModalVisible(!isModalVisible);
      navigation.navigate('BlueToothScreen');

    }
     
    /* new code*/

    return (
      <SafeAreaView
      className=" bg-[#eff2fa] relative flex-1"
      style={[styles.SafeAreaViewContainer,{width:width,height:height}]}>
        <View
          className="px-8 pt-5 pb-1 flex-row justify-between bg-white rounded-bl-[20px] rounded-br-[20px]">
           <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
            <Ionicons name="menu" color="#f00100" size={40}/>
           </TouchableOpacity>
          
          <View className="flex-row items-center justify-center space-x-2">
            <AntDesign name="heart" size={17} color="#f00100"/>
            <Text className="text-[20px] text-[#c3c6d3]">Emergency<Text className="text-[#f00100] font-bold">App</Text></Text>
          </View>

          <View className="w-10 h-10 bg-blue-400 border-[2px] border-[#f00100] rounded-full overflow-hidden">
            <Image
              source={friend}
              className="object-contain h-full w-full"
            />
          </View>
        </View>

        <View className="items-center pt-12">
          <Text
            className="text-[32px] text-black font-semibold text-center w-[80%]"
          >
            Emergency help needed?
          </Text>
          <Text className="b text-[14px] text-[#b4b7c2] mt-2">just press on the button to call</Text>
          <View
            className={`w-[170px] h-[170px] bg-[#f00100] rounded-full border-[6px] ${isDeviceConnected?'border-[#0a883f]':'border-[#b4b7c2]'} mt-6 mb-10 items-center justify-center`}
          >
              <MaterialCommunityIcons name="access-point" size={54} color="white"/>
          </View>
          <Text className="b text-[20px] font-semibold text-black">Not sure what to do?</Text>
          <Text className="b text-[14px] text-[#b4b7c2] mt-2">Read the guide</Text>
        </View>

        <View className='px-2 flex-row justify-between mt-10'
        style={[styles.cardMenuContainer,{width:width}]}>
          {/* connect to BLE*/}
          <Pressable 
            onPress={handleOnPressConnect}
            className='w-[32%] bg-white p-2 pt-3 rounded-md space-y-2 shadow-md h-31'
          >
            <View className='b items-center'>
              <Text className='text-[16px] text-[#b4b7c2] '>Connect to </Text>
              <Text className='text-[#b4b7c2] text-[18px]'>BLE</Text>
            </View>
            <View className='flex-row justify-between'> 
              <MaterialCommunityIcons name='arrow-right-thin' color={'#f00100'} size={24}/>
              <Ionicons name='md-hardware-chip-sharp' color={'#b4b7c2'} size={24}/>
            </View>
          </Pressable>
          {/* card 2 */}
          <Pressable className='w-[32%] bg-white p-2 pt-3 rounded-md space-y-2 shadow-md h-31'>
            <View className='b items-center'>
              <Text className='text-[16px] text-[#b4b7c2] '>Status</Text>
              <Text className='text-[#b4b7c2] text-[15px] '>
                {isDeviceConnected?'Connected':'Disconnected'}
              </Text>
            </View>
            <View className='flex-row justify-between'> 
              <MaterialCommunityIcons name='arrow-right-thin' color={'#f00100'} size={24}/>
              {isDeviceConnected?(
                  <MaterialCommunityIcons name='access-point-network' color={'#b4b7c2'} size={24}/>
                  ):(
                    <MaterialCommunityIcons name='access-point-network-off' color={'#b4b7c2'} size={24}/>
                  )
              }

            </View>
          </Pressable>

          {/* card 3 */}
          <Pressable 
            onPress={()=>navigation.navigate("Map")}
            className='w-[32%] bg-white p-2 pt-3 rounded-md space-y-2 shadow-md h-31'>
            <View className='items-center'>
              <Text className='text-[17px] text-[#b4b7c2] '>Map</Text>
            </View>
            <View className='space-y-2 flex-1 items-center justify-center'> 
              <Image source={imageMap}
              className='w-full h-full object-contain'
              resizeMode='contain'/>
            </View>
          </Pressable>

        </View>

      </SafeAreaView>
    );
  };

  export default App;

  const styles = StyleSheet.create({
    SafeAreaViewContainer:{
      
    },
    cardMenuContainer:{

    }
  });
