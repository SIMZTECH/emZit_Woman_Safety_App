/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View,Dimensions,TouchableOpacity,Alert, ScrollView} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ContactRow from '../../components/ContactRow';


const avatorMale='https://cdn-icons-png.flaticon.com/512/4140/4140048.png';
const avatorFemale='https://cdn-icons-png.flaticon.com/512/9561/9561553.png';
const avatorSibling='https://cdn-icons-png.flaticon.com/512/706/706807.png';

const Contacts = () => {
  const Navigation=useNavigation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {width,height}=Dimensions.get('screen');

  useLayoutEffect(() => {
    Navigation.setOptions({
      headerShown:false,
    })
    
  },);
  /* Events methods*/
  const onPressedAddContact=()=>{
    // Alert.alert('Contact added');
    Navigation.navigate('Add Contact');
  }
  /* */

  return (
    <SafeAreaView
    className='bg-white flex-1 px-5 pt-5 pb-5'
    style={[styles.SafeAreaContainer,{width:width,height:height}]}
    >
      <Text className='b text-[24px] font-semibold text-black mt-3'>Contacts</Text>
      {/* add new contact */}
      <View className='flex-row space-x-4 items-center mt-7'>
        <TouchableOpacity 
        onPress={onPressedAddContact}
        className='b w-12 h-12 bg-[#ff6c6c] rounded-full items-center justify-center'>
          <AntDesign name='plus' size={24} color='white'/>
        </TouchableOpacity>
        <View>
          <Text className='text-[#ff6c6c] font-medium text-[16px]'>Add new</Text>
          <Text className='text-[#c3c6d3] text-[16px]'>Max 5 contacts</Text>
        </View>
      </View>
      {/* conitacts list */}
      <ScrollView className='mt-10'
      showsVerticalScrollIndicator={false}
      >
        {/* components */}
        <ContactRow 
          urlImage={avatorFemale}
          phone={'0969718806'}
          name={'Sister'}
          priority={'High Priority'}
        />
        <ContactRow 
          urlImage={avatorSibling}
          phone={'0969718806'}
          name={'Bro'}
          priority={'High Priority'}
        />
       
        <ContactRow 
          urlImage={avatorMale}
          phone={'0969718806'}
          name={'Favour'}
          priority={'Low Priority'}
        />
         <ContactRow 
          urlImage={avatorFemale}
          phone={'0969718806'}
          name={'Xavier'}
          priority={'Low Priority'}
        />
        <ContactRow 
          urlImage={avatorMale}
          phone={'0969718806'}
          name={'Samson'}
          priority={'Low Priority'}
        />

      </ScrollView>
    </SafeAreaView>
  )
}

export default Contacts;

const styles = StyleSheet.create({
  SafeAreaContainer:{

  }
})