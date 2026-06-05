import React from 'react';
import { FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Left Section - Logo and Company Details */}
                    <div className="footer-section footer-logo-section">
                        <div className="footer-logo">
                            <img
                                src="/images/logo.png"
                                alt="Sametime Indus Courier Logo"
                            />
                        </div>
                        <div className="company-details">
                            <p className="company-name">Same Day Indus Couriers Ltd,</p>
                            <p className="company-address">19 Philip Sidney Rd,</p>
                            <p className="company-address">Birmingham,</p>
                            <p className="company-address">B11 4HS.</p>
                        </div>
                    </div>

                    {/* Middle Section - Quick Links */}
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#quote-section">Get Quote</a></li>
                        </ul>
                    </div>

                    {/* Right Section - Contact Us */}
                    <div className="footer-section">
                        <h3>Contact Us</h3>
                        <div className="footer-contact">
                            <a href="tel:+441211234567">
                                <FaPhone /> +44 121 123 4567
                            </a>
                            <a href="https://wa.me/441211234567" target="_blank" rel="noopener noreferrer">
                                <FaWhatsapp /> WhatsApp
                            </a>
                            <a href="mailto:info@samedayinduscourier.co.uk">
                                <FaEnvelope /> Email Us
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2024 Same Day Indus Couriers Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;