import React, { useState, useEffect } from 'react';
import SingleButtonInChart from '../../../Components/SingleButtonInChart/index';
import useStateHandler from '../../../Redux/useStateHandler';
import { QuestionButtonChartDiv } from '../QuestionChart/questionButtonChartDivStyle';


type answerOptionArr = {
    answerText: string;
    isCorrect: boolean;
}

interface questionChartProps { 
    genreId: string; 
    questionId: number;
    answerOptions: answerOptionArr[];
    selectedAnswer: string;
    setQIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
}
interface buttonData {
    index: number;
    id: number;
}
const QuestionChart: React.FC<questionChartProps> = ({ genreId, questionId, answerOptions, selectedAnswer, setQIndex }) => {
    const { genreBasedQuestionData } = useStateHandler();
    const [buttonValue, setButtonValue] = useState<buttonData[]>([]);
    // const genreId = useParams().genreId;

    useEffect(() => {
        // const len = genreBasedQuestionData.length;
        // const buttonsArr = [];
        // for (let i = 0; i < len; i++) {
        //     buttonsArr[i] = i + 1;
        // }
        if(genreBasedQuestionData){
            const buttonsArr = genreBasedQuestionData?.map((item: any, index: number)=>{
                return {
                    index: index + 1,
                    id: item.questionId,
                }
            })
            setButtonValue(buttonsArr)
        }
    }, [genreBasedQuestionData]);

    return (
        <QuestionButtonChartDiv>
            <div>
                {
                    buttonValue?.map((item: buttonData, index: number) =>
                        <SingleButtonInChart key={index} item={item.index} id={item.id} genreId={genreId} questionId={questionId} answerOptions={answerOptions} selectedAnswer={selectedAnswer} setQIndex={setQIndex}/>
                    )
                }
            </div>
        </QuestionButtonChartDiv>
    )
}

export default QuestionChart