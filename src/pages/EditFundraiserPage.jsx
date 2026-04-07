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
        deleteFundraiser(id).then((response) => {
            setDeleteError("Fundraiser deleted.");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }).catch((deleteError) => {
            setDeleteError(deleteError.message);
        });
    };
    
    if (isLoading) {
        return (<p>loading...</p>)
    };
    if (error) {
        return (<p>{error.message}</p>)
    };

   return (
    <div className="edit-page-container">
      <h1 className="edit-title">Edit Fundraiser</h1>
  
      <div className="edit-form-wrapper">
        <EditFundraiserForm 
          fundraiserData={fundraiser} 
          onEditSuccess={() => navigate(`/fundraiser/${id}`)} 
        />
      </div>
        <div className="delete-section">
            <button className="delete-btn" onClick={() => {
                if (fundraiser.pledges.length > 0) {
                    setDeleteError("Cannot delete a fundraiser with existing pledges.");
                } else {
                    setShowConfirm(true);
                    setDeleteError("");
                }
            }}>
                Delete Fundraiser
            </button>
            {deleteError && <p className="error-message">{deleteError}</p>}
  
        {showConfirm && (
          <div className="delete-window">
            <p>
              Are you sure you want to delete this fundraiser? This cannot be undone.
            </p>
            <div className="delete-actions">
              <button className="confirm-delete" onClick={handleDelete}>
                Yes, delete
              </button>
              <button className="cancel-delete" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditFundraiserPage;

