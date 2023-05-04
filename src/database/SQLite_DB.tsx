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
import { openDatabase,enablePromise,SQLiteDatabase} from 'react-native-sqlite-storage';
import { ContactsModel,PermissionModel} from './Model';
import { ToastAndroid } from 'react-native';


enablePromise(true);

// init databse
const db=openDatabase({ name:'emergencyApp', location: 'default' });

// create table 
export const creatTable = async (table: string, query: string) => {
    try {
        (await db).transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS ${table}(
                        rowID INTEGER PRIMARY KEY AUTOINCREMENT,
                        contactID INTEGER,
                        contactNumber VARCHAR(20),
                        contactName VARCHAR(10),
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
export const SaveToDatabse=async(table:string,data:ContactsModel,query:string)=>{
    try {
        (await db).transaction(tx =>{
            tx.executeSql(
                `INSERT INTO ${table}(contactID,contactNumber,contactName,contactPriority) VALUES(?,?,?,?)`,
                [data.contactID,data.contactNumber,data.contactName,data.contactPriority],
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

// retrieve data from databse
export const GetFromDatabse=async(table:string,query:string):Promise <ContactsModel[]>=>{
    const DB:SQLiteDatabase=await db;

    let Data:ContactsModel[]=[];
    try {
        const results= await DB.executeSql(`SELECT * FROM ${table} ORDER BY contactID DESC LIMIT 5`);
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
export const RetrieveSingleContactFromDatabse=async(table:string,query:string,id:number):Promise <ContactsModel[]>=>{
    const DB:SQLiteDatabase=await db;

    let Data:ContactsModel[]=[];
    try {
        const results= await DB.executeSql(`SELECT * FROM ${table} WHERE contactID=?`,[id]);
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
export const deleteItemFromDatabase=async(table:string,id:number,query:string)=>{
    try {
        (await db).transaction(tx=>{
            tx.executeSql(
                `DELETE FROM ${table} WHERE contactID=?`,
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



export default {creatTable,
    deleteItemFromDatabase,
    SaveToDatabse,
    GetFromDatabse,
    dropTable,
    RetrieveSingleContactFromDatabse,
    creatPermissionTable,
    UpdatePermissionsFromDatabse,
    SavePermissionsToDatabse,
    GetPermissionsFromDatabse,
    RetrieveSinglePermissionFromDatabse,
};

