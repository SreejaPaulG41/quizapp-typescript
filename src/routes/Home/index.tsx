import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = ()=>{
    const navigate = useNavigate();

  return (
    <div>
        <h1>Quiz Master</h1>
        <p>
            Login To Continue
        </p>
        <button onClick={()=>navigate('/login')}>Click Here</button>
    </div>
  )
}

export default Home