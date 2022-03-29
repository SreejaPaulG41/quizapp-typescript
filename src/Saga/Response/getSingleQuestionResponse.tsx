import React from 'react';
import axios from 'axios';

const singleQuestionResponse = (payload: number) =>{
    const dataToSend = {"questionId": payload}
    return axios.request({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}get-a-question`,
        headers: {
            'Content-Type': 'application/json',
            'jwtToken': localStorage.token
        },
        params: dataToSend
    })
}

export default singleQuestionResponse;