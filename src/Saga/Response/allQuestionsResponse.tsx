import React from 'react';
import axios from 'axios';

const allQuestionResponse = async () =>{
    return axios.request({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}allQuestions`,
        headers: {
            'Content-Type': 'application/json',
            'jwtToken': localStorage.token
        }
    })
}

export default allQuestionResponse;