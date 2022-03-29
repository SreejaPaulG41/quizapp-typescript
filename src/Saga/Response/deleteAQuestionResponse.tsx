import React from 'react';
import axios from 'axios';

const deleteQuestionResponse = async (payload: number) => {
    const dataToSend = {"questionId": payload}
    return axios.delete(`${process.env.REACT_APP_API_URL}delete-question`, {
        headers: {
            'Content-Type': 'application/json',
            'jwtToken': localStorage.token
        },
        data:{
            "questionId": payload
        }
    })
}

export default deleteQuestionResponse;