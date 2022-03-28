import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IndividualCard, DetailsDiv, Heading, IndividualDiv } from '../QuizTopicCard/questionTopicContainerStyle';
import gk from '../../Assets/Images/gk.jpg';
import javascript from '../../Assets/Images/javascript.png';
import react from '../../Assets/Images/react.png';
import science from '../../Assets/Images/science.jpeg';
import os from '../../Assets/Images/OS.jpg';
import oop from '../../Assets/Images/oop.png';
import Default from '../../Assets/Images/Default.jpeg';
import history from '../../Assets/Images/History.jpg';

type singleLeaderboardDataType = {
    fullMarks: number;
    userScore: number;
    quizGivenTime: string;
    genreName: string;
    genreId: string;
}

type quizTopicCard = {
    name: string;
    id: string;
    leaderBoardDetails: singleLeaderboardDataType[];
}
const QuizTopicCard: React.FC<quizTopicCard> = ({ name, id, leaderBoardDetails }) => {
    const [showButton, setShowButton] = useState<boolean>(true);
    const [showDetails, setShowDetails] = useState<singleLeaderboardDataType | undefined>({ fullMarks: 0, userScore: 0, quizGivenTime: '', genreName: '', genreId: '' });
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
            case "Operating System":
                return os;
            case "Object Oriented Programming":
                return oop;
            case "History":
                return history;
            default:
                return Default;
        }
    }
    const showNameHandler = (name: string) => {
        let newName = '';
        if (name.length > 20) {
            const withOutSpace = name?.split(" ");
            newName = withOutSpace?.reduce((acc: string, item: string): string => {
                acc = acc + item.charAt(0).toUpperCase();
                return acc;
            }, '')
            return newName;
        } else {
            return name;
        }
    }
    useEffect(() => {
        const idsInLeaderBoard = leaderBoardDetails.map((item: singleLeaderboardDataType, index: number) => item.genreId);
        if (idsInLeaderBoard?.indexOf(id) > -1) {
            setShowButton(false);
            const dataToShow = leaderBoardDetails.find((item: singleLeaderboardDataType, index: number) => item.genreId == id)
            setShowDetails(dataToShow);
        } else {
            setShowButton(true);
            setShowDetails({ fullMarks: 0, userScore: 0, quizGivenTime: '', genreName: '', genreId: '' });
        }
    }, [leaderBoardDetails, id])
    return (
        <IndividualCard>
            <div>
                <h2>{showNameHandler(name)}</h2>
                <img src={emojiRendererHandler(name)} alt={name} />
            </div>
            {
                (showButton) ?

                    <Link to={"/genre/" + id}>
                        <button>Start Quiz</button>
                    </Link>
                    :
                    <DetailsDiv>
                        <IndividualDiv>
                            <Heading>{"Score"}</Heading>
                            <div>{showDetails?.userScore + " / " + showDetails?.fullMarks}</div>
                        </IndividualDiv>
                        <IndividualDiv>
                            <Heading>{"Date"}</Heading>
                            <div>{showDetails?.quizGivenTime}</div>
                        </IndividualDiv>

                    </DetailsDiv>
            }
        </IndividualCard>
    )
}

export default QuizTopicCard;