import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div>
            <h2>ברוך הבא!</h2>
            <p>
                <Link to="/login">התחבר</Link> או <Link to="/register">הירשם</Link>
            </p>
        </div>
    );
};

export default Home;
