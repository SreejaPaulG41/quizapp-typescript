import { combineReducers } from "redux";
import genreReducer from "./Genres/genreReducer";
import genreBasedQuestionReducer from './GenreBasedQuestions/genreBasedQuestionsReducer';
import givenAnswerReducer from './GivenAnswers/givenAnswerReducer';

const rootReducer = combineReducers({
    genreRender: genreReducer,
    genreBasedQuestions: genreBasedQuestionReducer,
    answerStoreHandler: givenAnswerReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;