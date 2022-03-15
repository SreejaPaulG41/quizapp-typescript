import { genresConstant } from './genresConstant';

interface genreInterface {
    genreName: string;
    genreId: string;
}
interface actionSuccessType {
    type: string;
    genreData?: genreInterface[];
    msg?: string;
}

interface genre {
    genreDetails: genreInterface[] | any;
    msg: string | undefined;
}
const initialState: genre = {
    genreDetails: [],
    msg:''
}
const genreReducer = (state = initialState, action: actionSuccessType) => {
    switch (action.type) {
        case genresConstant.GET_ALL_GENRES:
            return {
                ...state,
                genreDetails: action.genreData
            }
            
        case genresConstant.GET_RESPONSE_FOR_GENRES:
            return {
                ...state,
                genreDetails: action.genreData
            }

        case genresConstant.GOT_ERROR_FROM_GENRES:
            const dataToShow =action.msg;
            return {
                ...state,
                msg: dataToShow
            }
        default:
            return {
                ...state
            }
    }
}

export default genreReducer;