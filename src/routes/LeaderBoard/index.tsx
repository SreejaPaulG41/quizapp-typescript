import React, { useState, useMemo } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';
import { LeaderBoardStyle, Content, Button, ButtonDiv } from './leaderBoardStyle';
import useStateHandler from '../../Redux/useStateHandler';
import MyLeaderBoard from './MyLeaderBoard';
import AllLeaderBoard from './AllLeaderBoard.tsx';

const LeaderBoard = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string>("user");
    const { userValid, userValidMsg } = useStateHandler();

    useMemo(() => {
        if (!userValid) {
            if (userValidMsg?.statusCode === 403) {
                navigate('/login');
                console.log("User Is Not Authenticated. Please Login Again!");

            }
        }
    }, [userValid, userValidMsg])

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
                    <Button onClick={() => setSelected("user")} style={{ borderBottom: (selected === "user") ? "2px solid grey" : "" }}>
                        My Leader Board
                    </Button>
                    <Button onClick={() => setSelected("genre")} style={{ borderBottom: (selected === "genre") ? "2px solid grey" : "" }}>
                        Main Leader Board
                    </Button>
                </ButtonDiv>
                <div>
                    {(selected === "user") ? <MyLeaderBoard /> : <AllLeaderBoard/>}
                </div>
            </Content>
        </LeaderBoardStyle>
    )
}

export default LeaderBoard