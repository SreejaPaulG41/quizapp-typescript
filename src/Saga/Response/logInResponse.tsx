import React from 'react';
import axios from 'axios';

type logInInfoType = {
    email: string;
    password: string;
}

const logInResponse = (payload: logInInfoType) => {
    const dataToSend = payload;
    return axios.post('http://localhost:5000/auth/login', JSON.stringify(dataToSend), {
        headers: {
            'Content-Type': 'application/json',
        },
      })
}

export default logInResponse;