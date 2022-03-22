import { loginConstants } from './loginConstants';

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
    loggedUserInfo: stateType;
    msg: errorObj;
}
const initialState: stateType = {
    jwtToken: '',
    userInfo: { id: 0, firstName: '', lastName: '', email: '' },
    msg: {data: '', statusCode: 0}
}
const loginReducer = (state = initialState, action: actionType) => {
    switch (action.type) {
        case loginConstants.SUCCESSFUL_LOG_IN:
            const token = action.loggedUserInfo.jwtToken;
            const user = action.loggedUserInfo.userInfo;
            return {
                ...state,
                jwtToken: token,
                userInfo: user
            }
        case loginConstants.LOG_OUT_ACTION:
            return {
                ...state,
                jwtToken: '',
                userInfo: { id: 0, firstName: '', lastName: '', email: '' },
            }
        case loginConstants.ERROR_IN_LOGIN:
            return {
                ...state,
                msg: action.msg
            }
        default:
            return { ...state }
    }
}

export default loginReducer;