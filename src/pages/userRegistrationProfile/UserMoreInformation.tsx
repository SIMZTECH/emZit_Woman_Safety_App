/* eslint-disable prettier/prettier */
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React,{useCallback,useEffect,useState} from 'react';
import RegistrationScreenHeader from '../../components/customRegistrationHeader/RegistrationScreenHeader';
import CustomInputBox from '../../components/customInputBoxRegistration/CustomInputBox';
import DatePicker from 'react-native-date-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NextButton from '../../components/customNextButton/NextButton';
import { userMainDetals,otherDetails,combinedUserProfileDetails} from '../../database/Model';
import { validateUserDetailsTwo } from '../../functions/GlobalMethods';
import { height,width } from '../../functions/GlobalMethods';
import useBLE from '../../useBLe';

type propType={
    param:userMainDetals,
}
const UserMoreInformation = ({navigation,route}) => {
    const {requestContactsPermissions} = useBLE();

    const {param}:propType = route.params;

    const [address, setAddress] = React.useState<string>('');
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [nextBtnStatus,setNextBtnStatus] = React.useState<boolean>(false);

    const calculateUserAge=useCallback(()=>{
        const currentData=new Date().getFullYear();
        return (currentData - date.getFullYear());
    },[date]);

    const generateUserDataObject = useCallback(()=>{
        const _userObject:otherDetails={
            dateOfBirth: date.toUTCString() || '',
            homeAddress: address||'',
            userAge: calculateUserAge()||0,
        }
  
        return _userObject;

      },[address, calculateUserAge, date]);

      const generateCombinedUserDataObject=useCallback(()=>{
        
        const _userObject:combinedUserProfileDetails = {
            firstSection: {
                firstName: param.firstName,
                lastName: param.lastName,
                emailAddress: param.emailAddress,
                phone1: param.phone1||'',
                phone2: param.phone2||''
            },
            secondSection: {
                dateOfBirth: generateUserDataObject().dateOfBirth,
                homeAddress: generateUserDataObject().homeAddress,
                userAge: generateUserDataObject().userAge
            }
        }

        return _userObject;

      },[generateUserDataObject, param.emailAddress, param.firstName, param.lastName, param.phone1, param.phone2])

      useEffect(()=>{
        if(!validateUserDetailsTwo(generateUserDataObject())){
            setNextBtnStatus(true);
          }else{
            setNextBtnStatus(false);
          }
      },[generateUserDataObject]);
  
    console.log('Age: '+calculateUserAge()+' Years Old');
    
  return (
      <ScrollView 
        style={styles.container}
        className="b pt-3 relative bg-white">
          <RegistrationScreenHeader headerTitle={'User Details'} />

          <View className="b px-8 pt-5 relative flex-1">
              <Text className="b text-[#3c5a7d] text-[23px] font-bold">Almost done,</Text>
              <Text className="b w-[90%] text-[18px] text-[#3c5a7d]">Tell me about your birthday and other usefull information about you</Text>
              <View className="b mt-16">
                  <Text className="b text-[16px] text-[#3c5a7d]">D.O.B : DD/MM/YYY</Text>
                  <View className={'b border-b-[1px]  h-12 mb-4 border-b-[#3c5a7d] justify-between flex-row items-center'}>
                      <Text className="b text-[16px] text-[#3c5a7d]">{date.toUTCString()} </Text>
                      <TouchableOpacity
                          onPress={() => setOpen(true)}
                      >
                          <MaterialCommunityIcons name="calendar-month" size={25} color={'#3c5a7d'} />
                      </TouchableOpacity>
                      <DatePicker modal open={open} date={date} mode="date" onConfirm={(_date) => { setOpen(false); setDate(_date) }} onCancel={() => { setOpen(false) }}
                      />
                  </View>
                  <CustomInputBox inputText={'Home Address'} textValue={address} textChangeValue={setAddress} errorMessage={''} iconName={'home'} size={25} />
              </View>
          </View>

          <View className="w-[100%] self-end px-8 mt-5">
              <NextButton
                  navigateTo={'UserAllegies'}
                  operation={((args: String) => {
                    requestContactsPermissions((input:Boolean)=>{
                        if(input){
                            navigation.navigate(args, {data: generateCombinedUserDataObject() });
                        }
                      });
                })}
                  status={nextBtnStatus}
              />
          </View>
      </ScrollView >
  )
}

export default UserMoreInformation;

const styles = StyleSheet.create({
    container:{
        height:height,
        width:width,
      },
    
});