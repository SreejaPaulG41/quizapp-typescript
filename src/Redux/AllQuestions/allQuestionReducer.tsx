import { allQuestionConstants } from './allQuestionConstants';

interface answerOptions {
    isCorrect: boolean;
    answerText: string;
}
interface questionType {
    questionId: number;
    questionText: string;
    questionMark: number;
    timeAlloted: number;
    answerOptions: answerOptions[];
    genreName: string;
}

type stateType = {
    questions: questionType[],
    msg: string;
}
type actionType = {
    type: string;
    allQuestionData?: questionType[];
    msg?: string;
}
const initialState: stateType = {
    questions: [],
    msg: ''
}

const allQuestionReducer = (state: stateType = initialState, action: actionType) : stateType =>{
    switch(action.type){
        case allQuestionConstants.ON_SUCCESSFUL_ALL_QUESTION_RES:
            const dataToStore = action.allQuestionData;
            return {...state, questions: dataToStore!}
        case allQuestionConstants.ON_ERROR_ALL_QUESTION_RES:
            const errorToShow = action.msg;
            return {...state, msg: errorToShow!}
        default:
            return {...state}
    }
}

export default allQuestionReducer;