import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import '../App.css';
import Register from './Register';
import Navbar from '../components/Navbar';
import axios from "axios";
import Cookies from 'js-cookie';


const Login = ({updateLogged}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [printError, setPrintError] = useState('');
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const navigate = useNavigate();




    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/login/', {
            email: email,
            password: password
        },{ withCredentials: true })
            .then(response => {
                console.log('Login successful:', response.data);
                updateLogged(true)
                navigate("/profile")
            })
            .catch(error => {
                if (error.response) {
                    setPrintError(error.response.data.error)
                } else if (error.request) {
                    setPrintError(error.request)
                } else {
                    setPrintError(error.message)
                }
            });
    };

    const openRegisterModal = () => {
        setShowRegisterModal(true);
    };

    const closeRegisterModal = () => {
        setShowRegisterModal(false);
    };

    return (
        <div className="login-page">
            <div className="login-container" >
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
                </form>
                    <p className="error-message">{printError}</p>
                <div className="register-link">
                    <p>
                        Not registered yet? <span onClick={openRegisterModal} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>Sign up</span>
                    </p>
                </div>
                <img src="/login_logo.png" alt="Logo" className="logo-image" />
            </div>

            {showRegisterModal && (
                <div className="modal">
                    <div className="modal-content1">
                        <span className="close" onClick={closeRegisterModal}>&times;</span>
                        <Register closeModal={closeRegisterModal}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
