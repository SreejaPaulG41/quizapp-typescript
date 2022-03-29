import { updateQuestionConstants } from './updateQuestionConstants';

interface answerOptionArr {
    answerText: string;
    isCorrect: boolean;
}
type upadtedQuestionAdd = {
    questionId: number;
    genreName: string | null;
    questionText: string;
    questionMark: number;
    timeAlloted: number;
    answerOptions: answerOptionArr[]
}

export const updateQuestionActions = {
    postUpdatedQuestion: (updatedQuestion: upadtedQuestionAdd)=>{
        return {
            type: updateQuestionConstants.POST_UPDATED_QUESTION,
            payload: updatedQuestion
        }
    },
    clearingUpdationHandler: ()=>{
        return {
            type: updateQuestionConstants.CLEARING_RESPONSE
        }
    }
}