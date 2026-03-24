import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignup from "../api/post-signup.js";

function SignupForm() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        name: "",
        suburb: "",
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
            ).then((response) => {
                console.log(response);
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
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Name"
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
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
            </div>
            {error && <p style={{color: "red"}}>{error}</p>}
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
}

export default SignupForm;