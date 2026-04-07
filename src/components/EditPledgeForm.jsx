
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import putPledge from "../api/put-pledge.js";
import useAuth from "../hooks/use-auth.js"

function EditPledgeForm({ pledgeData, onEditSuccess }) {
    const navigate = useNavigate();
    const { auth } = useAuth();
    useEffect(() => {
        if (!auth.token) {
            navigate("/login");
        }
    }, []);
    const [credentials, setCredentials] = useState({
        comment: pledgeData.comment,
        anonymous: pledgeData.anonymous,
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
        if (credentials.comment) {
            putPledge(
                pledgeData.id,
                credentials.comment,
                credentials.anonymous,
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
                <label htmlFor="comment">Comment:</label>
                <input type="text"
                id="comment"
                value={credentials.comment}
                onChange={handleChange}
                />
            </div>
            <div className="checkbox-group">
                <label htmlFor="anonymous">Anonymous</label>
                <input
                type="checkbox"
                id="anonymous"
                defaultChecked={pledgeData.anonymous}
                onChange={(e) =>
                    setCredentials({ ...credentials, anonymous: e.target.checked })
                }
            />
            </div>
            {error && <p style={{color: "red"}}>{error}</p>}
            <button type="submit" onClick={handleSubmit} className="secondary-btn">Save Changes</button>
        </form>
    );
}

export default EditPledgeForm;