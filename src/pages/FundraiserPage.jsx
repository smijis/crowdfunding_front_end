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
   console.log("supporter:", fundraiser.pledges[0]?.supporter);
console.log("auth.username:", auth.username);

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
                        <h3>Created by: {fundraiser.owner_username}</h3>
                        <h3>Created on: {fundraiser.date_created?.slice(0, 10)}</h3>
                        <h3>Status: {fundraiser.is_open ? "Open" : "Closed"}</h3>
                        <h3>Fundraiser closes on: {fundraiser.deadline?.slice(0, 10)}</h3>
                    </div>
                    <p className="description">{fundraiser.description}</p>
                    </div>
                </div>
           <div className="pledges-card">
                <div className="pledges-header">
                    <h3>Pledges</h3>
                    {auth.token && (
                    <button className="secondary-btn" onClick={toggleModal}>
                        Make a Pledge
                    </button>
                    )}
                </div>

                {isOpen && (
                    <div className="pledge-form">
                    <button className="x" onClick={() => setIsOpen(false)}>✕</button>
                    <PledgeForm fundraiserId={id} onPledgeSuccess={refetch} />
                    </div>
                )}

                <ul className="pledge-list">
                    {fundraiser.pledges.map((pledgeData, key) => (
                    <li key={key}>
                        <span className="pledge-info">
                        {pledgeData.amount} from {pledgeData.supporter} - {pledgeData.comment}
                        </span>
                        {auth.token && pledgeData.supporter === auth.username && (
                        <button className="edit-btn" onClick={() => setEditingPledge(pledgeData)}>Edit</button>
                        )}
                        {editingPledge?.id === pledgeData.id && (
                        <div className="edit-pledge-form">
                            <button className="x" onClick={() => setEditingPledge(null)}>✕</button>
                            <EditPledgeForm pledgeData={editingPledge} onEditSuccess={() => {
                            refetch();
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