import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
        </div>
    )
}

export default MyLeaderBoard