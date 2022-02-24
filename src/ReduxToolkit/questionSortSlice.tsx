import { createSlice } from "@reduxjs/toolkit";
import {questions} from '../Data/questions';
import {sliceNames} from './storeConstants';

export type answerOptionArr = {
    answerText: string;
    isCorrect: boolean;
}

export type allQuestionArr = {
    questionId: number;
    genreId: string;
    questionText: string;
    questionMark: number;
    timeAlloted: number;
    answerOptions: answerOptionArr[];
}

export interface questionSortSlice {
    genreBasedQuestionData: allQuestionArr[],
    onLoadUnAnseredQuestion: allQuestionArr[],
    genreBasedQuestionTime: number,
    genreBasedQuestionFullMarks: number,
}
const initialState: questionSortSlice = {
    genreBasedQuestionData: [],
    onLoadUnAnseredQuestion: [],
    genreBasedQuestionTime: 0,
    genreBasedQuestionFullMarks: 0,
}

const questionSortSlice = createSlice({
    name: sliceNames.QUESTION_SORTING_ACCORDING_TO_GENRE,
    initialState,
    reducers:{ //will contain the reduece functions
        genreBasedQuestionSort: (state = initialState , action)=>{
            const allQuestions = questions;
            const filterQuestions = allQuestions.filter((item)=>{
                return item.genreId === action.payload;
            })
            state.genreBasedQuestionData = filterQuestions;    
            const timeAlloted = state.genreBasedQuestionData.reduce((acc, item)=>{
                acc = acc + item.timeAlloted;
                return acc;
            },0)     
            state.genreBasedQuestionTime = timeAlloted;
            const fullMarks = state.genreBasedQuestionData.reduce((acc, item)=>{
                acc = acc + item.questionMark;
                return acc;
            },0)
            state.genreBasedQuestionFullMarks = fullMarks;   
        },
        firstLoadUnAnsweredQuestion: (state = initialState)=>{
            const allGenreBasedQues : any = state.genreBasedQuestionData;
            const onLoadArr = [...state.onLoadUnAnseredQuestion, allGenreBasedQues]
            state.onLoadUnAnseredQuestion = allGenreBasedQues;
        }
    }
})

export const {genreBasedQuestionSort, firstLoadUnAnsweredQuestion} = questionSortSlice.actions;

export default questionSortSlice.reducer;