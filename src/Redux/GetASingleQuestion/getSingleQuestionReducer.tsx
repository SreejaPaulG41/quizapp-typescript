import { getSingleQuestionConstants } from './getSingleQuestionConstants';

type answerOptions = {
    answerText: string;
    isCorrect: boolean;
}

interface questionType {
    questionId: number;
    questionText: string;
    questionMark: number;
    timeAlloted: number;
    answerOptions: answerOptions[];
    genreName: string;
}
type stateType = {
    question: questionType;
    msg: string;
}

type actionType = {
    type: string;
    questionInfoDetails?: questionType;
    msg?: string;
}
const initialState: stateType = {
    question: {
        questionId: 0,
        questionText: '',
        questionMark: 0,
        timeAlloted: 0,
        answerOptions: [{ answerText: '', isCorrect: false }, { answerText: '', isCorrect: false }, { answerText: '', isCorrect: false }, { answerText: '', isCorrect: false }],
        genreName: '',
    },
    msg: ''
}
const getSingleQuestionReducer = (state: stateType = initialState, action: actionType): stateType => {
    switch (action.type) {
        case getSingleQuestionConstants.SUCCESSFUL_QUESTION_RECEIVE:
            const dataToShow = action?.questionInfoDetails;
            return { ...state, question: dataToShow!, msg: '' }
        case getSingleQuestionConstants.ERROR_ON_QUESTION_RECEIVE:
            const error = action?.msg;
            return { ...state , msg: error!}
        default:
            return { ...state }
    }
}

export default getSingleQuestionReducer;