import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStateHandler from '../../ReduxToolkit/useStateHandler';
import { ParentSingleQuestionAnswerDiv, SingleQuestionAnswerDiv, QuestionDivStyle, OptionStyle, ButtonStyle } from '../SingleQuestionDisplay/SingleQuestionAnswerDivStyle';
import SubmitHandlerModal from '../SubmitHandleModal/index';

type answerOptionArr = {
    answerText: string;
    isCorrect: boolean;
}
type allQuestionArr = {
    questionId: number;
    genreId: string;
    questionText: string;
    questionMark: number;
    timeAlloted: number;
    answerOptions: answerOptionArr[];
}

interface singleQuestionDisplay { 
    genreId: string; 
    questionId: number;
    questionText: string; 
    answerOptions: answerOptionArr[];
    questionIndex: number; 
    setQIndex: React.Dispatch<React.SetStateAction<number>>;
    questions: allQuestionArr[];
    setSelectedAnswer: React.Dispatch<React.SetStateAction<string>>
}

const SingleQuestionDisplay: React.FC<singleQuestionDisplay> = ({ genreId, questionId, questionText, answerOptions, questionIndex, setQIndex, questions, setSelectedAnswer })=>{
    const [selected, setSelected] = useState<string>('');
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [ modalMsg, setModalMsg] = useState<string>('');
    const [checkSubmitClicked, setCheckSubmitClicked] = useState<boolean>(false);
    const { prevAnswer, unAnsweredArray, storeGivenAnswerHandler, storeNotAnsweredHandler, submitGivenAnswerHandler, previousQuestionAnswerHandler } = useStateHandler();
    const history = useNavigate();

    useEffect(() => {
        previousQuestionAnswerHandler({ questionId: questionId })
        setSelected(prevAnswer ? prevAnswer : '');
    }, [questionId, prevAnswer])

    useEffect(() => {
        if (genreId) {
            history('/genre/' + genreId + "/" + (questionIndex + 1))
        }
    }, [questionIndex])

    useEffect(() => {
        setSelectedAnswer(selected);
    }, [selected])

    useEffect(()=>{
        if(checkSubmitClicked){
            // unAnsweredArray[1].length > 0
            // console.log('[[[[')
            // console.log(unAnsweredArray[1])
            if(unAnsweredArray.length > 0){
                setModalMsg("You Haven't Submitted All Of The Answeres. Still Want To Submit ? ");
                setModalShow(true);
            }else{
                setModalMsg("Want To Submit The Quiz?");
                setModalShow(true);
            }
            setCheckSubmitClicked(false);
        }
    },[checkSubmitClicked, unAnsweredArray]);

    //on option click will change - not done
    // useEffect(() => {
    //     if (selected != '') {
    //         if (selected !== '') {
    //             storeQuestionAnswer();
    //         }else{
    //             storeUnAnswerQuestionHandler();
    //         }
    //     }
    // }, [selected])

    const checkCorrectNessHandler = () => {
        return answerOptions.find((item: answerOptionArr) => {
            return item.answerText === selected;
        })
    }
    const storeQuestionAnswer = () => {
        const correctNess = checkCorrectNessHandler();
        storeGivenAnswerHandler({ questionId: questionId, givenAnswerText: selected, rightNess: correctNess ? correctNess.isCorrect : false, answerGiven: true });
    }
    const storeUnAnswerQuestionHandler = () => {
        storeNotAnsweredHandler({ questionId: questionId, givenAnswerText: selected, rightNess: false, answerGiven: false })
    }
    const onPrevClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setQIndex(prev => prev - 1);
        if (selected !== '') {
            storeQuestionAnswer();
        } else {
            storeUnAnswerQuestionHandler();
        }
    }
    const onNextClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setQIndex(prev => prev + 1);
        if (selected !== '') {
            storeQuestionAnswer();
        } else {
            storeUnAnswerQuestionHandler();
        }
    }
    const onAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelected(e.target.value);
    }
    const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (selected !== '') {
            const correctNess = checkCorrectNessHandler();
            storeGivenAnswerHandler({ questionId: questionId, givenAnswerText: selected, rightNess: correctNess ? correctNess.isCorrect : false, answerGiven: true });
        } else {
            storeUnAnswerQuestionHandler();
        }
        submitGivenAnswerHandler();
        setCheckSubmitClicked(true);
    }
    return (
        <ParentSingleQuestionAnswerDiv>
            <SingleQuestionAnswerDiv>
                <QuestionDivStyle>
                    {questionText}
                </QuestionDivStyle>
                <div>
                    {
                        answerOptions?.map((item: answerOptionArr, index: number) =>
                            <OptionStyle>
                                <input key={index} type="radio" value={item?.answerText} checked={(selected === item?.answerText) ? true : false} onChange={(e) => onAnswerChange(e)} />{item?.answerText}
                            </OptionStyle>)
                    }
                </div>
            </SingleQuestionAnswerDiv>
            <ButtonStyle>
            {
                (questionIndex === 0) ? <button disabled>Previous Question</button> : <button onClick={(e) => onPrevClick(e)}>Previous Question</button>
            }
            {
                (questionIndex === questions.length - 1) ? <button onClick={(e) => onSubmitHandler(e)}>Submit Quiz</button> : <button onClick={(e) => onNextClick(e)}>Next Question</button>
            }
            </ButtonStyle>
            {
                modalShow ? <SubmitHandlerModal modalMsg={modalMsg} modalShow={modalShow} setModalShow={setModalShow}/> : ''
            }

        </ParentSingleQuestionAnswerDiv>
    )
}

export default SingleQuestionDisplay