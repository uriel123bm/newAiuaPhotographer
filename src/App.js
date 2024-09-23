import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import AboutUs from './components/AboutUs';
import Packages from './components/Packages';
import PurchasePackages from './components/PurchasePackages';
import Register from './components/Register';
import Profile from './components/Profile';
import EventPage from './components/EventPage';
import Navbar from "./components/Navbar";
import Cookies from 'js-cookie';
import axios from "axios";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);





    useEffect(() => {
        debugger
        const token = Cookies.get('auth_token');
        setIsLoggedIn(!!token);
    }, []); // בדוק פעם אחת כשמטעינים את הקומפוננטה



    const logOut = (navigate) => {
        axios.post('http://localhost:8000/logout/')
            .then(response => {
                console.log(response.data.message);
                Cookies.remove('auth_token');
                setIsLoggedIn(false);
                navigate("/")

            })
            .catch(error => {
                console.error('Error during logout:', error);
            });
    };

    return (
        <Router>
            <Navbar logged={isLoggedIn} logout={logOut} />
            <Routes>
                <Route path="/*" element={<Home />} />
                <Route path="/" element={<Home />} />

                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/purchase-packages" element={<PurchasePackages />} />
                {
                    isLoggedIn ?
                        <Route path="/profile" element={<Profile />} />
                        :
                        <Route path="/login" element={<Login updateLogged={setIsLoggedIn}/>} />
                }

                <Route path="/event/:id" element={<EventPage />} />
            </Routes>
        </Router>
    );
}

export default App;
