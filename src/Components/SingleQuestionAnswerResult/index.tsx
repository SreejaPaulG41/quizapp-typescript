import React, { useState, useEffect } from 'react';
import { SingleQuestionAnswerDiv, QuestionDivStyle, OptionStyle } from '../SingleQuestionAnswerResult/SingleQuestionAnswerDivStyle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

type answerOptionArr = {
    answerText: string;
    isCorrect: boolean;
}

type singleQuestionAnswerProps = {
    id: number;
    genreId: string;
    questionMarks: number;
    questionText: string;
    questionId: number;
    givenAnswerText: string;
    answerOptions: answerOptionArr[],
    rightNess: boolean;
    answerGiven: boolean;
    questionMark: number;
    timeAlloted: number;
}
const SingleQuestionAnswerResult: React.FC<singleQuestionAnswerProps> = ({ id, genreId, questionMarks, questionText, questionId, givenAnswerText, answerOptions, rightNess, answerGiven, questionMark, timeAlloted }) => {
    const [marksCalc, setMarksCal] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);
    const [clicked, setClicked] = useState<string>('');

    useEffect(() => {
        marksShowHnadler();
    }, [questionId])
    const marksShowHnadler = () => {
        if (!answerGiven) {
            setMarksCal(0);
        } else {
            if (rightNess) {
                setMarksCal(questionMark);
            } else {
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
        if (!answerGiven) {
            return "#808080";
        } else {
            if (rightNess) {
                return "#3b5e3b";
            } else {
                return "#eb2d53";
            }
        }
    }
    const setOptionShowHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setShow(!show);
        setClicked(e.currentTarget.id);
    }
    useEffect(() => {
        if (!show) {
            setClicked('');
        }
    }, [show])
    return (
        <SingleQuestionAnswerDiv>
            <QuestionDivStyle color={marksColor(answerGiven, rightNess)}>
                <div>{questionText}</div>
                <span>{marksCalc + " / " + questionMarks}</span>
                <div onClick={(e) => setOptionShowHandler(e)} id={id.toString()}>
                    {(!show) ?
                        <Tooltip title="Show Options" arrow TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                            <IconButton><ArrowDropDownIcon /></IconButton>
                        </Tooltip> :
                        <Tooltip title="Hide Options" arrow TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                            <IconButton><ArrowDropUpIcon /></IconButton>
                        </Tooltip>
                    }
                </div>
            </QuestionDivStyle>

            <div style={{ display: (clicked === id.toString()) ? "block" : "none"}}>
                <div>{answerOptions.map((item, index) =>
                    <OptionStyle key={index} bgColor={chooseBgColor(item)} borderColor={borderColor(item)}>
                        {item.answerText}
                    </OptionStyle>
                )}</div>
                <div>{rightNess}</div>
            </div>
        </SingleQuestionAnswerDiv>
    )
}

export default SingleQuestionAnswerResult