/* eslint-disable keyword-spacing */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useContext, useEffect, useLayoutEffect } from 'react';
import { AppContext } from '../../../global/GlobalState';
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';
import { GeolocationModel } from '../../database/Model';
import Feather from 'react-native-vector-icons/Feather'

// APIKEY:AIzaSyD4xOcb9d8OcAqMG5ooNb5pFNaq8azHC3A

const Map = () => {
  const {bluetoothPermission}= useContext(AppContext);
  const Navigation=useNavigation();
  const [circleCordinates,setCircleCordinates]=React.useState<GeolocationModel>({
    latitude:28.216142204229577,
    longitude:-12.822859939641509,
    latitudeDelta:0.015,
    longitudeDelta:0.0121,
    timestamp:0,
    accuracy:0,
    altitude:0,
    isFromMockProvider:false,
    heading:0
  });

  useLayoutEffect(()=>{
    Navigation.setOptions({
      headerShown:false,
    })

  });

  // get geo location cordinates -12.822859939641509, 28.216142204229577
  const getCordinates=useCallback(()=>{
      Geolocation.getCurrentPosition((position)=>{
        console.log(position.coords)
        const data:GeolocationModel={
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta:0.015,
          longitudeDelta:0.0121,
          accuracy: 0,
          altitude: 0,
          heading: 0,
          isFromMockProvider: false,
          timestamp: 0
        }
        setCircleCordinates(data);
      },
      (error)=>{
        console.log(error);
      },{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });

  },[]);

  useEffect(()=>{

    getCordinates();

  },[getCordinates]);
  
 
  return (
    <View
    className='flex-1 items-center bg-[#eff2fa]'
    >
        <MapView
          className='items-center w-full h-full'

          provider={PROVIDER_GOOGLE}
          // showsUserLocation={true}
          showsMyLocationButton={true}
          zoomControlEnabled={true}
          zoomEnabled={true}
          onUserLocationChange={(e) => {
            const data: GeolocationModel = {
              latitude: e.nativeEvent.coordinate?.latitude,
              longitude: e.nativeEvent.coordinate?.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
              accuracy: e.nativeEvent.coordinate?.accuracy,
              altitude: e.nativeEvent.coordinate?.altitude,
              heading: e.nativeEvent.coordinate?.heading,
              isFromMockProvider: e.nativeEvent.coordinate?.isFromMockProvider,
              timestamp: e.nativeEvent.coordinate?.timestamp
            }
            setCircleCordinates(data);
          }}
          region={circleCordinates}
        >
          <Marker
            coordinate={circleCordinates}
            title='user position'
            description='user moving'
            pinColor=' #f00100'
          >
            <Callout><Text className='b '>user moving</Text></Callout>

          </Marker>

          <Circle
            center={circleCordinates}
            radius={200} fillColor='#bcc8e8' strokeColor='#264290'
            strokeWidth={1} />

        </MapView>

      <View className='h-[45px] w-[320px] rounded-md shadow-md items-center flex-row px-1 space-x-3 absolute mt-10 bg-white'>
        <Feather name='search' size={30} color={'#f00100'}/>
        <Text className='b text-[16px]'>Set Destination for tracking?</Text>
     </View>
    </View>
  )
}

export default Map;

const styles = StyleSheet.create({})