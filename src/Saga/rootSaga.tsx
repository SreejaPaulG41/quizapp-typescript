import {watchGenreSagaMiddleWare} from "./Handler/genreHandler";
import {watchGenreBasedQuestionSagaMiddleWare} from "./Handler/genreBasedQuestionHandler";
import React from 'react'
import { all } from "redux-saga/effects";

function* rootSagas() {
    yield all([watchGenreSagaMiddleWare(), watchGenreBasedQuestionSagaMiddleWare()])
}

export default rootSagas;