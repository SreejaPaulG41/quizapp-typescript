import React from 'react';
import axios from 'axios';

const genreResponse = () =>{
    return axios.request({
        method: 'GET',
        url: 'https://quizmaster-backend.herokuapp.com/genreDetails',
        headers: {
            'Content-Type': 'application/json',
            'jwtToken': localStorage.token
        }
    })
}

export default genreResponse;