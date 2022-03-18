import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStateHandler from '../../Redux/useStateHandler';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const { loggedJwtToken, loggedUserInfo, userLogInHandler} = useStateHandler();

    const loginHandler = async () => {
        const dataToAdd = { email, password };
        userLogInHandler(dataToAdd);
        setEmail('');
        setPassword('');
    }
    useEffect(()=>{
        if (loggedJwtToken !== '') {
            localStorage.setItem("token", loggedJwtToken);
            localStorage.setItem("userInformation", JSON.stringify(loggedUserInfo))
            navigate('/dashboard');
        }
    },[loggedJwtToken])
    return (
        <div>
            <div>
                <h3>Log In</h3>

                <div>
                    <h4>Email</h4>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div>
                    <h4>Password</h4>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button onClick={loginHandler}>
                        Log In
                    </button>
                </div>
            </div>
            <button onClick={() => navigate('/signUp')}>Don't Have An Account ? Sign Up Here</button>
        </div>
    )
}

export default Login