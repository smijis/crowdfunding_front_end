import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useFundraiser from "../hooks/use-fundraiser";
import EditFundraiserForm from "../components/EditFundraiserForm.jsx";
import "./EditFundraiserPage.css";
import deleteFundraiser from "../api/delete-fundraiser.js";

function EditFundraiserPage() {
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useFundraiser hook.
    const { id } = useParams();
    const navigate = useNavigate();
    // useFundraiser returns three pieces of info, so we need to grab them all here
    const [deleteError, setDeleteError] = useState("")
    const { fundraiser, isLoading, error } = useFundraiser(id);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = () => {
        if (fundraiser.pledges.length === 0) {
            deleteFundraiser(id).then((response) => {
                console.log(response);
                setDeleteError("Fundraiser deleted.");
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }).catch((deleteError) => {
                setDeleteError(deleteError.message);
            });
        } else {
            setDeleteError("Cannot delete fundraiser with pledges.");
        }
    };

    if (isLoading) {
        return (<p>loading...</p>)
    };
    if (error) {
    return (<p>{error.message}</p>)
   };
   return (
    <div>
        <EditFundraiserForm fundraiserData={fundraiser} onEditSuccess={() => navigate(`/fundraiser/${id}`)} />
        {deleteError && <p style={{color: "red"}}>{deleteError}</p>}
        <div>
            <button onClick={() => setShowConfirm(true)}>Delete Fundraiser</button>
            {showConfirm && (
                <div className="delete-window">
                    <p>Are you sure you want to delete this fundraiser? This cannot be undone. If you want to pause collecting pledges, you can close it instead.</p>
                    <button onClick={handleDelete}>Yes, delete</button>
                    <button onClick={() => setShowConfirm(false)}>Cancel</button>  
                </div>
            )}
        </div>
    </div>
   );
};

export default EditFundraiserPage;

