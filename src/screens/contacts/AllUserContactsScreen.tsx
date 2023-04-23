/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-extra-semi */
/* eslint-disable keyword-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState} from 'react';
import { Alert,StyleSheet, Text, View,ActivityIndicator,FlatList,VirtualizedList} from 'react-native';
import {Contact, getAll} from 'react-native-contacts';
import SingleContactComponent from './SingleContactComponent';
import { PermissionModel} from '../../database/Model';
import {SavePermissionsToDatabse,RetrieveSinglePermissionFromDatabse,UpdatePermissionsFromDatabse} from '../../database/SQLite_DB';
import useBLE from '../../useBLe';

const AllUserContactsScreen = ({navigation}) => {
  const {requestContactsPermissions,requestPermissions} = useBLE();
  const [contactPermission,setContactPermission]=useState<boolean>(false);
 
  const[allUserContacts,setAllUserContacts]=useState<Contact[]>([]);

  useEffect(() => {
    // get permissions
    requestContactsPermissions((granted: boolean) => {
      setContactPermission(granted);
      const permission_name = 'contactsPermission';
      RetrieveSinglePermissionFromDatabse('permissions', '', permission_name)
        .then((value) => {
          console.log(value);
          const data: PermissionModel = {
            permissionName: permission_name,
            permissionState: granted,
            permissionID: (value.length > 0) ? value[0].permissionID : 0,
          };
          if (value.length > 0) {
            UpdatePermissionsFromDatabse('permissions', data, '');
          } else {
            SavePermissionsToDatabse('permissions', data, '');
          };


          getAll()
            .then((contacts) => {
              if (granted) {
                setAllUserContacts(contacts);
              }else{
                return;
              }
            })
            .catch((e) => {
              Alert.alert('Warning!', e.message());
            });
        });

    });
  }, []);

  const getItem=(_data, index)=>{
    return _data[index];
  };
  
  console.log(contactPermission);

  console.log("data\t"+JSON.stringify(allUserContacts));

  return (
    <View className="flex-1 pt-4 bg-[#eff2fa]">
      {(allUserContacts.length > 0 ) ? (
          <VirtualizedList
            data={allUserContacts}
            initialNumToRender={9}
            renderItem={(contact) =><SingleContactComponent userData={contact} key={contact.index} navigation={navigation} />}
            getItemCount={(data)=>data.length}
            keyExtractor={(contact:Contact)=>contact.recordID}
            getItem={getItem}
            refreshing={true}
          />

        ) : (
          <View className="items-center mt-10 w-12 h-12 bg-white justify-center rounded-full shadow-md self-center">
            <ActivityIndicator size={30} color={'#f00100'} />
          </View>
        )
      }
    </View>
    
  );
};

export default AllUserContactsScreen;

const styles = StyleSheet.create({});
