import React, { useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useStateHandler from '../../../Redux/useStateHandler';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.text.secondary,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


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
const MyLeaderBoard = () => {
    const [information, setInformation] = useState<singleLeaderboardDataType[] | undefined>([]);
    const { leaderBoardUserSpecific, userBasedLeaderBoardHandler } = useStateHandler();
    
    useEffect(() => {
        console.log(leaderBoardUserSpecific)
        if (leaderBoardUserSpecific.length > 0) {
            setInformation(leaderBoardUserSpecific);
        }
    }, [leaderBoardUserSpecific])
    useEffect(()=>{
        userBasedLeaderBoardHandler();
    },[])
    return (
        <div>
            {(information?.length) ?
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 100 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>{"Genre Name"}</StyledTableCell>
                                <StyledTableCell align="right">{"Genre Id"}</StyledTableCell>
                                <StyledTableCell align="right">{"Full Marks"}</StyledTableCell>
                                <StyledTableCell align="right">{"User Marks"}</StyledTableCell>
                                <StyledTableCell align="right">{"Given On"}</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {information?.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.genreName}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.genreId}</StyledTableCell>
                                    <StyledTableCell align="right">{row.fullMarks}</StyledTableCell>
                                    <StyledTableCell align="right">{row.userScore}</StyledTableCell>
                                    <StyledTableCell align="right">{row.quizGivenTime}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                : <div>
                    <h4>You Have Not Attended Any Quiz To Show!</h4>
                </div>}
        </div>
    )
}

export default MyLeaderBoard