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
    genreBasedQuestionData : allQuestionArr[],
    onLoadUnAnseredQuestion: allQuestionArr[],
    genreBasedQuestionTime: number,
    genreBasedQuestionFullMarks: number,
}

type actionType = {
    type: string;
    questionArrDetails: allQuestionArr[]
}
const initialState: question = {
    genreBasedQuestionData: [],
    onLoadUnAnseredQuestion: [],
    genreBasedQuestionTime: 0,
    genreBasedQuestionFullMarks: 0,

}
const genreBasedQuestionReducer = (state = initialState , action: actionType)=>{
    switch (action.type) {
        case genreBasedQuestionConstant.GET_GENRE_BASED_QUESTION:
            const filteredQuestion = action.questionArrDetails;
            const timeAlloted = filteredQuestion?.reduce((acc, item)=>{
                acc = acc + item.timeAlloted;
                return acc;
            },0);
            const fullMarks = filteredQuestion?.reduce((acc, item)=>{
                acc = acc + item.questionMark;
                return acc;
            },0); 
            return {
                ...state,
                genreBasedQuestionData: filteredQuestion,
                onLoadUnAnseredQuestion: filteredQuestion,
                genreBasedQuestionTime: timeAlloted,
                genreBasedQuestionFullMarks: fullMarks
            }
            
        case genreBasedQuestionConstant.GET_GENRE_BASED_QUESTION_RESPONSE:
            const filteredQuestionRes = action.questionArrDetails;
            const totalTimeAlloted = filteredQuestionRes?.reduce((acc, item)=>{
                acc = acc + item.timeAlloted;
                return acc;
            },0);
            const totalMarks = filteredQuestionRes?.reduce((acc, item)=>{
                acc = acc + item.questionMark;
                return acc;
            },0); 
            return {
                ...state,
                genreBasedQuestionData: filteredQuestionRes,
                onLoadUnAnseredQuestion: filteredQuestionRes,
                genreBasedQuestionTime: totalTimeAlloted,
                genreBasedQuestionFullMarks: totalMarks
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