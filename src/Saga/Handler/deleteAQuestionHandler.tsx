import deleteQuestionResponse from '../Response/deleteAQuestionResponse';
import { deleteQuestionConstants } from '../../Redux/DeleteQuestion/deleteQuestionConstants';
import * as Effects from "redux-saga/effects";
import { put, SagaReturnType, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

type res = SagaReturnType<typeof deleteQuestionResponse>;

type actionType = {
    type: string;
    payload: number;
}

const call: any = Effects.call;

function* questionDeleteHandleResponse(action: PayloadAction<actionType>){
    try {
        const payload = action.payload;
        const deleteDetails: res = yield call(deleteQuestionResponse, payload);
        yield put({type: deleteQuestionConstants.ON_SUCCESSFUL_DELETE , questionDeleteDetails: deleteDetails?.data});
    } catch (error: any) {
        if(error instanceof Error){
            const errorObj = {
                name: error.name,
                message: error.message,
              };
            yield put({type: deleteQuestionConstants.ON_DELETE_ERROR , msg: errorObj.message})
        }else{
            const errorObj = {
                message: "Some Error Occureed!"
              };
            yield put({type: deleteQuestionConstants.ON_DELETE_ERROR  , msg:errorObj.message }) //type and payload
        }
    }
}


function* watchQuestionDeleteSagaMiddleWare(){
    yield takeEvery( deleteQuestionConstants.DELETE_A_QUESTION, questionDeleteHandleResponse)
}

export {watchQuestionDeleteSagaMiddleWare};