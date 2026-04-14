import { useParams, Link } from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import { useState } from 'react';
import useAuth from "../hooks/use-auth.js";
import PledgeForm from "../components/PledgeForm.jsx";
import EditPledgeForm from "../components/EditPledgeForm.jsx"
import "./FundraiserPage.css";

function FundraiserPage() {
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useFundraiser hook.
   const { id } = useParams();
    // useFundraiser returns three pieces of info, so we need to grab them all here
   const { fundraiser, isLoading, error, refetch } = useFundraiser(id);
   const [isOpen, setIsOpen] = useState(false);
   const [editingPledge, setEditingPledge] = useState(null);
   const { auth } = useAuth();

   const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsOpen(false);
    };

    if (isLoading) {
        return (<p>loading...</p>)
    };

   if (error) {
    return (<p>{error.message}</p>)
   };

   return (
        <div className="page-container">
            <div className="title-button-container">
                <h2 className="title">{fundraiser.title}</h2>
                    {auth.token && fundraiser.owner === parseInt(auth.userId) && (
                    <Link to={`/fundraiser/${id}/edit`} className="edit-fundraiser">Edit Fundraiser</Link>
            )}
            </div>
            <div className="fundraiser-container">
                <img src={fundraiser.image} className="fundraiser-image" alt="Image of Fundraiser" />
                <div className="right-column">
                    <div className="information">
                        <div className="info-row"><h4>Created by: </h4><h3> {fundraiser.owner_username}</h3></div>
                        <div className="info-row"><h4>Location:</h4><h3> {fundraiser.suburb}, {fundraiser.postcode}</h3></div>
                        <div className="info-row"><h4>Goal:</h4><h3> ${fundraiser.goal}</h3></div>
                        <div className="info-row"><h4>Created on:</h4><h3> {fundraiser.date_created?.slice(0, 10)}</h3></div>
                        <div className="info-row"><h4>Status:</h4><h3> {fundraiser.is_open ? "Open" : "Closed"}</h3></div>
                        <div className="info-row"><h4>Fundraiser closes on:</h4><h3> {fundraiser.deadline?.slice(0, 10)}</h3></div>
                    </div>
                    <p className="description">{fundraiser.description}</p>
                </div>
            </div>
           <div className="pledges-card">
                <div className="pledges-header">
                    <h3>Pledges</h3>
                    {!isOpen && (
                        auth.token ? (
                            <button className="secondary-btn" onClick={toggleModal}>
                                Make a Pledge
                            </button>
                        ) : (
                            <p className="p-signin">Please <Link to="/login" className="signin-link">sign in</Link> to make a pledge.</p>
                        )
                    )}
                </div>
                
                {fundraiser.pledges.length === 0 && (
                    <p className="no-pledges">No pledges yet. Be the first to support this fundraiser!</p>
                )}

                {isOpen && (
                    <div className="pledge-form">
                    <button className="x" onClick={() => setIsOpen(false)}>✕</button>
                    <PledgeForm fundraiserId={id} onPledgeSuccess={() => {refetch(); setIsOpen(false); }} />
                    </div>
                )}

                <ul className="pledge-list">
                    {fundraiser.pledges.map((pledgeData, key) => (
                    <li key={key}>
                        <span className="pledge-info">
                            ${pledgeData.amount} from {pledgeData.supporter || "Anonymous"} - {pledgeData.comment}
                        </span>
                        {auth.token && (pledgeData.supporter === auth.username || pledgeData.is_mine) && !editingPledge && (
                            <button className="edit-btn" onClick={() => setEditingPledge(pledgeData)}>Edit</button>
                        )}
                        {editingPledge?.id === pledgeData.id && (
                        <div className="edit-pledge-form">
                            <button className="x" onClick={() => setEditingPledge(null)}>✕</button>
                            <EditPledgeForm pledgeData={editingPledge} onEditSuccess={() => {
                            refetch();
                            setEditingPledge(null);
                            }}/>
                        </div>
                        )}
                    </li>
                    ))}
                </ul>
                </div>
        </div>
    );
};

export default FundraiserPage;