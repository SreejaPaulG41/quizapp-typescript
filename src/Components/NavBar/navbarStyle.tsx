import styled from "styled-components";

export const NavbarStyle = styled.div`
    display: flex;
    height: 80px;
    
    h1{
        padding: 0px 20px;
        flex: 1;
    }
`

export const Avatar = styled.div`
    height:50px;
    width:50px;
    margin: 20px;
    border-radius: 50%;
    backgroundColor: lightblue;
    cursor: pointer;
    img{
        height:50px;
        width:50px;
    }
`

export const DropDown = styled.div`
    height: 50px;
    width: 100px;
    position: absolute;
    margin: -15px 20px 0px 0px;
    padding: 10px;
    border: 1px solid black;
    font-weight: 700;
    font-size: 18;
`