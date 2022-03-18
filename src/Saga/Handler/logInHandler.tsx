import logInResponse from "../Response/logInResponse";
import { loginConstants } from "../../Redux/Login/loginConstants";
import * as Effects from "redux-saga/effects";
import { put, SagaReturnType, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

type res = SagaReturnType<typeof logInResponse>;

type logInInfoType = {
    email: string;
    password: string;
}

type actionType = {
    type: string;
    payload: logInInfoType;
}

const call: any = Effects.call;

function* logInResponseHandler(action: PayloadAction<actionType>){
    try {
        const payload = action.payload;
        const loggedUserInformation : res = yield call(logInResponse, payload);
        yield put({type: loginConstants.SUCCESSFUL_LOG_IN , loggedUserInfo: loggedUserInformation?.data});
    } catch (error) {
        yield put({type: loginConstants.ERROR_IN_LOGIN , msg:error}) //type and payload
    }
}


function* logInResponseSagaMiddleWare(){
    yield takeEvery( loginConstants.LOG_USER_IN , logInResponseHandler)
}

export { logInResponseSagaMiddleWare };