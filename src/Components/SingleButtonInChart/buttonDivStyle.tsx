import styled from 'styled-components';

interface buttonProps {
    bgcolor?: undefined | string;
    hoverBgColor?: undefined | string;
}
export const ButtonDiv = styled.div<buttonProps>`
    display: inline-block;
    button{
        height:41px;
        width: 41px;
        border-radius: 10px;
        background-color: ${({bgcolor})=>bgcolor};
        margin: 10px 15px 10px 10px;
        font-size: 18px;
    }
    button:hover {
        cursor: pointer; 
        background-color: ${({hoverBgColor})=>hoverBgColor};
        border: 5px solid;
        border-color: ${({bgcolor})=>bgcolor};
        font-weight: 900;      
    }
`