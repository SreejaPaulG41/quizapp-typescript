import { loginConstants } from './loginConstants';

type userInfoType = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}
type stateType = {
    jwtToken: string;
    userInfo: userInfoType;
}

type actionType = {
    type: string;
    loggedUserInfo: stateType;
}
const initialState: stateType = {
    jwtToken: '',
    userInfo: { id: 0, firstName: '', lastName: '', email: '' }
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
                jwtToken: ''
            }
        default:
            return { ...state }
    }
}

export default loginReducer;