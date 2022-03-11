import { combineReducers } from "redux";
import genreReducer from "./Genres/genreReducer";
import genreBasedQuestionReducer from './GenreBasedQuestions/genreBasedQuestionsReducer';

const rootReducer = combineReducers({
    genreRender: genreReducer,
    genreBasedQuestions: genreBasedQuestionReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;