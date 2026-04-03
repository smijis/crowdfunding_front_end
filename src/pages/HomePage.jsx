import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import bannerimage from "../assets/bannerimage.webp";

function HomePage() {
    const { fundraisers, isLoading, error } = useFundraisers();
    const navigate = useNavigate()

    if (isLoading) {
        return (<p>loading...</p>)
       }

    if (error) {
        return (<p>{error.message}</p>)
       }

    const Banner = () => {
        return (
            <div className="banner-container">
                <div className="banner-content">
                    <h1>Change is at your doorstep</h1>
                    <p>Help fund or create local projects in your community.</p>
                    <button className="primary-btn" onClick={() => navigate("/fundraiser")}>
                            Create a Fundraiser
                    </button>
                </div>
                    <img src={bannerimage} className="bannerimage" alt="The Dale Parade Mural Project" />
            </div>
        );
    };

    return (
        <div>
            <Banner />
            <div id="fundraiser-list">
                {fundraisers.map((fundraiserData, key) => {
                    // return <div key={key}>{fundraiserData.title}</div>;
                    return <FundraiserCard key={key} fundraiserData={fundraiserData} />;
                })}
            </div>
        </div>
    );
};

export default HomePage;