import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { QuestionTopicContainer, QuestionTopicsDiv, QuestionSingleTopicCard } from '../QuizTopicCardContainer/questionTopicContainerStyle';
import QuizTopicCard from '../../../Components/QuizTopicCard/index';
import useStateHandler from '../../../Redux/useStateHandler';

interface genreInterface {
  genreName: string;
  genreId: string;
}

function QuizTopicCardContainer() {
  const {genreDetails, getAllGenreDetails} = useStateHandler();
  const [genresDetail, setGenresDetail] = useState<genreInterface[]>([]);
  useEffect(()=>{
    getAllGenreDetails();
  },[])
  useEffect(()=>{
    setGenresDetail(genreDetails.genreDetails);
  },[genreDetails])
  return (
    <QuestionTopicContainer>
      <QuestionTopicsDiv>
        {
          genresDetail?.map((item, index) =>
            <QuestionSingleTopicCard key={index}>
              <QuizTopicCard name={item.genreName} id={item.genreId}/>
            </QuestionSingleTopicCard>)
        }
        
      </QuestionTopicsDiv>
    </QuestionTopicContainer>
  )
}

export default QuizTopicCardContainer