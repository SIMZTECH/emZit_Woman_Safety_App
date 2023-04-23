/* eslint-disable prettier/prettier */
export type ContactsModel = {
    rowID:number,
    contactID:number,
    contactName:string,
    contactNumber:string,
    contactPriority:boolean,
    createdAt:string,
};

// permission model
export type PermissionModel={
    permissionID:number,
    permissionName:string,
    permissionState:boolean,
};