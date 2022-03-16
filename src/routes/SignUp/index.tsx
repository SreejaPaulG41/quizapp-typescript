import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStateHandler from '../../Redux/useStateHandler';

const SignUp = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { jwtToken, userInfo, userSignUpHandler } = useStateHandler();

    const signUpHandler = async () => {
        const dataToAdd = { firstName, lastName, email, password };
        userSignUpHandler(dataToAdd);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }

    useEffect(()=>{
        if (jwtToken !== '') {
            localStorage.setItem("token", jwtToken);
            localStorage.setItem("userInformation", JSON.stringify(userInfo))
            navigate('/dashboard');
        }
    },[jwtToken])
    return (
        <div>
            <div>
                <h3>Sign Up</h3>
                <div>
                    <h4>FirstName</h4>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>

                <div>
                    <h4>LastName</h4>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div>
                    <h4>Email</h4>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div>
                    <h4>Password</h4>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button onClick={signUpHandler}>
                        Sign Up
                    </button>
                </div>
            </div>
            <button onClick={() => navigate('/login')}>Allready Have An Account ? Log In Here</button>
        </div>
    )
}

export default SignUp