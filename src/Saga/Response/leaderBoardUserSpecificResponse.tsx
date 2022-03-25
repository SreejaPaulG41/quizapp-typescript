import React from 'react';
import axios from 'axios';

const leaderBoardUserSpecificResponse = () =>{
    return axios.request({
        method: 'GET',
        url: 'https://quizmaster-backend.herokuapp.com/leaderBoard-userSpecific',
        headers: {
            'Content-Type': 'application/json',
            'jwtToken': localStorage.token
        }
    })
}

export default leaderBoardUserSpecificResponse;