import React from 'react';
import axios from 'axios';

type userInformation = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const signUpResponse = (payload: userInformation) => {
    const dataToSend = payload;
    return axios.post('http://localhost:5000/auth/register', JSON.stringify(dataToSend), {
        headers: {
            'Content-Type': 'application/json',
        },
      })
}

export default signUpResponse;