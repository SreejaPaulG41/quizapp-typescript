import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStateHandler from '../../Redux/useStateHandler';
import { ButtonDiv } from '../SingleButtonInChart/buttonDivStyle';

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
    id: number;
    genreId: string; 
    questionId: number;
    answerOptions: answerOptionArr[];
    selectedAnswer: string;
    setQIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
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
const SingleButtonInChart: React.FC<singleButtonInChartProps> = ({ item, id, genreId, questionId, answerOptions, selectedAnswer, setQIndex })=>{
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
    // if(unAnsweredArray.length === 0 && answerArr.length > 0){
    //   setUnAnsweredQues(unAnsweredArray)
    // }
    console.log(".....")
    console.log("Answer")
    console.log(answerArr)
    console.log("data")
    console.log(genreBasedQuestionData)
    console.log("Unanswered")
    console.log(unAnsweredArray)
  }, [questionNoFromUrl]);

  useEffect(() => {
    //All Ansered Question ID
    if (answeredQues.length > 0 && unAnswereQues.length > 0) {
      const answeredQuestionIds = answerArr?.map((item: any) => {
        return item.questionId;
      })
      console.log("given answer")
      console.log(answerArr)
      //All Questions ID
      const allQuestionIds = genreBasedQuestionData?.map((item: any) => {
        return item.questionId;
      })
      console.log("all")
      console.log(genreBasedQuestionData)
      //Not Answered Question ID
      const notAnsweredIds = allQuestionIds.filter((item: any) => {
        return !answeredQuestionIds.includes(item);
      })
      console.log("Not ID")
      console.log(notAnsweredIds);
      //Not Answered Question Index
      if (notAnsweredIds.length > 0) {
        // const notAnseredItem: (number | allQuestionArr)[] = genreBasedQuestionData.map((item, index) => {
        //   if (notAnsweredIds.includes(item.questionId)) {
        //     return index;
        //   } else {
        //     return item;
        //   }
        // })
        const notAnsweredItem: number[] = [];
        for(let i=0;i<genreBasedQuestionData?.length;i++){
            if(notAnsweredIds.includes(genreBasedQuestionData[i].questionId)){
                notAnsweredItem.push(genreBasedQuestionData[i].questionId);
            }
        }
        
        // const notAnseredIndex: number[] = [];
        // for (let i = 0; i < notAnseredItem.length; i++) {
        //   if (typeof notAnseredItem[i] === 'number') {
        //     notAnseredIndex.push(notAnseredItem[i] + 1);
        //   }
        // }
        console.log("index")
        // console.log(notAnseredIndex)
        console.log(notAnsweredItem)
        setUnAnsweredIndexArr(notAnsweredItem);
      }
    } else if (answeredQues.length > 0 && unAnswereQues.length === 0) {
      setUnAnsweredIndexArr([]);
    } else {
    //   const notAnseredIndex = onLoadUnAnseredQuestion[0]?.map((item, index) => {
    //     return index + 1;
    //   })
    console.log("onLoadUnAnseredQuestion")
    console.log(onLoadUnAnseredQuestion)
      const notAnseredIndex = onLoadUnAnseredQuestion?.map((item: any, index: number) => {
        return item.questionId;
      })
      setUnAnsweredIndexArr(notAnseredIndex);
    }

  }, [questionNoFromUrl, answeredQues, unAnswereQues])

  useEffect(() => {
    if (unAnsweredIndexArr.includes(id)) {
      console.log("Yellow");
      setColorOfButton("#ffe033");
      setHoverColorButton('#fff4b3');
    } else {
      console.log("Green");
      setColorOfButton("#7bea7b");
      setHoverColorButton('#bdf5bd');
    }

  }, [unAnsweredIndexArr, id]);

  const questionButtonClick = () => {
    console.log("coming here")
    if (selectedAnswer !== '') {
      storeQuestionAnswer();
      console.log("coming if")
    } else {
      console.log("coming else")
      storeUnAnswerQuestionHandler();
    }
    if (genreId) {
      setQIndex(id)
      navigate('/genre/' + genreId + '/' + id);
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
    <ButtonDiv bgcolor={getBgColorButton()} hoverBgColor={getHoverBgColor()}>
      <button onClick={() => questionButtonClick()}>
        {item}
        {console.log(getBgColorButton())}
      </button>
    </ButtonDiv>
  )
}

export default SingleButtonInChart