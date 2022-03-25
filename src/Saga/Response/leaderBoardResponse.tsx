import React from 'react';
import axios from 'axios';

const leaderBoardResponse = () =>{
    return axios.request({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}leaderBoard`,
        headers: {
            'Content-Type': 'application/json',
            'jwtToken': localStorage.token
        },
    })
}

export default leaderBoardResponse;