import styled from "styled-components";

export const NavbarStyle = styled.div`
    display: flex;
    height: 80px;  
    h1{
        padding: 0px 20px;
        flex: 1;
    }
    @media (max-width: 550px) {
        font-size: 10px;
    }
    @media (max-width: 400px) {
        h1{
            font-size: 20px;
        }
    }
`

export const UserInfo = styled.div`
    margin: 10px 20px 10px 10px;
`
