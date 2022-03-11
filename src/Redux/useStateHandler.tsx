import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from './rootReducer';
import {genreActions} from './Genres/genreAction';
import {genreBasedQuestionsAction} from './GenreBasedQuestions/genreBasedQuestionsAction';

function useStateHandler() {
    const genreDetails = useSelector((state: RootState) => state.genreRender);
    const genreBasedQuestionData = useSelector((state: RootState) => state.genreBasedQuestions);

    const dispatch = useDispatch();
    const getAllGenreDetails = ()=>{
        dispatch(genreActions.getAllGenre());
    }
    const getGenreSpecificQuestions = (genreId: string)=>{
        dispatch(genreBasedQuestionsAction.getAllGenreSpecifiQuestions(genreId));
    }
    return {genreDetails, genreBasedQuestionData, getAllGenreDetails, getGenreSpecificQuestions}
  
}

export default useStateHandler;