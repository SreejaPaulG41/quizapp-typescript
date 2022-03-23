import styled from "styled-components";
import { keyframes } from "styled-components";

export const HomeDiv = styled.div`
    display: flex;
    height: 100vh;
    
    > * {
        &:first-child {
            flex:1;
            margin: 141px;
            margin-left: 300px;
            padding: 10px;
            h1 {
                font-size: 50px;
            }
        }
        &:last-child {
            margin: 141px;
            padding: 2px;
        }
    }
    @media (max-width: 825px) {
        display: inline;
        height: 100vh;
        > * {
            &:first-child {
                flex:1;
                margin: 101px;
                margin-left: 220px;
                margin-top: 50%;
                padding: 8px;
                h1 {
                    font-size: 40px;
                }
            }
        }
        &:last-child {
            margin-left: 200px;
            padding: 2px;
            border: 1px solid black;
        }
    }
    @media (max-width: 770px) {
        display: inline;
        height: 100vh;
        > * {
            &:first-child {
                flex:1;
                margin: 101px;
                margin-left: 220px;
                margin-top: 50%;
                padding: 8px;
                h1 {
                    font-size: 40px;
                }
            }
        }
    }
    @media (max-width: 450px) {
        height: 100vh;
        > * {
            &:first-child {
                flex:1;
                margin: 41px;
                margin-left: 100px;
                margin-top: 50%;
                padding: 8px;
                h1 {
                    font-size: 40px;
                }
            }
        }
    }
`
export const moveInLeft = keyframes`
    0% {
    opacity: 0;
    transform: translateX(10rem);
    }

    100% {
    opacity: 1;
    transform: translate(0);
    }
`;

export const HomeStyle = styled.div`
    height: 500px;
    width: 350px;
    img {
        height: 80px;
        width: 80px;
        margin: 10px;
        padding: 10px;
        animation: ${moveInLeft} 1s ease-in-out .3s both;
        box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
    }
    img:hover{
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }
    @media (max-width: 820px) {
        height: 500px;
        width: 700px;
        img {
            height: 50px;
            width: 50px;
            margin: 5px;
            padding: 5px;
        }
    }
    @media (max-width: 450px) {
        display: none;
    }

   
`