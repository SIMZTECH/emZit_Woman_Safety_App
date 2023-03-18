/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Dimensions, Platform, StyleSheet, Text, View,ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Modal from "react-native-modal";
import Entypo from 'react-native-vector-icons/Entypo';
import BlueToothDevice from './BlueToothDevice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const deviceWidth=Dimensions.get('window').width;
const deviceHeight=Platform.OS === "ios"
? Dimensions.get("window").height
: require("react-native-extra-dimensions-android").get(
    "REAL_WINDOW_HEIGHT"
  );


// remove indicator global scope
const handleRemoveLoader=(status:Boolean, time:number,method:Function)=>{
  setTimeout(() => {
    method(status);
  },time);
}


const ModalScreen = ({value,setValue}) => {
  const[isLoading,setIsLoading]=useState<Boolean>(true);
  const[isDeviceConnected,setIsDeviceConnected]=useState<Boolean>(false);
  const [internalLoader,setInternalLoader]= useState<Boolean>(false);
  /** */
  //remove global Loader in Modal
  handleRemoveLoader(false,10000,setIsLoading);

  // close modal method
  const onSwipeCloseModal=()=>{
    setValue(!value);
  }

  // handle button close modal
  const onPressChevronIcon=()=>{
    setValue(!value);
  }
  
  // handle connect/disconnect to BLE
  const OnPressedDescoveredDevice=()=>{
    if(isDeviceConnected){
      setIsDeviceConnected(false)
      // load the internal loader
      setInternalLoader(true);
    }

    if(!isDeviceConnected){
      setIsDeviceConnected(true)
      // load the internal loader
      setInternalLoader(true);
    }
     // remove internal loader
     handleRemoveLoader(false,2000,setInternalLoader);
  }

  /** */
  return (
    <Modal
    isVisible={value}
    coverScreen={true}
    deviceWidth={deviceWidth}
    deviceHeight={deviceHeight}
    hideModalContentWhileAnimating={true}
    onSwipeComplete={onSwipeCloseModal}
    swipeDirection={'left'}
    style={{
      margin:0,
    }}
    >
      <View
        className='flex-1 bg-[#eff2fa]'
      >
        {/* Bluetoth Device header */}
        <TouchableOpacity onPress={()=>{console.log('executing')}} >
          <View className='flex-row items-center pt-5 pb-2 px-3 space-x-2 border-b-[0.5px] border-[#c3c6d3]'>
              <Entypo name='chevron-thin-left' size={26} color={'#f00100'}/>
            <Text className='text-[19px] text-black font-medium'>Bluetooth</Text>
          </View>
        </TouchableOpacity>

        <View className='px-5'>
          <View className='mt-8'>
            <Text className='text-black text-[18px]'>Device name</Text>
            <Text className='text-[#b4b7c2] text-[15px]'>{'Infinix NOTE 7 Lite'}</Text>
          </View>

          <View className='flex-row justify-between pr-4 mt-3'>
            <Text className='text-[#f00100] text-[16px] font-medium'>Available devices</Text>
            {isLoading && <ActivityIndicator color={'#f00100'} size={20}/>
              // remove indicator
            }
          </View>
        </View>
        <View className='px-5 pt-6 h-[350px] w-[100%]'>
          {/* bluetooth component */}
          <BlueToothDevice 
            bleStatus={isDeviceConnected}
            onPress={OnPressedDescoveredDevice} 
            internalLoader={internalLoader}          />
        </View>
          {/* Desclaimer */}
        <View className='flex-1 flex-row px-5 space-x-4'
        >
          <Ionicons name='information-circle-outline' size={25} color={'black'}/>
          <Text className='text-[#c3c6d3] text-[16px] flex-1'>
            When Bluetooth is turned on, 
            your device can communicate with other 
            nearby Bluetooth devices.
          </Text>
        </View>
      </View>
    </Modal>
  )
}

export default ModalScreen;

const styles = StyleSheet.create({
  modal:{

  }
})