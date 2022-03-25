import React from 'react';
import axios from 'axios';

const resultResponse = (payload: string) =>{
    const dataToSend = {"genreId": payload}
    return axios.request({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}getAnswerDetails`,
        headers: {
            'Content-Type': 'application/json',
            'jwtToken': localStorage.token
        },
        params: dataToSend
    })
}

export default resultResponse;