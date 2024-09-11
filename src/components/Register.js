import React, { useState, useEffect } from 'react';
import '../styles/Register.css';


const Register = ({ closeModal }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phonePrefix, setPhonePrefix] = useState('052'); // ברירת מחדל ל-052
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        validateForm();
    }, [fullName, email, password, confirmPassword, phoneNumber]);

    const validateForm = () => {
        const fullNameValid = fullName.trim() !== '';
        const emailValid = email.includes('@');
        const passwordValid = password.length >= 8 && /[A-Za-z]/.test(password);
        const passwordsMatch = password === confirmPassword;
        const phoneValid = /^[0-9]{7}$/.test(phoneNumber); // בדיוק 7 ספרות
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
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email === email) {
            setError('מייל זה כבר בשימוש, נסה מייל אחר.');
        } else {
            const user = { fullName, email, password, phone: fullPhoneNumber };
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
                    <span className={"style-register"}

                        title="הסיסמה צריכה להכיל לפחות 8 תווים ולכלול אותיות באנגלית (A-Z)"
                    >
                        ?
                    </span>
                </div>
                <div>
                    <input placeholder={"תאשר ת'סיסמה נו"} type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </div>

                {/* קידומת ומספר טלפון */}
                <div>
                    <select value={phonePrefix} onChange={handlePhonePrefixChange}>
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
                        required
                    />
                </div>

                <button type="submit" disabled={!isFormValid}>הרשם</button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            <p className="Link-Style">נרשמת כבר? <span onClick={closeModal} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>התחבר</span></p>
        </div>
    );
};

export default Register;
