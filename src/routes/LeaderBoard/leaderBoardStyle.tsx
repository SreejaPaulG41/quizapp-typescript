import styled from 'styled-components';

export const LeaderBoardStyle = styled.div`
    height: 100vh;
`

export const Content = styled.div`
    margin: 80px 40px 0px 40px;
    > * {
        &:first-child {
            display: flex;
        }
        
    }
`

export const Button = styled.button`
    height: 50px;
    width: 200px;
    padding: 10px;
    margin: 80px 20px 20px 30px;
    border-radius: 10px;
    font-size: 15px;
    background-color: transparent;
    cursor: pointer;
    border: 0px;
    font-size: large;
    font-weight: bold;
`

export const ButtonDiv = styled.div`
    margin: 2px 10px 0px 520px;
    @media (max-width: 1024px) {
        margin: 2px 10px 10px 300px;
    }
    @media (max-width: 913px) {
        margin: 2px 10px 10px 220px;
    }
    @media (max-width: 770px) {
        margin: 2px 10px 10px 160px;
    }
    @media (max-width: 450px) {
        margin: 2px;
        margin-bottom: 10px;
    }
    @media (max-width: 290px) {
        margin: 0px;
        margin-left: -30px;
        margin-bottom: 10px;
    }

`