import { givenAnswerConstants } from './givenAnswersConstant';

interface onAnsweredRespone {
    questionId: number;
    givenAnswerText: string;
    rightNess: boolean;
    answerGiven: boolean;
}
interface answerOptionArr {
    answerText: string;
    isCorrect: boolean;
}
interface onLoadUnAnswered {
    questionId: number;
    genreId: string;
    questionText: string;
    questionMark: number;
    timeAlloted: number;
    answerOptions: answerOptionArr[];
}
interface onBlackResponse{
    questionId: number;
    givenAnswerText: string;
    rightNess: boolean;
    answerGiven: boolean;
}
interface prevAnswer {
    questionId: number;
}

type answeredArr = {
    questionId: number;
    givenAnswerText: string;
    rightNess: boolean;
    answerGiven: boolean;

}
type submittedAns = {
    genreId: string;
    givenAnswerArr: answeredArr[];
}

export const givenAnswerAction = {
    storeAnswerHandler: (answer: onAnsweredRespone)=>{
        return {
            type: givenAnswerConstants.STORE_ANSWERED_QUESTION,
            payload: answer
        }
    },
    storeUnAnsweredHandler: (answers: onLoadUnAnswered[] | onBlackResponse)=>{
        return{
            type: givenAnswerConstants.STORE_UNANSWERED_QUESTION,
            payload: answers
        }
    },
    showPreviousAnswerHandler: (answer: prevAnswer)=>{
        return{
            type: givenAnswerConstants.PREVIOUS_ANSWER_HANDLER,
            payload: answer
        }
    },
    submittedAnswerHandler: (genreId: submittedAns)=>{
        return{
            type: givenAnswerConstants.SUBMIT_ANSWER_HANDLER,
            payload: genreId
        }
    }

}