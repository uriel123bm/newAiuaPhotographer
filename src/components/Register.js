import React, { useState, useEffect } from 'react';
import '../styles/Register.css';
import axios from "axios";

const Register = ({ closeModal }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phonePrefix, setPhonePrefix] = useState('050'); // ברירת מחדל ל-052
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
        const phoneValid = /^[0-9]{7}$/.test(phoneNumber); // בדיוק 7 ספרות לטלפון
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

    const handlePhonePrefixChange = (e) => {
        setPhonePrefix(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        // לאפשר הזנת מספרים בלבד ולוודא שהמספר הוא עד 7 ספרות
        if (/^[0-9]*$/.test(value) && value.length <= 7) {
            setPhoneNumber(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullPhoneNumber = `${phonePrefix}${phoneNumber}`;
        axios.post('http://localhost:8000/register/', {
            name: fullName,
            email: email,
            password: password,
            phone: fullPhoneNumber
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
        // const storedUser = JSON.parse(localStorage.getItem('user'));
        // if (storedUser && storedUser.email === email) {
        //     setError('מייל זה כבר בשימוש, נסה מייל אחר.');
        // } else {
        //     const user = { fullName, email, password, phone: fullPhoneNumber };
        //     localStorage.setItem('user', JSON.stringify(user));
        //     alert('נרשמת בהצלחה!');
        //     closeModal(); // Close the modal after successful registration
        // }
    };

    return (
        <div className="App-container">
            <h2>הרשמה</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        placeholder={"שם מלא"}
                        type="text"
                        value={fullName}
                        onChange={handleFullNameChange}
                        title="השם יכול להכיל אותיות באנגלית, עברית ורווחים בלבד." // Tooltip
                    />
                </div>
                <div>
                    <input
                        placeholder={"אימייל"}
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        title="הכנס אימייל תקין (למשל, example@example.com)." // Tooltip
                    />
                </div>
                <div style={{ position: 'relative' }}>
                    <input
                        placeholder={"סיסמה"}
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        title="הסיסמה צריכה להתחיל באות גדולה, להכיל לפחות ספרה אחת, ואורכה בין 6 ל-10 תווים." // Tooltip
                    />
                </div>
                <div>
                    <input
                        placeholder={"אישור סיסמה"}
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        title="וודא שהסיסמה תואמת לזו שהכנסת קודם." // Tooltip
                    />
                </div>

                {/* קידומת ומספר טלפון */}
                <div>
                    <select value={phonePrefix} onChange={handlePhonePrefixChange} title="בחר את הקידומת שלך (050-058).">
                        <option value="050">050</option>
                        <option value="052">052</option>
                        <option value="053">053</option>
                        <option value="054">054</option>
                        <option value="055">055</option>
                        <option value="058">058</option>
                    </select>
                    <input
                        placeholder={"הכנס מספר טלפון"}
                        type="text"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        title="הכנס מספר טלפון בן 7 ספרות, ללא רווחים או תווים נוספים." // Tooltip
                        required
                    />
                </div>

                <button type="submit" disabled={!isFormValid}>הרשם</button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'blue' }}>{successMessage}</p>}
            </form>

            <p className="Link-Style">נרשמת כבר? <span onClick={closeModal} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>התחבר</span></p>
        </div>
    );
};

export default Register;
