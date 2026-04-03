import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignup from "../api/post-signup.js";
import postLogin from "../api/post-login.js";
import useAuth from "../hooks/use-auth.js";
import "./SignupForm.css";

function SignupForm() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        name: "",
        suburb: "",
        postcode: "",
        email: "",
    });
    const[error, setError] = useState("");

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password && credentials.name && credentials.suburb && credentials.email) {
            postSignup(
                credentials.username,
                credentials.password,
                credentials.name,
                credentials.suburb,
                credentials.email
            ).then(() => {
                return postLogin(
                    credentials.username,
                    credentials.password,
                );
            }).then((response) => {
                window.localStorage.setItem("token", response.token);
                window.localStorage.setItem("userId", response.user_id);
                window.localStorage.setItem("username", response.username);
                setAuth({
                 token: response.token,
                 userId: response.user_id,
                 username: response.username,
                });
                navigate("/");        
            }).catch((error) => {
                setError(error.message);
            });
        } else {
            setError("Please fill out all fields.");
        }
   };

    return (
        <form>
            <h1>Sign Up</h1>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text"
                id="username"
                placeholder="Username"
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    placeholder="First Name"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="suburb">Suburb:</label>
                <input
                    type="text"
                    id="suburb"
                    placeholder="Suburb"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="postcode">Postcode:</label>
                <input
                    type="integer"
                    id="postcode"
                    placeholder="Postcode"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                />
            </div>
            {error && <p style={{color: "red"}}>{error}</p>}
            <button type="submit" onClick={handleSubmit} className="signup-btn">Submit</button>
        </form>
    );
}

export default SignupForm;