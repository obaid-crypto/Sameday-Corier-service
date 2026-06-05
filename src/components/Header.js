import React, { useState } from 'react';
import { FaBars, FaTimes, FaPhone, FaWhatsapp } from 'react-icons/fa';
import '../styles/Header.css';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const phoneNumber = '+441211234567';
    const whatsappNumber = '441211234567';

    // Close menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.navbar')) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <header className="header">
            {/* Top Bar with Contact */}
            <div className="header-top">
                <div className="container">
                    <div className="contact-bar">
                        <a href={`tel:${phoneNumber}`} className="contact-link">
                            <FaPhone /> +44 121 123 4567
                        </a>
                        <a
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                        >
                            <FaWhatsapp /> WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="navbar">
                <div className="container navbar-content">
                    {/* LOGO */}
                    <div className="logo">
                        <a href="#home">
                            <img
                                src="/images/logo.png"
                                alt="Sametime Indus Courier Logo"
                                className="logo-img"
                            />
                        </a>
                    </div>

                    <button
                        className="menu-toggle"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                        <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
                        <li><a href="#services" onClick={() => setMenuOpen(false)}>Services</a></li>
                        <li><a href="#quote-section" onClick={() => setMenuOpen(false)}>Get Quote</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;