/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Alert, Pressable, StyleSheet, Text,View } from 'react-native';
import React, {useState } from 'react';
import { other } from '../../../assets/imgaes/UIDesign/OtherImages';
import { Image } from 'react-native-animatable';
import Entypo from 'react-native-vector-icons/Entypo'
import { AppContext } from '../../../global/GlobalState';

const SingleContactComponent= ({userData, navigation}) => {
  
    const {displayName,phoneNumbers,jobTitle,department,middleName,familyName} = userData.item;

    // code used for testing
    // try {
    //   const {displayName,phoneNumbers,jobTitle,department,middleName,familyName} = userData.item;
    //   const {number} = phoneNumbers[0];

    //   console.log(displayName+' '+number);
    // } catch (error) {
    //   console.log(error+'\t'+userData.item.displayName);
    //   console.log(userData.item.phoneNumbers[0]);
    // }

    
    // validate null phone number
    const validatedPhonenumber=(phoneNumbers[0]===undefined)?'delete this contact':phoneNumbers[0].number;

    const onPressedOption = ()=>{
        Alert.alert(
          'Privacy!',
          `Are you sure, you want to edit ${displayName} details`,
          [
            {text:'Yes', onPress:(()=>{
              // set Selected contact
              navigation.navigate('SelectedScreen',{data:userData.item});
            })},
            {text:'No', onPress:(()=>{return}) }
          ]
        );
        
      };

  return (
    <View className="flex-row px-4 items-center h-14 mb-3 border-b-[0.5px] border-b-[#fff]">
          <View className="b flex-row space-x-3 flex-1">
              <View className="w-10 h-10 rounded-full">
                  <Image
                      source={other}
                      className="w-full h-full object-contain"
                      resizeMode="contain"
                  />
              </View>
              <View>
                  <Text>{displayName}</Text>
                  <Text>{validatedPhonenumber}</Text>
              </View>
          </View>

          <Pressable 
            className=" items-end h-full justify-center px-3"
            onPress={onPressedOption}
          >
                <Entypo name="dots-three-vertical" size={24} color={'#b4b7c2'}/>
          </Pressable>
    </View>
  )
}
export default SingleContactComponent;

const styles = StyleSheet.create({});

