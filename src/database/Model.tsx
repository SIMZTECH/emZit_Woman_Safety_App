/* eslint-disable prettier/prettier */
// export type ContactsModel = {
//     rowID:number,
//     contactID:number,
//     contactName:string,
//     contactNumber:string,
//     contactPriority:boolean,
//     createdAt:string,
// };

export type ContactsModelModified = {
    rowID:number,
    recordID:String,
    contactPriority:Boolean,
    createdAt:String,
    contactName:String;
    contactNumber:String;
};

// permission model
export type PermissionModel={
    permissionID:number,
    permissionName:string,
    permissionState:boolean,
};

export type GeolocationModel={
    latitude:number,
    longitude:number,
    latitudeDelta:number,
    longitudeDelta:number,
    accuracy:number,
    altitude:number,
    heading:number,
    isFromMockProvider:boolean,
    timestamp:number
};