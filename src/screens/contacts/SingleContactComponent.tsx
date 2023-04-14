/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { other } from '../../../assets/imgaes/UIDesign/OtherImages';
import { Image } from 'react-native-animatable';
import Entypo from 'react-native-vector-icons/Entypo'
import { AppContext } from '../../../global/GlobalState';

const SingleContactComponent= ({userData, navigation}) => {
    // context states
    const {
      setSingleContactDetails
    } = React.useContext(AppContext);
  
    const {displayName,phoneNumbers,jobTitle,department,middleName,familyName} = userData.item;
    const {number,label} = phoneNumbers[0];

    const handleSetUserContact=()=>{
      setSingleContactDetails(userData.item);
    };

    const onPressedOption = ()=>{
        // set Selected contact
        handleSetUserContact();
        Alert.alert(
          'Privacy!',
          `Are you sure, you want to edit ${displayName} details`,
          [
            {text:'Yes', onPress:(()=>{
            navigation.navigate('SelectedScreen');
            })},
            {text:'No', onPress:(()=>{return}) }
          ]
        );
      };

  return (
    <View className="flex-row px-4 items-center h-14 mb-3">
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
                  <Text>{number}</Text>
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

