import React from 'react';
import axios from 'axios';

const genreBasedQuestionResponse = (payload: string) =>{
    const dataToSend = {"genreId": payload}
    return axios.request({
        method: 'GET',
        url: 'https://quizmaster-backend.herokuapp.com/genreBasedQuestions',
        headers: {
            'Content-Type': 'application/json',
            'jwtToken': localStorage.token
        },
        params: dataToSend
    })
}

export default genreBasedQuestionResponse;