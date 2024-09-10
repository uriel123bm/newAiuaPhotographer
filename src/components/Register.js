import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ closeModal }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        validateForm();
    }, [fullName, email, password, confirmPassword]);

    const validateForm = () => {
        const fullNameValid = fullName.trim() !== '';
        const emailValid = email.includes('@');
        const passwordValid = password.length >= 8 && /[A-Za-z]/.test(password);
        const passwordsMatch = password === confirmPassword;
        setIsFormValid(fullNameValid && emailValid && passwordValid && passwordsMatch);
    };

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email === email) {
            setError('מייל זה כבר בשימוש, נסה מייל אחר.');
        } else {
            const user = { fullName, email, password };
            localStorage.setItem('user', JSON.stringify(user));
            alert('נרשמת בהצלחה!');
            closeModal(); // Close the modal after successful registration
        }
    };

    return (
        <div className="App-container">
            <h2>הרשמה</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input placeholder={"שם מלא"} type="text" value={fullName} onChange={handleFullNameChange} />
                </div>
                <div>
                    <input placeholder={"אימייל"} type="email" value={email} onChange={handleEmailChange} />
                </div>
                <div style={{ position: 'relative' }}>
                    <input
                        placeholder={"סיסמה רצינית"}
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <span
                        //צריך להעביר את הCSS
                        style={{
                            position: 'absolute',
                            top: '5px',
                            cursor: 'pointer',
                            color: '#00f',
                            textDecoration: 'underline',
                            fontSize: '16px'
                        }}
                        title="הסיסמה צריכה להכיל לפחות 8 תווים ולכלול אותיות באנגלית (A-Z)"
                    >
                        ?
                    </span>
                </div>
                <div>
                    <input placeholder={"תאשר ת'סיסמה נו"} type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </div>
                <button type="submit" disabled={!isFormValid}>הרשם</button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            <p className="Link-Style">נרשמת כבר? <span onClick={closeModal} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>התחבר</span></p>
        </div>
    );
};

export default Register;
