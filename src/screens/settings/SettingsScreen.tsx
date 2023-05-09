/* eslint-disable space-infix-ops */
/* eslint-disable prettier/prettier */
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View,ScrollView} from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { AppContext } from '../../../global/GlobalState';
import {GetPermissionsFromDatabse,UpdatePermissionsFromDatabse} from '../../database/SQLite_DB';
import {PermissionModel } from '../../database/Model';
import SingUp_Login_Button from './SingUp_Login_Button';
import Permissions_Button from '../home/Permissions_Button';

const SettingsScreen = () => {
  const[retrivedPermissions,setRetrievedPermissions]=React.useState<PermissionModel[]>([]);
  const Navigation=useNavigation();
  const[toggleleft,setToggleLeft]=useState<number>(0);
  const[toggleRight,setToggleRight]=useState<number>(6);
  const[toggleleftContactPermission,setToggleLeftContactPermission]=useState<number>(0);
  const[toggleRightContactPermission,setToggleRightContactPermission]=useState<number>(6);

  useLayoutEffect(()=>{
    Navigation.setOptions({
      headerShown:false,

    });

  });

  const getPermissionsFromDb=useCallback(()=>{
    GetPermissionsFromDatabse('permissions','')
    .then((value)=>{
      setRetrievedPermissions(value);
    });
  },[setRetrievedPermissions]);

  const searchPermision=(_permissionName:string)=>{
    const data=retrivedPermissions.find((value)=>value.permissionName===_permissionName);
    console.log(data)
    return (data.permissionState===1)?true:false;
  };

  const UpdatePermission=(_permissionName:string)=>{

    const data=retrivedPermissions.find((value)=>value.permissionName===_permissionName);

     const _dataForModification:PermissionModel={
      permissionID:(data)? data.permissionID:0,
      permissionName:_permissionName,
      permissionState:(data.permissionState===1)?false:true,
     };
    // update dpermision db
    UpdatePermissionsFromDatabse('permissions', _dataForModification,'');
    getPermissionsFromDb();

    console.log(_dataForModification);
  };

  useEffect(()=>{

    getPermissionsFromDb();

  },[getPermissionsFromDb]);

  const handleToggleBtnBluetoothPermission=()=>{

  };

  const handleToggleBtnContactPermission=()=>{
    Alert.alert(
      'Warning!!',
      `${searchPermision('contactsPermission')?'Are you sure you want to disable permission':'Are you sure you want to enable permission'}`,
      [
        {text:'ok', onPress:()=>UpdatePermission('contactsPermission')},
        {text:'cancel',onPress:()=>{return}}
      ]
    );
  };

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      className='px-5  bg-white'>
      {(retrivedPermissions.length > 0) ? (
        <View className='b pt-8 pb-8'>
          <Text className='text-[19px] font-medium text-[#f00100] mb-4'>Settings</Text>
          <View className=' space-y-2'>
            <Text className='text-[#ff6c6c] font-normal'>SECURITY</Text>

            <SingUp_Login_Button
              args={'google'}
              text={'Sign in with Google'}
              iconName={'md-logo-google'}
              operation={((args: String) => {
                console.log(args);
              })} />
            <SingUp_Login_Button
              args={'apple'}
              text={'Sign in with Apple'}
              iconName={'md-logo-apple'}
              operation={((args: String) => {
                console.log(args);
              })} />

          </View>

          <View className=' space-y-2 mt-5'>
            <Text className='text-[#ff6c6c] font-normal'>PERMISSIONS</Text>
            <Permissions_Button
              iconName={'md-location-outline'}
              text={'Allow Locations'}
              args={'location'}
              operation={((args: String) => {
                console.log(args);
              })} />

            <Permissions_Button
              iconName={'contacts'}
              text={'Allow Contacts'}
              args={'contacts'}
              operation={((args: String) => {
                console.log(args);
              })} />

            <Permissions_Button
              iconName={'envelope-open-text'}
              text={'Allow SMS'}
              args={'messages'}
              operation={((args: String) => {
                console.log(args);
              })} />

          </View>

          <View className=' space-y-2 mt-5'>
            <Text className='text-[#ff6c6c] font-normal'>REPLACEMENTS</Text>
            {/* Catch*/}
            <View className='flex-row h-10 bg-[#eff2fa] rounded-md items-center'>
              <View className='flex-row items-center pl-2 space-x-2 h-full'>
                <FontAwesome5 name='heartbeat' size={20} color={'#ff6c6c'} />
                <Text>Healthy replacement app </Text>
              </View>
              <View className='h-full flex items-end justify-center flex-1 pr-2'>
                <Ionicons name='chevron-forward' size={20} color={'#ff6c6c'} />
              </View>
            </View>

          </View>
          <View className=' space-y-2 mt-5'>
            <Text className='text-[#ff6c6c] font-normal'>ADVANCED</Text>
            <View className='flex-row h-10 bg-[#eff2fa] rounded-md items-center pl-2 space-x-2'>
              <FontAwesome5 name='cloud-download-alt' size={20} color={'#ff6c6c'} />
              <Text>Download user data</Text>
            </View>
          </View>
          <View className=' space-y-2 mt-5'>
            <Text className='text-[#ff6c6c] font-normal'>HELP</Text>

            <View className='flex-row h-10 bg-[#eff2fa] rounded-md items-center pl-2 space-x-2'>
              <FontAwesome5 name='question-circle' size={20} color={'#ff6c6c'} />
              <Text>FAQ</Text>
            </View>

            <View className='flex-row h-10 bg-[#eff2fa] rounded-md items-center pl-2 space-x-2'>
              <FontAwesome5 name='envelope-open-text' size={20} color={'#ff6c6c'} />
              <Text>Contact support</Text>
            </View>

            <View className='flex-row h-10 bg-[#eff2fa] rounded-md items-center pl-2 space-x-2'>
              <FontAwesome5 name='lock' size={20} color={'#ff6c6c'} />
              <Text>Our privacy policy </Text>
            </View>

          </View>

        </View>

      ) : (
        <View className="items-center mt-10 w-12 h-12 bg-[#eff2fa] justify-center rounded-full shadow-md self-center">
          <ActivityIndicator size={30} color={'#f00100'} />
        </View>
      )}

    </ScrollView>
  )
};

export default SettingsScreen;

const styles = StyleSheet.create({})