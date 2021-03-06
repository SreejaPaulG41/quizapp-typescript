import { routerConstants } from './routerConstants';
import Dashboard from '../routes/Dashboard/Home/index';
import QuestionDisplayContainer from "../routes/Genre/QuestionDisplayContainer/index";
import Result from "../routes/Result/ResultPage/index";
import Home from '../routes/Home/index';
import SignUp from '../routes/SignUp';
import Login from '../routes/Login';
import LeaderBoard from '../routes/LeaderBoard';
import NewQuestionAdd from '../routes/AddNewQuestion';
import UpdateQuestion from '../routes/UpdateQuestion/index';

export const routerConfig = [
    {
        path: routerConstants.ROOT_ROUTE,
        component: Home,
        name: "Home",
        privateRoute: false,
    },
    {
        path: routerConstants.SIGNUP_ROUTE,
        component: SignUp,
        name: "Signup",
        privateRoute: false,
    },
    {
        path: routerConstants.LOGIN_ROUTE,
        component: Login,
        name: "Login",
        privateRoute: false,
    },
    {
        path: routerConstants.DASHBOARD_ROUTE,
        component: Dashboard,
        name: "Dashboard",
        privateRoute: true,
    },
    {
        path: routerConstants.QUESTION_ROUTE,
        component: QuestionDisplayContainer,
        name: "QuestionDisplayContainer",
        privateRoute: true,
    },
    {
        path: routerConstants.INITIAL_QUESTION_ROUTE,
        component: QuestionDisplayContainer,
        name: "QuestionDisplayContainer",
        privateRoute: true,
    },
    {
        path: routerConstants.RESULT_ROUTE,
        component: Result,
        name: "Result",
        privateRoute: true,
    },
    {
        path: routerConstants.LEADERBOARD_ROUTE,
        component: LeaderBoard,
        name: "LeaderBoard",
        privateRoute: true,
    },
    {
        path: routerConstants.ADDQUESTION_ROUTE,
        component: NewQuestionAdd,
        name: "AddNewQuestion",
        privateRoute: true,
        adminCheck: true,
    },
    {
        path: routerConstants.UPDATE_QUESTION_ROUTE,
        component: UpdateQuestion,
        name: "UpdateAQuestion",
        privateRoute: true,
        adminCheck: true,
    }
]