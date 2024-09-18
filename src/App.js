import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import AboutUs from './components/AboutUs';
import Packages from './components/Packages';
import PurchasePackages from './components/PurchasePackages';
import Register from './components/Register';
import Profile from './components/Profile';
import EventPage from './components/EventPage';
import Navbar from "./components/Navbar";

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/purchase-packages" element={<PurchasePackages />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/event/:id" element={<EventPage />} />

            </Routes>
        </Router>
    );
}

export default App;
