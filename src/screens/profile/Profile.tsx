/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View,Dimensions, Image, ScrollView } from 'react-native';
import React, { useContext, useLayoutEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileDataRow from './ProfileDataRow';
import AlergiesRow from './AlergiesRow';
import {friend} from '../../../assets/imgaes/UIDesign/OtherImages';
import Pie from 'react-native-pie';
import { AppContext } from '../../../global/GlobalState';
import { ProfileModel } from '../../database/Model';

type propsContext={
  userProfile:ProfileModel[],
}


const Profile = () => {
  const {width,height} = Dimensions.get('screen');
  const [profileData,seProfileData] = React.useState();
  const {
    userProfile
  }: propsContext = useContext(AppContext);

  const Navigation = useNavigation();
  useLayoutEffect(()=>{
    Navigation.setOptions({
      headerShown:false,
    });
  });

  const dateFormat=(_Object:ProfileModel[],_index:number)=>{
    let value =_Object[0].dateOfBirth.split(" ");
    return value[value.length-_index];
  }

  return (
    <ScrollView
    className="bg-[#eff2fa] pt-8"
    style={[styles.SafeAreaViewContainer,{width:width,height:height}]}>
      {/* top section */}
      <View className="flex-row px-5 items-center justify-between">
        <View className="flex-row space-x-2 items-center">
          <View className="w-10 h-10 border-[#82b296] border-[1px] rounded-md items-center justify-center">
            <View className="w-8 h-8 bg-[#82b296] rounded-md" />
          </View>
          <View className="space-y-1">
            <Text className="text-[16px]">Hi, {userProfile[0].firstName.toUpperCase()}</Text>
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
      <View className="bg-white flex-1 relative mt-4"
        style={[styles.absolutebox, { width: width }]}>
        <View className="relative h-10 items-center ">
          <View className="absolute w-28 h-6 bg-white items-center justify-center -top-3 rounded-xl">
            <Text className="w-10 bg-[#eff2fa] h-1 rounded-md -top-1" />
          </View>
        </View>

        <View className="px-5 pb-1">
          <View className='b justify-between flex-row'>
            <Text className="text-[#c3c6d3] tex-[15px]">Profile data</Text>
            <View className="flex-row space-x-1">
              <Text className="text-[#f00100] font-medium tex-[14px]">Edit</Text>
              <MaterialCommunityIcons name="pencil" color={'#f00100'} size={20} />
            </View>
          </View>

          <View className='b flex-row'>
            <View className="items-center justify-center relative w-16 h-16">
              <Pie
                radius={20}
                innerRadius={15}
                sections={[
                  {
                    percentage: 80,
                    color: '#82b296',
                  },
                ]}
                backgroundColor="#eff2fa"
              />
              <Text className="text-[#f00100] absolute text-[13px] font-medium">80%</Text>
            </View>
            <View className="items-center flex-1 -ml-14">
              <View className="w-[70px] h-[70px] rounded-full -ml-6">
                <Image source={friend}
                  className="w-full h-full"
                  resizeMode="contain" />
              </View>
              <Text className="text-[20px] text-black font-medium mt-2 -ml-6">{userProfile[0].firstName.toUpperCase() + " " + userProfile[0].lastName.toUpperCase()}</Text>
              <Text className="text-[16px] text-[#c3c6d3] -ml-6">{dateFormat(userProfile,6)+"" + dateFormat(userProfile,5)+" " + dateFormat(userProfile,4) + "," +dateFormat(userProfile,3)}</Text>
            </View>
          </View>
        </View>

        {/* profile data section */}
        <View className="px-5 mt-2">
          <View>
            <ProfileDataRow
              valueLeft={userProfile[0].userAge}
              valueRight={`${userProfile[0].bloodGroup} Rh`}
              titleLeft={'Age'}
              titleRight={'Blood type'}
              iconNameLeft={'calendar'}
              iconNameRight={'blood-drop'}
              unitLeft={'years'}
              unitRight={'+'}           
            />

            <ProfileDataRow
              valueLeft={userProfile[0].height}
              valueRight={userProfile[0].weight}
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
              borderSizeTop={1} 
              borderSizeBottom={undefined}
            />
             <AlergiesRow 
              iconName={'fruit-cherries'}
              title={'Cherries'}
              description={'Rush'}
              color={'green'}
              borderSizeTop={1} 
              borderSizeBottom={0.5}            
            />
          </View>
        </View>

      </View>

    </ScrollView>
  );
};

export default Profile;


const styles = StyleSheet.create({
  SafeAreaViewContainer:{

  },
  absolutebox:{

  },


});
