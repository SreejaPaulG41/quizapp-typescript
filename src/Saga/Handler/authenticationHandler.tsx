import authenticationResponse from "../Response/authenticationResponse";
import { authenticationConstants } from "../../Redux/Authentication/authenticationConstants";
import * as Effects from "redux-saga/effects";
import { put, SagaReturnType, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

type res = ReturnType<typeof authenticationResponse>;

type logInInfoType = {
    email: string;
    password: string;
}


const call: any = Effects.call;

function* authResponseHandler(){
    try {
        const loggedUserInformation : res = yield call(authenticationResponse);
        if(typeof loggedUserInformation && "statusCode" in loggedUserInformation){
            yield put({type: authenticationConstants.USER_NOT_VALID_RESPONSE , msg:loggedUserInformation})
        }else{
            yield put({type: authenticationConstants.USER_VALID_RESPONSE , loggedUserInfo: loggedUserInformation});
        }
        
    } catch (error) {
        yield put({type: authenticationConstants.USER_NOT_VALID_RESPONSE , msg:error}) //type and payload
    }
}


function* authResponseSagaMiddleWare(){
    yield takeEvery( authenticationConstants.GET_USER_VALID_OR_NOT , authResponseHandler)
}

export { authResponseSagaMiddleWare };