import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // ייבוא הקומפוננטה של ה-Navbar
import Carousel from '../components/Carousel'; // ייבוא הקומפוננטה של הסרט הרץ
import '../styles/Home.css'; // ייבוא קובץ CSS של דף הבית
import '../App.css'
import Block from "./Block";

function Home(){
    return (
        <div className="main-container">
            <div className="home-page">

                {/* Main Content */}
                <div className="hero-section">
                    <h1>Welcome to A.I.U.A Events</h1>
                </div>

                {/* Event Elements Section */}
                <div className="event-elements">
                    <Block type={"wedding-background"} title={"Weddings"} text={"Create your dream wedding with our tailored packages."}/>
                    <Block type={"conference-background"} title={"Conferences"} text={"Plan the perfect conference with our professional services."}/>
                    <Block type={"private-background"} title={"Private Parties"} text={"Host unforgettable private parties with us."}/>
                </div>

                <div className="our-clients">
                    <h1> Our Clients</h1>


                {/* Carousel Section */}
                <Carousel/>
                </div>
            </div>

        </div>
    );
};

export default Home;
