import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from './rootReducer';
import {genreActions} from './Genres/genreAction';
import { genreBasedQuestionsAction } from './GenreBasedQuestions/genreBasedQuestionsAction';
import { givenAnswerAction } from './GivenAnswers/givenAnswerAction';
import { resultActions } from './Result/resultActions';
import { signUpActions } from './SignUp/signUpActions';
import { loginAction } from './Login/loginAction';
import { leaderBoardActions } from './LeaderBoard/leaderBoardAction';
import { authenticationActions } from './Authentication/authenticationActions';

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
type logInInfoType = {
    email: string;
    password: string;
}

function useStateHandler() {
    const userValid = useSelector((state: RootState) => state.authenticationReducer.userValid);
    const userValidMsg = useSelector((state: RootState) => state.authenticationReducer.msg);
    const jwtToken = useSelector((state: RootState) => state.signUpReducer.jwtToken);
    const userInfo = useSelector((state: RootState) => state.signUpReducer.userInfo);
    const loggedJwtToken = useSelector((state: RootState) => state.loginReducer.jwtToken);
    const loggedUserInfo = useSelector((state: RootState) => state.loginReducer.userInfo);
    const logInUserError = useSelector((state: RootState) => state.loginReducer.msg);
    const genreDetails = useSelector((state: RootState) => state.genreRender.genreDetails);
    const genreAuthenticationError = useSelector((state: RootState) => state.genreRender.msg)
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
    const leaderBoardUserSpecific = useSelector((state : RootState)=>state.leaderBoardReducer.userSpecificLeaderBoardInformation);
    const leaderBoard = useSelector((state : RootState)=>state.leaderBoardReducer.leaderBoardInformation);
    const dispatch = useDispatch();
    const authenticationHandler = ()=>{
        dispatch(authenticationActions.getUserValidity());
    }
    const userSignUpHandler = (userInfo: userInformation)=>{
        dispatch(signUpActions.userSignUpHandler(userInfo));
    }
    const signedUpLogOut = ()=>{
        dispatch(signUpActions.singedUpLogOut());
    }
    const userLogInHandler = (loginUserInfo: logInInfoType)=>{
        dispatch(loginAction.logInUser(loginUserInfo));
    }
    const logOutHandler = ()=>{
        dispatch(loginAction.logOutUser());
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
    const leaderBoardHandler = ()=>{
        dispatch(leaderBoardActions.getLeaderboardHandler());
    }
    const userBasedLeaderBoardHandler = ()=>{
        dispatch(leaderBoardActions.getLeaderboardUserSpecHandler());
    }
    return {userValid, userValidMsg, jwtToken, userInfo, loggedJwtToken, loggedUserInfo, logInUserError, genreDetails, genreAuthenticationError, genreBasedQuestionData, onLoadUnAnseredQuestion, genreBasedQuestionTime, genreBasedQuestionFullMarks, answerArr, unAnsweredArray, submittedAnswerArr, prevAnswer, resultArr, genreBasedQuestionMsg, leaderBoardUserSpecific, leaderBoard,
        authenticationHandler, userSignUpHandler, signedUpLogOut, userLogInHandler, logOutHandler, getAllGenreDetails, getGenreSpecificQuestions, storeGivenAnswerHandler, storeNotAnsweredHandler, submitGivenAnswerHandler, previousQuestionAnswerHandler, resultHandler, leaderBoardHandler, userBasedLeaderBoardHandler}
  
}

export default useStateHandler;