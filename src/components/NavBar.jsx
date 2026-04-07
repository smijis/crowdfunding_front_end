import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./NavBar.css";
import useAuth from "../hooks/use-auth.js";
import logo from "../assets/logo.png";
import Footer from "./Footer.jsx"
import { useState } from "react";

function NavBar() {
    const {auth, setAuth} = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("userId");
        setAuth({ token: null, userId: null }); 
    };

    const isLoggedIn = !!auth.token;
    const navigate = useNavigate();

    return (

            <div id="navbar">
                
                <nav>
                    <div className="nav-left">
                        <NavLink to="/">
                            <img src={logo} className="logo" alt="Community Change logo" />
                        </NavLink>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                    </div>
                    <div className="nav-right">
                        <button className="primary-btn" onClick={() => navigate("/fundraiser")}>
                            Create a Fundraiser
                        </button>
                        {isLoggedIn && (
                            <NavLink to={`/profile/${auth.userId}`}>My profile</NavLink>
                        )}
                        {auth.token ? (
                            <button className="link-btn" onClick={handleLogout}>Log Out</button>
                        ) : (
                            <NavLink to="/login">Login</NavLink>
                        )}
                    </div>
                    <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    <span /><span /><span />
                </button>
                </nav>

                <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                    <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
                    <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
                    <NavLink to="/fundraiser" onClick={() => setMenuOpen(false)}>Create a Fundraiser</NavLink>
                    {isLoggedIn && (
                        <NavLink to={`/profile/${auth.userId}`} onClick={() => setMenuOpen(false)}>My profile</NavLink>
                    )}
                    {auth.token ? (
                        <NavLink to="/login" onClick={() => {handleLogout (); setMenuOpen(false);}}>Log Out</NavLink>
                    ) : (
                        <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
                    )}
                </div>

                <div style={{ flex: 1 }}>
    <Outlet />
</div>
<Footer />
            </div>
    )
}

export default NavBar;