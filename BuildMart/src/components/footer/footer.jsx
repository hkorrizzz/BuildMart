import { LuFacebook } from "react-icons/lu";
import { LuTwitter } from "react-icons/lu";
import { LuInstagram } from "react-icons/lu";
import { LuLinkedin } from "react-icons/lu";
import { LuMail } from "react-icons/lu";
import { Link } from "react-router-dom";
import "./footer.css"

export const Footer = () => {
  return (
    <footer className="footer">
        <div className="container">
            <div className="container-1">
                <div>
                    <h3 className="title-container-1">BuildMart</h3>
                    <p className="sub-title">Your trusted source for premium building materials and construction supplies since 1995.</p>
                    <div className="icons">
                        <a href="#"><LuFacebook className="icon"/></a>
                        <a href="#"><LuTwitter className="icon"/></a>
                        <a href="#"><LuInstagram className="icon"/></a>
                        <a href="#"><LuLinkedin className="icon"/></a>
                    </div>
                </div>
                <div>
                    <h3 className="title-container-1">Quick Links</h3>
                    <ul className="footer-links">
                        <li><a href="#" className="sub-title">About Us</a></li>
                        <li>
                            <Link to="/" className="sub-title">Products</Link>
                        </li>
                        <li><a href="#" className="sub-title">Delivery Info</a></li>
                        <li><a href="#" className="sub-title">Returns Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="title-container-1">Customer Service</h3>
                    <ul className="footer-links">
                        <li><a href="#" className="sub-title">Contact Us</a></li>
                        <li><a href="#" className="sub-title">FAQs</a></li>
                        <li><a href="#" className="sub-title">Shipping & Tracking</a></li>
                        <li><a href="#" className="sub-title">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="title-container-1">Newsletter</h3>
                    <p className="sub-title">Subscribe for updates and exclusive deals.</p>
                    <div className="subscribe">
                        <input type="email" placeholder="Your email" className="input-email"></input>
                        <button className="mail-button">
                            <LuMail />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="container container-2">
            <div className="grid">
                <div>
                    <p className="p-tittle">Phone</p>
                    <p>1-800-BUILD-MART</p>
                </div>
                <div>
                    <p className="p-tittle">Email</p>
                    <p>support@buildmart.com</p>
                </div>
                <div>
                    <p className="p-tittle">Address</p>
                    <p>123 Construction Ave, Builder City, BC 12345</p>
                </div>
            </div>
        </div>
        <div className="container-2 text-center">
            <p>© 2026 BuildMart. All rights reserved.</p>
        </div>
    </footer>
  );
}