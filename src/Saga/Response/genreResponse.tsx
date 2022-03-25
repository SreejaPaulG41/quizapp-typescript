import React from 'react';
import axios from 'axios';

const genreResponse = () =>{
    return axios.request({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}genreDetails`,
        headers: {
            'Content-Type': 'application/json',
            'jwtToken': localStorage.token
        }
    })
}

export default genreResponse;