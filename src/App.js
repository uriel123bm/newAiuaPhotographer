import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import AboutUs from './components/AboutUs';
import Packages from './components/Packages';
import PurchasePackages from './components/PurchasePackages';
import Clients from './components/Clients';
import Register from './components/Register'; // ייבוא קומפוננטת ההרשמה
import Profile from './components/Profile'; // ייבוא קומפוננטת הפרופיל

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/purchase-packages" element={<PurchasePackages />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/register" element={<Register />} /> {/* נתיב להרשמה */}
                <Route path="/profile" element={<Profile />} /> {/* נתיב לפרופיל */}
            </Routes>
        </Router>
    );
}

export default App;
