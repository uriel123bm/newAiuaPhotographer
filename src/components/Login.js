import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Login.css'; // ייבוא קובץ ה-CSS
import '../App.css';

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
            setError('אימייל או סיסמה שגויים');
        }
    };

    return (
        <div >
          <div className={"App-container"}>
              <h2>התחברות</h2>
              <form onSubmit={handleSubmit}>
                  <div>
                      <input placeholder={"הכנס אימייל"} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div>

                      <input placeholder={"הכנס סיסמה מדאפקה"} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <button  type="submit">התחבר</button>
                  {error && <p style={{ color: 'red' }}>{error}</p>}

              </form>
              <div className={"Link-Style"}>
                  <p>עוד לא רשום? <Link to="/Register">הירשם</Link></p>
              </div>
              <div style={{marginRight:150}}>
                  <img src="/aiua_logo.jpeg" alt="Logo" className="logo-right" /> {/* הלוגו עם מחלקה */}
              </div>
          </div>

        </div>
    );
};

export default Login;
