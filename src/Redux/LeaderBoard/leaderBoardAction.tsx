import { leaderBoardConstants } from './leaderBoardConstants';

export const leaderBoardActions = {
    getLeaderboardUserSpecHandler: ()=>{
        return {
            type: leaderBoardConstants.GET_LEADERBOARD_RESULT_USER_SPECIFIC
        }
    },
    getLeaderboardHandler: ()=>{
        return {
            type: leaderBoardConstants.GET_LEADERBOARD_RESULT
        }
    }
}