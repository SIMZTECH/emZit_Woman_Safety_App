/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-quotes */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import {
  Alert, Dimensions, Image, LogBox, Pressable, SafeAreaView, StyleSheet,
  Text, TouchableOpacity, View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { friend, imageMap} from '../../../assets/imgaes/UIDesign/OtherImages';
import { AppContext } from '../../../global/GlobalState';
import useBLE from '../../useBLe';
import CardMenu from './CardMenu';

  const {width,height} = Dimensions.get('screen');
  LogBox.ignoreLogs(['new NativeEventEmitter']);

  const App = ({navigation}) => {
    const {getDeviceInfor,requestPermissions}=useBLE();

    // get global state data
    const {
          isDeviceConnected,
          messageData,
    } = useContext(AppContext);

    const Navigation = useNavigation();

    useLayoutEffect(()=>{
      Navigation.setOptions({
        headerShown:false,
      })

    });

    const DeviceInformation = useCallback(()=>{
      getDeviceInfor();

    },[getDeviceInfor]);

    // use effect
    useEffect(() => {
      DeviceInformation();

    },[DeviceInformation,messageData]);

    const handleMenuCardPressed=(args:String)=>{
      if (args === 'map'){
        navigation.navigate('Map');
      } else {
        navigation.navigate('BlueToothScreen');
      }
    };


    return (
      <SafeAreaView
        className=" bg-[#eff2fa] relative flex-1"
        style={[styles.SafeAreaViewContainer, { width: width, height: height }]}>
        <View
          className="px-8 pt-5 pb-1 flex-row justify-between bg-white shadow-md">
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Ionicons name="menu" color="#f00100" size={40} />
          </TouchableOpacity>

          <View className="flex-row items-center justify-center space-x-2">
            <FontAwesome5 name='heartbeat' size={20} color={'#ff6c6c'} />
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
          <Text className="text-[32px] text-black font-semibold text-center w-[80%]">
            Emergency help needed?
          </Text>
          <Text className="b text-[14px] text-[#b4b7c2] mt-2">just press on the button to call</Text>
          <View className={`w-[170px] h-[170px] bg-[#f00100] rounded-full border-[6px] ${isDeviceConnected ? 'border-[#0a883f]' : 'border-[#b4b7c2]'} mt-6 mb-1 items-center justify-center`} >
            <MaterialCommunityIcons name="access-point" size={54} color="white" />
          </View>
          <Text className='b mb-4 bg-[#f00100] px-2 items-center rounded-sm text-white mt-2 font-medium shadow-md'>{messageData}</Text>
          <Text className="text-[20px] font-semibold text-black">Not sure what to do?</Text>
          <Text className="text-[14px] text-[#b4b7c2] mt-2">Read the guide</Text>
        </View>

        <View className='px-2 flex-row justify-between absolute bottom-3'
          style={[styles.cardMenuContainer, { width: width }]}>

          <CardMenu
            deviceStatus={isDeviceConnected}
            args={"esp32"}
            operation={((param: String) => {
              handleMenuCardPressed(param);
            })} />

          <CardMenu
            deviceStatus={isDeviceConnected}
            args={"device_status"}
            operation={((param: String) => {
              return 
            })} />

          <CardMenu
            deviceStatus={isDeviceConnected}
            args={"map"}
            operation={((param: String) => {
              handleMenuCardPressed(param);
            })} />
        
        </View>

      </SafeAreaView>
    );
  };

  export default App;

const styles = StyleSheet.create({
  SafeAreaViewContainer: {

  },
  cardMenuContainer: {

  }
});
