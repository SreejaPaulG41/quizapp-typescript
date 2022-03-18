import React, { useEffect, useState } from 'react'

type singleLeaderBoard = {
    userFullName: string;
    fullMarks: number;
    userScore: number;
    quizGivenTime: string;
}
type propsType = {
    leaderBoardData: singleLeaderBoard[]
}
const AllLeaderBoard: React.FC<propsType> = ({ leaderBoardData }) => {
    useEffect(() => {
        console.log(leaderBoardData)
    }, [leaderBoardData])
    return (
        <div>
            {
                (leaderBoardData.length > 0) ? 
                leaderBoardData.map((item, index) => (
                    <div key={index}>
                        {item.userFullName}
                        {item.fullMarks}
                        {item.userScore}
                        {item.quizGivenTime}
                    </div>
                )) : ""
            }
        </div>
    )
}

export default AllLeaderBoard