import React from 'react';
import axios from 'axios';

const genreResponse = () =>{
    return axios.request({
        method: 'GET',
        url: 'http://localhost:5000/genreDetails',
        headers: {
            'Content-Type': 'application/json',
            'jwtToken': localStorage.token
        }
    })
}

export default genreResponse;