/* eslint-disable prettier/prettier */
/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View,Dimensions, Image } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileDataRow from './ProfileDataRow';
import AlergiesRow from './AlergiesRow';
import {friend} from '../../../assets/imgaes/UIDesign/OtherImages';


const Profile = () => {
  const {width,height} = Dimensions.get('screen');

  const Navigation = useNavigation();
  useLayoutEffect(()=>{
    Navigation.setOptions({
      headerShown:false,
    });
  });

  return (
    <SafeAreaView
    className="bg-[#eff2fa] pt-8"
    style={[styles.SafeAreaViewContainer,{width:width,height:height}]}>
      {/* top section */}
      <View className="flex-row px-5 items-center justify-between">
        <View className="flex-row space-x-2 items-center">
          <View className="w-10 h-10 border-[#82b296] border-[1px] rounded-md items-center justify-center">
            <View className="w-8 h-8 bg-[#82b296] rounded-md" />
          </View>
          <View className="space-y-1">
            <Text className="text-[16px]">{'Hello Samson'}</Text>
            <Text className="text-[#f00100] font-medium">Complete Profile</Text>
          </View>
        </View>

        <View className="space-y-1">
          <View className="flex-row items-center">
            <Text className="flex-1 text-[16px]">Check map</Text>
            <FontAwesome name="map-marker" size={20} color="#f00100"/>
          </View>
          <Text className="text-[#f00100] font-medium">Complete Profile</Text>
        </View>
      </View>

      {/* bottom section */}
      <View className="bg-white flex-1 relative mt-10"
      style={[styles.absolutebox,{width:width}]}>
        {/* top nice design */}
        <View className="relative h-10 items-center ">
          <View className="absolute w-28 h-6 bg-white items-center justify-center -top-3 rounded-xl">
            <Text className="w-10 bg-[#eff2fa] h-1 rounded-md -top-1" />
          </View>
        </View>
        {/* second profile details */}
        <View className="px-6 flex-row space-x-2">
          <View className="space-y-2">
            <Text className="text-[#c3c6d3] tex-[13px]">Profile data</Text>
            <View className="flex-row space-x-1">
              <Entypo name="pie-chart" color={'#f00100'} size={20}/>
              <Text className="text-[#c3c6d3]">60%</Text>
            </View>
          </View>
          <View className="items-center flex-1 ">
            {/* profile pic */}
            <View className="w-[70px] h-[70px] bg-slate-400 rounded-full -ml-6">
              <Image source={friend}
              className="w-full h-full"
              resizeMode="contain"/>
            </View>
            <Text className="text-[24px] text-black font-medium mt-2 -ml-6">Samson Mumba</Text>
            <Text className="text-[14px] text-[#c3c6d3] -ml-6">14 January, 1998</Text>
          </View>
          <View className="flex-row space-x-1">
            <Text className="text-[#f00100] font-medium">Edit</Text>
            <MaterialCommunityIcons name="pencil" color={'#f00100'} size={20}/>
          </View>
        </View>
        {/* profile data section */}
        <View className="px-5 mt-5">
          <View>
            <ProfileDataRow
              valueLeft={28}
              valueRight={'ORh'}
              titleLeft={'Age'}
              titleRight={'Blood type'}
              iconNameLeft={'calendar'}
              iconNameRight={'blood-drop'}
              unitLeft={'years'}
              unitRight={'+'}           
            />

            <ProfileDataRow
              valueLeft={185}
              valueRight={85}
              titleLeft={'Height'}
              titleRight={'Weight'}
              iconNameLeft={'human-male-height'}
              iconNameRight={'weight'}
              unitLeft={'cm'}
              unitRight={' kg'}           
            />
          </View>
          <View className='pt-5'>
            <View className='items-center pb-4 space-y-1'>
              <Text className='text-[16px] text-black font-medium'>Allergies and reactions</Text>
              <Text className='text-[16px] text-[#c3c6d3]'>Food</Text>
            </View>
            <AlergiesRow 
              iconName={'fruit-grapes'}
              title={'Grape'}
              description={'Blocked nose'}
              color={'purple'} 
              borderSizeTop={1} 
              borderSizeBottom={1}                    
            />
             <AlergiesRow 
              iconName={'fruit-pineapple'}
              title={'Pineapple'}
              description={'Watering eyes'}
              color={'orange'} 
              borderSizeTop={undefined} 
              borderSizeBottom={undefined}            />
             <AlergiesRow 
              iconName={'fruit-cherries'}
              title={'Cherries'}
              description={'Rush'}
              color={'green'}
              borderSizeBottom={1} 
              borderSizeTop={1}            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;


const styles = StyleSheet.create({
  SafeAreaViewContainer:{

  },
  absolutebox:{

  },


});
