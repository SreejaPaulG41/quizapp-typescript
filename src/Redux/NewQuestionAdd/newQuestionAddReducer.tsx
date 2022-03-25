import { newQuestionAddConstant } from './newQuestionAddConstant';

type stateType = {
    successfulMsg: string;
    errorMsg: errorObj;
}
type errorObj = {
    data: string;
    statusCode: number;

}
type successObj = {
    response: string;
}
type actionType = {
    type: string;
    successRes: successObj;
    errorRes: errorObj;
}
const initialState: stateType = {
    successfulMsg: '',
    errorMsg: {data: '', statusCode: 0}
}
const newQuestionAddReducer = (state: stateType = initialState, action: actionType): stateType =>{
    switch(action.type){
        case newQuestionAddConstant.ON_SUCCESSFUL_QUESTION_ADD:
            const data = action.successRes.response;
            return {...state, successfulMsg: data, errorMsg: {data: '', statusCode: 0}}
        case newQuestionAddConstant.ON_ERROR_IN_QUESTION_ADD:
            const dataToShow = action.errorRes;
            return {...state, errorMsg: dataToShow, successfulMsg: ''}
        default:
            return {...state}
    }
}

export default newQuestionAddReducer;