import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postFundraiser from "../api/post-fundraiser.js";
import useAuth from "../hooks/use-auth.js"

function FundraiserForm() {
    const navigate = useNavigate();
    const { auth } = useAuth();
    useEffect(() => {
        if (!auth.token) {
            navigate("/login");
        }
    }, []);
    const [credentials, setCredentials] = useState({
        title: "",
        image: "",
        description: "",
        suburb: "",
        postcode: "",
        goal: "",
        deadline: "",
        is_open: false,
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
        if (credentials.title && credentials.image && credentials.description && credentials.suburb && credentials.postcode && credentials.goal && credentials.deadline) {
            postFundraiser(
                credentials.title,
                credentials.image, 
                credentials.description, 
                credentials.suburb,
                credentials.postcode,
                credentials.goal,
                credentials.deadline,
                credentials.is_open,
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
                <label htmlFor="title">Title:</label>
                <input type="text"
                id="title"
                placeholder="Title"
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="image">Image:</label>
                <input type="text"
                id="image"
                placehold="Enter image URL"
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    placeholder="Description"
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
                    type="number"
                    id="postcode"
                    placeholder="Postcode"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="goal">Goal:</label>
                <input
                    type="number"
                    id="goal"
                    placeholder="Goal"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="deadline">Deadline:</label>
                <input
                    type="date"
                    id="deadline"
                    value={credentials.deadline}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="is_open">Open for pledges?</label>
                <input type="checkbox" id="is_open" onChange={(e) => 
                setCredentials({...credentials, is_open: e.target.checked})}
                />
            </div>
            {error && <p style={{color: "red"}}>{error}</p>}
            <button type="submit" onClick={handleSubmit}>Create Fundraiser</button>
        </form>
    );
}

export default FundraiserForm;