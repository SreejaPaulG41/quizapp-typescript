import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useStateHandler from '../../../Redux/useStateHandler';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

interface answerOptions {
    isCorrect: boolean;
    answerText: string;
}
interface questionType {
    questionId: number;
    questionText: string;
    questionMark: number;
    timeAlloted: number;
    answerOptions: answerOptions[];
    genreName: string;
}

type propsType = {
    showQuestionModal: boolean;
    handleSingleQuestionModalClose: () => void;
    question: questionType | undefined;
    deleteClicked: boolean | undefined;
    setDeleteClicked: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

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
    },// hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const SingleQuestionModal = ({ showQuestionModal, handleSingleQuestionModalClose, question, deleteClicked, setDeleteClicked }: propsType) => {
    const { onSuccessFulDelete, deletQuestionHandler, getSingleQuestionHandler } = useStateHandler();
    const navigate = useNavigate();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [successOnDeleteOpen, setSuccessOnDeleteOpen] = useState<boolean>(false);
    const [deleteSuccess, setDeleteSuccess] = useState<string>('');

    useEffect(() => {
        console.log(question)

    }, [question])
    const deleteQuestionHandler = () => {
        handleSingleQuestionModalClose();
        deletQuestionHandler(question?.questionId!);
        if (onSuccessFulDelete !== '') {
            setDeleteSuccess(onSuccessFulDelete);
            setDeleteClicked(true);
        }
    }
    const updateQuestionHandler = () => {
        handleSingleQuestionModalClose();
        getSingleQuestionHandler(question?.questionId!);
        navigate(`/updateQuestion/${question?.questionId}`);
    }
    const handleClose = () => {
        setSuccessOnDeleteOpen(false);
        setDeleteSuccess('');
    }
    // useEffect(()=>{
    //     if(onSuccessFulDelete!==''){
    //         setDeleteSuccess(onSuccessFulDelete);
    //         setDeleteClicked(true);
    //     }
    // },[onSuccessFulDelete])
    useEffect(() => {
        if (deleteSuccess !== '') {
            console.log("deleteSuccess")
            console.log(deleteSuccess)
            setSuccessOnDeleteOpen(true);
        }
    }, [deleteSuccess])
    return (
        <div>
            {(showQuestionModal !== undefined) ?
                <Dialog
                    fullScreen={fullScreen}
                    open={showQuestionModal!}
                    onClose={handleSingleQuestionModalClose}
                    aria-labelledby="responsive-dialog-title"

                >
                    <DialogContent>
                        <DialogContentText>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 100 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell >{"Genre Name"}</StyledTableCell>
                                            <StyledTableCell >{"Question"}</StyledTableCell>
                                            <StyledTableCell align="center">{"Answer Options"}</StyledTableCell>
                                            <StyledTableCell align="right">{"Full Marks"}</StyledTableCell>
                                            <StyledTableCell align="right">{"Time Alloted"}</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <StyledTableRow key={question?.questionId} id={question?.questionId.toString()}>
                                            <StyledTableCell component="th" scope="row">
                                                {question?.genreName}
                                            </StyledTableCell>
                                            <StyledTableCell>{question?.questionText}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <TableContainer component={Paper}>
                                                    <Table aria-label="customized table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <StyledTableCell >{"Answer"}</StyledTableCell>
                                                                <StyledTableCell >{"CorrectNess"}</StyledTableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {
                                                                question?.answerOptions.map((item: answerOptions, index) => (
                                                                    <StyledTableRow key={index}>
                                                                        <StyledTableCell>{item.answerText}</StyledTableCell>
                                                                        <StyledTableCell>{(item.isCorrect) ? "True" : "False"}</StyledTableCell>
                                                                    </StyledTableRow>

                                                                ))
                                                            }
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{question?.questionMark}</StyledTableCell>
                                            <StyledTableCell align="right">{question?.timeAlloted + " Sec"}</StyledTableCell>
                                        </StyledTableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={updateQuestionHandler}>
                            Update
                        </Button>
                        <Button onClick={deleteQuestionHandler} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                : ""}
            <Snackbar open={successOnDeleteOpen} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {deleteSuccess}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default SingleQuestionModal;