/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
const{height,width} = Dimensions.get('screen');

const SliderComponent = ({data}) => {
    const {item} = data;

  return (
    <View 
    style={[styles.container,{height:height,width:width}]}
     className=''>
        <Animatable.View animation={'pulse'} easing={'ease-in'} iterationCount={'infinite'} 
        className='w-[350px] h-[350px]'>
            <Image 
              source={{uri:item.image}}
              resizeMode='contain'
              className='w-full h-full object-contain'
            />
        </Animatable.View>
        <Text className=' text-[#3c5a7d] text-center text-[20px] font-medium'>{item.title}  <MaterialCommunityIcons name={item.iconName} size={20} color='#3c5a7d'/></Text>
      <Text className='text-[16px] text-[#3c5a7d] px-5'>{item.description}</Text>
    </View>
  )
}

export default SliderComponent;

const styles = StyleSheet.create({
    container:{ }
})