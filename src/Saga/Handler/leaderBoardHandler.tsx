import leaderBoardResponse from '../Response/leaderBoardResponse';
import { leaderBoardConstants } from '../../Redux/LeaderBoard/leaderBoardConstants';
import * as Effects from "redux-saga/effects";
import { put, SagaReturnType, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

type res = SagaReturnType<typeof leaderBoardResponse>;

const call: any = Effects.call;

function* leaderBoardResponseHandler(){
    try {
        const leaderBoardDetails: res = yield call(leaderBoardResponse);
        yield put({type: leaderBoardConstants.ON_SUCCESSFUL_LEADERBOARD_DETAILS , leaderBoardData: leaderBoardDetails?.data});
    } catch (error: any) {
            yield put({type: leaderBoardConstants.ERROR_IN_LEADERBOARD_DETAILS , msg: error }) //type and payload
    }
}


function* watchLeaderBoardSagaMiddleWare(){
    yield takeEvery( leaderBoardConstants.GET_LEADERBOARD_RESULT, leaderBoardResponseHandler)
}

export {watchLeaderBoardSagaMiddleWare};