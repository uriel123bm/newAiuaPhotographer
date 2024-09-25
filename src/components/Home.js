import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import '../styles/Home.css';
import '../App.css'
import Block from "./Block";

function Home(){
    return (
        <div className="main-container">
            <div className="home-page">

                <div className="hero-section">
                    <h1>Welcome to A.I.U.A Events</h1>
                </div>

                <div className="event-elements">
                    <Block type={"wedding-background"} title={"Weddings"} text={"Create your dream wedding with our tailored packages."}/>
                    <Block type={"conference-background"} title={"Conferences"} text={"Plan the perfect conference with our professional services."}/>
                    <Block type={"private-background"} title={"Private Parties"} text={"Host unforgettable private parties with us."}/>
                </div>

                <div className="our-clients">
                    <h1> Our Clients</h1>
                <Carousel/>
                </div>
            </div>

        </div>
    );
};

export default Home;
