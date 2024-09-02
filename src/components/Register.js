import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        validateForm();
    }, [firstName, lastName, email, password, confirmPassword]);

    const validateForm = () => {
        const firstNameValid = firstName.trim() !== '';
        const lastNameValid = lastName.trim() !== '';
        const emailValid = email.includes('@');
        const passwordValid = password.length >= 8 && /[A-Za-z]/.test(password);
        const passwordsMatch = password === confirmPassword;
        setIsFormValid(firstNameValid && lastNameValid && emailValid && passwordValid && passwordsMatch);
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
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
            const user = { firstName, lastName, email, password };
            localStorage.setItem('user', JSON.stringify(user));
            alert('נרשמת בהצלחה!');
            navigate('/login');
        }
    };

    return (
        <div className="App-container">
            <h2>הרשמה</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input placeholder={"שם פרטי"} type="text" value={firstName} onChange={handleFirstNameChange} />
                </div>
                <div>
                    <input placeholder={"שם משפחה"} type="text" value={lastName} onChange={handleLastNameChange} />
                </div>
                <div>
                    <input placeholder={"אימייל"} type="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <input placeholder={"סיסמה רצינית"} type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <input placeholder={"תאשר ת'סיסמה נו"} type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </div>
                <button type="submit" disabled={!isFormValid}>הרשם</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            <p className="Link-Style">נרשמת כבר? <Link to="/login">התחבר</Link></p>
        </div>
    );
};

export default Register;
