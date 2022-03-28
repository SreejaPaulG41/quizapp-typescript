import React from 'react';
import { Link } from 'react-router-dom';
import { Button, DivStyle } from './addewQuestionStyle';

const AddNewQuestionOption = ()=> {
  return (
    <DivStyle>
        <Link to="/addNewQuestion">
            <Button>Add New Question</Button>
        </Link>
    </DivStyle>
  )
}

export default AddNewQuestionOption;