import React from 'react'
import Navbar from '../../Components/navBar';
import QuizTopicCardContainer from './quizTopicCardContainer';

const Dashboard: React.FC = ()=> {
  return (
    <div>
        <Navbar/>
        <QuizTopicCardContainer/>
    </div>
  )
}

export default Dashboard