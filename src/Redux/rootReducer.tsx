import { combineReducers } from "redux";
import genreReducer from "./Genres/genreReducer";
import genreBasedQuestionReducer from './GenreBasedQuestions/genreBasedQuestionsReducer';
import givenAnswerReducer from './GivenAnswers/givenAnswerReducer';
import resultReducer from './Result/resultReducer';
import signUpReducer from './SignUp/signUpReducer';
import loginReducer from './Login/loginReducer';
import leaderBoardReducer from './LeaderBoard/leaderBoardReducer';

const rootReducer = combineReducers({
    signUpReducer: signUpReducer,
    loginReducer: loginReducer,
    genreRender: genreReducer,
    genreBasedQuestions: genreBasedQuestionReducer,
    answerStoreHandler: givenAnswerReducer,
    resultReducer: resultReducer,
    leaderBoardReducer: leaderBoardReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;