import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Import CSS file
import '../App.css'; // Import App-level CSS if needed

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            console.log('User logged in:', { email, password });
            setError('');
            navigate('/profile');
        } else {
            setError('Incorrect email or password');
        }
    };

    return (
        <div className="login-page">
            {/* Navigation Bar */}
            <nav className="navbar">
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/about-us">About Us</Link></li>
                    <li><Link to="/packages">Our Packages</Link></li>
                    <li><Link to="/clients">Our Clients</Link></li>
                </ul>
            </nav>

            <div className="login-container">
                <div className="login-header">
                    <h2>Login</h2>
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-container">
                        <input
                            className="input-field"
                            placeholder="Enter your email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <input
                            className="input-field"
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="login-button" type="submit">
                        Log In
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </form>
                <div className="register-link">
                    <p>
                        Not registered yet? <Link to="/register">Sign up</Link>
                    </p>
                </div>
                <img src="/aiua_logo.jpeg" alt="Logo" className="logo-image" />
            </div>
        </div>
    );
};

export default Login;
