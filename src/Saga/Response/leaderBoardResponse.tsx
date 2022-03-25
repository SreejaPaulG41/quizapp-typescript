import React from 'react';
import axios from 'axios';

const leaderBoardResponse = () =>{
    return axios.request({
        method: 'GET',
        url: 'https://quizmaster-backend.herokuapp.com/leaderBoard',
        headers: {
            'Content-Type': 'application/json',
            'jwtToken': localStorage.token
        },
    })
}

export default leaderBoardResponse;