import React from 'react';
import axios from 'axios';

type errorObj = {
    data: string;
    statusCode: number;

}
const authenticationResponse = () => {
    return axios.request({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}valid-check`,
        headers: {
            'Content-Type': 'application/json',
            'jwtToken': localStorage.token
        } })
        .then((res) => res.data)
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

export default authenticationResponse;