/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const {width,height}=Dimensions.get('screen');

const ProfileDataRow = ({valueLeft,valueRight,titleLeft,titleRight,unitLeft,unitRight,iconNameLeft,iconNameRight}) => {
  return (
    <View
    className='flex-row border-t-[1px] border-b-[0.5px] border-[#eff2fa]'>
        {/* left */}
      <View className='w-[50%] pt-2 pb-1 px-2 border-r-[1px] border-[#eff2fa] space-y-1'>
        <View className='flex-row items-center justify-between'>
            <Text className='text-[16px] text-[#c3c6d3]'>{titleLeft}:</Text>
            {(iconNameLeft=='calendar')?
                (<FontAwesome name={iconNameLeft} size={19} color={(iconNameLeft==='calendar')?'#82b296':'blue'}/>)
                :(<MaterialCommunityIcons name={iconNameLeft} size={19} color={(iconNameLeft==='calendar')?'#82b296':'#90e0ef'}/>)
            }
        </View>
        <Text className='text-black text-[22px] font-semibold'>{valueLeft} <Text className='text-black text-[16px] font-semibold'>{unitLeft}</Text></Text>
      </View>
      {/* right */}
      <View className='w-[50%] pt-2 pb-1 px-2 space-y-1'>
        <View className='flex-row items-center justify-between'>
            <Text className='text-[16px] text-[#c3c6d3]'>{titleRight}:</Text>
            {(iconNameRight=='blood-drop')?
                (<Fontisto name={iconNameRight} size={19} color={(iconNameRight==='blood-drop')?'#f00100':'purple'}/>)
                :(<FontAwesome5 name={iconNameRight} size={19} color={(iconNameRight==='blood-drop')?'#f00100':'purple'}/>)
            }
        </View>
        <Text className='text-black text-[22px] font-semibold'>{valueRight}<Text className='text-black text-[16px] font-semibold'>{unitRight}</Text></Text>
      </View>
    </View>
  )
}

export default ProfileDataRow

const styles = StyleSheet.create({
    dataRow:{

    }
})