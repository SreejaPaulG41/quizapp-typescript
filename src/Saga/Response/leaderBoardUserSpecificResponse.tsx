import React from 'react';
import axios from 'axios';

const leaderBoardUserSpecificResponse = () =>{
    return axios.request({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}leaderBoard-userSpecific`,
        headers: {
            'Content-Type': 'application/json',
            'jwtToken': localStorage.token
        }
    })
}

export default leaderBoardUserSpecificResponse;