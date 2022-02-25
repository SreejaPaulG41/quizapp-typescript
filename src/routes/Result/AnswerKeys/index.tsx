import React from 'react';
import SingleQuestionAnswerResult from '../../../Components/SingleQuestionAnswerResult/index';

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
type answerKeyProps = {
    resultArrToShow: onLoadUnAnsweredArr[];
    fullMarks: number;
    marksGot: number;
}
const AnswerKey: React.FC<answerKeyProps> = ({resultArrToShow, fullMarks, marksGot})=>{
    
  return (
    <div>
        <h2>{(fullMarks > 0) ? "Your Marks : " + marksGot + " / " + fullMarks : ''}</h2>
        {
            resultArrToShow?.map((item, index)=>
                <div key={index}>
                    <SingleQuestionAnswerResult key={index + item.questionId} genreId={item.genreId} questionText={item.questionText} questionId={item.questionId} givenAnswerText={item.givenAnswerText} answerOptions={item.answerOptions} rightNess={item.rightNess} answerGiven={item.answerGiven} questionMark={item.questionMark}
        timeAlloted= {item.timeAlloted}/>
                </div>
            )
        }
    </div>
  )
}

export default AnswerKey