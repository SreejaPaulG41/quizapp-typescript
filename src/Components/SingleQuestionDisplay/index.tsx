import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStateHandler from '../../Redux/useStateHandler';
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
    questionIndex: number | undefined;
    setQIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
    questions: allQuestionArr[];
    setSelectedAnswer: React.Dispatch<React.SetStateAction<string>>;
    buttonType: number;
    setButtonType: React.Dispatch<React.SetStateAction<number>>;
}

const SingleQuestionDisplay: React.FC<singleQuestionDisplay> = ({ genreId, questionId, questionText, answerOptions, questionIndex, setQIndex, questions, setSelectedAnswer, buttonType, setButtonType }) => {
    const [selected, setSelected] = useState<string>('');
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [modalMsg, setModalMsg] = useState<string>('');
    const [checkSubmitClicked, setCheckSubmitClicked] = useState<boolean>(false);
    const { genreBasedQuestionData, prevAnswer, answerArr, unAnsweredArray, storeGivenAnswerHandler, storeNotAnsweredHandler, submitGivenAnswerHandler, previousQuestionAnswerHandler } = useStateHandler();
    const history = useNavigate();

    useEffect(() => {
        previousQuestionAnswerHandler({ questionId: questionId }) //on question change if any answer was there will show that
        setSelected(prevAnswer ? prevAnswer : '');
    }, [questionId, prevAnswer])

    useEffect(() => {
        if (genreId) {
            history('/genre/' + genreId + "/" + questionIndex)
        }
    }, [questionIndex])

    useEffect(() => {
        setSelectedAnswer(selected);
    }, [selected])

    useEffect(() => {
        if (checkSubmitClicked) {
            // unAnsweredArray[1].length > 0
            // console.log('[[[[')
            // console.log(unAnsweredArray[1])
            if (unAnsweredArray.length > 0) {
                setModalMsg("You Haven't Submitted All Of The Answeres. Still Want To Submit ? ");
                setModalShow(true);
            } else {
                setModalMsg("Want To Submit The Quiz?");
                setModalShow(true);
            }
            setCheckSubmitClicked(false);
        }
    }, [checkSubmitClicked, unAnsweredArray]);

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
    const setQuestionIdHandler = (cond: string) => {
        if (cond === "Prev") {
            let indexVal = 0;
            for (let i = 0; i < genreBasedQuestionData.length; i++) {
                if (questionIndex === genreBasedQuestionData[i].questionId) {
                    indexVal = i;
                }
            }
            return genreBasedQuestionData[indexVal - 1]?.questionId;
        } else {
            let indexVal = 0;
            for (let i = 0; i < genreBasedQuestionData.length; i++) {
                if (questionIndex === genreBasedQuestionData[i].questionId) {
                    indexVal = i;
                }
            }
            return genreBasedQuestionData[indexVal + 1]?.questionId;
        }
    }
    const onPrevClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const idChangeValue = setQuestionIdHandler("Prev")
        setQIndex(idChangeValue);
        if (selected !== '') {
            storeQuestionAnswer();
        } else {
            storeUnAnswerQuestionHandler();
        }
    }
    const onNextClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const idChangeValue = setQuestionIdHandler("Next")
        setQIndex(idChangeValue);
        if (selected !== '') {
            storeQuestionAnswer();
        } else {
            storeUnAnswerQuestionHandler();
        }
    }
    const onAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelected(e.target.value);
    }
    const onAnswerDivClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const divElement = e.target as Element;
        setSelected(divElement.id);
    }
    const onClearButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setSelected('');
        storeNotAnsweredHandler({ questionId: questionId, givenAnswerText: '', rightNess: false, answerGiven: false })
    }
    const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (selected !== '') {
            const correctNess = checkCorrectNessHandler();
            storeGivenAnswerHandler({ questionId: questionId, givenAnswerText: selected, rightNess: correctNess ? correctNess.isCorrect : false, answerGiven: true });
        } else {
            storeUnAnswerQuestionHandler();
        }
        //submitAnsModificationHandler();
        setCheckSubmitClicked(true);
    }
    const submitAnsModificationHandler = () => {
        const presentAnsweredArr = answerArr;
        const presentUnAnsweredArr = unAnsweredArray;
        const submiitedStoredArr = [];
        for (let i = 0; i < presentAnsweredArr.length; i++) {
            if(presentAnsweredArr[i]){
                submiitedStoredArr[i] = {
                    questionId: presentAnsweredArr[i].questionId,
                    givenAnswerText: presentAnsweredArr[i].givenAnswerText,
                    answerGiven: presentAnsweredArr[i].answerGiven,
                    rightNess: presentAnsweredArr[i].rightNess
                }
            }
        }
        let lastLength = submiitedStoredArr.length - 1;
        for (let i = 0; i < presentUnAnsweredArr.length; i++) {
            if (presentUnAnsweredArr[i]) {
                submiitedStoredArr[lastLength + i + 1] = {
                    questionId: presentUnAnsweredArr[i].questionId,
                    givenAnswerText: presentUnAnsweredArr[i].givenAnswerText,
                    answerGiven: presentUnAnsweredArr[i].answerGiven,
                    rightNess: presentUnAnsweredArr[i].rightNess
                }
            }
        }
        const sortedAnswerArr = submiitedStoredArr.sort((a, b) => {
            return a.questionId - b.questionId;
        })
        const sortedAnswerDetails = {
            genreId: genreId,
            givenAnswerArr: sortedAnswerArr
        }
        console.log("call")
        console.log(sortedAnswerDetails)
        submitGivenAnswerHandler(sortedAnswerDetails);
    }

    return (
        <ParentSingleQuestionAnswerDiv>
            <SingleQuestionAnswerDiv>
                <QuestionDivStyle>
                    <div style={{ flex: 1 }}>{questionText}</div>
                    <div><button onClick={(e) => onClearButtonClick(e)}>Clear Answer</button></div>
                </QuestionDivStyle>
                <div>
                    {
                        answerOptions?.map((item: answerOptionArr, index: number) =>
                            <OptionStyle key={index} id={item?.answerText} onClick={(e) => onAnswerDivClick(e)}>
                                <input key={index} type="radio" value={item?.answerText} checked={(selected === item?.answerText) ? true : false} onChange={(e) => onAnswerChange(e)} />{item?.answerText}
                            </OptionStyle>)
                    }
                </div>
            </SingleQuestionAnswerDiv>
            <ButtonStyle>
                {
                    (buttonType === 0) ? <button disabled>Previous Question</button> : <button onClick={(e) => onPrevClick(e)}>Previous Question</button>
                }
                {
                    (buttonType === genreBasedQuestionData?.length - 1) ? <button onClick={(e) => onSubmitHandler(e)}>Submit Quiz</button> : <button onClick={(e) => onNextClick(e)}>Next Question</button>
                }
            </ButtonStyle>
            {
                modalShow ? <SubmitHandlerModal modalMsg={modalMsg} modalShow={modalShow} setModalShow={setModalShow} submitAnsModificationHandler={submitAnsModificationHandler}/> : ''
            }

        </ParentSingleQuestionAnswerDiv>
    )
}

export default SingleQuestionDisplay