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

`