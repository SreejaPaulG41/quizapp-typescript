import { signUpConstants } from './signUpConstants';

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
    userInfo: stateType;
}
const initialState: stateType = {
    jwtToken: '',
    userInfo: { id: 0, firstName: '', lastName: '', email: '' }
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
        default:
            return { ...state }
    }
}

export default signUpReducer;