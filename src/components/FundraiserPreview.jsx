
import { Link } from "react-router-dom";

function FundraiserPreview(props) {
    const { fundraiserData } = props; //equivalent to const fundraiserData = props.fundraiserData (we are running through fundraiser prop and save it in fundraiserData)
    const fundraiserLink = `/fundraiser/${fundraiserData.id}`;

    return (
        <div className="fundraiser-card">
            <Link to={fundraiserLink}>
                <img src ={fundraiserData.image} alt="" />
                <h3>{fundraiserData.title}</h3>
            </Link>
                <p>Closes on: {fundraiserData.deadline?.slice(0, 10)}</p>
        </div>
    );
};

export default FundraiserPreview;