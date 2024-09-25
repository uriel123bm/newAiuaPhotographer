import React, { useState, useEffect } from 'react';
import '../styles/Register.css';
import axios from "axios";

const Register = ({ closeModal}) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        validateForm();
    }, [fullName, email, password, confirmPassword, phoneNumber]);

    const validateForm = () => {
        const fullNameValid = /^[A-Za-zא-ת\s]+$/.test(fullName);
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const passwordValid = /^[A-Z][A-Za-z0-9]{5,9}$/.test(password);
        const passwordsMatch = password === confirmPassword;
        const phoneValid = /^05[0-9]{8}$/.test(phoneNumber);
        setIsFormValid(fullNameValid && emailValid && passwordValid && passwordsMatch && phoneValid);
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



    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        if (/^[0-9]*$/.test(value) && value.length <= 10) {
            setPhoneNumber(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/register/', {
            name: fullName,
            email: email,
            password: password,
            phone: phoneNumber
        })
            .then(response => {
                setSuccessMessage('Registration successful! Sign in Now!');
                setError('');
                setTimeout(()=>{
                    closeModal(false)
                },2000)

            })
            .catch(error => {
                if (error.response) {
                    setError(error.response.data.error || 'An error occurred.');  // הגדרת הודעת שגיאה לפי הנתונים מהשרת
                } else if (error.request) {
                    setError('No response from server.');
                } else {
                    setError(`Error: ${error.message}`);
                }
                setSuccessMessage('');  // לנקות הודעות הצלחה קודמות
            });
    };

    return (
        <div className="App-container">
            <h2>SIGN UP</h2>
            <form onSubmit={handleSubmit}>
                <div className={"input-group"}>
                    <input
                        placeholder={"Full Name"}
                        type="text"
                        value={fullName}
                        onChange={handleFullNameChange}
                        title="Must contain English letters, Hebrew and spaces only."
                    />
                    <input
                        placeholder={"Email"}
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        title="example@example.com"
                    />
                    <input
                        placeholder={"Password"}
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        title="Must start with a capital letter, contain at least one digit, and be between 6 and 10 characters long." // Tooltip
                    />
                    <input
                        placeholder={"Confirm Password"}
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        title="Make sure the password matches the one you entered before."
                    />
                        <input
                            placeholder={"Phone"}
                            type="text"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            title="Enter a 10-digit phone number, without spaces or extra characters."
                            required
                        />
                </div>
                <button type="submit" disabled={!isFormValid}>SIGN UP</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'blue' }}>{successMessage}</p>}
            </form>

            <p className="Link-Style">Already signed? <span onClick={closeModal} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Login</span></p>
        </div>
    );
};

export default Register;
