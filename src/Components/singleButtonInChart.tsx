import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStateHandler from '../ReduxToolkit/useStateHandler';
import { ButtonDiv } from './Styles/ButtonDiv.Styled';

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

interface singleButtonInChartProps { 
    item: number;
    genreId: string; 
    questionId: number;
    answerOptions: answerOptionArr[];
    selectedAnswer: string;
}

type answeredArr = {
    questionId: number;
    givenAnswerText: string;
    rightNess: boolean;
    answerGiven: boolean;

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
const SingleButtonInChart: React.FC<singleButtonInChartProps> = ({ item, genreId, questionId, answerOptions, selectedAnswer })=>{
  const navigate = useNavigate();
  const qNo = useParams().qIndex;
  const questionNoFromUrl = parseInt(qNo ? qNo : '');
  const { answerArr, unAnsweredArray, genreBasedQuestionData, onLoadUnAnseredQuestion, storeGivenAnswerHandler, storeNotAnsweredHandler } = useStateHandler();
  const [answeredQues, setAnsweredQues] = useState<answeredArr[]>([]);
  const [unAnswereQues, setUnAnsweredQues] = useState<answeredArr[] | onLoadUnAnsweredArr[]>([]);
  const [unAnsweredIndexArr, setUnAnsweredIndexArr] = useState<number[]>([]);
  const [colorOfButton, setColorOfButton] = useState<string>('');
  const [hoverColorButton, setHoverColorButton] = useState<string>('');

  useEffect(() => {
    setAnsweredQues(answerArr);
    // setUnAnsweredQues(unAnsweredArray[1])
    setUnAnsweredQues(unAnsweredArray)
    console.log(".....")
    console.log("Answer")
    console.log(answerArr)
    console.log("Unanswered")
    console.log(unAnsweredArray)
  }, [questionNoFromUrl]);

  useEffect(() => {
    //All Ansered Question ID
    if (answeredQues.length > 0 && unAnswereQues.length > 0) {
      const answeredQuestionIds = answerArr.map((item) => {
        return item.questionId;
      })
      // console.log("given answer")
      // console.log(answerArr)
      //All Questions ID
      const allQuestionIds = genreBasedQuestionData.map((item) => {
        return item.questionId;
      })
      // console.log("all")
      // console.log(genreBasedQuestionData)
      //Not Answered Question ID
      const notAnsweredIds = allQuestionIds.filter((item) => {
        return !answeredQuestionIds.includes(item);
      })
      // console.log("Not ID")
      // console.log(notAnsweredIds);
      //Not Answered Question Index
      if (notAnsweredIds.length > 0) {
        // const notAnseredItem: (number | allQuestionArr)[] = genreBasedQuestionData.map((item, index) => {
        //   if (notAnsweredIds.includes(item.questionId)) {
        //     return index;
        //   } else {
        //     return item;
        //   }
        // })
        const notAnseredItem: number[] = [];
        for(let i=0;i<genreBasedQuestionData.length;i++){
            if(notAnsweredIds.includes(genreBasedQuestionData[i].questionId)){
                notAnseredItem.push(i+1);
            }
        }
        
        // const notAnseredIndex: number[] = [];
        // for (let i = 0; i < notAnseredItem.length; i++) {
        //   if (typeof notAnseredItem[i] === 'number') {
        //     notAnseredIndex.push(notAnseredItem[i] + 1);
        //   }
        // }
        // console.log("index")
        // console.log(notAnseredIndex)
        setUnAnsweredIndexArr(notAnseredItem);
      }
    } else if (answeredQues.length > 0 && unAnswereQues.length === 0) {
      setUnAnsweredIndexArr([]);
    } else {
    //   const notAnseredIndex = onLoadUnAnseredQuestion[0]?.map((item, index) => {
    //     return index + 1;
    //   })
      const notAnseredIndex = onLoadUnAnseredQuestion?.map((item, index) => {
        return index + 1;
      })
      setUnAnsweredIndexArr(notAnseredIndex);
    }

  }, [answeredQues, unAnswereQues])

  useEffect(() => {
    console.log('/////')
    console.log(unAnsweredIndexArr)
    console.log(item)
    if (unAnsweredIndexArr.includes(item)) {
      console.log("Yellow");
      setColorOfButton("#ffe033");
      setHoverColorButton('#fff4b3');
    } else {
      console.log("Green");
      setColorOfButton("#7bea7b");
      setHoverColorButton('#bdf5bd');
    }

  }, [unAnsweredIndexArr, item]);

  const questionButtonClick = () => {
    if (selectedAnswer !== '') {
      storeQuestionAnswer();
    } else {
      storeUnAnswerQuestionHandler();
    }
    if (genreId) {
      navigate('/genre/' + genreId + '/' + item);
    }
  }
  const checkCorrectNessHandler = () => {
    return answerOptions.find((item) => {
      return item.answerText === selectedAnswer;
    })
  }
  const storeQuestionAnswer = () => {
    const correctNess = checkCorrectNessHandler();
    storeGivenAnswerHandler({ questionId: questionId, givenAnswerText: selectedAnswer, rightNess: correctNess ? correctNess.isCorrect : false, answerGiven: true });
  }
  const storeUnAnswerQuestionHandler = () => {
    storeNotAnsweredHandler({ questionId: questionId, givenAnswerText: selectedAnswer, rightNess: false, answerGiven: false })
  }

  const getBgColorButton = () => {
    return colorOfButton;
  }
  const getHoverBgColor = ()=>{
    return hoverColorButton;
  }
  return (
    // <ButtonDiv bgcolor={getBgColorButton()} hoverBgColor={getHoverBgColor()}>
    //   <button onClick={() => questionButtonClick()}>
    //     {item}
    //   </button>
    // </ButtonDiv>
    <ButtonDiv>
    <button onClick={() => questionButtonClick()}>
      {item}
    </button>
  </ButtonDiv>
  )
}

export default SingleButtonInChart