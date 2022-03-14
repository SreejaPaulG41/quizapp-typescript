import React from 'react';
import axios from 'axios';

type answeredArr = {
    questionId: number;
    givenAnswerText: string;
    rightNess: boolean;
    answerGiven: boolean;

}
type submittedAns = {
    genreId: string;
    givenAnswerArr: answeredArr[];
}

const givenAnswerSubmitRes = (payload: submittedAns) => {
    const dataToSend = payload;
    return axios.post('http://localhost:5000/submtAnswers', JSON.stringify(dataToSend), {
        headers: {
            'Content-Type': 'application/json',
            'jwtToken': localStorage.token
        },
      })
}

export default givenAnswerSubmitRes;