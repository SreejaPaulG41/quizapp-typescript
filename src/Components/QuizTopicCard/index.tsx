import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useStateHandler from '../../ReduxToolkit/useStateHandler';
import { IndividualCard } from '../QuizTopicCard/questionTopicContainerStyle';
import gk from '../../Assets/Images/gk.jpg';
import javascript from '../../Assets/Images/javascript.png';
import react from '../../Assets/Images/react.png';
import science from '../../Assets/Images/science.jpeg';

type quizTopicCard = {
    name: string;
    id: string;
}
const QuizTopicCard: React.FC<quizTopicCard> = ({ name, id }) => {
    //const { genreBasedSortQuestionHandler } = useStateHandler();
    const navigate = useNavigate();

    const emojiRendererHandler = (name: string) => {
        switch (name) {
            case "General Knowledge":
                return gk;
            case "JavaScript":
                return javascript;
            case "React JS":
                return react;
            case "Science":
                return science;
        }
    }
    return (
        <IndividualCard>
            <div>
                <h1>{name}</h1>
                <img src={emojiRendererHandler(name)} alt={name}/>
            </div>
            <div>
                <Link to= {"/genre/" + id }>
                    <button>Start Quiz</button>
                </Link>
            </div>
        </IndividualCard>
    )
}

export default QuizTopicCard;