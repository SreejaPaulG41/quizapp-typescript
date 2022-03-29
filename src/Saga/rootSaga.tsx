import {watchGenreSagaMiddleWare} from "./Handler/genreHandler";
import {watchGenreBasedQuestionSagaMiddleWare} from "./Handler/genreBasedQuestionHandler";
import { watchGivenAnswerSubmitSagaMiddleWare } from './Handler/givenAnswerHandler';
import { resultSagaMiddleWare } from './Handler/resultHandler';
import { signUpResponseSagaMiddleWare } from './Handler/signUpHandler';
import { logInResponseSagaMiddleWare } from './Handler/logInHandler';
import { watchLeaderBoardUserSpecificSagaMiddleWare } from './Handler/leaderBoardUserSpecificHandler';
import { watchLeaderBoardSagaMiddleWare } from './Handler/leaderBoardHandler';
import { authResponseSagaMiddleWare } from './Handler/authenticationHandler';
import { watchNewQuestionAddSagaMiddleWare } from './Handler/newQuestionAddhandler';
import { allQuestionsResponseSagaMiddleWare } from './Handler/allQuestionHandler';
import { watchQuestionDeleteSagaMiddleWare } from './Handler/deleteAQuestionHandler';
import { watchUpdatedQuestionAddSagaMiddleWare } from './Handler/updatedQuestionResHandler';
import { watchSingleQuestionSagaMiddleWare } from './Handler/getSingleQuestionReshandler';
import React from 'react';
import { all } from "redux-saga/effects";

function* rootSagas() {
    yield all([authResponseSagaMiddleWare(), watchGenreSagaMiddleWare(), watchGenreBasedQuestionSagaMiddleWare(), watchGivenAnswerSubmitSagaMiddleWare(), 
        resultSagaMiddleWare(), signUpResponseSagaMiddleWare(), logInResponseSagaMiddleWare(), watchLeaderBoardUserSpecificSagaMiddleWare(),
        watchLeaderBoardSagaMiddleWare(), watchNewQuestionAddSagaMiddleWare(), allQuestionsResponseSagaMiddleWare(), watchQuestionDeleteSagaMiddleWare(),
        watchUpdatedQuestionAddSagaMiddleWare(), watchSingleQuestionSagaMiddleWare()])
}

export default rootSagas;