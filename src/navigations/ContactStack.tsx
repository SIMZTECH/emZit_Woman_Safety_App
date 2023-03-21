/* eslint-disable prettier/prettier */
import { StyleSheet} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Contacts from '../screens/contacts/Contacts';
import AddContactScreen from '../screens/contacts/AddContactScreen';
import { useNavigation } from '@react-navigation/native';

const Stack=createStackNavigator();

const ContactStack = () => {
    const Navigation=useNavigation();
    useLayoutEffect(()=>{
        Navigation.setOptions({
            headerShown:false,
        });

    });

  return (
    <Stack.Navigator>
      <Stack.Screen name='Contact' component={Contacts}/>
      <Stack.Screen name='AddContact' component={AddContactScreen}/>
    </Stack.Navigator>
  );
};

export default ContactStack;

const styles = StyleSheet.create({})