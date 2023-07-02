/* eslint-disable prettier/prettier */
import { StyleSheet,View, SafeAreaView,TextInput,ScrollView, Text} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SearchContactSreen = () => {
    const Navigation=useNavigation();

    const [contactName, setContactName] = React.useState<string>('');

    useLayoutEffect(()=>{
        Navigation.setOptions({
            headerShown:false,
        });
    });

    return (
        <SafeAreaView>
            <ScreenHeader headerTitle={'Search Contacts'} />
            <View>
                <View className="b px-3 mt-6">
                    <View className="b flex-row h-12 shadow-md rounded-md">
                        <View className="b w-12 h-12 items-center justify-center bg-[#e7e7e7] rounded-tl-md rounded-bl-md">
                            <AntDesign name="search1" color={'#f00100'} size={30} />
                        </View>
                        <TextInput
                            placeholder="Enter Contact Name"
                            value={contactName}
                            onChangeText={((textValue) => setContactName(textValue))}
                            className="b bg-[#e7e7e7] text-[15px] flex-1 rounded-tr-md rounded-br-md px-1"
                        />
                    </View>
                </View>
                <ScrollView className='b mt-3'>
                    <Text>{contactName}</Text>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default SearchContactSreen;

const styles = StyleSheet.create({})