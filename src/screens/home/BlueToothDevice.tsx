/* eslint-disable space-infix-ops */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View,Pressable, ActivityIndicator} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const BlueToothDevice = ({bleStatus,onPress,internalLoader}) => {
  return (
    <Pressable 
       onPress={onPress}
        className='flex-row items-center space-x-4 mt-2 mb-2 bg-white p-1 rounded-md shadow-md'>
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
        <Text>{'ESP32-R'}</Text>
        <Text>{'80:79:5D:C3:06:38'}</Text>
      </View>
    </Pressable>
  )
}

export default BlueToothDevice;

const styles = StyleSheet.create({})