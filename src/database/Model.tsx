/* eslint-disable prettier/prettier */
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

export type ProfileModel = {
    userID:number,
    firstName:String,
    lastName:String,
    emailAddress:String,
    phone1:String,
    phone2:String,
    dateOfBirth:String,
    homeAddress:String,
    userAge:number,
    height:String,
    weight:String,
    bloodGroup:String,
    animals:String,
    fruits:String,
    regDate:String
};

export type userMainDetals = {
    firstName: String,
    lastName: String,
    emailAddress: String,
    phone1: String,
    phone2: String,
}

export type otherDetails = {
    dateOfBirth:String,
    homeAddress:String,
    userAge:number;
}

export type combinedUserProfileDetails = {
    firstSection: userMainDetals,
    secondSection: otherDetails,
}

export type completeFullUserOtherDetails = {
    height: String,
    weight: String,
    bloodGroup: String,
    animals:String,
    fruits: String,
}

// user details
export type UserProfile={
    main:combinedUserProfileDetails,
    other:completeFullUserOtherDetails,
    regDate:String,
}

