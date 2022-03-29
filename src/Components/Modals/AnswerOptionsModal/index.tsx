import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


interface answerOptions {
    isCorrect: boolean;
    answerText: string;
  }
  
type propsTyope = {
    swhowAnswerOptionModal: boolean;
    handleAnswerOptionsClose: () => void;
    answerOptions: answerOptions[];
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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
const AnswerOptionsModal = ({ swhowAnswerOptionModal, handleAnswerOptionsClose, answerOptions }: propsTyope) => {
    return (
        <div>
            {
                (swhowAnswerOptionModal!==undefined)?
            <Modal
                open={swhowAnswerOptionModal!}
                onClose={handleAnswerOptionsClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 100 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>{"Answer Text"}</StyledTableCell>
                                    <StyledTableCell>{"Correctness"}</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    answerOptions?.map((answer: answerOptions, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell>{answer.answerText}</StyledTableCell>
                                            <StyledTableCell>{(answer.isCorrect) ? "True" : "False"}</StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
            :""}
        </div>
    )
}

export default AnswerOptionsModal;