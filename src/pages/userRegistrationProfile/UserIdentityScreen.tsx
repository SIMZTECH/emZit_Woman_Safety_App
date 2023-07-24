/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ScrollView, StyleSheet, Text,View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import CustomInputBox from '../../components/customInputBoxRegistration/CustomInputBox';
import RegistrationScreenHeader from '../../components/customRegistrationHeader/RegistrationScreenHeader';
import NextButton from '../../components/customNextButton/NextButton';
import { userMainDetals } from '../../database/Model';
import { validateUserDetails } from '../../functions/GlobalMethods';
import { height,width} from '../../functions/GlobalMethods';
import useBLE from '../../useBLe';

const UserIdentityScreen = ({navigation}) => {
  const {requestSMSPermissions} = useBLE();



    const [userName,setUserName] = React.useState<string>('');
    const [userLname,setUserLname] = React.useState<string>('');
    const [userPhone1,setUserPhone1] = React.useState<string>('');
    const [userPhone2,setUserPhone2] = React.useState<string>('');
    const [userEmail,setUserEmail] = React.useState<string>('');
    const [errorMessage,setErrorMessage] = React.useState<string>('');
    const [nextBtnStatus,setNextBtnStatus] = React.useState<boolean>(false);

    const generateUserDataObject = useCallback(()=>{
      const _userObject:userMainDetals={
        firstName: userName||'',
        lastName: userLname||'',
        emailAddress: userEmail||'',
        phone1: userPhone1||'',
        phone2: userPhone2||''
      }

      return _userObject;
    },[userEmail, userLname, userName, userPhone1, userPhone2]);

    useEffect(()=>{

      if(!validateUserDetails(generateUserDataObject())){
        setNextBtnStatus(true);
      }else{
        setNextBtnStatus(false);
      }
    }, [generateUserDataObject]);

    // console.log('validation:' + validateUserDetails(generateUserDataObject()));
    console.log(width);

  return (
    <ScrollView   
      style={styles.container}
      className="b pt-3 relative relative bg-white">
      <RegistrationScreenHeader headerTitle={'User Details'} />

      <View className='b px-8 pt-5'>
        <Text className="b text-[#3c5a7d] text-[25px] font-bold">Hi!</Text>
        <Text className='b w-[60%] text-[20px] text-[#3c5a7d]'>Let's get to know each other.</Text>
        <View className='b mt-3 mb-3'>
          <CustomInputBox inputText={'* First Name'} textValue={userName} textChangeValue={setUserName} errorMessage={errorMessage} iconName={'user-alt'} size={20}/>
          <CustomInputBox inputText={'* Last Name'} textValue={userLname} textChangeValue={setUserLname} errorMessage={errorMessage} iconName={'user-alt'} size={20}/>
          <CustomInputBox inputText={'* Email Address'} textValue={userEmail} textChangeValue={setUserEmail} errorMessage={errorMessage} iconName={'envelope-open-text'} size={20}/>
          
          <CustomInputBox inputText={'* Phone 1'} textValue={userPhone1} textChangeValue={setUserPhone1} errorMessage={''} iconName={'phone'} size={20} />
          <CustomInputBox inputText={'Phone 2'} textValue={userPhone2} textChangeValue={setUserPhone2} errorMessage={''} iconName={'phone'} size={20}/>
        </View>
      </View>

      <View className="w-[100%] px-8 mt-5">
        <NextButton 
          navigateTo={'UserMoreInformation'}
          operation={((args: String) => {
            // invoke permission 1 to proceed
            requestSMSPermissions((input:Boolean)=>{
              if(input){
                navigation.navigate(args, { param: generateUserDataObject() });
              }
            });
          })} 
          status={nextBtnStatus} 
        />
      </View>
    </ScrollView>
  )
}

export default UserIdentityScreen;

const styles = StyleSheet.create({
  container:{
    height:height,
    width:width,
  }

})