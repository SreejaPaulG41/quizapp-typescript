import { newQuestionAddConstant } from './newQuestionAddConstant';

type stateType = {
    successfuMsg: string;
    errorMsg: string;
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
    successfuMsg: '',
    errorMsg: ''
}
const newQuestionAddReducer = (state: stateType = initialState, action: actionType): stateType =>{
    switch(action.type){
        case newQuestionAddConstant.ON_SUCCESSFUL_QUESTION_ADD:
            return {...state}
        case newQuestionAddConstant.ON_ERROR_IN_QUESTION_ADD:
            return {...state}
        default:
            return {...state}
    }
}

export default newQuestionAddReducer;