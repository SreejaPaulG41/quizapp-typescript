import { loginConstants } from './loginConstants';

type logInInfoType = {
    email: string;
    password: string;
}

export const loginAction = {
    logInUser: (loginUserInfo: logInInfoType)=>{
        return {
            type: loginConstants.LOG_USER_IN,
            payload: loginUserInfo
        }
    },
    logOutUser: ()=>{
        return {
            type: loginConstants.LOG_OUT_ACTION
        }
    }
}