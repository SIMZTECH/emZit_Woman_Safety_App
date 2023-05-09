/* eslint-disable prettier/prettier */
import { Pressable, StyleSheet, Text,ActivityIndicator} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
type propsTypes={
    args:String,
    text:String,
    iconName:String,
    operation:(args:String)=>void,
}

const SingUp_Login_Button = ({operation,args,text,iconName}:propsTypes) => {
    const [loader,setLoader]=React.useState<Boolean>(false);
  return (
      <Pressable
          onPress={() => {
            operation(args);
            setLoader(true);

            setTimeout(() => {
                setLoader(false);
            },1000);
        }}
          className='flex-row items-center justify-center space-x-2 h-10 bg-[#f00100] rounded-md mt-2'
      >
          {loader ?
              (<ActivityIndicator size={24} color={'white'} />)
              : (
                  <>
                      <Ionicons name={`${iconName}`} size={15} color={'white'} />
                      <Text className='text-white text-[15px]'>{text}</Text>
                  </>
              )
          }
      </Pressable>
  )
}

export default SingUp_Login_Button;

const styles = StyleSheet.create({});