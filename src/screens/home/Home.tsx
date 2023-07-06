/* eslint-disable @typescript-eslint/func-call-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-quotes */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  Alert, Dimensions, Image, LogBox, NativeModules, Pressable, SafeAreaView, StyleSheet,
  Text, ToastAndroid, TouchableOpacity, View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { friend, imageMap,popupImage} from '../../../assets/imgaes/UIDesign/OtherImages';
import { AppContext } from '../../../global/GlobalState';
import { Appearance } from 'react-native';
import * as Animatable from 'react-native-animatable';
import useBLE from '../../useBLe';
import CardMenu from './CardMenu';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import CustomModal from './CustomModal';
import {GetContactsFromDatabse} from '../../database/SQLite_DB';
import { ContactsModelModified } from '../../database/Model';
import Geolocation from 'react-native-geolocation-service';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

// for sending sms
let SendSMS=NativeModules.DirectSms;

type propType={
  remainingTime:any,

}

  const {width,height} = Dimensions.get('screen');
  LogBox.ignoreLogs(['new NativeEventEmitter']);

  const App = ({navigation}) => {

    const {getDeviceInfor}=useBLE();
    const [theme, setTheme]=React.useState(Appearance.getColorScheme);
    const [key, setKey] = useState(0);
    const [sendAlertHelp,setSendAlertHelp]=React.useState<Boolean>(false);
    const [isModalVisible,setModalVisible]=React.useState<boolean>(false);
    const [allPriority,setAllPriority]=React.useState<ContactsModelModified[]>([]);
    const [activateMakeCall,setActivateMakeCall]=React.useState<Boolean>(false);

    // get global state data
    type propsContext={
      isDeviceConnected:Boolean,
      messageData:String,
      priorityContacts:ContactsModelModified[],
      setPriorityContacts:any,
    }

    const {
          isDeviceConnected,
          messageData,
          renderKey,setRenderKey,
    }:propsContext = useContext(AppContext);

    const Navigation = useNavigation();

    useLayoutEffect(()=>{
      Navigation.setOptions({
        headerShown:false,
      })

    });

    const renderTime = ({ remainingTime }: propType) => {
      if (remainingTime === 0 && activateMakeCall == false) {
        // TODO::send alert help
        setTimeout(() => {
          setKey(key + 1);
          setSendAlertHelp(true);
          // activate make phone call
          setActivateMakeCall(true);
        }, 5);
      }

      return (
        <View className='b absolute  w-[80%] h-[50%] items-center'>
          <Text className='b text-white text-[18px]'>{remainingTime}<Text className='b text-white text-[13px]'>s</Text></Text>
        </View>
      );
    };

    // make phone call method
    const MakePhoneCall = (_phone:String) => {
      RNImmediatePhoneCall.immediatePhoneCall(`${_phone}`);
    };

    // method to reset states for calling mechanism
    const ResetStatesCallingMechanism=()=>{
      if(activateMakeCall){
        setActivateMakeCall(false);
        setKey(key+1);
      }

      console.log('resetted!!!');
    };

    // method to handle alert Help sent
    const HandleSendAlertHelp=useMemo(()=>{
      
      if (sendAlertHelp && messageData == '1') {
        // TODO: send msg and call logic
        setSendAlertHelp(false);
        
        setTimeout(() => {
          Geolocation.getCurrentPosition((position) => {
            let mapURL = `https://www.google.com/maps/search/?api=1&query=${position.coords.latitude}%2C${position.coords.longitude}`;
            let messageBody = `emZit App:Help Help!! i'm in Danger, here is my loc:${mapURL}`;

            allPriority.map((value, _index) => {
              if (value.contactPriority == true) {
                SendSMS.sendDirectSms(value.contactNumber, messageBody);
              }
            });

            ToastAndroid.show(`Alert Sent Successfully`, ToastAndroid.SHORT);
            console.log("help please");

            // make phone call after sending messages
            for (let index = 0; index < allPriority.length; index++) {
              if (allPriority[index].contactPriority == true) {
                // invoke call
                MakePhoneCall(allPriority[index].contactNumber);
                // console.log("i've found the phone needed"+allPriority[index].contactNumber);
                console.log("Calling............");
                break;
              }
            }

          }, ((error) => {
            console.log(error.message);
          }));

        }, 2000);
      }

    }, [allPriority, messageData, sendAlertHelp]);

    const HandleRetrivePriorityContactsFromDB = useMemo(() => {
      if (renderKey >= 0) {
        GetContactsFromDatabse('contacts', '')
          .then((value) => {
            (value.length > 0) ? setModalVisible(false) : setModalVisible(true);
            setAllPriority(value);
            console.log("retrieving working...");
          });
      }
    }, [renderKey]);

    const HandleOnPressedModalEvent = ((args: any) => {
      if (args === 'isVisibleStatus') {
        setModalVisible(false);
        console.log(args);
      } else {
        // navigation.navigate('BlueToothScreen');
        console.log(args);
        navigation.navigate('TabNavigationRoute', { screen: 'Contacts' });
        setModalVisible(false);
      }
    });

    const handleMenuCardPressed = (args: String) => {
      if (args === 'map') {
        navigation.navigate('Map');
      }

      if (args === 'esp32') {
        navigation.navigate('BlueToothScreen');
      }
    };

    useEffect(() => {

      getDeviceInfor();

      Appearance.addChangeListener((scheme) => {
        setTheme(scheme.colorScheme);
      });

    }, [allPriority, getDeviceInfor, messageData, renderKey]);

    console.log(allPriority);
    console.log("modal status:"+isModalVisible);
    console.log("render key at Home:"+renderKey);

    return (
      <SafeAreaView
        className={`relative flex-1 ${(theme === 'dark') ? 'bg-black' : 'bg-[#eff2fa]'} `}
        style={[styles.SafeAreaViewContainer, { width: width, height: height }]}>

        <View className="px-8 pt-3 pb-2 flex-row justify-between bg-white shadow-md">

          <View className="flex-row items-center justify-center space-x-2 flex-1">
            <Animatable.View animation={'pulse'} iterationCount={'infinite'}  easing={'ease-in'}>
              <FontAwesome5 name='heartbeat' size={24} color={'#ff6c6c'} />
            </Animatable.View>
            <Text className="text-[20px] text-[#c3c6d3]">Emergency<Text className="text-[#f00100] font-bold">App</Text></Text>
          </View>

          <View className="w-10 h-10 bg-blue-400 border-[2px] border-[#f00100] rounded-full overflow-hidden">
            <Image source={friend} className="object-contain h-full w-full"/>
          </View>

        </View>

        <View className="items-center pt-3 relative flex-1">
          <TouchableOpacity
            onPress={(() => ResetStatesCallingMechanism())}
            className='w-10 h-10 self-end mr-5 mb-2 rounded-full'>
            <MaterialIcons name='refresh' size={38} color={activateMakeCall?'#f00100':'#c3c6d3'} />
          </TouchableOpacity>
          <Text className={`text-[32px]  font-semibold text-center w-[80%] ${(theme === 'dark') ? 'text-white' : 'text-black'}`}>
            Emergency help needed?
          </Text>
          <Text className="b text-[14px] text-[#b4b7c2] mt-2">just press on the button to call</Text>

          <View className='items-center justify-center relative h-[200px]'>
           
            <View className={`w-[170px] h-[170px] bg-[#f00100] rounded-full mt-6 mb-1 items-center justify-center absolute`} >
              <MaterialCommunityIcons name="access-point" size={54} color="white" />
            </View>

            {/* display timer if device connected */}
            {(messageData=='1' && isDeviceConnected && allPriority.length>0 && !activateMakeCall) &&
                <CountdownCircleTimer
                  isPlaying
                  key={key}
                  size={180}
                  duration={15}
                  colors={['#ff6c6c', '#ff6c6c', '#ff6c6c', '#ff6c6c']}
                  colorsTime={[7, 5, 2, 0]}
                  strokeWidth={3}
                  trailColor={'#c3c6d3'}
                >
                  {renderTime}
                </CountdownCircleTimer>
            }
          </View>

          <Text className='b mb-4 bg-[#f00100] px-2 items-center rounded-sm text-white mt-2 font-medium shadow-md'>{messageData}</Text>
          <Text className="text-[20px] font-semibold text-black">Not sure what to do?</Text>
          <Text className="text-[14px] text-[#b4b7c2] mt-2">Read the guide</Text>

        </View>

        <View className='px-2 flex-row justify-between absolute bottom-3'
          style={[styles.cardMenuContainer, { width: width }]}>

          <CardMenu
            deviceStatus={isDeviceConnected}
            args={"esp32"}
            operation={((param: String) => {
              handleMenuCardPressed(param);
            })}/>

          <CardMenu
            deviceStatus={isDeviceConnected}
            args={"device_status"}
            operation={((param: String) => {
              return 
            })} />

          <CardMenu
            deviceStatus={isDeviceConnected}
            args={"map"}
            operation={((param: String) => {
              handleMenuCardPressed(param);
            })} />
        
        </View>
        {/* modal display */}
          
        <CustomModal isVisibleStatus={isModalVisible} operation={HandleOnPressedModalEvent} />
         
      </SafeAreaView>
    );
  };

  export default App;

const styles = StyleSheet.create({
  SafeAreaViewContainer: {

  },
  cardMenuContainer: {

  }
});

