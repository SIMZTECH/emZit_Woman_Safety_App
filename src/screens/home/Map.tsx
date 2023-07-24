/* eslint-disable space-infix-ops */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable keyword-spacing */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Dimensions, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { AppContext } from '../../../global/GlobalState';
import MapView, { Callout, Circle, LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import { TouchableOpacity } from 'react-native-gesture-handler';

const API_KEY='AIzaSyD4xOcb9d8OcAqMG5ooNb5pFNaq8azHC3A';

const {width,height}=Dimensions.get('window');

const ASPECT_RATIO=width/height;
const LATITUDE_DELTA=0.02;
const LONGITUDE_DELTA=LATITUDE_DELTA/ASPECT_RATIO;

const Map = () => {
  const {bluetoothPermission}= useContext(AppContext);
  const Navigation=useNavigation();
  const mapRef=useRef<MapView>(null);
  const [origin,setOrigin] = React.useState<LatLng|null>();
  const [destination,setDestination] = React.useState<LatLng|null>();
  const [tracker,setTracker]=React.useState<boolean>(false);
  const [distance,setDistance]=React.useState<number>(0);
  const [duration,setDuration]=React.useState<number>(0);

  useLayoutEffect(()=>{
    Navigation.setOptions({
      headerShown:false,
    })

  });

  type AutoCompleteProps={
    label:string,
    placeholder:string,
    onPlacedSelected:(details:GooglePlaceDetail|null)=>void;
  };

  function InputAutoComplete({ label, placeholder, onPlacedSelected }: AutoCompleteProps) {
    return (
      <>
      <Text>{label}</Text>
        <GooglePlacesAutocomplete
          placeholder={placeholder || ''}
          styles={{
            textInput: {
              borderColor: '#c3c6d3',
              borderWidth: 1,
            }
          }}
          fetchDetails
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            onPlacedSelected(details);
          }}
          query={{
            key: 'AIzaSyD4xOcb9d8OcAqMG5ooNb5pFNaq8azHC3A',
            language: 'en',
            components: 'country:zm'
          }} />
      </>
    );
  };

  const moveTo=async(position:LatLng)=>{
    const camera=await mapRef.current?.getCamera();
    if(camera){
      camera.center=position;
      mapRef.current?.animateCamera(camera,{duration:1000});

    }
  };

  const  onPlacedSelected=(details:GooglePlaceDetail|null,flags:'origin'|'destination')=>{
    const set=(flags==='origin')?setOrigin:setDestination;
    const position={
      latitude:details?.geometry.location.lat || 0,
      longitude:details?.geometry.location.lng || 0,
    };
    set(position);
    moveTo(position);
  };

  const edgeValue=70;

  const edgePadding={
    top:edgeValue,
    bottom:edgeValue,
    left:edgeValue,
    right:edgeValue,
  };

  const traceRoute=()=>{
    if(origin && destination){
      mapRef.current?.fitToCoordinates([origin,destination],{edgePadding});
      setTracker(true);
    };

  };

  const onReadyTraceRoute=(args:any)=>{
    if(args){
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  // get geo location cordinates -12.822859939641509, 28.216142204229577
  const getCordinates=useCallback(()=>{
      Geolocation.getCurrentPosition((position)=>{
        console.log(position.coords);
        setOrigin(position.coords)
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
        ref={mapRef}
        onUserLocationChange={(e) => {

          // setOrigin(e.nativeEvent.coordinate)
          const data:LatLng={
            latitude:e.nativeEvent.coordinate?.latitude || 0,
            longitude:e.nativeEvent.coordinate?.longitude || 0
          }
          setOrigin(data)
        }}
        region={{
          latitude:origin?.latitude||0,
          longitude:origin?.longitude||0,
          latitudeDelta:LATITUDE_DELTA,
          longitudeDelta:LONGITUDE_DELTA
        }}
      >
        {(origin) && <Marker coordinate={origin} title='user position' description='user moving' pinColor=' #f00100' />}
        {(origin) &&  <Circle center={origin} radius={200} fillColor='#bcc8e8' strokeColor='#264290' strokeWidth={1} />}

        {/* destination maker */}
        {(destination) && <Marker coordinate={destination} title='user position' description='user moving' pinColor=' #f00100' />}


        {/* map directions */}
        {(tracker && origin && destination) && <MapViewDirections strokeColor='#f00100' strokeWidth={3} origin={origin} destination={destination} apikey={API_KEY} onReady={onReadyTraceRoute}/>}

      </MapView>
      <View className='b absolute bg-white w-[90%] mt-10 shadow-md shadow-black rounded-md p-1'>
        <InputAutoComplete  label={'Destination'} placeholder={'Search'} 
          onPlacedSelected={(details)=>{
            onPlacedSelected(details,'destination');
          }} 
        />
        <TouchableOpacity
        className='b border-[1px] border-[#82b296] bg-[#82b296] rounded-md h-10 items-center justify-center mt-1'
        onPress={traceRoute}
        >
          <Text className='b text-[17px] text-[#fff]'>Set Tracker</Text>
        </TouchableOpacity>
        
        {distance && duration?
          (<View className='b mt-2'>
            <Text>Distance:{distance.toFixed(2)}</Text>
            <Text>Duration:{Math.ceil(duration)} min</Text>
           </View>
          ):(
            null
          )
        }

      </View>

    </View>
  );
}

export default Map;

const styles = StyleSheet.create({})