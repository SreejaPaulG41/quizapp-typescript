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
import allQuestionReducer from './AllQuestions/allQuestionReducer';
import deleteQuestionReducer from './DeleteQuestion/deleteQuestionReducer';
import updateQuestionReducer from './UpdateQuestion/updateQuestionReducer';
import getSingleQuestionReducer from './GetASingleQuestion/getSingleQuestionReducer';

const rootReducer = combineReducers({
    signUpReducer: signUpReducer,
    loginReducer: loginReducer,
    genreRender: genreReducer,
    genreBasedQuestions: genreBasedQuestionReducer,
    answerStoreHandler: givenAnswerReducer,
    resultReducer: resultReducer,
    leaderBoardReducer: leaderBoardReducer,
    authenticationReducer: authenticationReducer,
    newQuestionAddReducer: newQuestionAddReducer,
    allQuestionReducer: allQuestionReducer,
    deleteQuestionReducer: deleteQuestionReducer,
    updateQuestionReducer: updateQuestionReducer,
    getSingleQuestionReducer: getSingleQuestionReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;