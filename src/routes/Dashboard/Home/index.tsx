import React from 'react'
import Navbar from '../../../Components/NavBar/index';
import QuizTopicCardContainer from '../QuizTopicCardContainer/index';

const Dashboard: React.FC = ()=> {
  return (
    <div>
        <Navbar/>
        <QuizTopicCardContainer/>
    </div>
  )
}

export default Dashboard