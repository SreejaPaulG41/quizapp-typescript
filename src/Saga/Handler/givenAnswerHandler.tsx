import givenAnswerSubmitRes from "../Response/givenAnswerResponse";
import { givenAnswerConstants } from "../../Redux/GivenAnswers/givenAnswersConstant";
import * as Effects from "redux-saga/effects";
import { put, SagaReturnType, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

type res = SagaReturnType<typeof givenAnswerSubmitRes>;

type answeredArr = {
    questionId: number;
    givenAnswerText: string;
    rightNess: boolean;
    answerGiven: boolean;

}
type submittedAns = {
    genreId: string;
    givenAnswerArr: answeredArr[];
}

type actionType = {
    type: string;
    payload: submittedAns;
}

const call: any = Effects.call;

function* givenAnswerSubmitResponse(action: PayloadAction<actionType>){
    try {
        const payload = action.payload;
        const allGenreDetails: res = yield call(givenAnswerSubmitRes, payload);
        const dataToStore = {genreId: allGenreDetails?.data.genreId, givenAnswerArr: allGenreDetails?.data.givenAnswerDetails};
        yield put({type: givenAnswerConstants.GIVEN_ANSWER_SUBMIT_HANDLER , genreData: dataToStore});
    } catch (error) {
        yield put({type: givenAnswerConstants.GIVEN_ANSWER_SUBMIT_ERROR , msg:error}) //type and payload
    }
}


function* watchGivenAnswerSubmitSagaMiddleWare(){
    yield takeEvery( givenAnswerConstants.SUBMIT_ANSWER_HANDLER, givenAnswerSubmitResponse)
}

export {watchGivenAnswerSubmitSagaMiddleWare};