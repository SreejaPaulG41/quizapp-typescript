import { leaderBoardConstants } from './leaderBoardConstants';

type singleLeaderboardDataType= {
    fullMarks: number;
    userScore: number;
    quizGivenTime: string;
    genreName: string;
    genreId: string;
}
type singleLeaderBoard = {
    userFullName: string;
    fullMarks: number;
    userScore: number;
    quizGivenTime: string;
}
type stateType = {
    userSpecificLeaderBoardInformation: singleLeaderboardDataType[]| any;
    leaderBoardInformation: singleLeaderBoard[] | any;
}
type actionType = {
    type: string,
    leaderBoardData?: singleLeaderboardDataType[],
    genreSpecLeaderBoard?: singleLeaderBoard[],
}
const initialState: stateType = {
    userSpecificLeaderBoardInformation: [],
    leaderBoardInformation: []
}

const leaderBoardReducer = (state = initialState, action: actionType)=>{
    switch(action.type){
        case leaderBoardConstants.ON_SUCCESSFUL_LEADERBOARD_DETAILS_USER_SPECIFIC:
            const dataToStore = action.leaderBoardData;
            return {...state, userSpecificLeaderBoardInformation: dataToStore}
        case leaderBoardConstants.ON_SUCCESSFUL_LEADERBOARD_DETAILS:
            const dataToSave = action.leaderBoardData;
            return {...state, leaderBoardInformation: dataToSave}
        default:
            return {...state}
    }
}

export default leaderBoardReducer;