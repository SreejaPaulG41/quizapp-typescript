import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { QuestionTopicContainer, QuestionTopicsDiv, QuestionSingleTopicCard } from '../QuizTopicCardContainer/questionTopicContainerStyle';
import QuizTopicCard from '../../../Components/QuizTopicCard/index';
import useStateHandler from '../../../Redux/useStateHandler';

interface genreInterface {
  genreName: string;
  genreId: string;
}
type singleLeaderboardDataType = {
  fullMarks: number;
  userScore: number;
  quizGivenTime: string;
  genreName: string;
  genreId: string;
}

function QuizTopicCardContainer() {
  const { genreDetails, leaderBoardUserSpecific, getAllGenreDetails, userBasedLeaderBoardHandler } = useStateHandler();
  const [genresDetail, setGenresDetail] = useState<genreInterface[]>([]);
  const [leaderBoardDetails, setLeaderBoardDetails] = useState<singleLeaderboardDataType[]>([]);

  useEffect(() => {
    getAllGenreDetails(); //Get Genre
  }, [])
  useEffect(() => {
    userBasedLeaderBoardHandler(); //Get UserSpec Leaderboard
  }, [])
  useEffect(() => {
    setGenresDetail(genreDetails);
  }, [genreDetails])
  useEffect(() => {
    console.log(leaderBoardUserSpecific)
    setLeaderBoardDetails(leaderBoardUserSpecific)
  }, [leaderBoardUserSpecific])
  return (
    <QuestionTopicContainer>
      <QuestionTopicsDiv>
        {
          genresDetail?.map((item, index) =>
            <QuestionSingleTopicCard key={index}>
              <QuizTopicCard name={item.genreName} id={item.genreId} leaderBoardDetails={leaderBoardDetails} />
            </QuestionSingleTopicCard>)
        }

      </QuestionTopicsDiv>
    </QuestionTopicContainer>
  )
}

export default QuizTopicCardContainer