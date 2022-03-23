import leaderBoardUserSpecificResponse from "../Response/leaderBoardUserSpecificResponse";
import { leaderBoardConstants } from '../../Redux/LeaderBoard/leaderBoardConstants';
import { call, put, SagaReturnType, takeEvery, takeLatest } from 'redux-saga/effects';

type res = SagaReturnType<typeof leaderBoardUserSpecificResponse>;

function* leaderBoardUserSpecificResponseHandler(){
    try {
        const leaderBoardDetails: res = yield call(leaderBoardUserSpecificResponse);
        yield put({type:leaderBoardConstants.ON_SUCCESSFUL_LEADERBOARD_DETAILS_USER_SPECIFIC, userSpecificeaderBoardData: leaderBoardDetails?.data});
    } catch (error) {
        yield put({type: leaderBoardConstants.ERROR_IN_LEADERBOARD_DETAILS_USER_SPECIFIC , msg:error}) //type and payload
    }
}


function* watchLeaderBoardUserSpecificSagaMiddleWare(){
    yield takeEvery( leaderBoardConstants.GET_LEADERBOARD_RESULT_USER_SPECIFIC, leaderBoardUserSpecificResponseHandler)
}

export {watchLeaderBoardUserSpecificSagaMiddleWare};