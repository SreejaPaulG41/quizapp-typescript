import { getSingleQuestionConstants } from './getSingleQuestionConstants';

export const getSingleQuestionAction = {
    getQuestionDetails: (questionId: number)=>{
        return {
            type: getSingleQuestionConstants.GET_A_QUESTION,
            payload: questionId
        }
    }
}