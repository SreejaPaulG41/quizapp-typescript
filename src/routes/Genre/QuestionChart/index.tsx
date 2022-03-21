import React, { useState, useEffect } from 'react';
import SingleButtonInChart from '../../../Components/SingleButtonInChart/index';
import useStateHandler from '../../../Redux/useStateHandler';
import { QuestionButtonChartDiv } from '../QuestionChart/questionButtonChartDivStyle';
import { useNavigate } from 'react-router-dom';

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
    const { genreBasedQuestionData, userValid, userValidMsg, authenticationHandler } = useStateHandler();
    const [buttonValue, setButtonValue] = useState<buttonData[]>([]);
    // const genreId = useParams().genreId;
    const navigate = useNavigate();
    
    useEffect(() => {
        authenticationHandler();
      }, []);
      useEffect(() => {
        if (!userValid) {
          if (userValidMsg?.statusCode === 403) {
            navigate('/login');
            console.log("User Is Not Authenticated. Please Login Again!");
            
          }
        }
      }, [userValid, userValidMsg])

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