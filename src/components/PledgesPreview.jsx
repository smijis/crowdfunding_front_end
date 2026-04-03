function PledgePreview(props) {
    const { pledgeData } = props; 

    return (
        <div className="pledge-card">
                <h3>{pledgeData.fundraiser_title}</h3>
                <p>{pledgeData.amount}</p>
                <p>{pledgeData.comment}</p>
        </div>
    );
};

export default PledgePreview;