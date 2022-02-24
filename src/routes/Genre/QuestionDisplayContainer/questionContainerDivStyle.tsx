import styled from "styled-components";

export const QuestionContainerDiv = styled.div`
    height: 100vh;
    overflow: none;
    h1{
        margin-left: 35%;
        margin-right: 23%;
        margin-bottom: 50px;
    }
    @media (max-width: 550px) {
        height: 100%;
        overflow: none;
    }
`
export const FlexDiv = styled.div`
    display: flex;
    @media (max-width: 550px) {
        display: flex;
        flex-direction: column;
    }
    
`