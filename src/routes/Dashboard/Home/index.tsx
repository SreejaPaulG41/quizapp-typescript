import React, {useEffect, useState,  useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../Components/NavBar/index';
import QuizTopicCardContainer from '../QuizTopicCardContainer/index';
import useStateHandler from '../../../Redux/useStateHandler';
import QuestionTopicContainer from '../QuestionContainer/index';

const Dashboard = ()=> {
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
  const { userValid, userValidMsg, authenticationHandler } = useStateHandler();
  const navigate = useNavigate();
  // useEffect(() => {
  //   authenticationHandler();
  // }, []);
  useMemo(() => {
    if (!userValid) {
      if (userValidMsg?.statusCode === 403) {
        navigate('/login');
        console.log("User Is Not Authenticated. Please Login Again!");
        
      }
    }
  }, [userValid, userValidMsg])

  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("userInformation") || " ");
    setIsUserAdmin(userInfo?.isAdmin);
  },[])
  return (
    <div>
        <Navbar/>
        {
          (!(JSON.parse(localStorage.getItem("userInformation") || " ")?.isAdmin)) ? <QuizTopicCardContainer/> : <QuestionTopicContainer/>
        }
    </div>
  )
}

export default Dashboard