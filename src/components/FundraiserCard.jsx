import { Link } from "react-router-dom";
import "./FundraiserCard.css";

function FundraiserCard(props){
    const { fundraiserData } = props; //equivalent to const fundraiserData = props.fundraiserData (we are running through fundraiser prop and save it in fundraiserData)
    const fundraiserLink = `fundraiser/${fundraiserData.id}`;

    return (
        <div className="fundraiser-card">
            <Link to={fundraiserLink}>
                <img src ={fundraiserData.image} alt="" />
                <h3>{fundraiserData.title}</h3>
            </Link>
            <p>Description of the fundraiser.</p>
        </div>
    );
};

export default FundraiserCard;