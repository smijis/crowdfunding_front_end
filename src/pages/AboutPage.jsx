import { useNavigate } from "react-router-dom";
import "./AboutPage.css";
import library from "../assets/library.jpg";
import coins from "../assets/coins.png";
import painting from "../assets/painting.jpg";

function AboutPage() {
    const navigate = useNavigate();
        return (
            <div>
                {/* Section 1: Orange banner */}
                <div className="orange-banner">
                    <img src={coins} className="coins" alt="Community Change coins" />
                    <h1>About Us</h1>
                    <h2>We believe change starts with community.</h2>
                    <p>'Community Change' is a community-driven crowdfunding platform that allows people to create fundraisers for small, local improvement projects in their neighbourhood. Instead of waiting for council action, residents can raise money to directly support initiatives.</p>
                </div>
        
                {/* Section 2: Questions + image side by side */}
                <div className="questions-container">
                    <div className="questions-content">
                        <p>How many times have you complained about the pothole on the main road?</p>
                        <p>Or, wished there was a bbq spot at the local park or just some more trees and flowers to enjoy?</p>
                        <p>Maybe you've hoped for a farmers market on the weekends?</p>
                        <p>Have you got ideas for a school holiday program in your area?</p>
                    </div>
                    <img src={library} className="questionsimage" alt="Little Free Library" />
                </div>
                {/* Section 3: Description */}
                <div className="about-container">
                    <img src={painting} className="aboutimage" alt="Community Art Therapy" />
                    <div className="about-description">
                        <h2>That’s why we built Community Change.</h2>
                        <p>Because the best ideas often start close to home but a lack of funds shouldn’t stop us from living in our dream neighbourhood. Community Change makes it easy to bring locals together around what matters most in their area.</p>
                        <br></br>
                        <p>Just community backing community.</p>
                    </div>
                </div>
                <div className="final-content">
                {/* Section 4: Start A Fundraiser */}
                    <h2>Your community, <br className="mobile-break" />your project.</h2>
                    <button className="primary-btn" onClick={() => navigate("/fundraiser")}>
                            Create a Fundraiser
                        </button>
                </div>
            </div>
        );
    };


export default AboutPage;