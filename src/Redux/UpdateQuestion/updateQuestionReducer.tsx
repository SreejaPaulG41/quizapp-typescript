import { updateQuestionConstants } from './updateQuestionConstants';

type successObj = {
    response: string;
}

type errorObj = {
    data: string;
    statusCode: number;
}
type stateType = {
    successMsg: string;
    errorMsg: string;
}
type actiontype = {
    type: string;
    successRes?: successObj;
    errorRes?: errorObj;

}
const initialState: stateType = {
    successMsg: '',
    errorMsg: ''
}
const updateQuestionReducer = (state: stateType = initialState, action: actiontype): stateType =>{
    switch(action.type){
        case updateQuestionConstants.ON_SUCCESSFUL_QUESTION_UPDATE:
            const dataToShow = action?.successRes?.response;
            console.log(action?.successRes?.response)
            return {...state, successMsg: dataToShow!, }
        case updateQuestionConstants.ON_ERROR_ON_QUESTION_UPDATE:
            const error = action?.errorRes?.data;
            console.log(action?.errorRes?.data)
            return {...state, errorMsg: error!, successMsg: ''}
        case updateQuestionConstants.CLEARING_RESPONSE:
            return {...state, errorMsg: '', successMsg: ''}
        default:
            return { ...state }
    }
}

export default updateQuestionReducer;