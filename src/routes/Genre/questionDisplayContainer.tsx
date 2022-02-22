import React, { useEffect, useState } from 'react'
import useStateHandler from '../../ReduxToolkit/useStateHandler';
import { useParams } from 'react-router-dom';
import SingleQuestionDisplay from '../../Components/singleQuestionDisplay';
import QuestionChart from './questionChart';
import { QuestionContainerDiv, FlexDiv } from '../../Components/Styles/QuestionContainerDiv.styled';
import Timer from '../../Components/timer';

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
type urlPrameter = {
    genreId: string;
    qIndex: string;
}
function QuestionDisplayContainer() {
    const { genreBasedQuestionData, genreDetails, onLoadUnAnseredQuestion, storeNotAnsweredHandler, getUnAnsweredQuestionOnFirstLoad } = useStateHandler();
    const [questionToDisplay, setQuestionToDisplay] = useState<allQuestionArr>({ questionId: 0, genreId: '', questionText: '', questionMark: 0, timeAlloted: 0, answerOptions: []});
    const genreId = useParams<urlPrameter>().genreId;
    const paramQIndex = useParams<urlPrameter>().qIndex;
    const qsIndex = parseInt(paramQIndex ? paramQIndex : '');
    const [questionIndex, setQuestionIndex] = useState<number>(qsIndex - 1);
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [genreName, setGenreName] = useState<string>('');

    useEffect(() => {
        if (genreBasedQuestionData.length > 0) {
            getUnAnsweredQuestionOnFirstLoad();
        }
    }, []);

    useEffect(() => {
        storeNotAnsweredHandler(onLoadUnAnseredQuestion);
    }, [onLoadUnAnseredQuestion])

    useEffect(() => {
        setQuestionIndex(qsIndex - 1);
    }, [qsIndex]);

    useEffect(() => {
        if (genreDetails.length > 0) {
            const selectedGnere = genreDetails.find((item) => {
                return item.genreId === genreId;
            })
            if(selectedGnere){
                setGenreName(selectedGnere.genreName);
            }
        }
    }, [genreId]);

    useEffect(() => {
        const filteredQuestion = genreBasedQuestionData.find((item, index) => {
            return index === questionIndex;
        })
        if(filteredQuestion){
            setQuestionToDisplay(filteredQuestion);
        }
    }, [genreBasedQuestionData, questionIndex])

    return (
        <QuestionContainerDiv>
            <FlexDiv>
                <h1>{genreName + " Quiz"}</h1>
                <Timer />
            </FlexDiv>
            <FlexDiv>
                <div style={{ flex: 1 }}>
                    <SingleQuestionDisplay genreId={questionToDisplay.genreId} questionId={questionToDisplay.questionId}
                        questionText={questionToDisplay.questionText} answerOptions={questionToDisplay.answerOptions}
                        questionIndex={questionIndex} setQIndex={setQuestionIndex} questions={genreBasedQuestionData}
                        setSelectedAnswer={setSelectedAnswer}
                    />
                </div>
                <div>
                    <QuestionChart genreId={questionToDisplay.genreId} questionId={questionToDisplay.questionId}
                        answerOptions={questionToDisplay.answerOptions} selectedAnswer={selectedAnswer} />
                </div>

            </FlexDiv>

        </QuestionContainerDiv>
    )
}

export default QuestionDisplayContainer