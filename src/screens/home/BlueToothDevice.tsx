/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-quotes */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable space-infix-ops */
/* eslint-disable prettier/prettier */
import {Text, View, ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BlueToothDevice = ({bleStatus,internalLoader,data}) => {

  return (
    <View className='flex-row items-center space-x-4 mt-2 mb-2 bg-white p-1 rounded-md shadow-md'>
      {bleStatus? internalLoader?(
                        //internal logic
                        <ActivityIndicator color={'#f00100'} size={24}/>
                        ):(
                        <Ionicons name='checkmark-circle' size={24} color={'#82b296'}/>
            ):internalLoader?(
                //internal logic
                <ActivityIndicator color={'#f00100'} size={24}/>
                ):(
                 <Ionicons name='close-circle' size={24} color={'#f00100'}/>
            )
      }

      <View>
        <Text>{data.name}</Text>
        <Text>{data.id}</Text>
      </View>
    </View>
  )
}

export default BlueToothDevice;
