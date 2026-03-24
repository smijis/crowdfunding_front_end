import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postLogin from "../api/post-login.js";

function LoginForm() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
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
        if (credentials.username && credentials.password) {
           postLogin(
               credentials.username,
               credentials.password
           ).then((response) => {
               console.log(response);
               window.localStorage.setItem("token", response.token);
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
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text"
                id="username"
                placeholder="Enter username"
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
            {error && <p style={{color: "red"}}>{error}</p>}
            <button type="submit" onClick={handleSubmit}>Login</button>
        </form>
    );
}

export default LoginForm;