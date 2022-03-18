import { signUpConstants } from './signUpConstants';

type userInformation = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const signUpActions = {
    userSignUpHandler: (userInfo: userInformation)=>{
        return {
            type: signUpConstants.SIGN_USER_UP,
            payload: userInfo
        }
    },
    singedUpLogOut: ()=>{
        return {
            type: signUpConstants.LOGGED_OUT_ACTION
        }
    }
}