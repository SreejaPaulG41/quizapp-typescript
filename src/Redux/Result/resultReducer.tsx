import { resultConstants } from './resultConstants';

type answerOptionType = {
    isCorrect: boolean;
    answerText: string;
}
type resultArr = {
    questionId: number;
    questionText: string;
    questionMark: number;
    timeAlloted: number;
    answerOptions: answerOptionType[];
    genreId: string;
    givenAnswerText: string;
    rightNess: boolean;
    answerGiven: boolean;
}

type stateType = {
    resultArr: resultArr[] | any;
    msg: string;
}
type actionType = {
    type: string;
    payload?: string;
    resultArr?: resultArr[];
}
const initialState: stateType = {
    resultArr: [],
    msg: ''
}
const resultReducer = (state = initialState, action: actionType)=>{
    switch(action.type){
        case resultConstants.GET_RESULT_RESPONSE:
            const dataToShow = action.resultArr;
            return {...state, resultArr: dataToShow}
        case resultConstants.GET_RESULT_ERROR:
            console.log(action.payload)
            return {...state, msg: "Something Went Wrong!"}
        default:
            return {...state}
    }
}

export default resultReducer;