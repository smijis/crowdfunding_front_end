import { useState } from "react";
import FundraiserForm from "../components/FundraiserForm.jsx";
import "./CreateFundraiserPage.css";

function CreateFundraiserPage() {
    const [activeTab, setActiveTab] = useState('login');
    return <FundraiserForm />
}
export default CreateFundraiserPage;

