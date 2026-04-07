import { useNavigate } from "react-router-dom";

function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <div className="not-found-container">
            <div style={{ 
            textAlign: 'center',
            lineHeight: '2',
            padding: '50px',
          }}>
            <h1 style={{ fontSize: '100px', color: '#eb862e', marginBottom: '-40px' }}>404</h1>
            <h2>Oops! Page not found.</h2>
            <p>The page you're looking for doesn't exist or has been moved.</p>
        </div>
    </div>
    );
}

export default NotFoundPage;