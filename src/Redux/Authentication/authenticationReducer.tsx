import { authenticationConstants } from './authenticationConstants';

type errorObj = {
    data: string;
    statusCode: number;

}
type stateType = {
    userValid?: boolean;
    msg?: errorObj;
}
type actionType = {
    type: string;
    validUser?: boolean;
    msg: errorObj;
}
const initialState: stateType = {
    userValid: false,
    msg: {data: '', statusCode: 0}
}
const authenticationReducer = (state = initialState, action: actionType) =>{
    switch(action.type){
        case authenticationConstants.USER_VALID_RESPONSE:
            return {...state, userValid: true}
        case authenticationConstants.USER_NOT_VALID_RESPONSE:
            return {...state,userValid: false, msg: action.msg}
        default:
            return {...state}
    }
}

export default authenticationReducer;