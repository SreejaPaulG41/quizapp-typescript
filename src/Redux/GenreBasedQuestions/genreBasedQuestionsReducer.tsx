import {genreBasedQuestionConstant} from './genreBasedQuestionsConstant';

type answerOptionArr = {
    answerText: string;
    isCorrect: boolean;
}

type allQuestionArr = {
    questionId: number;
    genreId: string;
    questionText: string;
    questionMark: number;
    timeAlloted: number;
    answerOptions: answerOptionArr[];
}

type question = {
    genreBasedQuestionData : allQuestionArr[]
}

type actionType = {
    type: string;
    questionArrDetails: allQuestionArr[]
}
const initialState: question = {
    genreBasedQuestionData: []
}
const genreBasedQuestionReducer = (state = initialState , action: actionType)=>{
    switch (action.type) {
        case genreBasedQuestionConstant.GET_GENRE_BASED_QUESTION:
            return {
                ...state,
                genreBasedQuestionData: action.questionArrDetails
            }
            
        case genreBasedQuestionConstant.GET_GENRE_BASED_QUESTION_RESPONSE:
            return {
                ...state,
                genreBasedQuestionData: action.questionArrDetails
            }

        case genreBasedQuestionConstant.GOT_ERROR_FROM_GENRE_BASED_QUESTION_RESPONSE:
            return {
                ...state,
                msg: "Something Went Wrong!"
            }
        default:
            return {
                ...state
            }
    }
}

export default genreBasedQuestionReducer;