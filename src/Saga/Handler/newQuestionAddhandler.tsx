import newAnswerAddRes from "../Response/newQuestionAddResponse";
import { newQuestionAddConstant } from "../../Redux/NewQuestionAdd/newQuestionAddConstant";
import * as Effects from "redux-saga/effects";
import { put, SagaReturnType, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

type res = ReturnType<typeof newAnswerAddRes>;


interface answerOptionArr {
    answerText: string;
    isCorrect: boolean;
}
type newQuestionAdd = {
    genreName: string | null;
    questionText: string;
    questionMark: number | null;
    timeAlloted: number | null;
    answerOptions: answerOptionArr[]
}

type actionType = {
    type: string;
    payload: newQuestionAdd;
}

const call: any = Effects.call;

function* newQuestionSubmitResponse(action: PayloadAction<actionType>){
    try {
        const payload = action.payload;
        const newQuestionAddRes: res = yield call(newAnswerAddRes, payload);
        if("data" in newQuestionAddRes && "statusCode" in newQuestionAddRes){
            yield put({type: newQuestionAddConstant.ON_ERROR_IN_QUESTION_ADD , errorRes:newQuestionAddRes}) //type and payload
        }else{
            yield put({type: newQuestionAddConstant.ON_SUCCESSFUL_QUESTION_ADD, successRes: newQuestionAddRes});
        }
    } catch (error) {
        yield put({type: newQuestionAddConstant.ON_ERROR_IN_QUESTION_ADD , msg:error}) //type and payload
    }
}


function* watchNewQuestionAddSagaMiddleWare(){
    yield takeEvery( newQuestionAddConstant.SUBMIT_NEW_QUESTION_TO_ADD, newQuestionSubmitResponse)
}

export {watchNewQuestionAddSagaMiddleWare};