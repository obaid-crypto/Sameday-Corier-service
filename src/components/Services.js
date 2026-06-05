import React from 'react';
import { FaTruck, FaBox, FaClock } from 'react-icons/fa';
import '../styles/Services.css';

const Services = () => {
    const services = [
        {
            id: 1,
            title: 'Same-Day Courier',
            description: 'Urgent, direct, UK-wide',
            icon: FaTruck,
            color: '#003d99',
        },
        {
            id: 2,
            title: 'Local Deliveries',
            description: 'Affordable and fast with your city or region',
            icon: FaBox,
            color: '#003d99',
        },
        {
            id: 3,
            title: 'Time-Critical Shipping',
            description: 'For urgent document overs medical or auto notive part',
            icon: FaClock,
            color: '#003d99',
        },
    ];

    return (
        <section id="services" className="services">
            <div className="container">
                <h2>Our Services</h2>

                <div className="services-grid">
                    {services.map((service) => {
                        const IconComponent = service.icon;
                        return (
                            <div key={service.id} className="service-card">
                                <div className="service-icon" style={{ color: service.color }}>
                                    <IconComponent size={60} />
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;