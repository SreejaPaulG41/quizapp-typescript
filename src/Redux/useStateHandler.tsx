import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from './rootReducer';
import {genreActions} from './Genres/genreAction';
import { genreBasedQuestionsAction } from './GenreBasedQuestions/genreBasedQuestionsAction';
import { givenAnswerAction } from './GivenAnswers/givenAnswerAction';
import { resultActions } from './Result/resultActions';
import { signUpActions } from './SignUp/signUpActions';

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
type answeredArr = {
    questionId: number;
    givenAnswerText: string;
    rightNess: boolean;
    answerGiven: boolean;

}
type submittedAns = {
    genreId: string;
    givenAnswerArr: answeredArr[];
}
type userInformation = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
function useStateHandler() {
    const jwtToken = useSelector((state: RootState) => state.signUpReducer.jwtToken);
    const userInfo = useSelector((state: RootState) => state.signUpReducer.userInfo);
    const genreDetails = useSelector((state: RootState) => state.genreRender.genreDetails);
    const genreBasedQuestionData = useSelector((state: RootState) => state.genreBasedQuestions.genreBasedQuestionData);
    const onLoadUnAnseredQuestion = useSelector((state : RootState) =>state.genreBasedQuestions.onLoadUnAnseredQuestion);
    const genreBasedQuestionTime = useSelector((state : RootState) =>state.genreBasedQuestions.genreBasedQuestionTime);
    const genreBasedQuestionFullMarks = useSelector((state : RootState) =>state.genreBasedQuestions.genreBasedQuestionFullMarks);
    const genreBasedQuestionMsg = useSelector((state : RootState) =>state.genreBasedQuestions.msg);
    const answerArr = useSelector((state : RootState) =>state.answerStoreHandler.answerArr);
    const unAnsweredArray = useSelector((state : RootState) =>state.answerStoreHandler.unAnsweredArr);
    const submittedAnswerArr = useSelector((state : RootState) =>state.answerStoreHandler.submittedAns);
    const prevAnswer = useSelector((state : RootState) =>state.answerStoreHandler.previousQuestionAnswer);
    const resultArr = useSelector((state : RootState)=>state.resultReducer.resultArr);

    const dispatch = useDispatch();
    const userSignUpHandler = (userInfo: userInformation)=>{
        dispatch(signUpActions.userSignUpHandler(userInfo));
    }
    const getAllGenreDetails = ()=>{
        dispatch(genreActions.getAllGenre());
    }
    const getGenreSpecificQuestions = (genreId: string)=>{
        dispatch(genreBasedQuestionsAction.getAllGenreSpecifiQuestions(genreId));
    }
    const storeGivenAnswerHandler = (answer: onAnsweredRespone)=>{
        dispatch(givenAnswerAction.storeAnswerHandler(answer))
    }
    const storeNotAnsweredHandler = (answers: onLoadUnAnswered[] | onBlackResponse)=>{
        dispatch(givenAnswerAction.storeUnAnsweredHandler(answers));
    }
    const previousQuestionAnswerHandler = (answer: prevAnswer)=>{
        dispatch(givenAnswerAction.showPreviousAnswerHandler(answer));
    }
    const submitGivenAnswerHandler = (sortedAnswerDetails: submittedAns)=>{
        dispatch(givenAnswerAction.submittedAnswerHandler(sortedAnswerDetails));
    }
    const resultHandler = (genreId: string)=>{
        dispatch(resultActions.getResultHandler(genreId));
    }
    return {jwtToken, userInfo, genreDetails, genreBasedQuestionData, onLoadUnAnseredQuestion, genreBasedQuestionTime, genreBasedQuestionFullMarks, answerArr, unAnsweredArray, submittedAnswerArr, prevAnswer, resultArr, genreBasedQuestionMsg, 
        userSignUpHandler, getAllGenreDetails, getGenreSpecificQuestions, storeGivenAnswerHandler, storeNotAnsweredHandler, submitGivenAnswerHandler, previousQuestionAnswerHandler, resultHandler}
  
}

export default useStateHandler;