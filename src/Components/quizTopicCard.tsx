import React from 'react';
import {Link} from 'react-router-dom';
import useStateHandler from '../ReduxToolkit/useStateHandler';
import {IndividualCard} from './Styles/QuestionTopicContainer.styled';

type quizTopicCard = {
    name: string;
    id: string;
}
const QuizTopicCard: React.FC<quizTopicCard> = ({name, id}) => {
    const {genreBasedSortQuestionHandler} = useStateHandler();

    return (
        <IndividualCard>
            <div>
                <h1>{name}</h1>
            </div>
            <div>
                <Link to={"/genre/" + id + "/1"}>
                    <button onClick={()=>genreBasedSortQuestionHandler(id)}>Start Quiz</button>
                </Link>
            </div>
        </IndividualCard>
    )
}

export default QuizTopicCard;