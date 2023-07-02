/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { popupImage } from '../../../assets/imgaes/UIDesign/OtherImages';

type propsType={
    isVisibleStatus:boolean,
    operation:(args:any)=>void,

}

const CustomModal = ({isVisibleStatus,operation}:propsType) => {
  return (
      <>
          <Modal
              isVisible={isVisibleStatus}
              animationOut={'slideOutDown'}
              style={{
                padding:0,
                margin:0,
                alignItems:'center',
                justifyContent:'center'
              }}>
                
              <View className='b w-[300px] h-[280px] bg-white rounded-md relative'>

                  <TouchableOpacity
                      onPress={(()=>operation('isVisibleStatus'))}
                      className='b  w-10 h-10 rounded-full items-center justify-center self-end mt-3 mr-3 bg-[#ff6c6c] -mt-3 -mr-1.5'
                  >
                      <AntDesign name={'close'} size={27} color={'#ffff'} />
                  </TouchableOpacity>

                  <Text className='b self-center text-center text-[17px] w-[80%] mt-1 mb-1 text-black font-normal'>No Priority Contatcs Found, Please Add!</Text>

                  <View className='b mt-1 rounded-br-md rounded-bl-md flex-1'>
                    <Image source={popupImage} resizeMode='cover' className='w-full h-full'/>
                  </View>

                  {/* button to navigate to somewhere */}
                  <TouchableOpacity 
                    onPress={(()=>operation('navigate'))}
                    className='bg-[#ff6c6c] w-12 h-12 rounded-full bottom-3 self-center items-center justify-center shadow-md'>
                      <AntDesign name={'plus'} size={27} color={'white'} />
                  </TouchableOpacity>

              </View>
          </Modal>
      </>
  )
}

export default CustomModal;

const styles = StyleSheet.create({});