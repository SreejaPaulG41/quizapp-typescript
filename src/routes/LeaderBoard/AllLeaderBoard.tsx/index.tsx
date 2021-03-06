import React, { useEffect, useState } from 'react'
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

type LeaderBoard = {
    userFullName: string;
    genreName: string;
    fullMarks: number;
    userScore: number;
    quizGivenTime: string;
}
type propsType = {
    leaderBoardData: LeaderBoard[]
}
const AllLeaderBoard = () => {
    const [leaderBoardData, setLeaderBoardData] = useState<LeaderBoard[]>([]);
    const [sortedData, setSortedData] = useState<LeaderBoard[]>([]);
    const { leaderBoard, leaderBoardHandler } = useStateHandler();

    useEffect(() => {
        if(leaderBoard.length > 0){
            setLeaderBoardData(leaderBoard)
            const sortedArr = leaderBoard.sort((a: any,b: any)=>{
                // if(a.userScore - b.userScore)
                //     return 1;
                // else if(a.userScore - b.userScore)
                //     return -1;
                return b.userScore - a.userScore;
            })
            console.log(sortedArr === leaderBoard)
            setSortedData(sortedArr)
        }
    }, [leaderBoard])
    useEffect(()=>{
        leaderBoardHandler();
    },[])
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 100 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>{"User Name"}</StyledTableCell>
                            <StyledTableCell align="right">{"Genre Name"}</StyledTableCell>
                            <StyledTableCell align="right">{"Full Marks"}</StyledTableCell>
                            <StyledTableCell align="right">{"User Marks"}</StyledTableCell>
                            <StyledTableCell align="right">{"Given On"}</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    
                        {sortedData?.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {row.userFullName}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.genreName}</StyledTableCell>
                                <StyledTableCell align="right">{row.fullMarks}</StyledTableCell>
                                <StyledTableCell align="right">{row.userScore}</StyledTableCell>
                                <StyledTableCell align="right">{row.quizGivenTime}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AllLeaderBoard