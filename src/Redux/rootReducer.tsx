import { combineReducers } from "redux";
import genreReducer from "./Genres/genreReducer";
import genreBasedQuestionReducer from './GenreBasedQuestions/genreBasedQuestionsReducer';
import givenAnswerReducer from './GivenAnswers/givenAnswerReducer';
import resultReducer from './Result/resultReducer';
import signUpReducer from './SignUp/signUpReducer';
import loginReducer from './Login/loginReducer';
import leaderBoardReducer from './LeaderBoard/leaderBoardReducer';
import authenticationReducer from './Authentication/authenticationReducer';
import newQuestionAddReducer from './NewQuestionAdd/newQuestionAddReducer';

const rootReducer = combineReducers({
    signUpReducer: signUpReducer,
    loginReducer: loginReducer,
    genreRender: genreReducer,
    genreBasedQuestions: genreBasedQuestionReducer,
    answerStoreHandler: givenAnswerReducer,
    resultReducer: resultReducer,
    leaderBoardReducer: leaderBoardReducer,
    authenticationReducer: authenticationReducer,
    newQuestionAddReducer: newQuestionAddReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;