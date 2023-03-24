/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable keyword-spacing */
/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity, Alert, ToastAndroid} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InputContainer from '../../components/InputContainer';
import {Picker} from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';
import {saveToDatabse} from '../../database/SQLite_DB';

type dataToSave=[];

const AddContactScreen = () => {
    const[phoneNumber,setPhoneNumber]=useState<string>('');
    const [selectedLevel, setSelectedLevel] = useState<Boolean>(true);
    const [nameTitle, setNameTitle] = useState<string>('Mother');
    
    const AllUserData:dataToSave[]=[{   
        phone:phoneNumber,
        name:nameTitle,
        priority:selectedLevel
    }];
    
    const Navigation=useNavigation();
    useLayoutEffect(()=>{
        Navigation.setOptions({
            headerShown:false,
        })
    });

    useEffect(()=>{
        console.log(AllUserData);  
    });

    const onPressSave=async()=>{
        if(phoneNumber==''){
            Alert.alert('Invalid Input!','Phone number field cannot be empty');
            return;
        }else if(phoneNumber.length>10 || phoneNumber.length<10){
            Alert.alert('Invalid Input!', 'Phone number must have 10 numerical characters');
        }else{
            // save data
            saveToDatabse('contacts',AllUserData,'');
            ToastAndroid.show(`Contact added successfully +26 ${phoneNumber}`,ToastAndroid.SHORT);
            Navigation.goBack();
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
                  keyboardType={'numeric'}            
            />

            <View className='border-[0.5px] rounded-md border-[#f00100] mt-2 mb-2 flex-row items-center justify-between pl-3 bg-white shadow-md'>
                <Text className='font-medium text-[16px]'>Name title</Text>
                <Picker
                    style={{
                        width:'50%', 
                    }}
                    selectedValue={nameTitle}
                    onValueChange={(itemValue, itemIndex) =>
                        setNameTitle(itemValue)
                    }>
                    <Picker.Item label="Mother" value={'Mother'} />
                    <Picker.Item label="Father" value={'Father'} />
                    <Picker.Item label="Brother" value={'Brother'} />
                    <Picker.Item label="Sister" value={'Sister'} />
                    <Picker.Item label="Uncle" value={'Uncle'} />
                    <Picker.Item label="Auntie" value={'Auntie'} />
                    <Picker.Item label="Friend" value={'Friend'} />
                    <Picker.Item label="Other" value={'Other'} />
                </Picker>
            </View>

            <View className='b border-[0.5px] rounded-md border-[#f00100] mt-2 flex-row items-center justify-between pl-3 bg-white shadow-md'>
                <Text className='b font-medium text-[16px]'>Priority</Text>
                <Picker
                    style={{
                        width:'50%', 
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
            <TouchableOpacity onPress={onPressSave}>
                <Animatable.View 
                    animation={'pulse'} easing='ease-in' iterationCount={'infinite'}
                    className='b w-16 h-16 rounded-full items-center justify-center border-[1.5px] border-[#ff6c6c] bg-white'>
                    <View className='w-14 h-14 bg-[#ff6c6c] items-center justify-center rounded-full'>
                        <Text className='b text-white font-medium'>Save</Text>
                    </View>
                </Animatable.View>
            </TouchableOpacity>
        </View>

    </SafeAreaView>
  );
};

export default AddContactScreen;

const styles = StyleSheet.create({})