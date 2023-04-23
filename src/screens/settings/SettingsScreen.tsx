/* eslint-disable space-infix-ops */
/* eslint-disable prettier/prettier */
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { AppContext } from '../../../global/GlobalState';
import {GetPermissionsFromDatabse,UpdatePermissionsFromDatabse} from '../../database/SQLite_DB';
import {PermissionModel } from '../../database/Model';

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
    <View className='px-5 pt-8 bg-white flex-1'>
      {(retrivedPermissions.length > 0) ? (
        <View>
          <Text className='text-[19px] font-medium text-[#f00100] mb-4'>Settings</Text>
          <View className=' space-y-2'>
            <Text className='text-[#ff6c6c] font-normal'>SECURITY</Text>
            <View className='flex-row items-center justify-center space-x-2 h-10 bg-[#f00100] rounded-md'>
              <Ionicons name='logo-google' size={15} color={'white'} />
              <Text className='text-white text-[15px]'>Sign in with Google</Text>
            </View>
          </View>

          <View className=' space-y-2 mt-5'>
            <Text className='text-[#ff6c6c] font-normal'>PERMISSIONS</Text>
            {/* 1 */}
            <View className='flex-row h-10 bg-[#eff2fa] rounded-md items-center'>
              <View className='flex-row items-center px-2 space-x-2'>
                <Ionicons name='md-location-outline' size={20} color={'#ff6c6c'} />
                <Text>Allow Location Access</Text>
              </View>
              {/* toggle */}
              <View className='h-full flex-1 items-end justify-center pr-3'>
                <Pressable
                  onPress={handleToggleBtnBluetoothPermission}
                  className='h-6 w-12 px-0.5 pt-0.5 pb-0.5 bg-orange-400 rounded-full bg-[#f00100] relative transition-all'>
                  <Text className={`h-full w-5 bg-white rounded-full left-6 transition`} />
                </Pressable>
              </View>
            </View>
            {/* 2 */}
            <View className="flex-row h-10 bg-[#eff2fa] rounded-md items-center">
              <View className='flex-row items-center px-2 space-x-2'>
                <AntDesign name='contacts' size={20} color={'#ff6c6c'} />
                <Text>Allow Contacts Access </Text>
              </View>
              {/* toggle */}
              <View className="h-full flex-1 items-end justify-center pr-3">
                <Pressable
                  onPress={handleToggleBtnContactPermission}
                  className='h-6 w-12 px-0.5 pt-0.5 pb-0.5 bg-orange-400 rounded-full bg-[#f00100] relative transition-all'>
                  <Text className={`h-full w-5 bg-white rounded-full left-${(searchPermision('contactsPermission'))?toggleRightContactPermission:toggleleftContactPermission} transition`} />
                </Pressable>
              </View>
            </View>
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

    </View>
  )
};

export default SettingsScreen;

const styles = StyleSheet.create({})