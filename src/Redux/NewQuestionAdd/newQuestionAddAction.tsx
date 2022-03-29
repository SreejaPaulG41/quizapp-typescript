import { newQuestionAddConstant } from './newQuestionAddConstant';

interface answerOptionArr {
    answerText: string;
    isCorrect: boolean;
}
type newQuestionAdd = {
    genreName: string | null;
    questionText: string;
    questionMark: number;
    timeAlloted: number;
    answerOptions: answerOptionArr[]
}

export const newQuestionAddAction = {
    addNewQuestionHandler: (newQuestion: newQuestionAdd)=>{
        return {
            type: newQuestionAddConstant.SUBMIT_NEW_QUESTION_TO_ADD,
            payload: newQuestion
        }
    },
    clearingAdditionHandler: ()=>{
        return {
            type: newQuestionAddConstant.CLEARING_RESPONSE
        }
    }
}