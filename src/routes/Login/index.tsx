import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const loginHandler = async () => {
        const dataToAdd = { email, password };
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(dataToAdd) // body data type must match "Content-Type" header
        });
        const result = await response.json();
        console.log(result)
        if (result.jwtToken) {
            localStorage.setItem("token", result.jwtToken);
            navigate('/dashboard');
        }
        setEmail('');
        setPassword('');
    }
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