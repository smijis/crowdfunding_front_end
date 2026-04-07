function PledgePreview(props) {
    const { pledgeData } = props; 

    return (
        <div className="pledge-card">
                <h3>
                    <a 
                    href={`/fundraiser/${pledgeData.fundraiser_id}`} 
                    style={{ textDecoration: 'none', fontSize: '16px', }}
                    >
                    {pledgeData.fundraiser_title}
                    </a>
                </h3>
                <p>${pledgeData.amount}</p>
                <p>"{pledgeData.comment}"</p>
        </div>
    );
};

export default PledgePreview;