import React from 'react';
import axios from 'axios';

const genreBasedQuestionResponse = () =>{
    return axios.request({
        method: 'GET',
        url: 'http://localhost:5000/genreBasedQuestions',
        headers: {
            'Content-Type': 'application/json',
            'jwtToken': localStorage.token
        }
    })
}

export default genreBasedQuestionResponse;