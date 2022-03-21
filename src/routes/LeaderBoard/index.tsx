import React, { useState, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';
import { LeaderBoardStyle, Content, Button, ButtonDiv } from './leaderBoardStyle';
import useStateHandler from '../../Redux/useStateHandler';
import MyLeaderBoard from './MyLeaderBoard';
import AllLeaderBoard from './AllLeaderBoard.tsx';

type singleLeaderboardDataType = {
    fullMarks: number;
    userScore: number;
    quizGivenTime: string;
    genreName: string;
    genreId: string;
}

type singleLeaderBoard = {
    userFullName: string;
    genreName: string;
    fullMarks: number;
    userScore: number;
    quizGivenTime: string;
}
const LeaderBoard: React.FC = () => {
    const navigate = useNavigate();
    const [userSpecificLeaderBoard, setUserSpecificLeaderBoard] = useState<singleLeaderboardDataType[]>([]);
    const [leaderBoardData, setLeaderBoardData] = useState<singleLeaderBoard[]>([]);
    const [selected, setSelected] = useState<string>("user");
    const { leaderBoardUserSpecific, leaderBoard, userValid, userValidMsg, authenticationHandler, leaderBoardHandler, userBasedLeaderBoardHandler } = useStateHandler();

    useEffect(() => {
        authenticationHandler();
    }, []);
    useEffect(() => {
        if (!userValid) {
            if (userValidMsg?.statusCode === 403) {
                navigate('/login');
                console.log("User Is Not Authenticated. Please Login Again!");

            }
        }
    }, [userValid, userValidMsg])

    useEffect(() => {
        if (selected === "user") {
            if (leaderBoardUserSpecific?.length > 0) {
                setUserSpecificLeaderBoard(leaderBoardUserSpecific)
            } else {
                userBasedLeaderBoardHandler();
            }
        } else {
            if (leaderBoard?.length > 0) {
                console.log("leader board")
                console.log(leaderBoardData)
                console.log(leaderBoard)
                setLeaderBoardData(leaderBoard)
            } else if(leaderBoard?.length === 0 && leaderBoard!==leaderBoardData) {
                leaderBoardHandler();
            }
        }
    }, [selected, leaderBoardUserSpecific, leaderBoard])

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
                <ButtonDiv>
                    <div>
                        <Button onClick={() => setSelected("user")} style={{ borderBottom: (selected === "user") ? "2px solid grey" : "" }}>
                            My Leader Board
                        </Button>
                    </div>
                    <Button onClick={() => setSelected("genre")} style={{ borderBottom: (selected === "genre") ? "2px solid grey" : "" }}>
                        Main Leader Board
                    </Button>
                </ButtonDiv>
                <div>
                    {(selected === "user") ? <MyLeaderBoard userSpecificLeaderBoard={userSpecificLeaderBoard} /> : <AllLeaderBoard leaderBoardData={leaderBoardData} />}
                </div>
            </Content>
        </LeaderBoardStyle>
    )
}

export default LeaderBoard