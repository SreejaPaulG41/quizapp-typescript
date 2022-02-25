import React, {useState, useEffect} from 'react';
import useStateHandler from '../../../ReduxToolkit/useStateHandler';
import AnswerKey from '../AnswerKeys/index';
import MarksPannel from '../MarksPannel/index';

type answerOptionArr = {
    answerText: string;
    isCorrect: boolean;
}

type onLoadUnAnsweredArr = {
    questionId: number;
    genreId: string;
    questionText: string;
    questionMark: number;
    timeAlloted: number;
    answerOptions: answerOptionArr[];
    givenAnswerText: string;
    rightNess: boolean;
    answerGiven: boolean;
}

const Result: React.FC = () => {
  const [resultArrToShow, setResultArrToShow] = useState<onLoadUnAnsweredArr[]>([]);
  const [percentageMarks, setPercentageMarks] = useState<number>(0);
  const [fullMarks, setFullMarks] = useState<number>(0);
  const [marksGot, setMarksGot] = useState<number>(0);
  
    const {submittedAnswerArr, genreBasedQuestionData, genreBasedQuestionFullMarks} = useStateHandler();

    useEffect(()=>{
      const totalQuestionCopy = [...genreBasedQuestionData];
      console.log("In Result")
      console.log(submittedAnswerArr)
      //Sort the array in case there is some missing in between 
      const sortedSubmittedAnswer = submittedAnswerArr?.slice().sort((a,b)=>{
        return a.questionId - b.questionId;
      })
      const resultArr = totalQuestionCopy.map((item, index)=>({
        ...item,
        givenAnswerText : sortedSubmittedAnswer[index].givenAnswerText,
        rightNess : sortedSubmittedAnswer[index].rightNess,
        answerGiven: sortedSubmittedAnswer[index].answerGiven,
      }))
      const marksGot = resultArr.reduce((acc, item)=>{
        console.log(item.questionMark)
        console.log(item.rightNess)
        return  (item.rightNess) ? (acc + item.questionMark) : ((item.answerGiven)? (acc - (item.questionMark*0.50)) : acc);
      },0);
      const percentage = (marksGot / genreBasedQuestionFullMarks) * 100;
      setFullMarks(genreBasedQuestionFullMarks);
      setMarksGot(marksGot);
      setPercentageMarks(percentage);
      setResultArrToShow(resultArr);

  },[submittedAnswerArr, genreBasedQuestionData]);

  return (
    <div style={{padding: '41px', marginTop: '30px'}}>
      <MarksPannel percentageMarksGot={percentageMarks} />
      <AnswerKey resultArrToShow={resultArrToShow} fullMarks={fullMarks} marksGot={marksGot}/>
    </div>
  )
}

export default Result