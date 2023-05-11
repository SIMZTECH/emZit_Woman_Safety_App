/* eslint-disable prettier/prettier */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
type propsType={
    iconName:String,
    text:String,
    args:String,
    operation:(args:String)=>void,
};

const Permissions_Button = ({operation,iconName,text,args}:propsType) => {
  return (
      <View className='flex-row h-10 bg-[#eff2fa] rounded-md items-center mt-1 mb-1'>
          <View className='flex-row items-center px-2 space-x-2'>
              {(args==='location') && <Ionicons name={`${iconName}`} size={20} color={'#ff6c6c'} />}
              {(args==='contacts') && <AntDesign name={`${iconName}`} size={20} color={'#ff6c6c'} />}
              {(args==='messages') && <FontAwesome5 name={`${iconName}`} size={20} color={'#ff6c6c'} />}
              {(args==='phone') && <FontAwesome5 name={`${iconName}`} size={20} color={'#ff6c6c'} />}
              <Text>{text}</Text>
          </View>
          {/* toggle */}
          <View className='h-full flex-1 items-end justify-center pr-3'>
              <Pressable
                  onPress={()=>{
                    operation(args);
                  }}
                  className='h-6 w-12 px-0.5 pt-0.5 pb-0.5 bg-orange-400 rounded-full bg-[#f00100] relative transition-all'>
                  <Text className={`h-full w-5 bg-white rounded-full left-6 transition`} />
              </Pressable>
          </View>
      </View>
  )
}

export default Permissions_Button;

const styles = StyleSheet.create({});