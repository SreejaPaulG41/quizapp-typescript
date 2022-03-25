import React from 'react';
import axios from 'axios';

type userInformation = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

type errorObj = {
    data: string;
    statusCode: number;

}

const signUpResponse = (payload: userInformation) => {
    const dataToSend = payload;
    return axios.post('https://quizmaster-backend.herokuapp.com/auth/register', JSON.stringify(dataToSend), {
        headers: {
            'Content-Type': 'application/json',
        },
      }).then((res) => res.data)
      .catch((error) => {
          const errorResponse: errorObj = { data: '', statusCode: 0 };
          if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              errorResponse.data = error.response.data;
              errorResponse.statusCode = error.response.status
          } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
          } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
          }
          return errorResponse;

      })
}

export default signUpResponse;