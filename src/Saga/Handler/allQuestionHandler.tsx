import allQuestionResponse from "../Response/allQuestionsResponse";
import { allQuestionConstants } from "../../Redux/AllQuestions/allQuestionConstants";
import * as Effects from "redux-saga/effects";
import { put, SagaReturnType, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

type res = SagaReturnType<typeof allQuestionResponse>;

const call: any = Effects.call;

function* allQuestionsResponseHandler(){
    try {
        const allQuestion : res = yield call(allQuestionResponse);
        yield put({type: allQuestionConstants.ON_SUCCESSFUL_ALL_QUESTION_RES , allQuestionData: allQuestion?.data})
    } catch (error) {
        yield put({type: allQuestionConstants.ON_ERROR_ALL_QUESTION_RES , msg:"Somwthing Went Wrong!"}) //type and payload
    }
}


function* allQuestionsResponseSagaMiddleWare(){
    yield takeEvery( allQuestionConstants.GET_ALL_QUESTIONS , allQuestionsResponseHandler)
}

export { allQuestionsResponseSagaMiddleWare };