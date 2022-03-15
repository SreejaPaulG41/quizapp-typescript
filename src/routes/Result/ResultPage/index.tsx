import React, {useState, useEffect} from 'react';
import useStateHandler from '../../../Redux/useStateHandler';
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
  
    const {genreBasedQuestionFullMarks, submittedAnswerArr, resultArr, resultHandler} = useStateHandler();

    useEffect(()=>{
      resultHandler(submittedAnswerArr?.genreId);
    },[])

    useEffect(()=>{
      if(resultArr){
        console.log("resultArr")
        console.log(resultArr)
        const marksGot = resultArr.reduce((acc: number, item: any)=>{
          console.log(item.questionMark)
          console.log(item.rightNess)
          return  (item.rightNess) ? (acc + item.questionMark) : ((item.answerGiven)? (acc - (item.questionMark*0.50)) : acc);
        },0);
        const percentage = (marksGot / genreBasedQuestionFullMarks) * 100;
        setFullMarks(genreBasedQuestionFullMarks);
        setMarksGot(marksGot);
        setPercentageMarks(percentage);
        setResultArrToShow(resultArr);
      }
  },[resultArr]);

  return (
    <div style={{padding: '41px', marginTop: '30px'}}>
      <MarksPannel percentageMarksGot={percentageMarks} />
      <AnswerKey resultArrToShow={resultArrToShow} fullMarks={fullMarks} marksGot={marksGot}/>
    </div>
  )
}

export default Result