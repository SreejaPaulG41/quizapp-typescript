import React,{useEffect} from 'react'
import useStateHandler from '../../../Redux/useStateHandler';

function Test() {
    const {genreBasedQuestionData} = useStateHandler();
    useEffect(()=>{
        console.log(genreBasedQuestionData.genreBasedQuestionData)
    },[genreBasedQuestionData])
  return (
    <div>
        test
    </div>
  )
}

export default Test