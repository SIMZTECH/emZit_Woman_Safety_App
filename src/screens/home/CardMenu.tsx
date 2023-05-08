/* eslint-disable space-infix-ops */
/* eslint-disable jsx-quotes */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { imageMap } from '../../../assets/imgaes/UIDesign/OtherImages';

type propsMenu={
    deviceStatus:Boolean,
    args:String,
    operation:(pram:String)=>void,
};

const CardMenu = ({deviceStatus,args,operation}:propsMenu) => {
    return (
        <>
            {(args === 'esp32') &&
                <Pressable
                    onPress={() => operation(args)}
                    className='w-[32%] bg-white p-2 pt-3 rounded-md space-y-2 shadow-md h-31'
                >
                    <View className='b items-center'>
                        <Text className='text-[15px] text-[#b4b7c2] '>{deviceStatus ? 'Disconnect' : 'Connect'} to </Text>
                        <Text className='text-[#b4b7c2] text-[18px]'>BLE</Text>
                    </View>

                    <View className='flex-row justify-between'>
                        <MaterialCommunityIcons name='arrow-right-thin' color={'#f00100'} size={24} />
                        <Ionicons name='md-hardware-chip-sharp' color={'#b4b7c2'} size={24} />
                    </View>

                </Pressable>
            }

            {(args === 'device_status') &&
                <Pressable className='w-[32%] bg-white p-2 pt-3 rounded-md space-y-2 shadow-md h-31'>
                    <View className='b items-center'>
                        <Text className='text-[16px] text-[#b4b7c2] '>Status</Text>
                        <Text className='text-[#b4b7c2] text-[15px] '>
                            {deviceStatus ? 'Connected' : 'Disconnected'}
                        </Text>
                    </View>

                    <View className='flex-row justify-between'>
                        <MaterialCommunityIcons name='arrow-right-thin' color={'#f00100'} size={24} />
                        {deviceStatus ? (
                            <MaterialCommunityIcons name='access-point-network' color={'#b4b7c2'} size={24} />
                        ) : (
                            <MaterialCommunityIcons name='access-point-network-off' color={'#b4b7c2'} size={24} />
                        )
                        }
                    </View>
                </Pressable>
            }

            {(args === 'map') &&
                <Pressable
                    onPress={() =>operation(args)}
                    className='w-[32%] bg-white p-2 pt-3 rounded-md space-y-2 shadow-md h-31'>
                    <View className='items-center'>
                        <Text className='text-[17px] text-[#b4b7c2] '>Map</Text>
                    </View>
                    <View className='space-y-2 flex-1 items-center justify-center'>
                        <Image source={imageMap} className='w-full h-full object-contain' resizeMode='contain' />
                    </View>
                </Pressable>
            }
        </>
    )
}

export default CardMenu;

const styles = StyleSheet.create({});