import { genreBasedQuestionConstant } from './genreBasedQuestionsConstant';

export const genreBasedQuestionsAction = {
    getAllGenreSpecifiQuestions: (genreId: string)=>{
        return {
            type: genreBasedQuestionConstant.GET_GENRE_BASED_QUESTION,
            payload: genreId
        }
    }
}