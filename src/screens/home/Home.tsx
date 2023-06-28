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
  Alert, Dimensions, Image, LogBox, Pressable, SafeAreaView, StyleSheet,
  Text, ToastAndroid, TouchableOpacity, View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { friend, imageMap,popupImage} from '../../../assets/imgaes/UIDesign/OtherImages';
import { AppContext } from '../../../global/GlobalState';
import { Appearance } from 'react-native';
import * as Animatable from 'react-native-animatable';
import useBLE from '../../useBLe';
import CardMenu from './CardMenu';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import CustomModal from './CustomModal';
import { Contact,getAll} from 'react-native-contacts';
import {GetContactsFromDatabse} from '../../database/SQLite_DB';

type propType={
  remainingTime:any,

}

  const {width,height} = Dimensions.get('screen');
  LogBox.ignoreLogs(['new NativeEventEmitter']);

  const App = ({navigation}) => {
    const {getDeviceInfor,requestPermissions}=useBLE();

    const [theme, setTheme]=React.useState(Appearance.getColorScheme);
    const [key, setKey] = useState(0);
    const [sendAlertHelp,setSendAlertHelp]=React.useState(false);
    const [isModalVisible,setModalVisible]=React.useState(true);
    const [retrivedPriorityContacts, setRetrivedPriorityContacts]=React.useState<Contact[]>([]);
    const [retrieved,setRetrieved]=React.useState<Contact[]>([]);

    // get global state data
    const {
          isDeviceConnected,
          messageData,
    } = useContext(AppContext);

    const Navigation = useNavigation();

    useLayoutEffect(()=>{
      Navigation.setOptions({
        headerShown:false,
      })

    });

    // method to get all user contacts from phone
    const HandleRetriveAllUserContacts=useMemo(()=>{
      getAll()
      .then((value)=>{
        // console.log(value);

      })
      .catch((e)=>{
        console.log(e.message);
      });
    },[]);

    const HandleRetrivePriorityContactsFromDatabase=useMemo(async ()=>{
      await GetContactsFromDatabse('contacts','')
      .then((value)=>{
        console.log(value);
      })
      .catch((e)=>{
        console.log(e.message);
      });

    },[]);

    const DeviceInformation = useCallback(()=>{
      getDeviceInfor();

    },[getDeviceInfor]);

    const renderTime = ({remainingTime}:propType) => {
      if (remainingTime === 0) {
        // TODO::send alert help
        setTimeout(() => {
          setKey(key+1);
          setSendAlertHelp(true);
        },10);
      }
      
      return (
        <View className='b absolute  w-[80%] h-[50%] items-center'>
          <Text className='b text-white text-[18px]'>{remainingTime}<Text className='b text-white text-[13px]'>s</Text></Text>
        </View>
      );
    };

    // method to handle alert Help sent
    const HandleSendAlertHelp=useCallback(()=>{
      
      if(sendAlertHelp){
        // TODO: send msg and call logic
        setSendAlertHelp(false);
        setTimeout(() => {
          ToastAndroid.show(`Alert Sent Successfully`,ToastAndroid.SHORT);
          console.log("help please");
        },2000); 
      }
    },[sendAlertHelp]);

    const HandleOnPressedModalEvent=((args:any)=>{
      if(args==='isVisibleStatus'){
        setModalVisible(false);
        console.log(args);
      }else{
        // navigation.navigate('BlueToothScreen');
        console.log(args);
        navigation.navigate('TabNavigationRoute',{screen:'Contacts'});
        setModalVisible(false);
      }
    });

    // use effect
    useEffect(() => {
      DeviceInformation();

      Appearance.addChangeListener((scheme)=>{
        setTheme(scheme.colorScheme);
      });

      HandleSendAlertHelp();

      // preven going back to OnBoard Screen

    },[DeviceInformation, HandleSendAlertHelp, Navigation, messageData]);

    // HideModal();

    const handleMenuCardPressed=(args:String)=>{
      if (args === 'map'){
        navigation.navigate('Map');
      }
      
      if (args==='esp32'){
        navigation.navigate('BlueToothScreen');
      }
    };

    // console.log(sendAlertHelp);

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

        <View className="items-center pt-12 relative flex-1">
          <Text className={`text-[32px]  font-semibold text-center w-[80%] ${(theme === 'dark') ? 'text-white' : 'text-black'}`}>
            Emergency help needed?
          </Text>
          <Text className="b text-[14px] text-[#b4b7c2] mt-2">just press on the button to call</Text>

          <View className='items-center justify-center relative h-[200px]'>

            <View className={`w-[170px] h-[170px] bg-[#f00100] rounded-full mt-6 mb-1 items-center justify-center absolute`} >
              <MaterialCommunityIcons name="access-point" size={54} color="white" />
            </View>

            {/* display timer if device connected */}
            {true &&
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
            })} />

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
        <CustomModal 
          isVisibleStatus={isModalVisible} 
          operation={HandleOnPressedModalEvent}/>

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
