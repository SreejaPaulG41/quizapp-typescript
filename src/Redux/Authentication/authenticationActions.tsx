import { authenticationConstants } from './authenticationConstants';

export const authenticationActions = {
    getUserValidity: ()=>{
        return {
            type: authenticationConstants.GET_USER_VALID_OR_NOT
        }
    }
}