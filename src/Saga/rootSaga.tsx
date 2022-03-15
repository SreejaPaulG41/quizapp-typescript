import {watchGenreSagaMiddleWare} from "./Handler/genreHandler";
import {watchGenreBasedQuestionSagaMiddleWare} from "./Handler/genreBasedQuestionHandler";
import { watchGivenAnswerSubmitSagaMiddleWare } from './Handler/givenAnswerHandler';
import { resultSagaMiddleWare } from './Handler/resultHandler';
import React from 'react';
import { all } from "redux-saga/effects";

function* rootSagas() {
    yield all([watchGenreSagaMiddleWare(), watchGenreBasedQuestionSagaMiddleWare(), watchGivenAnswerSubmitSagaMiddleWare(), resultSagaMiddleWare()])
}

export default rootSagas;