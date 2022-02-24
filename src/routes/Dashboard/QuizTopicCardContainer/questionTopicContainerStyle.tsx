import styled from 'styled-components';

export const QuestionTopicContainer = styled.div`
    display: grid;
    height: 100vh;
    grid-template-rows: 0.2fr 1fr 0.5fr 0.5fr;
    text-align: center;
    grid-gap: 0.25rem;
    transition: all 0.25s ease-in-out;
    @media (max-width: 550px) {
        grid-template-columns: 1fr;
        grid-template-rows: 0.4fr 0.4fr 2.2fr 1.2fr 1fr;
    }
`

export const QuestionTopicsDiv = styled.div`
    margin: 80px 50px 50px 50px;
    @media (max-width: 550px) {
        margin: 40px 20px 20px 20px;
    }
`
export const QuestionSingleTopicCard = styled.div`
    background: linear-gradient(90deg, #b9deed, #efefef);
    display: inline-block;
    height: 300px;
    width: 350px;
    box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
    border-radius: 10px;
    margin: 25px;
    padding: 20px;
    &:hover{
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }
    @media (max-width: 550px) {
        height: 200px;
        width: 200px;
        margin: 10px;
    }
`

export const IndividualCard = styled.div`
    h1{
        margin: 10px;
    }
    button{
        height: 50px;
        width: 200px;
        padding: 10px;
        margin: 100px 20px 20px 70px;
        border-radius: 10px;
        font-size: 15px;
        background-color: transparent;
    }
    button:hover{
        cursor: pointer;
        background-color: #dbe4f0;
        font-weight:900;
        font-size: 17px;
    }
`