import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const handleRegister = async() => {
        const response = await axios.post('http://localhost:8080/api/auth/register',{
               username,
               password,
               contact,
               role
        });
        const login = await axios.post('http://localhost:8080/api/auth/login',{
                       username,
                       password
        });
        localStorage.setItem('token',login.data.token);
        navigate('/catalogue');
    };

    return (
        <div>
            <h2>Register</h2>
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
            <input
                type ="text"
                placeholder="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select role</option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
            </select>
            <button onClick={handleRegister}>Register</button>
        </div>
        );

}
export default Register;