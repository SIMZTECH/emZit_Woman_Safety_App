/* eslint-disable eqeqeq */
/* eslint-disable space-infix-ops */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState,useRef, useEffect } from 'react';
import { Image } from 'react-native';
import {heartRate} from '../../assets/imgaes/UIDesign/OtherImages';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { FlatList } from 'react-native-gesture-handler';
import SliderData from '../../assets/SliderData';
import SliderComponent from './SliderComponent';
import Pagination from './Pagination';
import useBLE from '../useBLe';
import { AppContext } from '../../global/GlobalState';

const {height,width} = Dimensions.get('screen');


const SliderScreen = ({navigation}) => {
    const {requestContactsPermissions,requestPermissions} = useBLE();
    const { setContactsPermission,
            SetLocationPermission,
            SetBluetoothPermission
    } = React.useContext(AppContext);

    const[sliderIndex,setSliderIndex]=useState<number>(0);
    const[disabledButton,setDisabledButton]=useState<boolean>(true);



    const handleOnViewableChange=useRef((viewableItems)=>{
        console.log(viewableItems.changed[0]);
        const {index} = viewableItems.changed[0]
        setSliderIndex(index);
    }).current;

    const viewableConfig=useRef({
        itemVisiblePercentThreshold:70,
    }).current;

    useEffect(() => {
        // handle permissions from here
        requestContactsPermissions((granted:boolean)=>{
            if (granted){
                setContactsPermission(granted);
            }
        });
    },[requestContactsPermissions, setContactsPermission]);
    

  return (
    <View
        style={[styles.container,{width:width, height:height}]}
        className='bg-white flex-1'
        >
            <View className='flex-row justify-between items-center px-4 pt-4'>
                <Image source={heartRate} className='w-12 h-12' />
                <TouchableOpacity
                onPress={()=>navigation.navigate('DrawerNavigation')}
                >
                    <Text className='text-[#f00100] font-normal text-[15px]'>SKIP</Text>
                </TouchableOpacity>
            </View>
            <View
                style={[styles.flatlist,{width:width,height:height}]}
                className='flex-1 mt-3 mb-2 px-2'>
                <FlatList 
                    data={SliderData} 
                    renderItem={(value)=><SliderComponent data={value}/>}
                    horizontal
                    pagingEnabled
                    snapToAlignment='center'
                    showsHorizontalScrollIndicator={false}
                    viewabilityConfig={viewableConfig}
                    onViewableItemsChanged={handleOnViewableChange}
                >
                </FlatList>
            </View>
            <View className='items-center space-y-6'>
                <View className='bg-[#eff0f4] flex-row p-0.5 rounded-md'>
                    {SliderData.map((value,index)=>{
                        return (<Pagination loopIndex={index}  sliderIndex={sliderIndex} key={index}/>);
                    })}
                </View>
                <View className={`border-[1.5px] w-14 h-14 mb-8 items-center justify-center rounded-2xl ${sliderIndex==5?'border-[#f00100]':'border-[#3c5a7d]'}  relative`}>
                    <TouchableOpacity 
                    disabled={sliderIndex==5?false:true}
                     onPress={()=>{
                        console.log('pressed');
                        navigation.navigate('DrawerNavigation');
                    }}
                    className={` w-12 h-12  ${sliderIndex==5?'bg-[#f00100]':'bg-[#eff2fa]'} items-center justify-center rounded-2xl `}>
                        <EvilIcons name='chevron-right' size={30} color={(sliderIndex==5)?'white':'#3c5a7d'}/>
                    </TouchableOpacity>
                    <Text className='absolute w-7 h-1.5 bg-white -top-1'></Text>
                    <Text className='absolute w-7 h-1.5 bg-white -bottom-1'></Text>
                    <Text className='absolute w-1.5 h-7 bg-white -left-1'></Text>
                    <Text className='absolute w-1.5 h-7 bg-white -right-1'></Text>
                </View>
            </View>
    </View>
  );
}

export default SliderScreen;

const styles = StyleSheet.create({
    container:{
    },
    flatlist:{ }
})