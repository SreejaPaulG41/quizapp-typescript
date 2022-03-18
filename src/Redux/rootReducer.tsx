import { combineReducers } from "redux";
import genreReducer from "./Genres/genreReducer";
import genreBasedQuestionReducer from './GenreBasedQuestions/genreBasedQuestionsReducer';
import givenAnswerReducer from './GivenAnswers/givenAnswerReducer';
import resultReducer from './Result/resultReducer';
import signUpReducer from './SignUp/signUpReducer';
import loginReducer from './Login/loginReducer';

const rootReducer = combineReducers({
    signUpReducer: signUpReducer,
    loginReducer: loginReducer,
    genreRender: genreReducer,
    genreBasedQuestions: genreBasedQuestionReducer,
    answerStoreHandler: givenAnswerReducer,
    resultReducer: resultReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;