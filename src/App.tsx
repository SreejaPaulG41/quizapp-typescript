import React, { useEffect } from 'react';
import './App.css';
import Dashboard from './routes/Dashboard/Home/index';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import QuestionDisplayContainer from "./routes/Genre/QuestionDisplayContainer/index";
import useStateHandler from './Redux/useStateHandler';
import Result from "./routes/Result/ResultPage/index";
import Home from './routes/Home/index';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import LeaderBoard from './routes/LeaderBoard';

function App() {
  const { userValid, authenticationHandler } = useStateHandler();
  
  useEffect(()=>{
    if(!userValid)
      authenticationHandler();
  },[userValid])
  return (
    <div className='app'>
      {
        userValid ?
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/signup" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/genre/:genreId/:qIndex" element={<QuestionDisplayContainer />} />
            <Route path="/genre/:genreId" element={<QuestionDisplayContainer />} />
            <Route path="/result" element={<Result />} />
            <Route path="/leaderBoard" element={<LeaderBoard />} />
          </Routes>
          :
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Navigate to="/login" />} />
            <Route path="/genre/:genreId/:qIndex" element={<Navigate to="/login" />} />
            <Route path="/genre/:genreId" element={<Navigate to="/login" />} />
            <Route path="/result" element={<Navigate to="/login" />} />
            <Route path="/leaderBoard" element={<Navigate to="/login" />} />
          </Routes>
      }
    </div>
  );
}

export default App;
