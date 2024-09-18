import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // קובץ CSS עבור סגנון עמוד ההתחברות
import axios from 'axios';
import Navbar from '../components/Navbar'; // ייבוא ה-Navbar

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/login/', {
            email: email,
            password: password
        })
            .then(response => {
                console.log('Login successful:', response.data);
                // ניתוב במידה וההתחברות הצליחה
                navigate('/profile');
            })
            .catch(error => {
                if (error.response) {
                    console.error('Error:', error.response.data);
                    setError(error.response.data);
                } else if (error.request) {
                    console.error('Error:', error.request);
                    setError('No response from server');
                } else {
                    console.error('Error:', error.message);
                    setError(error.message);
                }
            });
    };

    return (
        <div className="login-page">
            <Navbar /> {/* הצגת ה-Navbar בעמוד ההתחברות */}
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Log In</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
