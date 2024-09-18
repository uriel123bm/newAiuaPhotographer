import React, { useState, useEffect } from 'react';
import '../styles/Register.css';
import axios from "axios";

const Register = ({ closeModal }) => {
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
        const fullNameValid = /^[A-Za-zא-ת\s]+$/.test(fullName); // שם יכול להכיל אותיות באנגלית, עברית ורווחים
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // אימייל תקין
        const passwordValid = /^[A-Z][A-Za-z0-9]{5,9}$/.test(password); // סיסמה מתחילה באות גדולה, מכילה לפחות ספרה אחת, ואורכה בין 6 ל-10 תווים
        const passwordsMatch = password === confirmPassword;
        const phoneValid = /^05[0-9]{8}$/.test(phoneNumber); // בדיוק 7 ספרות לטלפון
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
        // לאפשר הזנת מספרים בלבד ולוודא שהמספר הוא עד 7 ספרות
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
                // במידה והבקשה הצליחה
                setSuccessMessage('Registration successful!');
                setError('');  // לנקות הודעות שגיאה קודמות
            })
            .catch(error => {
                // טיפול בשגיאות
                if (error.response) {
                    // שגיאה מהשרת
                    setError(error.response.data.error || 'An error occurred.');  // הגדרת הודעת שגיאה לפי הנתונים מהשרת
                } else if (error.request) {
                    // שגיאה בקבלת התגובה מהשרת
                    setError('No response from server.');
                } else {
                    // שגיאה במהלך יצירת הבקשה
                    setError(`Error: ${error.message}`);
                }
                setSuccessMessage('');  // לנקות הודעות הצלחה קודמות
            });
    };

    return (
        <div className="App-container">
            <h2>הרשמה</h2>
            <form onSubmit={handleSubmit}>
                <div className={"input-group"}>
                    <input
                        placeholder={"שם מלא"}
                        type="text"
                        value={fullName}
                        onChange={handleFullNameChange}
                        title="השם יכול להכיל אותיות באנגלית, עברית ורווחים בלבד." // Tooltip
                    />
                    <input
                        placeholder={"אימייל"}
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        title="הכנס אימייל תקין (למשל, example@example.com)." // Tooltip
                    />
                    <input
                        placeholder={"סיסמה"}
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        title="הסיסמה צריכה להתחיל באות גדולה, להכיל לפחות ספרה אחת, ואורכה בין 6 ל-10 תווים." // Tooltip
                    />
                    <input
                        placeholder={"אישור סיסמה"}
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        title="וודא שהסיסמה תואמת לזו שהכנסת קודם." // Tooltip
                    />
                        <input
                            placeholder={"הכנס מספר טלפון"}
                            type="text"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            title="הכנס מספר טלפון בן 7 ספרות, ללא רווחים או תווים נוספים." // Tooltip
                            required
                        />
                </div>

                {/* קידומת ומספר טלפון */}

                <button type="submit" disabled={!isFormValid}>הרשם</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'blue' }}>{successMessage}</p>}
            </form>

            <p className="Link-Style">נרשמת כבר? <span onClick={closeModal} style={{ cursor: 'pointer', textDecoration: 'underline' }}>התחבר</span></p>
        </div>
    );
};

export default Register;
