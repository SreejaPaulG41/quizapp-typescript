import React, { useState, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';
import { LeaderBoardStyle, Content } from './leaderBoardStyle';
import useStateHandler from '../../Redux/useStateHandler';
import MyLeaderBoard from './MyLeaderBoard';
import AllLeaderBoard from './AllLeaderBoard.tsx';

type singleLeaderboardDataType= {
    fullMarks: number;
    userScore: number;
    quizGivenTime: string;
    genreName: string;
    genreId: string;
}

type singleLeaderBoard = {
    userFullName: string;
    fullMarks: number;
    userScore: number;
    quizGivenTime: string;
}
const LeaderBoard: React.FC = () => {
    const navigate = useNavigate();
    const [userSpecificLeaderBoard, setUserSpecificLeaderBoard] = useState<singleLeaderboardDataType[]>([]);
    const [leaderBoardData, setLeaderBoardData] = useState<singleLeaderBoard[]>([]);
    const [selected, setSelected] = useState<string>("user");
    const {leaderBoardUserSpecific, leaderBoard, leaderBoardHandler, userBasedLeaderBoardHandler} = useStateHandler();
    useEffect(()=>{
        if(selected === "user"){
            if(leaderBoardUserSpecific?.length > 0){
                setUserSpecificLeaderBoard(leaderBoardUserSpecific)
            }else{
                userBasedLeaderBoardHandler();
            }
        }else{
            if(leaderBoard?.length > 0){
                setLeaderBoardData(leaderBoard)
            }else{
                console.log("comming")
                leaderBoardHandler();
            }
        }
    },[selected, leaderBoardUserSpecific, leaderBoard])

    useEffect(()=>{

    },[])
    return (
        <LeaderBoardStyle>
            <div style={{ height: "30px", width: "100%" }}>
                <div style={{ float: "right" }} onClick={() => navigate("/dashboard")}>
                    <Tooltip title="Go To Dashboard" arrow TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                        <IconButton><HomeIcon fontSize='large' /></IconButton>
                    </Tooltip>
                </div>
            </div>
            <Content>
                <div>
                    <div>
                        <button onClick={()=>setSelected("user")}>
                            My Leader Board
                        </button>
                    </div>

                    <div>
                        <button onClick={()=>setSelected("genre")}>
                            Main Leader Board
                        </button>
                    </div>
                </div>
                <div>
                    {(selected === "user") ? <MyLeaderBoard userSpecificLeaderBoard={userSpecificLeaderBoard}/> : <AllLeaderBoard leaderBoardData={leaderBoardData}/>}
                </div>
            </Content>
        </LeaderBoardStyle>
    )
}

export default LeaderBoard