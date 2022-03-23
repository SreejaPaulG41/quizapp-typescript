import styled from 'styled-components';

export const QuestionTopicContainer = styled.div`
    margin: 20px;
`

export const QuestionTopicsDiv = styled.div`
    margin: 80px 50px 50px 50px;
`
export const QuestionSingleTopicCard = styled.div`
    background: linear-gradient(90deg, #b9deed, #efefef);
    display: inline-block;
    height: 300px;
    width: 350px;
    border: 1px solid black;
    border-radius: 10px;
    margin: 25px;
    padding: 20px;
    &:hover{
    
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
        margin: 80px 20px 20px 30px;
        border-radius: 10px;
        font-size: 15px;
        background-color: transparent;
    }
    img{
        height: 80px;
        width: 80px;
        border-radius: 10px;
        opacity:0.7;
    }
    button:hover{
        cursor: pointer;
        background-color: #dbe4f0;
        font-weight:900;
        font-size: 17px;
    }
    &:hover{
        img{
            opacity: 1;
        }
    }
    @media (max-width: 550px) {
        h1{
            font-size: 20px;
            margin: 2px;
        }
        img{
            height: 50px;
            width: 50px;
            margin-top: 8px;
        }
        button{
            height: 50px;
            width: 100px;
            margin: 50px 20px 20px 20px;
        }
    }
    @media (max-width: 400px) {
        h1{
            font-size: 20px;
            margin: 2px;
        }
        img{
            height: 50px;
            width: 50px;
            margin-top: 8px;
        }
        button{
            height: 50px;
            width: 100px;
            margin: 50px 20px 20px 20px;
        }
    }
`

export const DetailsDiv = styled.div`
    height: 80px;
    justify-content: space-between;
    padding: 10px;
    margin: 80px 20px 20px 30px;
    font-size: 20px;
    display: flex;
    @media (max-width: 550px) {
        height: 50px;
        width: 120px;
        margin: 50px 10px 10px 30px;
        font-size: 10px;
    }
    @media (max-width: 415px) {
        height: 30px;
        width: 120px;
        margin: 50px 10px 10px 30px;
        font-size: 10px;
    }
    @media (max-width: 376px) {
        height: 30px;
        width: 120px;
        font-size: 10px;
        margin: 50px 10px 10px 30px;
    }
` 
export const IndividualDiv = styled.div`
    font-weight: bold;
    @media (max-width: 415px) {
        font-weight: normal;
        margin-right: 10px;
    }
    @media (max-width: 376px) {
        font-weight: normal;
        margin-right: 10px;
    }
`
export const Heading = styled.div`
    font-size: 20px;
    font-weight: bolder;
    @media (max-width: 550px) {
        font-size: 10px;
    }
    @media (max-width: 400px) {
        font-size: 10px;
    }
    @media (max-width: 376px) {
        font-size: 10px;
    }
`