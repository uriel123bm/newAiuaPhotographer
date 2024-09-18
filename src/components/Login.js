import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Import CSS file
import '../App.css'; // Import App-level CSS if needed
import Register from './Register'; // Import the Register component
import Navbar from '../components/Navbar';
import axios from "axios"; // ייבוא הקומפוננטה של ה-Navbar


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [printError, setPrintError] = useState('');
    const [showRegisterModal, setShowRegisterModal] = useState(false); // State for modal
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/login/', {
            email: email,
            password: password
        })
            .then(response => {
                // אם ההתחברות הצליחה, תוכל לעדכן את מצב השגיאות או המידע שהתקבל
                console.log('Login successful:', response.data);
                navigate("/profile")

                // תוכל להוסיף כאן קוד להמשך הטיפול בהצלחה, כמו ניווט לדף אחר

            })
            .catch(error => {
                if (error.response) {
                    // הבקשה נשלחה והשרת החזיר תשובה עם שגיאה
                    setPrintError(error.response.data.error)
                } else if (error.request) {
                    // הבקשה נשלחה אך לא התקבלה תשובה מהשרת

                    setPrintError(error.request)
                } else {
                    // שגיאה בהגדרת הבקשה

                    setPrintError(error.message)
                }
            });
    };

    const openRegisterModal = () => {
        setShowRegisterModal(true); // Open the modal
    };

    const closeRegisterModal = () => {
        setShowRegisterModal(false); // Close the modal
    };

    return (
        <div className="login-page">
            {/* מייבא מהקופוננטה*/}
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
                </form>
                    <p className="error-message">{printError}</p>
                <div className="register-link">
                    <p>
                        Not registered yet? <span onClick={openRegisterModal} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>Sign up</span>
                    </p>
                </div>
                <img src="/aiua_logo.jpeg" alt="Logo" className="logo-image" />
            </div>

            {/* Modal for Registration */}
            {showRegisterModal && (
                <div className="modal">
                    <div className="modal-content1">
                        <span className="close" onClick={closeRegisterModal}>&times;</span>
                        <Register closeModal={closeRegisterModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
