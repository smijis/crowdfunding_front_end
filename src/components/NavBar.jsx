import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./NavBar.css";
import useAuth from "../hooks/use-auth.js";
import logo from "../assets/logo.png";
import Footer from "./Footer.jsx"

function NavBar() {
    const {auth, setAuth} = useAuth();

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
                </nav>
                <div style={{ flex: 1 }}>
    <Outlet />
</div>
<Footer />
            </div>
    )
}

export default NavBar;