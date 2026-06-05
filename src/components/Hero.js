import React from 'react';
import { FaPhone } from 'react-icons/fa';
import '../styles/Hero.css';

const Hero = () => {
    const phoneNumber = '+441211234567';

    const handleQuoteClick = (e) => {
        e.preventDefault();
        const quoteSection = document.getElementById('quote-section');
        if (quoteSection) {
            quoteSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="home"
            className="hero"
            style={{
                backgroundImage: 'url(/images/delivery-van.jpg)',
            }}
        >
            {/* Dark Overlay */}
            <div className="hero-overlay"></div>

            {/* Content - LEFT SIDE ONLY */}
            <div className="hero-container">
                <div className="hero-content">
                    <h1>Fast. Reliable. Sameday Indus Couriers</h1>
                    <p className="hero-subtitle">Serving your delivery needs with professional courier services across UK</p>

                    <div className="hero-buttons">
                        <button
                            onClick={handleQuoteClick}
                            className="btn btn-primary"
                        >
                            Get a Quote
                        </button>
                        <a
                            href={`tel:${phoneNumber}`}
                            className="btn btn-secondary"
                        >
                            <FaPhone /> Call Now
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;