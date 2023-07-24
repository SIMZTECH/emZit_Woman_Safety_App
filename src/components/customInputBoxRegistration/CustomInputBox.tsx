/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View,TextInput} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';

type inputProps={
    inputText:string,
    textValue:string,
    textChangeValue:any
    errorMessage:string
    iconName:string
    size:number
}

const CustomInputBox = ({inputText,textValue,textChangeValue,errorMessage,iconName,size=25}:inputProps) => {
  return (
    <View className={`b border-b-[1px]  h-12 mt-2 mb-2 border-b-[#3c5a7d] flex-row justify-between items-center`}>
      <TextInput 
        placeholder={inputText} 
        
        value={errorMessage?errorMessage:textValue} 
        onChangeText={((text)=>textChangeValue(text))} 
        placeholderTextColor={'#3c5a7d'} 
        className='b text-[17px] p-0 h-full w-full w-[90%]'
      />
      {(iconName==='home')&& <FontAwesome name={iconName} color={'#3c5a7d'} size={size}/>}
      {(iconName==='human-male-height') && <MaterialCommunityIcons name={iconName} color={'#3c5a7d'} size={size}/>}
      {(iconName==='weight' || iconName==='user-alt' || iconName==='envelope-open-text' || iconName==='phone') && <FontAwesome5  name={iconName} color={'#3c5a7d'} size={size}/>}
      {(iconName==='blood-drop') && <Fontisto   name={iconName} color={'#3c5a7d'} size={size}/>}
    </View>
  )
}

export default CustomInputBox;

const styles = StyleSheet.create({})