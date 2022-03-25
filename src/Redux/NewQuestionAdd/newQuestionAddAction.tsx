import { newQuestionAddConstant } from './newQuestionAddConstant';

interface answerOptionArr {
    answerText: string;
    isCorrect: boolean;
}
type newQuestionAdd = {
    genreName: string | null;
    questionText: string;
    questionMark: number | null;
    timeAlloted: number | null;
    answerOptions: answerOptionArr[]
}

export const newQuestionAddAction = {
    addNewQuestionHandler: (newQuestion: newQuestionAdd)=>{
        return {
            type: newQuestionAddConstant.SUBMIT_NEW_QUESTION_TO_ADD,
            payload: newQuestion
        }
    }
}