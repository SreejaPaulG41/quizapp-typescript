import resultResponse from '../Response/resultResponse';
import { resultConstants } from '../../Redux/Result/resultConstants';
import * as Effects from "redux-saga/effects";
import { put, SagaReturnType, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

type res = SagaReturnType<typeof resultResponse>;

type actionType = {
    type: string;
    payload: string;
}

const call: any = Effects.call;

function* resultHandleResponse(action: PayloadAction<actionType>){
    try {
        const payload = action.payload;
        const resultArr: res = yield call(resultResponse, payload);
        yield put({type: resultConstants.GET_RESULT_RESPONSE, resultArr: resultArr?.data});
    } catch (error) {
        yield put({type: resultConstants.GET_RESULT_ERROR, msg:error}) //type and payload
    }
}


function* resultSagaMiddleWare(){
    yield takeEvery( resultConstants.GET_RESULT_IN_DETAILS, resultHandleResponse)
}

export {resultSagaMiddleWare};