import {genresConstant} from './genresConstant';

export const genreActions = {
    getAllGenre: ()=>{
        return {
            type: genresConstant.GET_ALL_GENRES
        }
    }
}