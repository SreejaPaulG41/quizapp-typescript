import genreBasedQuestionResponse from '../Response/genreBasedQuestionResponse';
import { genreBasedQuestionConstant } from '../../Redux/GenreBasedQuestions/genreBasedQuestionsConstant';
import { call, put, SagaReturnType, takeEvery, takeLatest } from 'redux-saga/effects';

type res = SagaReturnType<typeof genreBasedQuestionResponse>;

function* genreBasedQuestionHandleResponse(){
    try {
        const questionDetails: res = yield call(genreBasedQuestionResponse);
        yield put({type: genreBasedQuestionConstant.GET_GENRE_BASED_QUESTION_RESPONSE , genreData: questionDetails?.data});
    } catch (error) {
        yield put({type: genreBasedQuestionConstant.GOT_ERROR_FROM_GENRE_BASED_QUESTION_RESPONSE , msg:error}) //type and payload
    }
}


function* watchGenreBasedQuestionSagaMiddleWare(){
    yield takeEvery( genreBasedQuestionConstant.GET_GENRE_BASED_QUESTION, genreBasedQuestionHandleResponse)
}

export {watchGenreBasedQuestionSagaMiddleWare};