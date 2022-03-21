import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../Components/NavBar/index';
import QuizTopicCardContainer from '../QuizTopicCardContainer/index';
import useStateHandler from '../../../Redux/useStateHandler';

const Dashboard: React.FC = ()=> {
  const { userValid, userValidMsg, authenticationHandler } = useStateHandler();
  const navigate = useNavigate();
  useEffect(() => {
    authenticationHandler();
  }, []);
  useEffect(() => {
    if (!userValid) {
      if (userValidMsg?.statusCode === 403) {
        navigate('/login');
        console.log("User Is Not Authenticated. Please Login Again!");
        
      }
    }
  }, [userValid, userValidMsg])
  return (
    <div>
        <Navbar/>
        <QuizTopicCardContainer/>
    </div>
  )
}

export default Dashboard