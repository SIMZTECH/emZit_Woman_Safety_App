/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import { Alert, StyleSheet} from 'react-native';
import React from 'react';
import { createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,} from '@react-navigation/drawer';
import TabNavigationRoute from './TabNavigationRoute';


const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem 
            label="Log Out" 
            onPress={() => Alert.alert('Link to help')} 
            labelStyle={{
                fontSize:16,
                color:'#f00100'
            }}
        />
        <DrawerItem 
            label="Help" 
            onPress={() => Alert.alert('Link to help')} 
            labelStyle={{
                fontSize:16,
                color:'#f00100'
            }}
            style={{
                // backgroundColor:'blue',
                padding:0,
            }}
        />
      </DrawerContentScrollView>
    );
  }

const DrawerNavigation = () => {
  return (
    <>
        <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
         screenOptions={{
            headerShown:false,
            drawerStyle: {
                backgroundColor: '#eff2fa',
                // width: 240,
              },
         }}
        >
        <Drawer.Screen  name="Dashboard" component={TabNavigationRoute}/> 
        {/* route to tab navigation */}
        </Drawer.Navigator>
    </>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});