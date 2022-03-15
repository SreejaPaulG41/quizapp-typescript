import { givenAnswerConstants } from './givenAnswersConstant';

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
type submittedAns = {
    genreId: string;
    givenAnswerArr: answeredArr[];
}
interface givenAnswerSlice {
    answerArr: answeredArr[];
    unAnsweredArr: answeredArr[] | onLoadUnAnsweredArr[];
    submittedAns: submittedAns[] | any;
    previousQuestionAnswer: string;
    msg: string;
}
type actionType = {
    type: string;
    payload?: any;
    genreData?: submittedAns[];
}
const initialState: givenAnswerSlice = {
    answerArr: [],
    unAnsweredArr: [],
    submittedAns: [],
    previousQuestionAnswer: '',
    msg: '',
}
const givenAnswerReducer = (state = initialState, action: actionType) => {
    switch (action.type) {
        case givenAnswerConstants.STORE_ANSWERED_QUESTION:
            const presentArr = state.answerArr;
            const presentData = presentArr.find((item) => {
                return item.questionId === action.payload.questionId;
            })
            if (presentData) {
                const index = presentArr.indexOf(presentData);
                presentArr[index] = action.payload;
                return {
                    ...state,
                    answerArr: presentArr
                }
            } else {
                presentArr.push(action.payload);
                const ans: any = state.answerArr;
                const notAns: any = state.unAnsweredArr;
                const answeredIds = ans.map((item: any) => {
                    return item.questionId
                })
                const prevUnanseredIds = notAns.map((item: any) => {
                    return item.questionId
                })
                const nowUnAnswered = prevUnanseredIds.filter((item: any) => {
                    return !answeredIds.includes(item);
                })
                const nowUnAnsweredItems = notAns.filter((item: any) => {
                    return nowUnAnswered.includes(item.questionId);
                })
                return {
                    ...state,
                    unAnsweredArr: nowUnAnsweredItems
                }
            }

        case givenAnswerConstants.STORE_UNANSWERED_QUESTION:
            if (state.answerArr.length === 0 && Array.isArray(action.payload)) { //No Answer is there, on question surf
                console.log("In Reducer")
                console.log(action)
                const arrayOfUnanswered = action.payload;
                if (arrayOfUnanswered) {
                    const modifiedArrayOfUnAnswered = arrayOfUnanswered?.map((item: any) => ({
                        ...item,
                        givenAnswerText: '',
                        rightNess: false,
                        answerGiven: false
                    }))
                    return {
                        ...state,
                        unAnsweredArr: modifiedArrayOfUnAnswered
                    }
                } else {
                    return {
                        ...state
                    }
                }
            } else {
                let presentArr: any = state.unAnsweredArr;
                const presentAnsweredArr: any = state.answerArr;
                const presentData = presentArr.find((item: any) => {
                    return item.questionId === action.payload.questionId;
                })
                const presentDataInAnswered = presentAnsweredArr.find((item: any) => {
                    return item.questionId === action.payload.questionId;
                })
                if (presentData) {
                    const index = presentArr.indexOf(presentData);
                    presentArr[index] = action.payload;
                    let uniqueSet = new Set(presentArr);
                    let uniqueArray = Array.from(uniqueSet);
                    presentArr = uniqueArray;
                    console.log("changing if only in unAnswered")
                    console.log(state)
                }
                if (presentAnsweredArr) {
                    const indexInAnswered = presentAnsweredArr.indexOf(presentDataInAnswered);
                    const indexInUnAnswered = presentArr.indexOf(presentData);
                    if (indexInUnAnswered > -1) {
                        presentArr[indexInUnAnswered] = action.payload; //in unAnswered Array Push
                    } else {
                        presentArr.push(action.payload);
                        let uniqueSet = new Set(presentArr);
                        let uniqueArray = Array.from(uniqueSet);
                        presentArr = uniqueArray;
                    }
                    //from answered array remove
                    if (indexInAnswered > -1) {
                        presentAnsweredArr.splice(indexInAnswered, 1); // 2nd parameter means remove one item only
                    }
                }
                return {
                    ...state,
                    unAnsweredArr: presentArr,
                    answerArr: presentAnsweredArr
                }
            }

        case givenAnswerConstants.PREVIOUS_ANSWER_HANDLER:
            console.log("Prev Question")
            console.log(action)
            const questionId = action.payload.questionId;
            const presentArray = state.answerArr;
            const previousQuestion = presentArray.find((item) => {
                return item.questionId === questionId;
            })
            if (previousQuestion) {
                return {
                    ...state,
                    previousQuestionAnswer: previousQuestion.givenAnswerText
                }
            } else {
                return {
                    ...state,
                    previousQuestionAnswer: ''
                }
            }

        case givenAnswerConstants.GIVEN_ANSWER_SUBMIT_HANDLER:
            const dataToStore = action.genreData;
            return {
                ...state,
                submittedAns: dataToStore
            }
        case givenAnswerConstants.GIVEN_ANSWER_SUBMIT_ERROR:
            return{
                ...state,
                msg: "Something Went Wrong!"
            }
            
        default:
            return {
                ...state
            }
    }
}

export default givenAnswerReducer;