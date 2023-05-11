/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable space-infix-ops */
/* eslint-disable prettier/prettier */
import {Alert,StyleSheet, Text, View,ScrollView} from 'react-native';
import React, {useLayoutEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import SingUp_Login_Button from './SingUp_Login_Button';
import Permissions_Button from './Permissions_Button';
import Links_Button from './Links_Button';

const SettingsScreen = () => {

  const Navigation=useNavigation();

  useLayoutEffect(()=>{
    Navigation.setOptions({
      headerShown:false,

    });

  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className='px-5  bg-white'>

      <View className='b mt-2'>
        <Text className='text-[19px] font-medium text-[#f00100] mb-4'>Settings</Text>
        <View className=' space-y-1'>
          <Text className='text-[#ff6c6c] font-normal'>SECURITY</Text>

          <SingUp_Login_Button
            args={'google'}
            text={'Sign in with Google'}
            iconName={'md-logo-google'}
            operation={((args: String) => {
              console.log(args);
            })} />
        </View>

        <View className=' space-y-1 mt-3'>
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
          
          <Permissions_Button
            iconName={'phone-alt'}
            text={'Allow Phone Calls'}
            args={'phone'}
            operation={((args: String) => {
              console.log(args);
            })} />

        </View>

        <View
          className='b mt-2'>

          <Links_Button
            title={'REPLACEMENTS'}
            args={'other_apps'}
            iconName={'heartbeat'}
            iconLeftPresent={true}
            text={'Healthy replacement app '}
            iconLeftName={'chevron-forward'}
            operation={((args: String) => {
              console.log(args);
              Alert.alert("Warning!", "Redirecting to an External Source");
            })} />

          <Links_Button
            title={'ADVANCED'}
            args={'advanced'}
            iconName={'cloud-download-alt'}
            iconLeftPresent={false}
            text={'Download user data'}
            iconLeftName={''}
            operation={((args: String) => {
              console.log(args);
              Alert.alert("Warning!", "Redirecting to an External Source");
            })} />

          <Links_Button
            title={'HELP'}
            args={'help'}
            iconName={'question-circle'}
            iconLeftPresent={false}
            text={'FAQ'}
            iconLeftName={''}
            operation={((args: String) => {
              console.log(args);
              Alert.alert("Warning!", "Redirecting to an External Source");
            })} />

          <Links_Button
            title={''}
            args={'support'}
            iconName={'envelope-open-text'}
            iconLeftPresent={false}
            text={'Contact support'}
            iconLeftName={''}
            operation={((args: String) => {
              console.log(args);
              Alert.alert("Warning!", "Redirecting to an External Source");
            })} />

          <Links_Button
            title={''}
            args={'policy'}
            iconName={'lock'}
            iconLeftPresent={false}
            text={'Our privacy policy'}
            iconLeftName={''}
            operation={((args: String) => {
              console.log(args);
              Alert.alert("Warning!", "Redirecting to an External Source");
            })} />

        </View>

      </View>

    </ScrollView>
  )
};

export default SettingsScreen;

const styles = StyleSheet.create({})