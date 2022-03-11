import genreResponse from "../Response/genreResponse";
import { genresConstant } from '../../Redux/Genres/genresConstant';
import { call, put, SagaReturnType, takeEvery, takeLatest } from 'redux-saga/effects';

type res = SagaReturnType<typeof genreResponse>;

function* genreHandleResponse(){
    try {
        const allGenreDetails: res = yield call(genreResponse);
        yield put({type: genresConstant.GET_RESPONSE_FOR_GENRES , genreData: allGenreDetails?.data});
    } catch (error) {
        yield put({type: genresConstant.GOT_ERROR_FROM_GENRES , msg:error}) //type and payload
    }
}


function* watchGenreSagaMiddleWare(){
    yield takeEvery( genresConstant.GET_ALL_GENRES, genreHandleResponse)
}

export {watchGenreSagaMiddleWare};