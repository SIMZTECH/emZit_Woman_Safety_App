/* eslint-disable prettier/prettier */
/* eslint-disable keyword-spacing */
/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity, Alert} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InputContainer from '../../components/InputContainer';
import {Picker} from '@react-native-picker/picker';

const AddContactScreen = () => {
    const[phoneNumber,setPhoneNumber]=useState<string>('');
    const[relativeName,setRelativeName]=useState<string>('');
    const [selectedLevel, setSelectedLevel] = useState<Boolean>(true);
    
    const Navigation=useNavigation();
    useLayoutEffect(()=>{
        Navigation.setOptions({
            headerShown:false,
        })
    });

    const onPressSave=()=>{
        if(phoneNumber==''||relativeName==''){
            Alert.alert('Enter all fields');
            return;
        }else{
            Alert.alert('Saved');
            Navigation.goBack(); //close screen

            // logic to save data in database fals here

        }
    };

  return (
    <SafeAreaView className='px-3 bg-[#eff2fa] flex-1'>
        <View className='pt-5 items-center flex-row space-x-10 pb-5'>
            <TouchableOpacity
            onPress={()=>Navigation.goBack()}
            className='flex-row items-center p-1'>
                <AntDesign name='left' size={24} color={'#f00100'}/>
                <Text className='text-[16px] text-[#f00100] font-medium'>Back</Text>
            </TouchableOpacity>
            <Text className='b text-[20px] font-medium text-black'>Add Contact</Text>
        </View>
        <View className='b '>
            <InputContainer 
                placeholder={'Enter phone Number eg 077,096,097'} 
                value={phoneNumber} 
                setValue={setPhoneNumber}            
            />

            <InputContainer 
                placeholder={'Enter name eg john doe'} 
                value={relativeName} 
                setValue={setRelativeName}            
            />

            <View className='b border-[0.5px] rounded-md border-[#f00100] mt-2 flex-row items-center justify-between pl-3 bg-white shadow-md'>
                <Text className='b font-medium text-[16px]'>Priority</Text>
                <Picker
                    style={{
                        width:'40%', 
                    }}
                    selectedValue={selectedLevel}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLevel(itemValue)
                    }>
                    <Picker.Item label="High" value={true} />
                    <Picker.Item label="Low" value={false} />
                </Picker>
            </View>
        </View>
        <View className='mt-16 items-center justify-center'>
            <TouchableOpacity 
            onPress={onPressSave}
            className='b w-16 h-16 rounded-full items-center justify-center border-[1px] border-[#ff6c6c]'>
                <View className='w-12 h-12 bg-[#ff6c6c] items-center justify-center rounded-full'>
                    <Text className='b text-white font-medium'>Save</Text>
                </View>
            </TouchableOpacity>
        </View>

    </SafeAreaView>
  );
};

export default AddContactScreen;

const styles = StyleSheet.create({})