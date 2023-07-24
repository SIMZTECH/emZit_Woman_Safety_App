/* eslint-disable prettier/prettier */
// find here all the methods used in this project
import { userMainDetals,otherDetails,completeFullUserOtherDetails} from "../database/Model";
import { Dimensions } from "react-native";


// user input validation method
export const validateUserDetails=(_object:userMainDetals)=>{
    return (_object.firstName=='' || _object.lastName=='' || _object.emailAddress=='' || _object.phone1=='')?true:false;
}

export const validateUserDetailsTwo=(_object:otherDetails)=>{
    return (_object.dateOfBirth=='' || _object.homeAddress=='')?true:false;
}

export const validateUserDetailsComplete=(_object:completeFullUserOtherDetails)=>{
    return (_object.weight=='' || _object.height=='' || _object.bloodGroup=='')?true:false;
}


// widows dimensions

export const {height,width} = Dimensions.get('window');
