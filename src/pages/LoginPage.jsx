import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { useState } from "react";
import "./LoginPage.css";


const TabbedForms = () => {
    const [activeTab, setActiveTab] = useState('login');

    return (
        <div className="tab-container">
            <nav className="tab-nav">
                <button
                    className={activeTab === 'login' ? 'active' : ''}
                    onClick={() => setActiveTab('login')}
                >
                    Login
                </button>
                <button
                    className={activeTab === 'signup' ? 'active' : ''}
                    onClick={() => setActiveTab('signup')}
                >
                    Sign Up
                </button>
            </nav>

            <div className="tab-content">
                {activeTab === 'login' ? (
                    <LoginForm />
                ) : (
                    <SignupForm />
                )}
            </div>    
        </div>
    );
};

export default TabbedForms;

