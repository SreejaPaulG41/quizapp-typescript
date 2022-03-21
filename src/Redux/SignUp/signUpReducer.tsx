import { signUpConstants } from './signUpConstants';

type userInfoType = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

type errorObj = {
    data: string;
    statusCode: number;

}
type stateType = {
    jwtToken?: string;
    userInfo?: userInfoType;
    msg?: errorObj;
}

type actionType = {
    type: string;
    userInfo: stateType;
    msg: errorObj;
}
const initialState: stateType = {
    jwtToken: '',
    userInfo: { id: 0, firstName: '', lastName: '', email: '' },
    msg: {data: '', statusCode: 0}
}

const signUpReducer = (state = initialState, action: actionType) => {
    switch (action.type) {
        case signUpConstants.SUCCESSFUL_USER_SIGN_UP:
            const token = action.userInfo.jwtToken;
            const user = action.userInfo.userInfo;
            return {
                ...state,
                jwtToken: token,
                userInfo: user
            }
        case signUpConstants.LOGGED_OUT_ACTION:
            return {
                ...state,
                jwtToken: ''
            }
        case signUpConstants.ERROR_AS_RESPONSE:
            return {
                ...state,
                msg: action.msg
            }
        default:
            return { ...state }
    }
}

export default signUpReducer;