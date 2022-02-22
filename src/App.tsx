import React , {useEffect} from 'react';
import Dashboard from './routes/Dashboard/dashboard';
import { Routes, Route } from 'react-router-dom';
import QuestionDisplayContainer from "./routes/Genre/questionDisplayContainer";
import useStateHandler from './ReduxToolkit/useStateHandler';
// import Result from "./routes/Result/result";

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
        {/* <Route path="/result" element={<Result/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
