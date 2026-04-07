import { useState } from "react";
import "./ContactPage.css";

function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.name && formData.email && formData.message) {
            setSubmitted(true);
            setError("");
        } else {
            setError("Please fill in all fields.");
        }
    };

    if (submitted) {
        return (
            <div className="contact-container">
                <h2>Thank you for your message!</h2>
                <p>We'll be in touch soon.</p>
            </div>
        );
    }

    return (
        <div className="contact-container">
            <div className="contact-details">
                <h2>Get in Touch</h2>
                <p>We'd love to hear from you!</p>
                <p>If you have any inquiries or just want to say hi, please email or call us, or use the contact form.</p>
                <br></br>
                <p> Email: hello@communitychange.com</p>
                <p> Phone: 02 1234 1234</p>
            </div>
            <div id="contact-form">
                <input type="text" id="name" placeholder="Your name" onChange={handleChange} />
                <input type="email" id="email" placeholder="Your email" onChange={handleChange} />
                <textarea id="message" placeholder="Your message" onChange={handleChange}></textarea>
                {error && <p style={{color: "red"}}>{error}</p>}
                <button className="primary-btn" onClick={handleSubmit}>Send Message</button>
            </div>
        </div>
    );
};

export default ContactPage;