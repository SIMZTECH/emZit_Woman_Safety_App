/* eslint-disable quotes */
/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
import { ActivityIndicator,ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import RegistrationScreenHeader from '../../components/customRegistrationHeader/RegistrationScreenHeader';
import CustomInputBox from '../../components/customInputBoxRegistration/CustomInputBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { combinedUserProfileDetails,completeFullUserOtherDetails,UserProfile} from '../../database/Model';
import { validateUserDetailsComplete } from '../../functions/GlobalMethods';
import { height,width } from '../../functions/GlobalMethods';
import {SaveUserProfile } from '../../database/SQLite_DB';
import useBLE from '../../useBLe';

type propType={
  data:combinedUserProfileDetails,
}

const UserAllegies = ({route,navigation}) => {
  const {requestLocationPermissions} = useBLE();

  const {data}:propType = route.params;

  const [userHeight, setHeight] = React.useState<string>('');
  const [userWeight, setWeight] = React.useState<string>('');
  const [bloodType, setBloodType] = React.useState<string>('');
  const [animals, setAnimals] = React.useState<string>('');
  const [fruits, setFruits] = React.useState<string>('');
  const [submitLoader, setSubmitLoader] = React.useState<Boolean>(false);
  const [nextBtnStatus,setNextBtnStatus] = React.useState<boolean>(true);
  const [dataSavedSuccess,setDataSavedSuccess] = React.useState<boolean>(false);
  const [successLoader,setSuccessLoader] = React.useState<boolean>(false);

  const generateUserOtherDetails=useCallback(()=>{
    const _userObject:completeFullUserOtherDetails={
      height: userHeight||'',
      weight: userWeight||'',
      bloodGroup: bloodType||'',
      animals:animals||'',
      fruits:fruits||''
    }

    return _userObject;

  },[animals, bloodType, fruits, userHeight, userWeight]);

  const generateCompleteUserProfileObject=useCallback(()=>{
        
    const _userObject:UserProfile={
      main: {
        firstSection: {
          firstName: data.firstSection.firstName,
          lastName: data.firstSection.lastName,
          emailAddress: data.firstSection.emailAddress,
          phone1: data.firstSection.phone1,
          phone2: data.firstSection.phone2
        },
        secondSection: {
          dateOfBirth: data.secondSection.dateOfBirth,
          homeAddress: data.secondSection.homeAddress,
          userAge: data.secondSection.userAge
        }
      },
      other: {
        height: generateUserOtherDetails().height,
        weight: generateUserOtherDetails().weight,
        bloodGroup: generateUserOtherDetails().bloodGroup,
        animals: generateUserOtherDetails().animals,
        fruits: generateUserOtherDetails().fruits
      },
      regDate:new Date().toUTCString(),
    };

    return _userObject;

  },[data.firstSection.emailAddress, data.firstSection.firstName, data.firstSection.lastName, data.firstSection.phone1, data.firstSection.phone2, data.secondSection.dateOfBirth, data.secondSection.homeAddress, data.secondSection.userAge, generateUserOtherDetails]);

  const handleSaveToDatabase=useCallback(async (_object:UserProfile)=>{
    await SaveUserProfile('profile',_object,"")
    .then((_data)=>{
      if(_data){
        setDataSavedSuccess(true);
      }
    })
    .catch((error)=>{

    });

  },[]);

  useEffect(()=>{

    if(!validateUserDetailsComplete(generateUserOtherDetails())){
      setNextBtnStatus(false);
    }

  },[generateUserOtherDetails]);

  // console.log(data);
  console.log("alergies btn status:"+nextBtnStatus);
  
  return (
    <>
      {
        (dataSavedSuccess) ? (
          <View style={styles.container} className='bg-white relative flex-1'>
            <RegistrationScreenHeader headerTitle={'Other Details'} />
            <View className='b px-8 pt-5 relative h-[70%] items-center justify-center'>
              <View className='b bg-green-500 w-[180] h-[180] rounded-full items-center justify-center'>
                <Ionicons name='checkmark' size={120} color={"white"}/>
              </View>
            </View>
            <TouchableOpacity
                onPress={(()=>{
                  setSuccessLoader(true);
                  setTimeout(() => {
                    setSuccessLoader(false);
                    navigation.navigate("HomeStack",{screen:"TabNavigationRoute"});
                  },3000);
                })}

              className={`h-12 w-[70%] items-center mt-5 justify-center self-center rounded-md border-[1.5px] border-green-700`}>
              <View className={`h-9 w-[95%] rounded-md items-center justify-center bg-green-700`}>
                {successLoader ?
                  (<ActivityIndicator color={"white"} size={30} />)
                  :
                  (<Text className={`b text-white text-[17px]`}>Succeed</Text>)
                }
              </View>
            </TouchableOpacity>
          </View >
        ) : (
          <ScrollView style={styles.container} className='bg-white relative'>
            <RegistrationScreenHeader headerTitle={'Other Details'} />
            <View className='b px-8 pt-5 relative'>
              <Text className="b text-[#3c5a7d] text-[23px] font-bold">That's it!</Text>
              <Text className="b w-[90%] text-[20px] text-[#3c5a7d] mt-2">Kindly tell me more about yourself, to compelete the registration.</Text>

              <View className='b mt-3 mb-3'>
                <CustomInputBox inputText={'Enter your height'} textValue={userHeight} textChangeValue={((text) => setHeight(text))} errorMessage={''} iconName={'human-male-height'} size={25} />
                <CustomInputBox inputText={'Enter your weight'} textValue={userWeight} textChangeValue={((text) => setWeight(text))} errorMessage={''} iconName={'weight'} size={25} />
                <CustomInputBox inputText={'Enter your blood group'} textValue={bloodType} textChangeValue={((text) => setBloodType(text))} errorMessage={''} iconName={'blood-drop'} size={25} />
              </View>
              <Text className='b text-[17px] text-[#3c5a7d] mt-3'>Select what you're Alergic to?</Text>
              <View className='b flex-row items-center pl-2 justify-between mt-2'>
                <Text className='b text-[17px] text-[#3c5a7d]'>Animals</Text>
                <Picker
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    width: '50%',
                    color: ('#3c5a7d'),
                  }}
                  selectedValue={animals}
                  onValueChange={(itemValue, itemIndex) =>
                    setAnimals(itemValue)
                  }>
                  <Picker.Item label="Fish" value={'Fish'} />
                  <Picker.Item label="Pigs Meat" value={'Pigs'} />
                  <Picker.Item label="Goat Meat" value={'Goat Meat'} />
                  <Picker.Item label="Kapenta" value={'Kapenta'} />
                  <Picker.Item label="Cow Meat" value={'Kapenta'} />
                  <Picker.Item label="Sausage" value={'Sausage'} />
                </Picker>
              </View>

              <View className='b flex-row items-center pl-2 justify-between mt-2'>
                <Text className='b text-[17px] text-[#3c5a7d]'>Fruits</Text>
                <Picker
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    width: '50%',
                    color: ('#3c5a7d'),
                  }}
                  selectedValue={fruits}
                  onValueChange={(itemValue, itemIndex) =>
                    setFruits(itemValue)
                  }>
                  <Picker.Item label="Grappes" value={'Grappes'} />
                  <Picker.Item label="Mangoes" value={'Mangoes'} />
                  <Picker.Item label="Cherries" value={'Cherries'} />
                  <Picker.Item label="Guava" value={'Guava'} />
                  <Picker.Item label="Lemon" value={'Lemon'} />
                  <Picker.Item label="Apples" value={'Apples'} />
                </Picker>
              </View>

            </View>

            <TouchableOpacity
              disabled={nextBtnStatus}
              onPress={(() => {
                setSubmitLoader(true);

                requestLocationPermissions((input:Boolean)=>{
                  if(input){
                      setTimeout(() => {
                        // save to database
                        handleSaveToDatabase(generateCompleteUserProfileObject());
                        setSubmitLoader(false);
                        // activate success display
                        setDataSavedSuccess(true);
                      }, 2000);
                  }else{
                    setSubmitLoader(false);
                  }
                });

              })}
              className={`h-12 w-[70%] items-center mt-5 justify-center self-center rounded-md border-[1.5px] ${!nextBtnStatus ? 'border-[#f00100]' : 'border-[#3c5a7d]'}`}>
              <View className={`h-9 w-[95%] rounded-md items-center justify-center  ${!nextBtnStatus ? 'bg-[#f00100]' : 'bg-[#eff2fa]'}`}>
                {submitLoader ? (<ActivityIndicator color='white' size={30} />) : (<Text className={`text-[18px] ${!nextBtnStatus ? 'text-white' : 'text-[#3c5a7d]'}`}>Save</Text>)}
              </View>
            </TouchableOpacity>

          </ScrollView >
        )
      }
    </>
  );

};

export default UserAllegies;

const styles = StyleSheet.create({
  container:{
    height:height,
    width:width,
  },

});