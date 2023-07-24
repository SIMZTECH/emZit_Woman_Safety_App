/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserIdentityScreen from '../pages/userRegistrationProfile/UserIdentityScreen';
import UserAllegies from '../pages/userRegistrationProfile/UserAllegies';
import UserMoreInformation from '../pages/userRegistrationProfile/UserMoreInformation';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

const UserProfileRegistration = () => {

    const Navigation=useNavigation();
    
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false,
        }}>
            <Stack.Screen name="UserPersonalDetails" component={UserIdentityScreen} />
            <Stack.Screen name="UserMoreInformation" component={UserMoreInformation} />
            <Stack.Screen name="UserAllegies" component={UserAllegies} />
        </Stack.Navigator>
    )
}

export default UserProfileRegistration;

const styles = StyleSheet.create({})