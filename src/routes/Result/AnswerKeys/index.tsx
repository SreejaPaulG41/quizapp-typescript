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
}
const AnswerKey: React.FC<answerKeyProps> = ({resultArrToShow})=>{
    
  return (
    <div>
        <h3>Check The Answers Below</h3>
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