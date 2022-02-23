import React, { useState, useEffect } from 'react';
import { SingleQuestionAnswerDiv, QuestionDivStyle, OptionStyle } from '../SingleQuestionAnswerResult/SingleQuestionAnswerDivStyle';

type answerOptionArr = {
    answerText: string;
    isCorrect: boolean;
}

type singleQuestionAnswerProps = {
    genreId: string; 
    questionText: string; 
    questionId: number; 
    givenAnswerText: string; 
    answerOptions: answerOptionArr[],
    rightNess: boolean; 
    answerGiven: boolean; 
    questionMark: number;
    timeAlloted: number;
}
const SingleQuestionAnswerResult: React.FC<singleQuestionAnswerProps> = ({ genreId, questionText, questionId, givenAnswerText, answerOptions, rightNess, answerGiven, questionMark,timeAlloted})=> {
    const [marksCalc, setMarksCal] = useState(0);
    useEffect(() => {
        marksShowHnadler();
    }, [questionId])
    const marksShowHnadler = ()=>{
        if(!answerGiven){
            setMarksCal(0);
        }else{
            if(rightNess){
                setMarksCal(questionMark);
            }else{
                const afterNegetiveMarks = questionMark * 0.50;
                setMarksCal(-afterNegetiveMarks);
            }
        }
    }
    const chooseBgColor = (option: answerOptionArr) => {
        if ((option.answerText === givenAnswerText) && rightNess) {
            return "#cfe2cf"; //green color
        } else if ((option.answerText === givenAnswerText) && !rightNess) {
            return "#ffcccc"; //red color
        } else if ((option.answerText != givenAnswerText) && option.isCorrect) {
            return "#cfe2cf"; //green color
        } else if ((option.answerText != givenAnswerText) && !option.isCorrect) {
            return "#e6e6e6"; //gray color
        }
    }
    const borderColor = (option: answerOptionArr) => {
        if ((option.answerText === givenAnswerText) && rightNess) {
            return "#3b5e3b"; //green color
        } else if ((option.answerText === givenAnswerText) && !rightNess) {
            return "#eb2d53"; //red color
        } else if ((option.answerText != givenAnswerText) && option.isCorrect) {
            return "#3b5e3b"; //green color
        } else if ((option.answerText != givenAnswerText) && !option.isCorrect) {
            return "#808080"; //gray color
        }
    }
    const marksColor = (answerGiven: boolean, rightNess: boolean) => {
        if(!answerGiven){
            return "#808080";
        }else{
            if(rightNess){
                return "#3b5e3b";
            }else{
                return "#eb2d53";
            }
        }
    }
    return (
        <SingleQuestionAnswerDiv>
            <QuestionDivStyle color={marksColor(answerGiven, rightNess)}>
                <div>{questionText}</div>
                <div>{marksCalc}</div>
            </QuestionDivStyle>
            <div>{answerOptions.map((item, index) =>
                <OptionStyle key={index} bgColor={chooseBgColor(item)} borderColor={borderColor(item)}>
                    {item.answerText}                    
                </OptionStyle>
            )}</div>
            <div>{rightNess}</div>
        </SingleQuestionAnswerDiv>
    )
}

export default SingleQuestionAnswerResult