import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ logged, logout }){
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li className={"logo-bar"}><Link to="/">
                    <img src="/EVENT_AIUA_LOGO.png" alt="Logo" style={{ width: '50px', height: '50px' }} />
                </Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/packages">Pricing</Link></li>
                {logged ? (
                    <div>
                        <li><Link className={"sign-button"} to="/" onClick={()=>logout(navigate)} >LogOut</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                    </div>
                ) : (
                    <li><Link className={"sign-button"} to="/login">Sign In</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
