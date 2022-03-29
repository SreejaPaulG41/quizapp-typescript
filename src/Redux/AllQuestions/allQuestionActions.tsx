import { allQuestionConstants } from './allQuestionConstants';

export const allQuestionActions = {
    getAllQuestionHandler: ()=>{
        return {
            type: allQuestionConstants.GET_ALL_QUESTIONS
        }
    }
}