import React , {useEffect} from 'react';
import Dashboard from './routes/Dashboard/Home/index';
import { Routes, Route } from 'react-router-dom';
import QuestionDisplayContainer from "./routes/Genre/QuestionDisplayContainer/index";
import useStateHandler from './ReduxToolkit/useStateHandler';
import Result from "./routes/Result/ResultPage/index";

function App() {
  const { unAnsweredArray} = useStateHandler();
  useEffect(()=>{
    console.log("App")
    console.log(unAnsweredArray)
  },[unAnsweredArray]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/genre/:genreId/:qIndex" element={<QuestionDisplayContainer/>}/>
        <Route path="/result" element={<Result/>}/>
      </Routes>
    </div>
  );
}

export default App;
