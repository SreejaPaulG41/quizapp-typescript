import styled from 'styled-components';

export const DivStyle = styled.div`
    margin-left: 40%;
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
    border: 1px solid black;
    &:hover{
        cursor: pointer;
        background-color: #dbe4f0;
        font-weight: 900;
        font-size: 18px;
        width: 250px;
    }
`