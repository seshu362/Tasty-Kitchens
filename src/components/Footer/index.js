import {
  FaInstagram,
  FaPinterestSquare,
  FaTwitterSquare,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-log-heading">
      <img
        src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625978524/footer-icon_cs8bzb.png"
        alt="website-footer-logo"
        className="footer-image"
      />
      <h1 className="footer-main-heading">Tasty Kitchens</h1>
    </div>

    <p className="footer-paragraph">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="footer-contacts">
      <FaPinterestSquare
        className="footer-logos"
        testid="pintrest-social-icon"
      />
      <FaInstagram className="footer-logos" testid="instagram-social-icon" />
      <FaTwitterSquare className="footer-logos" testid="twitter-social-icon" />
      <FaFacebookSquare
        className="footer-logos"
        testid="facebook-social-icon"
      />
    </div>
  </div>
)

export default Footer
