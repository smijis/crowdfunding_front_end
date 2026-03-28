import { Link, Outlet } from "react-router-dom";
import "./NavBar.css";
import useAuth from "../hooks/use-auth.js";

function NavBar() {
    const {auth, setAuth} = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        setAuth({ token: null});
    };

    const isLoggedIn = !!auth.token;

    console.log(auth)

    return (
        <div>
            <div id="nav-actions">
                {isLoggedIn ? (
                    <Link to="/profile" className="nav-button profile-button">
                        My profile
                    </Link>
                ) : (
                    null
                )}
            </div>

            <div id="navbar">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    {auth.token ? (
                        <Link to="/" onClick={handleLogout}>
                        Log Out
                        </Link>
                        ) : (
                        <Link to="/login">Login</Link>
                        )}
                    <Link to="/fundraiser">
                        <button>Create a Fundraiser</button>
                    </Link>
                </nav>
                <Outlet /> 
            </div>
        </div>
    );
};

export default NavBar;