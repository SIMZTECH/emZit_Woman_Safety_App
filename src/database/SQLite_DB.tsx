/* eslint-disable semi-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable space-infix-ops */
/* eslint-disable no-trailing-spaces */
/* eslint-disable keyword-spacing */
/* eslint-disable no-extra-semi */
/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React,{useState} from 'react';
import { openDatabase,enablePromise,SQLiteDatabase, Transaction} from 'react-native-sqlite-storage';
import { PermissionModel} from './Model';
import { ContactsModelModified } from './Model';
import { ToastAndroid } from 'react-native';
import { UserProfile } from './Model';
import { ProfileModel } from './Model';

enablePromise(true);

// init databse
const db=openDatabase({ name:'emergencyApp', location: 'default' });

// create table 
export const creatContactsTable = async (table: string, query: string) => {
    try {
        (await db).transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS ${table}(
                        rowID INTEGER PRIMARY KEY AUTOINCREMENT,
                        recordID VARCHAR(20),
                        contactName VARCHAR(20),
                        contactNumber VARCHAR(20),
                        contactPriority BOOLEAN,
                        createdAt TIMESTAMP CURRENT_TIMESTAMP
                    )`,
                [],
                () => {
                    console.log(`${table}` + ' ' + 'table created successfully');
                },
                (error) => {
                    console.log(`${table}` + ' ' + 'failed to be created' + ' ' + error);
                }
            );
        });

    } catch (error) {
        console.log(error);
    }

};



// create Ptofile table table 
export const creatUserProfileTable = async (table: string, query: string) => {
    try {
        (await db).transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS ${table}(
                        userID INTEGER PRIMARY KEY AUTOINCREMENT,
                        firstName VARCHAR(20),
                        lastName VARCHAR(20),
                        emailAddress VARCHAR(20),
                        phone1 VARCHAR(20),
                        phone2 VARCHAR(20),
                        dateOfBirth VARCHAR(20),
                        homeAddress VARCHAR(20),
                        userAge INTEGER,
                        height VARCHAR(20),
                        weight VARCHAR(20),
                        bloodGroup VARCHAR(20),
                        animals VARCHAR(20),
                        fruits VARCHAR(20),
                        regDate VARCHAR(20)
                    )`,
                [],
                () => {
                    console.log(`${table}` + ' ' + 'table created successfully');
                },
                (error) => {
                    console.log(`${table}` + ' ' + 'failed to be created' + ' ' + error);
                }
            );
        });

    } catch (error) {
        console.log(error);
    }

};

// create permision table
export const creatPermissionTable = async (table: string, query: string) => {
    try {
        (await db).transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS ${table}(
                    permissionID INTEGER PRIMARY KEY AUTOINCREMENT,
                    permissionName VARCHAR(20),
                    permissionState BOOLEAN
                    )`,
                [],
                () => {
                    console.log(`${table}` + ' ' + 'permission table created successfully');
                },
                (error) => {
                    console.log(`${table}` + ' ' + 'permission table failed to be created' + ' ' + error);
                }
            );
        });

    } catch (error) {
        console.log(error);
    }
};

// save permisions
export const SavePermissionsToDatabse=async(table:string,data:PermissionModel,query:string)=>{
    try {
        (await db).transaction(tx =>{
            tx.executeSql(
                `INSERT INTO ${table}(permissionName,permissionState) VALUES(?,?)`,
                [data.permissionName,data.permissionState],
                ()=>{
                    console.log(`${table}` + ' ' + 'table inserted with data successfully');
                },
                (error)=>{
                    console.log(`${table}` + ' ' + 'table failed to be inserted with data' + ' ' + error);
                }
            );
        });
 
    } catch (error) {
    
    };
};

// get permissions from database
export const GetPermissionsFromDatabse=async(table:string,query:string):Promise <PermissionModel[]>=>{
    const DB:SQLiteDatabase=await db;

    let Data:PermissionModel[]=[];
    try {
        const results= await DB.executeSql(`SELECT * FROM ${table} ORDER BY permissionID DESC LIMIT 5`);
        if(results.length>0){
            results.forEach((value)=>{

                for(let index=0; index<value.rows.length;index++){
                    Data.push(value.rows.item(index));
                }
            });

        }else{
            console.log('failed to Retrieve Data Successfully');
        }

    } catch (error) {
        
    }

    return Data;
};

// update permisions
export const UpdatePermissionsFromDatabse=async(table:string,data:PermissionModel,query:string)=>{
     
    try {
        (await db).transaction(tx =>{
                tx.executeSql(
                    `UPDATE ${table} SET permissionState=? WHERE permissionID=?`,
                    [data.permissionState,data.permissionID],
                    ()=>{
                        console.log(`${table}` + ' ' + 'table updated successfully');
                    },
                    (error)=>{
                        console.log(`${table}` + ' ' + 'table failed to be updated' + ' ' + error);
                    }
                );
        });
    } catch (error) {
    
    };
};


//save into table
export const SaveContactToDatabse=async(table:string,data:ContactsModelModified,query:string)=>{
    
    try {
        (await db).transaction(tx =>{
            tx.executeSql(
                `INSERT INTO ${table}(recordID,contactName,contactNumber,contactPriority) VALUES(?,?,?,?)`,
                [data.recordID,data.contactName,data.contactNumber,data.contactPriority],
                ()=>{
                    console.log(`${table}` + ' ' + 'table inserted with data successfully');
                    ToastAndroid.show(`Contact Set as ${(data.contactPriority)?'High':'Low'} Priority`,ToastAndroid.SHORT);
                },
                (error)=>{
                    console.log(`${table}` + ' ' + 'table failed to be inserted with data' + ' ' + error);
                }
            );
        });
 
    } catch (error) {
    
    };
};
           

export const SaveUserProfile = async (table: string, data: UserProfile, query: string): Promise<Boolean> => {
    
    (await db).transaction(txt => {
        txt.executeSql(
            `INSERT INTO ${table}(firstName,lastName,emailAddress,phone1,phone2,dateOfBirth,homeAddress,userAge,height,weight,bloodGroup,animals,fruits,regDate) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [data.main.firstSection.firstName,data.main.firstSection.lastName,data.main.firstSection.emailAddress,data.main.firstSection.phone1,data.main.firstSection.phone2,data.main.secondSection.dateOfBirth,data.main.secondSection.homeAddress,data.main.secondSection.userAge,data.other.height,data.other.weight,data.other.bloodGroup,data.other.animals,data.other.fruits,data.regDate],
            (success) => {
                console.log('profile created successfully');
            },
            (error) => {
                console.log('error saving profile');
            }
        );
    });

    return true;
};

// retrieve data from databse
export const GetContactsFromDatabse=async(table:string,query:string):Promise <ContactsModelModified[]>=>{
    const DB:SQLiteDatabase=await db;

    let Data:ContactsModelModified[]=[];
    try {
        const results= await DB.executeSql(`SELECT * FROM ${table} ORDER BY rowID DESC LIMIT 5`);
        if(results.length>0){
            results.forEach((value)=>{

                for(let index=0; index<value.rows.length;index++){
                    Data.push(value.rows.item(index));
                }
            });

        }else{
            console.log('failed to Retrieve Data Successfully');
        }

    } catch (error) {
        
    }

    return Data;
};

// retrieve data from databse
export const GetUserProfile=async(table:string,query:string):Promise <ProfileModel[]>=>{
    const DB:SQLiteDatabase=await db;

    let Data:ProfileModel[]=[];

    try {
        const results= await DB.executeSql(`SELECT * FROM ${table}`);
        if(results.length>0){
            results.forEach((value)=>{
                for(let index=0; index<value.rows.length;index++){
                    Data.push(value.rows.item(index));
                }
            });

        }else{
            console.log('failed to Retrieve user profile');
        }

    } catch (error) {
        
    }

    return Data;
};

export const RetrieveSinglePermissionFromDatabse=async(table:string,query:string,permissionName:string):Promise <PermissionModel[]>=>{
    const DB:SQLiteDatabase=await db;

    let Data:PermissionModel[]=[];
    try {
        const results= await DB.executeSql(`SELECT * FROM ${table} WHERE permissionName=?`,[permissionName]);
        if(results.length>0){
            results.forEach((value)=>{

                for(let index=0; index<value.rows.length;index++){
                    Data.push(value.rows.item(index));
                }
            });

        }else{
            console.log('failed to Retrieve Data Successfully');
        }
    } catch (error) {
        
    }
    return Data;
};


// retrieve single contact from database
// retrieve data from databse
export const RetrieveSingleContactFromDatabse=async(table:string,query:string,id:number):Promise <ContactsModelModified[]>=>{
    const DB:SQLiteDatabase=await db;

    let Data:ContactsModelModified[]=[];
    try {
        const results= await DB.executeSql(`SELECT * FROM ${table} WHERE recordID=?`,[id]);
        if(results.length>0){
            results.forEach((value)=>{
                for(let index=0; index<value.rows.length;index++){
                    Data.push(value.rows.item(index));
                }
            });
        }else{
            console.log('failed to Retrieve Data Successfully');
        }
    } catch (error) {
        
    }
    return Data;
};

// delete item from database
export const DeleteContactFromDatabase=async(table:string,id:String,query:string):Promise <Boolean>=>{

    try {
        (await db).transaction(tx=>{
            tx.executeSql(
                `DELETE FROM ${table} WHERE recordID=?`,
                [id],
                () => {
                    console.log(`${table}` + ' ' + 'table item deleted successfully');
                    ToastAndroid.show('Contact deleted successfully',ToastAndroid.SHORT);
                },
                (error) => {
                    console.log(`${table}` + ' ' + 'table failed to delete item' + ' ' + error);
                }
            );
        });
        
    } catch (error) {
        
    }

};


// drop table
export const dropTable=async(table:string,query:string)=>{
    try {
        (await db).transaction(tx=>{
            tx.executeSql(
                `DROP TABLE ${table}`,
                [],
                () => {
                    console.log(`${table}` + ' ' + 'table dropped successfully');
                },
                (error) => {
                    console.log(`${table}` + ' ' + 'table failed to be dropped' + ' ' + error);
                }
            );
        });
        
    } catch (error) {
        
    }
};




export default {
    creatContactsTable,
    DeleteContactFromDatabase,
    SaveContactToDatabse,
    GetContactsFromDatabse,
    dropTable,
    RetrieveSingleContactFromDatabse,
    creatPermissionTable,
    UpdatePermissionsFromDatabse,
    SavePermissionsToDatabse,
    GetPermissionsFromDatabse,
    RetrieveSinglePermissionFromDatabse,
    creatUserProfileTable,
    SaveUserProfile,
};

