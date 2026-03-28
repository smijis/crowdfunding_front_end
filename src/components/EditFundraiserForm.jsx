
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import putFundraiser from "../api/put-fundraiser.js";
import useAuth from "../hooks/use-auth.js"

function EditFundraiserForm({ fundraiserData, onEditSuccess }) {
    const navigate = useNavigate();
    const { auth } = useAuth();
    useEffect(() => {
        if (!auth.token) {
            navigate("/login");
        }
    }, []);
    const [credentials, setCredentials] = useState({
        title: fundraiserData.title,
        image: fundraiserData.image,
        description: fundraiserData.description,
        suburb: fundraiserData.suburb,
        postcode: fundraiserData.postcode,
        goal: fundraiserData.goal,
        deadline: fundraiserData.deadline?.slice(0, 10),
        is_open: fundraiserData.is_open,
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
        if (credentials.title && credentials.description) {
            putFundraiser(
                fundraiserData.id,
                credentials.title,
                credentials.image,
                credentials.description,
                credentials.suburb,
                credentials.postcode,
                credentials.goal,
                credentials.deadline,
                credentials.is_open,
            ).then((response) => {
                onEditSuccess();
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
            value={credentials.title}
            onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="image">Image:</label>
            <input type="text"
            id="image"
            value={credentials.image}
            onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="description">Description:</label>
            <input
                type="text"
                id="description"
                value={credentials.description}
                onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="suburb">Suburb:</label>
            <input
                type="text"
                id="suburb"
                value={credentials.suburb}
                onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="postcode">Postcode:</label>
            <input
                type="number"
                id="postcode"
                value={credentials.postcode}
                onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="goal">Goal:</label>
            <input
                type="number"
                id="goal"
                value={credentials.goal}
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
            <input type="checkbox" id="is_open" defaultChecked={fundraiserData.is_open} onChange={(e) => 
            setCredentials({...credentials, is_open: e.target.checked})}
            />
        </div>
        {error && <p style={{color: "red"}}>{error}</p>}
        <button type="submit" onClick={handleSubmit}>Edit Fundraiser</button>
    </form>
);
}

export default EditFundraiserForm;