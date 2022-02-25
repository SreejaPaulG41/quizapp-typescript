import styled from "styled-components";
import { keyframes } from "styled-components";


export const moveInLeft = keyframes`
    0% {
    opacity: 0;
    transform: translateX(-10rem);
    }

    100% {
    opacity: 1;
    transform: translate(0);
    }
`;

export const MarkShowDiv = styled.div`
    img{
        margin-left: 48%;
        height: 150px;
        width: 150px;
        position: relative;
        animation: ${moveInLeft} 1s ease-in-out .3s both;
        transition: all .2s ease-in-out; 
    }
    img:hover {
        height: 170px;
        width: 170px;
        margin-top: -20px;
        transform: scale(1.5); 
    }

    h1{
        margin-left: 30%;
        animation: ${moveInLeft} 1s ease-in-out .3s both;
    }
    @media (max-width: 550px) {
        img{
            margin-left: 39%;
            height: 80px;
            width: 80px;
        }
        img:hover {
            height: 100px;
            width: 100px;
        }
    
        h1{
            font-size: 22px;
            margin-left: 20%;
        }
    }
    @media (max-width: 400px) {
        img{
            margin-left: 39%;
            height: 80px;
            width: 80px;
        }
        img:hover {
            height: 100px;
            width: 100px;
        }
    
        h1{
            margin-left: 20%;
        }
    }
`