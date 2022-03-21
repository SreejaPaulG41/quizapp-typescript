import signUpResponse from "../Response/signUpResponse";
import { signUpConstants } from "../../Redux/SignUp/signUpConstants";
import * as Effects from "redux-saga/effects";
import { put, SagaReturnType, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

type res = ReturnType<typeof signUpResponse>;

type userInformation = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

type actionType = {
    type: string;
    payload: userInformation;
}

const call: any = Effects.call;

function* signUpResponseHandler(action: PayloadAction<actionType>) {
    try {
        const payload = action.payload;
        const userInformation: res = yield call(signUpResponse, payload);
        if ("data" in userInformation && "statusCode" in userInformation) {
            yield put({ type: signUpConstants.ERROR_AS_RESPONSE, msg: userInformation })
        } else {
            yield put({ type: signUpConstants.SUCCESSFUL_USER_SIGN_UP, userInfo: userInformation });
        }
    } catch (error) {
        yield put({ type: signUpConstants.ERROR_AS_RESPONSE, msg: error }) //type and payload
    }
}


function* signUpResponseSagaMiddleWare() {
    yield takeEvery(signUpConstants.SIGN_USER_UP, signUpResponseHandler)
}

export { signUpResponseSagaMiddleWare };