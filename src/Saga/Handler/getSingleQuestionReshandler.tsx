import singleQuestionResponse from '../Response/getSingleQuestionResponse';
import { getSingleQuestionConstants } from '../../Redux/GetASingleQuestion/getSingleQuestionConstants';
import * as Effects from "redux-saga/effects";
import { put, SagaReturnType, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

type res = SagaReturnType<typeof singleQuestionResponse>;

type actionType = {
    type: string;
    payload: number;
}

const call: any = Effects.call;

function* singleQuestionHandleResponse(action: PayloadAction<actionType>){
    try {
        const payload = action.payload;
        const questionDetails: res = yield call(singleQuestionResponse, payload);
        yield put({type: getSingleQuestionConstants.SUCCESSFUL_QUESTION_RECEIVE , questionInfoDetails: questionDetails?.data});
    } catch (error: any) {
        if(error instanceof Error){
            const errorObj = {
                name: error.name,
                message: error.message,
              };
            yield put({type: getSingleQuestionConstants.ERROR_ON_QUESTION_RECEIVE , msg: errorObj.message})
        }else{
            const errorObj = {
                message: "Some Error Occureed!"
              };
            yield put({type: getSingleQuestionConstants.ERROR_ON_QUESTION_RECEIVE , msg:errorObj.message }) //type and payload
        }
    }
}


function* watchSingleQuestionSagaMiddleWare(){
    yield takeEvery( getSingleQuestionConstants.GET_A_QUESTION, singleQuestionHandleResponse)
}

export {watchSingleQuestionSagaMiddleWare};