import React, { useEffect, useState } from 'react'

type singleLeaderboardDataType = {
    fullMarks: number;
    userScore: number;
    quizGivenTime: string;
    genreName: string;
    genreId: string;
}

type propsType = {
    userSpecificLeaderBoard: singleLeaderboardDataType[]
}
const MyLeaderBoard: React.FC<propsType> = ({ userSpecificLeaderBoard }) => {
    const [information, setInformation] = useState<singleLeaderboardDataType[] | undefined>([]);
    useEffect(() => {
        console.log("inside")
        console.log(userSpecificLeaderBoard)
        if (userSpecificLeaderBoard?.length > 0) {
            setInformation(userSpecificLeaderBoard);
        }
    }, [userSpecificLeaderBoard])
    return (
        <div>
            {
                information?.map((item, index) => (
                    <div key={index} style={{border: "1px solid black"}}>
                        {item.fullMarks}
                        <br/>
                        {item.userScore}<br/>
                        {item.quizGivenTime}<br/>
                        {item.genreName}<br/>
                        {item.genreId}<br/>
                        
                    </div>
                ))
            }
        </div>
    )
}

export default MyLeaderBoard