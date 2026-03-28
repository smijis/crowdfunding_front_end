import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postPledge from "../api/post-pledge.js";
import useAuth from "../hooks/use-auth.js"

function PledgeForm({ fundraiserId, onPledgeSuccess }) {
    const navigate = useNavigate();
    const { auth } = useAuth();
    useEffect(() => {
        if (!auth.token) {
            navigate("/login");
        }
    }, []);
    const [credentials, setCredentials] = useState({
        amount: "",
        comment: "",
        anonymous: false,
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
        if (credentials.amount && credentials.comment) {
            postPledge(
                credentials.amount,
                credentials.comment,
                credentials.anonymous, 
                fundraiserId,
            ).then((response) => {
                onPledgeSuccess();
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
                <label htmlFor="amount">Amount:</label>
                <input
                    type="number"
                    step="1"
                    id="amount"
                    placeholder="Amount (whole numbers only)"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="comment">Comment:</label>
                <input type="text"
                id="comment"
                placeholder="Enter a comment"
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="anonymous">Anonymous</label>
                <input type="checkbox" id="anonymous" onChange={(e) => 
                setCredentials({...credentials, anonymous: e.target.checked})}
                />
            </div>
            {error && <p style={{color: "red"}}>{error}</p>}
            <button type="submit" onClick={handleSubmit}>Make a Pledge</button>
        </form>
    );
}

export default PledgeForm;