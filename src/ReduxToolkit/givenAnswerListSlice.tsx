import { createSlice, current } from '@reduxjs/toolkit';
import { sliceNames } from './storeConstants';

export type answerOptionArr = {
    answerText: string;
    isCorrect: boolean;
}

export type allQuestionArr = {
    questionId: number;
    genreId: string;
    questionText: string;
    questionMark: number;
    timeAlloted: number;
    answerOptions: answerOptionArr[];
}

export type answeredArr = {
    questionId: number;
    givenAnswerText: string;
    rightNess: boolean;
    answerGiven: boolean;

}
export type onLoadUnAnsweredArr = {
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
export interface givenAnswerSlice {
    answerArr: answeredArr[];
    unAnsweredArr: answeredArr[] | onLoadUnAnsweredArr[];
    submittedAns: answeredArr[] | onLoadUnAnsweredArr[];
    previousQuestionAnswer: string;
}
const initialState: givenAnswerSlice = {
    answerArr: [],
    unAnsweredArr: [],
    submittedAns: [],
    previousQuestionAnswer: '',
}

const givenAnswerListSlice = createSlice({
    name: sliceNames.GIVEN_ANSWER_LIST,
    initialState,
    reducers: {
        storeAnswerHandler: (state = initialState, action) => {
            const presentArr = state.answerArr;
            console.log("Funcs")
            console.log(current(state))
            const presentData = presentArr.find((item) => {
                return item.questionId === action.payload.questionId;
            })
            console.log("presentArr")
            console.log(presentData)
            if (presentData) {
                const index = presentArr.indexOf(presentData);
                presentArr[index] = action.payload;
                console.log("on Change")
                console.log(current(state))
            } else {
                presentArr.push(action.payload);
                const ans: any = state.answerArr;
                const notAns: any = state.unAnsweredArr;
                console.log(" up")
                console.log(current(state))
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
                console.log("In Reducer")
                console.log(nowUnAnsweredItems)
                state.unAnsweredArr = nowUnAnsweredItems;

            }
        },
        storeUnAnsweredHandler: (state, action) => {
            if (state.answerArr.length === 0 && Array.isArray(action.payload)) {
                console.log("In Reducer")
                console.log(action.payload)
                console.log(current(state))
                console.log(action.payload)
                const arrayOfUnanswered = action.payload;
                if (arrayOfUnanswered) {
                    const modifiedArrayOfUnAnswered = arrayOfUnanswered?.map((item: any) => ({
                        ...item,
                        givenAnswerText: '',
                        rightNess: false,
                        answerGiven: false
                    }))
                    state.unAnsweredArr = modifiedArrayOfUnAnswered;
                }
            } else {
                console.log("on blank reponse")
                console.log(action.payload)
                console.log(current(state))
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
                    // let uniqueArr: any = [];
                    // presentArr.forEach((element: any) => {
                    //     if (!uniqueArr.includes(element)) {
                    //         uniqueArr.push(element);
                    //     }

                    // });
                    let uniqueSet = new Set(presentArr);
                    let uniqueArray = Array.from(uniqueSet);
                    presentArr = uniqueArray;
                    console.log("changing if only in unAnswered")
                    console.log(current(state))
                }
                if (presentAnsweredArr) {
                    const indexInAnswered = presentAnsweredArr.indexOf(presentDataInAnswered);
                    const indexInUnAnswered = presentArr.indexOf(presentData);
                    if (indexInUnAnswered > -1) {
                        presentArr[indexInUnAnswered] = action.payload; //in unAnswered Array Push
                    } else {
                        presentArr.push(action.payload);
                        // let uniqueArr: any = [];
                        // presentArr.forEach((element: any) => {
                        //     if (!uniqueArr.includes(element)) {
                        //         uniqueArr.push(element);
                        //     }
    
                        // });
                        let uniqueSet = new Set(presentArr);
                    let uniqueArray = Array.from(uniqueSet);
                    presentArr = uniqueArray;
                    }
                    //from answered array remove
                    if (indexInAnswered > -1) {
                        presentAnsweredArr.splice(indexInAnswered, 1); // 2nd parameter means remove one item only
                    }
                    console.log("changing if was in answered")
                    console.log(current(state))
                }
            }
        },
        showPreviousAnswerHandler: (state, action) => {
            console.log("Prev Question")
            console.log(action.payload)
            const questionId = action.payload.questionId;
            const presentArr = state.answerArr;
            const previousQuestion = presentArr.find((item) => {
                return item.questionId === questionId;
            })
            console.log("Prev Question 2")
            console.log(previousQuestion)
            console.log(current(state))
            if (previousQuestion) {
                state.previousQuestionAnswer = previousQuestion.givenAnswerText;
            } else {
                state.previousQuestionAnswer = '';
            }
        },
        submittedAnswerHandler: (state) => {
            console.log(current(state))
            const presentAnsweredArr = state.answerArr;
            const presentUnAnsweredArr = state.unAnsweredArr;
            const submittedAns = presentAnsweredArr.concat(presentUnAnsweredArr);
            state.submittedAns = submittedAns;
        }
    }
})

export const { storeAnswerHandler, storeUnAnsweredHandler, showPreviousAnswerHandler, submittedAnswerHandler } = givenAnswerListSlice.actions;

export default givenAnswerListSlice.reducer;