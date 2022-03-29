import updatedQuestionAddAddRes from "../Response/updateQuestionResponse";
import { updateQuestionConstants } from "../../Redux/UpdateQuestion/updateQuestionConstants";
import * as Effects from "redux-saga/effects";
import { put, SagaReturnType, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

type res = ReturnType<typeof updatedQuestionAddAddRes>;


interface answerOptionArr {
    answerText: string;
    isCorrect: boolean;
}
type updatedQuestionAdd = {
    questionId: number;
    genreName: string | null;
    questionText: string;
    questionMark: number;
    timeAlloted: number;
    answerOptions: answerOptionArr[]
}

type actionType = {
    type: string;
    payload: updatedQuestionAdd;
}

const call: any = Effects.call;

function* updatedQuestionSubmitResponse(action: PayloadAction<actionType>){
    try {
        const payload = action.payload;
        const updatedQuestionAddRes: res = yield call(updatedQuestionAddAddRes, payload);
        if("data" in updatedQuestionAddRes && "statusCode" in updatedQuestionAddRes){
            yield put({type: updateQuestionConstants.ON_ERROR_ON_QUESTION_UPDATE , errorRes:updatedQuestionAddRes}) //type and payload
        }else{
            yield put({type: updateQuestionConstants.ON_SUCCESSFUL_QUESTION_UPDATE, successRes: updatedQuestionAddRes});
        }
    } catch (error) {
        yield put({type: updateQuestionConstants.ON_ERROR_ON_QUESTION_UPDATE , msg:error}) //type and payload
    }
}


function* watchUpdatedQuestionAddSagaMiddleWare(){
    yield takeEvery( updateQuestionConstants.POST_UPDATED_QUESTION, updatedQuestionSubmitResponse)
}

export {watchUpdatedQuestionAddSagaMiddleWare};