import { NavLink } from "react-router-dom";
import "./Footer.css";
import logo2 from "../assets/logo2.png"

const Footer = () => {
    return (
    <footer>
        <div>
        <img src={logo2} className="logo2" alt="Community Change logo inverted" />
        <p> Crowdfunding Project by Selina Shin for She Codes Australia</p>
        <p className="ps">(P.S. “Community Change” is a pun referring to both money and making a difference. In other words, it’s the positive change we can create together with our community's funds.)</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;