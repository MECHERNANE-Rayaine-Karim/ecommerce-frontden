import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async() => {
        const response = await axios.post('http://localhost:8080/api/auth/login',{
               username,
               password
        });
        const token = response.data.token;
        localStorage.setItem('token',token);
        const playload = JSON.parse(atob(token.split('.')[1]));
        localStorage.setItem('role',playload.role);
        navigate('/catalogue');
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type ="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type ="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
        );

}
export default Login;