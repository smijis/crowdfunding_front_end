import { Link, Outlet } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
    return (
        <div id="navbar">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/login">Log In</Link>
                <Link to="/fundraiser">
                    <button>+ Start a Fundraiser</button>
                </Link>
            </nav>
            <Outlet /> 
        </div>
        //outlet tells navbar where to insert the child element (they will be inside this div after the nav where outlet is)
    );
};

export default NavBar;