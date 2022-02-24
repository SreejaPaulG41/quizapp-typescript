import React, {useState} from 'react';
import { NavbarStyle, Avatar, DropDown} from './navbarStyle';

const Navbar: React.FC = ()=> {
  const [dropDownShow, setDropDownShow] = useState(false);
  return (
    <NavbarStyle>
        <h1>Quiz Master</h1>
        <div>
          <Avatar onClick={()=>setDropDownShow(!dropDownShow)}>
            <img src= "https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat2&accessoriesType=Blank&hatColor=Blue01&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"/>
          </Avatar>
          {
            dropDownShow ? 
            <DropDown>
              Logout
            </DropDown> : ""
          }
        </div>
    </NavbarStyle>
  )
}

export default Navbar