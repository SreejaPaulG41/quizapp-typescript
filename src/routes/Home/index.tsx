import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import brain from '../../Assets/Images/brain.png';
import choose from '../../Assets/Images/choose.png';
import ideas from '../../Assets/Images/ideas.png';
import trophy from '../../Assets/Images/trophy.png';
import { HomeStyle, HomeDiv } from './homeStyle';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HomeDiv>
      <div>
        <h1>Quiz Master</h1>
        <p>
          <Link to="/login">
            Login To Continue
          </Link>
        </p>
      </div>
      <HomeStyle>
        <img src={brain} alt="brain" />
        <img src={ideas} alt="idea" />
        <img src={choose} alt="choose" />
        <img src={trophy} alt="result" />
      </HomeStyle>

    </HomeDiv>
  )
}

export default Home