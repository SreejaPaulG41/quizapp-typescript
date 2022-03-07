import React , {useEffect} from 'react';
import './App.css';
import Dashboard from './routes/Dashboard/Home/index';
import { Routes, Route } from 'react-router-dom';
import QuestionDisplayContainer from "./routes/Genre/QuestionDisplayContainer/index";
import useStateHandler from './ReduxToolkit/useStateHandler';
import Result from "./routes/Result/ResultPage/index";
import Home from './routes/Home/index';
import SignUp from './routes/SignUp';
import Login from './routes/Login';

function App() {
  const { unAnsweredArray} = useStateHandler();
  useEffect(()=>{
    console.log("App")
    console.log(unAnsweredArray)
  },[unAnsweredArray]);
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/genre/:genreId/:qIndex" element={<QuestionDisplayContainer/>}/>
        <Route path="/genre/:genreId" element={<QuestionDisplayContainer/>}/>
        <Route path="/result" element={<Result/>}/>
      </Routes>
    </div>
  );
}

export default App;
