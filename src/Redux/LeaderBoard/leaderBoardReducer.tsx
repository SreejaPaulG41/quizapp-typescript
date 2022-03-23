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
    genreName: string;
    fullMarks: number;
    userScore: number;
    quizGivenTime: string;
}
type stateType = {
    userSpecificLeaderBoardInformation: singleLeaderboardDataType[] ;
    leaderBoardInformation: singleLeaderBoard[] ;
}
type actionType = {
    type: string,
    userSpecificeaderBoardData?: singleLeaderboardDataType[],
    leaderBoardData?: singleLeaderBoard[],
}
const initialState: stateType = {
    userSpecificLeaderBoardInformation: [],
    leaderBoardInformation: []
}

const leaderBoardReducer = (state: stateType = initialState, action: actionType): stateType =>{
    switch(action.type){
        case leaderBoardConstants.ON_SUCCESSFUL_LEADERBOARD_DETAILS_USER_SPECIFIC:
            const dataToStore = action.userSpecificeaderBoardData;
            return {...state, userSpecificLeaderBoardInformation: dataToStore!}
        case leaderBoardConstants.ON_SUCCESSFUL_LEADERBOARD_DETAILS:
            const dataToSave = action.leaderBoardData;
            return {...state, leaderBoardInformation: dataToSave!}
        default:
            return {...state}
    }
}

export default leaderBoardReducer;