/* eslint-disable prettier/prettier */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
type propsType={
    args:String,
    iconName:String,
    iconLeftPresent:Boolean,
    text:String,
    iconLeftName:String,
    title:String,
    operation:(args:String)=>void,
};

const Links_Button = ({args,iconName,iconLeftPresent=false,operation,text,iconLeftName,title}:propsType) => {
  return (
      <View
      className={`space-y-1 mt-1 ${(title==='HELP' || title==='')?'mb-1':'mb-1'}`}
      >
          {title &&<Text className='text-[#ff6c6c] font-normal'>{title}</Text>}
          <Pressable
              className='flex-row h-10 bg-[#eff2fa] rounded-md items-center'
              onPress={() => {
                  operation(args);
              }}>
              <View className='flex-row items-center pl-2 space-x-2 h-full'>
                  <FontAwesome5 name={`${iconName}`} size={20} color={'#ff6c6c'} />
                  <Text>{text}</Text>
              </View>
              {iconLeftPresent &&
                  <View className='h-full flex items-end justify-center flex-1 pr-2'>
                      <Ionicons name={`${iconLeftName}`} size={20} color={'#ff6c6c'} />
                  </View>
              }
          </Pressable>

      </View>
        
  )
}

export default Links_Button;

const styles = StyleSheet.create({});