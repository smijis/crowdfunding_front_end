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
        <div>
           <h2 class="title">{fundraiser.title}</h2>
            <img src={fundraiser.image} className="fundraiser-image" alt="Image of Fundraiser" />
           <h3>Created by: {fundraiser.owner_username}</h3>
           <h3>Created on: {fundraiser.date_created?.slice(0, 10)}</h3>
           <h3>Status: {fundraiser.is_open ? "Open" : "Closed"}</h3>
           <h3>Fundraiser closes on: {fundraiser.deadline?.slice(0, 10)}</h3>
           <p>{fundraiser.description}</p>
            <br />
           {auth.token && fundraiser.owner === parseInt(auth.userId) && (
                <Link to={`/fundraiser/${id}/edit`}>Edit Fundraiser</Link>
           )}
           <h3>Pledges:</h3>
                <div>
            <button onClick={toggleModal}>Make a Pledge</button>
            {isOpen && (
                <div className="pledge-form">
                    <PledgeForm fundraiserId={id} onPledgeSuccess={refetch} />
                </div>
            )}
            </div>
           <ul>
               {fundraiser.pledges.map((pledgeData, key) => { //.map says to loop through the pledges and for each one, do this function =>
                    return (
                        <li key={key}>
                            {pledgeData.amount} from {pledgeData.supporter}
                            {" - "}{pledgeData.comment}
                            {"  "}
                            {auth.token && pledgeData.supporter === auth.username && (
                                <button onClick={() => setEditingPledge(pledgeData)}>Edit Pledge</button>
                            )}
                            {editingPledge?.id === pledgeData.id && (
                                <div className="edit-pledge-form">
                                    <EditPledgeForm pledgeData={editingPledge} onEditSuccess={() => {
                                        refetch();
                                        setEditingPledge(null);
                                    }}/>
                                </div>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default FundraiserPage;