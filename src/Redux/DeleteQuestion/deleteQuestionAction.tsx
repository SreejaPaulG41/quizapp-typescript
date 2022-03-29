import { deleteQuestionConstants } from "./deleteQuestionConstants";

export const deleteQuestionAction = {
    deleteQuestionHandler: (questionId: number)=>{
        return {
            type: deleteQuestionConstants.DELETE_A_QUESTION,
            payload: questionId
        }
    }
}