import { deleteQuestionConstants } from "./deleteQuestionConstants";

type stateType = {
    successMessage: string;
    errorMessage: string;
}
type responseType = {
    response: string;
}
type actionType = {
    type: string;
    questionDeleteDetails?: responseType;
    msg?: string;
}
const initialState = {
    successMessage: '',
    errorMessage: ''
}
const deleteQuestionReducer = (state: stateType = initialState, action: actionType): stateType=>{
    switch(action.type){
        case deleteQuestionConstants.ON_SUCCESSFUL_DELETE:
            const dataToShow = action?.questionDeleteDetails?.response;
            console.log(action?.questionDeleteDetails)
            return {...state, successMessage: dataToShow!, errorMessage: ''}
        case deleteQuestionConstants.ON_DELETE_ERROR:
            const errorToShow = action?.msg;
            return {...state, errorMessage: errorToShow!, successMessage: ''}
        case deleteQuestionConstants.CLEARING_RESPONSE:
            return {...state, errorMessage: '', successMessage: ''}
        default: 
            return {...state}
    }
}

export default deleteQuestionReducer;