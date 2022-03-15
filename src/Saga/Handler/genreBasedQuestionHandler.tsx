import genreBasedQuestionResponse from '../Response/genreBasedQuestionResponse';
import { genreBasedQuestionConstant } from '../../Redux/GenreBasedQuestions/genreBasedQuestionsConstant';
import * as Effects from "redux-saga/effects";
import { put, SagaReturnType, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

type res = SagaReturnType<typeof genreBasedQuestionResponse>;

type actionType = {
    type: string;
    payload: string;
}

const call: any = Effects.call;

function* genreBasedQuestionHandleResponse(action: PayloadAction<actionType>){
    try {
        const payload = action.payload;
        const questionDetails: res = yield call(genreBasedQuestionResponse, payload);
        yield put({type: genreBasedQuestionConstant.GET_GENRE_BASED_QUESTION_RESPONSE , questionArrDetails: questionDetails?.data});
    } catch (error: any) {
        if(error instanceof Error){
            const errorObj = {
                name: error.name,
                message: error.message,
              };
            yield put({type: genreBasedQuestionConstant.GOT_ERROR_FROM_GENRE_BASED_QUESTION_RESPONSE , msg: errorObj.message})
        }else{
            const errorObj = {
                message: "Some Error Occureed!"
              };
            yield put({type: genreBasedQuestionConstant.GOT_ERROR_FROM_GENRE_BASED_QUESTION_RESPONSE , msg:errorObj.message }) //type and payload
        }
    }
}


function* watchGenreBasedQuestionSagaMiddleWare(){
    yield takeEvery( genreBasedQuestionConstant.GET_GENRE_BASED_QUESTION, genreBasedQuestionHandleResponse)
}

export {watchGenreBasedQuestionSagaMiddleWare};