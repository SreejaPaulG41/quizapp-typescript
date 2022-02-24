import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './store';
import {genreBasedQuestionSort, firstLoadUnAnsweredQuestion} from './questionSortSlice';
import {storeAnswerHandler, storeUnAnsweredHandler, submittedAnswerHandler, showPreviousAnswerHandler} from './givenAnswerListSlice';

interface prevAnswer {
    questionId: number;
}

interface answerOptionArr {
    answerText: string;
    isCorrect: boolean;
}
interface onLoadUnAnswered {
    questionId: number;
    genreId: string;
    questionText: string;
    questionMark: number;
    timeAlloted: number;
    answerOptions: answerOptionArr[];
}
interface onBlackResponse{
    questionId: number;
    givenAnswerText: string;
    rightNess: boolean;
    answerGiven: boolean;
}
interface onAnsweredRespone {
    questionId: number;
    givenAnswerText: string;
    rightNess: boolean;
    answerGiven: boolean;
}
function useStateHandler() {
    const genreDetails = useSelector((state : RootState) => state.genreRender.genreDetails);
    //const questionData = useSelector((state : RootState) =>state.genreBasedQuestions.questionData);
    const genreBasedQuestionData = useSelector((state : RootState) =>state.genreBasedQuestions.genreBasedQuestionData);
    const onLoadUnAnseredQuestion = useSelector((state : RootState) =>state.genreBasedQuestions.onLoadUnAnseredQuestion);
    const answerArr = useSelector((state : RootState) =>state.answerStoreHandler.answerArr);
    const unAnsweredArray = useSelector((state : RootState) =>state.answerStoreHandler.unAnsweredArr);
    const submittedAnswerArr = useSelector((state : RootState) =>state.answerStoreHandler.submittedAns);
    const prevAnswer = useSelector((state : RootState) =>state.answerStoreHandler.previousQuestionAnswer);
    const genreBasedQuestionTime = useSelector((state : RootState) =>state.genreBasedQuestions.genreBasedQuestionTime);
    const genreBasedQuestionFullMarks = useSelector((state : RootState) =>state.genreBasedQuestions.genreBasedQuestionFullMarks);
    
    
    const dispatch = useDispatch();

    const genreBasedSortQuestionHandler = (genreId: string)=>{
        dispatch(genreBasedQuestionSort(genreId))
    }
    const getUnAnsweredQuestionOnFirstLoad = ()=>{
        dispatch(firstLoadUnAnsweredQuestion());
    }
    const storeGivenAnswerHandler = (answer: onAnsweredRespone)=>{
        dispatch(storeAnswerHandler(answer))
    }
    const storeNotAnsweredHandler = (answers: onLoadUnAnswered[] | onBlackResponse)=>{
        dispatch(storeUnAnsweredHandler(answers));
    }
    const submitGivenAnswerHandler = ()=>{
        dispatch(submittedAnswerHandler());
    }
    const previousQuestionAnswerHandler = (answer: prevAnswer)=>{
        dispatch(showPreviousAnswerHandler(answer));
    }
    return {genreDetails, genreBasedQuestionData, onLoadUnAnseredQuestion, answerArr, unAnsweredArray, submittedAnswerArr, prevAnswer, genreBasedQuestionTime,
         genreBasedQuestionFullMarks, genreBasedSortQuestionHandler, getUnAnsweredQuestionOnFirstLoad, storeGivenAnswerHandler, storeNotAnsweredHandler, submitGivenAnswerHandler, 
         previousQuestionAnswerHandler}
  
}

export default useStateHandler;