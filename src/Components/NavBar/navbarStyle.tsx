import styled from "styled-components";

export const NavbarStyle = styled.div`
    display: flex;
    height: 80px;  
    h1{
        padding: 0px 20px;
        flex: 1;
    }
    h4{
        margin-right: 32px;
        cursor: pointer;
        font-size: 20px;
    }
    @media (max-width: 550px) {
        h1{
            font-size: 23px;
            padding: 0px 10px;
        }
        h4{
            font-size: 15px;
            margin-right: 10px;
        }
    }
    @media (max-width: 413px) {
        h1{
            font-size: 20px;
            padding: 0px 10px;
        }
        h4{
            font-size: 15px;
            margin-right: 10px;
        }
    }
    @media (max-width: 390px) {
        h1{
            font-size: 15px;
            padding: 0px 10px;
        }
        h4{
            font-size: 15px;
            margin-right: 10px;
        }
    }
    @media (max-width: 280px) {
        h1{
            font-size: 12px;
            padding: 0px 10px;
        }
        h4{
            font-size: 12px;
            margin-right: 10px;
        }
    }
`

export const UserInfo = styled.div`
    margin: 12px 20px 10px 10px;
    padding: 0px 10px;
    @media (max-width: 280px) {
        margin: 2px;
        padding: 0px 10px;
    }
`
