import { resultConstants } from './resultConstants';

export const resultActions = {
    getResultHandler: (genreId: string)=>{
        return{
            type: resultConstants.GET_RESULT_IN_DETAILS,
            payload: genreId
        }
    }
}