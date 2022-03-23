import { useEffect, useMemo, useState } from 'react'
import useStateHandler from '../../../Redux/useStateHandler';
import { useNavigate, useParams } from 'react-router-dom';
import SingleQuestionDisplay from '../../../Components/SingleQuestionDisplay/index';
import QuestionChart from '../QuestionChart/index';
import { QuestionContainerDiv, FlexDiv } from '../QuestionDisplayContainer/questionContainerDivStyle';
import Timer from '../../../Components/Timer/timer';

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
const QuestionDisplayContainer = ()=> {
    const { genreBasedQuestionData, answerArr, genreDetails, onLoadUnAnseredQuestion, userValid, userValidMsg, authenticationHandler, getGenreSpecificQuestions, storeNotAnsweredHandler } = useStateHandler();
    const [questionToDisplay, setQuestionToDisplay] = useState<allQuestionArr>({ questionId: 0, genreId: '', questionText: '', questionMark: 0, timeAlloted: 0, answerOptions: [] });
    const navigate = useNavigate();
    const genreId = useParams<urlPrameter>().genreId;
    const paramQIndex = useParams<urlPrameter>().qIndex;
    const qsIndex = parseInt(paramQIndex ? paramQIndex : '');
    const [buttonType, setButtonType] = useState<number>(0);
    const [allQuestions, setAllQuestions] = useState<allQuestionArr[]>([]);
    const [selectedQuestionId, setSelectedQuestionId] = useState<number | undefined>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [genreName, setGenreName] = useState<string>('');

    // useEffect(() => {
    //   authenticationHandler();
    // }, []);
    useMemo(() => {
      if (!userValid) {
        if (userValidMsg?.statusCode === 403) {
          navigate('/login');
          console.log("User Is Not Authenticated. Please Login Again!");
          
        }
      }
    }, [userValid, userValidMsg])
    
    useEffect(() => {
        if (genreId) {
            getGenreSpecificQuestions(genreId);
            // navigate("/genre/"+ genreId + "/1", { replace:true });
        }
    }, [genreId]);

    useEffect(() => {
        if (genreBasedQuestionData) {
            setAllQuestions(genreBasedQuestionData)
        }
    }, [genreBasedQuestionData])

    useEffect(()=>{
        if(allQuestions === genreBasedQuestionData){
            const filteredQuestion = allQuestions[0];
            if (filteredQuestion) {
                setQuestionToDisplay(filteredQuestion);
                setSelectedQuestionId(filteredQuestion.questionId);
                setButtonType(0);
            }
        }
    },[allQuestions])

    useEffect(() => {
        if (genreBasedQuestionData?.length > 0 && answerArr?.length === 0) {
            console.log("Genre Here")
            console.log(genreBasedQuestionData)
            //getUnAnsweredQuestionOnFirstLoad();
        }

    }, [genreBasedQuestionData, answerArr]);

    useEffect(() => {
        console.log('****')
        console.log(onLoadUnAnseredQuestion)
        if (onLoadUnAnseredQuestion?.length > 0) {
            storeNotAnsweredHandler(onLoadUnAnseredQuestion);
        }
    }, [onLoadUnAnseredQuestion])

    useEffect(() => {
        // setQuestionIndex(qsIndex - 1);
        if (qsIndex) {
            setSelectedQuestionId(qsIndex);
            // console.log("qsIndex")
            // console.log(qsIndex)
        }
    }, [qsIndex]);

    //Genre Name On Top
    useEffect(() => {
        if (genreDetails?.length > 0) {
            const selectedGnere = genreDetails?.find((item: any) => {
                return item.genreId === genreId;
            })
            if (selectedGnere) {
                setGenreName(selectedGnere.genreName);
            }
        }
    }, [genreId]);

    useEffect(() => {
        if (genreBasedQuestionData === allQuestions) {
            if (genreBasedQuestionData) {
                console.log("First Phase")
                console.log(qsIndex)
                console.log(selectedQuestionId)
                const filteredQuestion = genreBasedQuestionData?.find((item: any, index: number) => {
                    return item.questionId === selectedQuestionId;
                })
                let indexVal = 0;
                for (let i = 0; i < genreBasedQuestionData.length; i++) {
                    if (selectedQuestionId === genreBasedQuestionData[i].questionId) {
                        indexVal = i;
                    }
                }
                setButtonType(indexVal)
                if (filteredQuestion) {
                    setQuestionToDisplay(filteredQuestion);
                    setSelectedQuestionId(filteredQuestion.questionId);
                    console.log("selectedQuestionId")
                    console.log(filteredQuestion.questionId)
                }

            }
        }
    }, [genreBasedQuestionData, selectedQuestionId])

    useEffect(() => {
        navigate("/genre/" + genreId + "/" + selectedQuestionId, { replace: true });
    }, [selectedQuestionId])

    return (
        <QuestionContainerDiv>
            <FlexDiv>
                <h1>{genreName + " Quiz"}</h1>
                <Timer />
            </FlexDiv>
            <FlexDiv>
                <div style={{ flex: 1 }}>
                    <SingleQuestionDisplay genreId={questionToDisplay?.genreId} questionId={questionToDisplay?.questionId}
                        questionText={questionToDisplay?.questionText} answerOptions={questionToDisplay?.answerOptions}
                        questionIndex={selectedQuestionId} setQIndex={setSelectedQuestionId} questions={allQuestions}
                        setSelectedAnswer={setSelectedAnswer} buttonType={buttonType} setButtonType={setButtonType}
                    />
                </div>
                <div>
                    <QuestionChart genreId={questionToDisplay?.genreId} questionId={questionToDisplay?.questionId}
                        answerOptions={questionToDisplay?.answerOptions} selectedAnswer={selectedAnswer} setQIndex={setSelectedQuestionId} />
                </div>

            </FlexDiv>

        </QuestionContainerDiv>
    )
}

export default QuestionDisplayContainer