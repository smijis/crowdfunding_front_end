import { useParams } from "react-router-dom";
import useUserProfile from "../hooks/use-user";
import useAuth from "../hooks/use-auth.js";
import "./ProfilePage.css";
import FundraiserPreview from "../components/FundraiserPreview";
import PledgesPreview from "../components/PledgesPreview";

function ProfilePage() {
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useFundraiser hook.
   const { id } = useParams();
    // useFundraiser returns three pieces of info, so we need to grab them all here
   const { userProfile, isLoading, error} = useUserProfile(id);
   const { auth } = useAuth();

    if (isLoading) {
        return (<p>loading...</p>)
    };

   if (error) {
    return (<p>{error.message}</p>)
   };

return (
        <div className="profile-page-container">
            <div className="profile-card">
                <div className="profile-avatar">
                    {userProfile.user.username?.slice(0,2).toUpperCase()}
                </div>
                <div className="profile-info">
                    <h2>{userProfile.user.name || userProfile.user.username}</h2>
                    <p>@{userProfile.user.username} | {userProfile.user.suburb} {userProfile.user.postcode}</p>
                </div>
            </div>    

            <h3 className="section-label">My fundraisers</h3>        
            <div className="fundraiser-list">
                {userProfile.fundraisers.length === 0 && (
                    <p>No fundraisers yet.</p>
                    )}
                {userProfile.fundraisers.map((fundraiserData, key) => (
                    <FundraiserPreview key={key} fundraiserData={fundraiserData} />
                ))}
            </div>

            <h3 className="section-label">My pledges</h3>
            <div className="pledge-list">
                {userProfile.pledges.length === 0 && (
                    <p>No pledges yet.</p>
                    )}
                {userProfile.pledges?.map((pledgeData, key) => (
                    <PledgesPreview key={key} pledgeData={pledgeData} />
                ))}
            </div>
        </div>
)
}

export default ProfilePage;