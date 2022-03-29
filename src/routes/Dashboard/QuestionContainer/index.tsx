import React, { useEffect, useState } from 'react'
import useStateHandler from '../../../Redux/useStateHandler'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AnswerOptionsModal from '../../../Components/Modals/AnswerOptionsModal/index';
import SingleQuestionModal from '../../../Components/Modals/SingleQuestionModal/index';

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

const QuestionTopicContainer = () => {
  const { allQuestions, getAllQuestions } = useStateHandler();
  const [questions, setQuestions] = useState<questionType[]>([]);
  const [swhowAnswerOptionModal, setSwhowAnswerOptionModal] = useState<boolean>();
  const [selectedAnswerOptionQId, setSelectedAnswerOptionQId] = useState<string>('');
  const [answerOptions, setAnswerOptions] = useState<answerOptions[]>([]);
  const [showQuestionModal, setQuestionShowModal] = useState<boolean>();
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>('');
  const [selectedQuestion, setSelectedQuestion] = useState<questionType>();
  const [updateClicked, setUpdateClicked] = useState<boolean>();
  const [deleteClicked, setDeleteClicked] = useState<boolean>();
  
  const rowClickHandler = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, id: string)=>{
    console.log(e.currentTarget)
    if(e.currentTarget.id === id){
      setQuestionShowModal(true);
      setSelectedQuestionId(id);
    }
  }
  const handleSingleQuestionModalClose = ()=>setQuestionShowModal(false);
  const handleAnswerOptionsOpen = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>, id: string) => {
    if(e.currentTarget.id === id){
      setSwhowAnswerOptionModal(true);
      setSelectedAnswerOptionQId(id);
    }
    e.stopPropagation();
  }
  const handleAnswerOptionsClose = () => setSwhowAnswerOptionModal(false);
  const getAnswerOptions = (id: string)=>{
    const filteredQuestion = questions.find((item, index)=>{
      return item.questionId.toString() === id;
    })
    setAnswerOptions(filteredQuestion?.answerOptions!);
  }
  const getSelectedQuestion = (id: string)=>{
    const selectedOne = questions?.find((item, index)=>{
      return item.questionId.toString() === id;
    })
    setSelectedQuestion(selectedOne!);
  }
  useEffect(()=>{
    getAnswerOptions(selectedAnswerOptionQId)
  }, [selectedAnswerOptionQId])
  useEffect(()=>{
    getSelectedQuestion(selectedQuestionId);
  },[selectedQuestionId])

  useEffect(() => {
    getAllQuestions();
  }, [])
  useEffect(()=>{
    if(deleteClicked){
      getAllQuestions();
      setDeleteClicked(false);
    }
  },[deleteClicked])
  useEffect(() => {
    console.log("allQuestions")
    console.log(allQuestions)
    setQuestions(allQuestions);
  }, [allQuestions])
  return (
    <div style={{margin: "25px"}}>
      {(questions?.length) ?
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

              {questions?.map((row, index) => (
                <StyledTableRow key={row.questionId} id={row.questionId.toString()} style={{cursor: "pointer"}} onClick={(e)=>rowClickHandler(e, row.questionId.toString())}>
                  <StyledTableCell component="th" scope="row">
                    {row.genreName}
                  </StyledTableCell>
                  <StyledTableCell>{row.questionText}</StyledTableCell>
                  <StyledTableCell align="right">
                    <h4 style={{cursor: "pointer"}} onClick={(e)=>handleAnswerOptionsOpen(e, row.questionId.toString())} id={row.questionId.toString()}>View Answer Options</h4>
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.questionMark}</StyledTableCell>
                  <StyledTableCell align="right">{row.timeAlloted + " Sec"}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        : <div>
          <h4>Question Is Being Fetched</h4>
        </div>}
        <AnswerOptionsModal swhowAnswerOptionModal={swhowAnswerOptionModal!} handleAnswerOptionsClose={handleAnswerOptionsClose} answerOptions={answerOptions}/>
        <SingleQuestionModal showQuestionModal={showQuestionModal!} handleSingleQuestionModalClose={handleSingleQuestionModalClose} question={selectedQuestion!} deleteClicked={deleteClicked} setDeleteClicked={setDeleteClicked}/>
    </div>
  )
}

export default QuestionTopicContainer;