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

import { openDatabase,enablePromise,SQLiteDatabase} from 'react-native-sqlite-storage';

enablePromise(true);

type dataToSave=[];

// init databse
const db=openDatabase({ name:'emergencyApp', location: 'default' });

// create table 
export const creatTable = async (table: string, query: string) => {
    try {
        (await db).transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS ${table}(
                        contactID INTEGER PRIMARY KEY AUTOINCREMENT,
                        phoneNumber VARCHAR(20),
                        nameTitle VARCHAR(10),
                        priority BOOLEAN,
                        createdAt TIMESTAMP
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

//save into table
export const saveToDatabse=async(table:string,data:dataToSave[],query:string)=>{
    try {
        (await db).transaction(tx=>{
            data.map((value,index)=>{
                tx.executeSql(
                    `INSERT INTO ${table}(phoneNumber,nameTitle,priority) VALUES(?,?,?)`,
                    [value.phone,value.name,value.priority],
                    () => {
                        console.log(`${table}` + ' ' + 'table inserted with data successfully');
                    },
                    (error) => {
                        console.log(`${table}` + ' ' + 'table failed to be inserted with data' + ' ' + error);
                    }
                );

            });//end of map loop 
        });
        
    } catch (error) {
        
    }

};

// retrieve data from databse
export const GetFromDatabse=async(table:string,query:string,DB:SQLiteDatabase):Promise <any>=>{
    try {
        const results= await DB.executeSql(`SELECT * FROM ${table} ORDER BY contactID DESC LIMIT 5`);
        let Data:any=[];

        if(results.length>0){
            results.forEach((value)=>{

                for(let index=0; index<value.rows.length;index++){
                    Data.push(value.rows.item(index));
                }
            });

        }else{
            console.log('failed to Retrieve Data Successfully');
        }
        return Data;
        
    } catch (error) {
        
    }

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



export default {creatTable,deleteItemFromDatabase,saveToDatabse,GetFromDatabse,dropTable};

