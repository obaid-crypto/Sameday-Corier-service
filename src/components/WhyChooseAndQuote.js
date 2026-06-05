import React, { useState } from 'react';
import { FaCheckCircle, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { FaBox, FaTruck, FaShippingFast } from 'react-icons/fa';
import axios from 'axios';
import '../styles/WhyChooseAndQuote.css';

const WhyChooseAndQuote = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        pickupPostcode: '',
        deliveryPostcode: '',
        parcelType: '',
        dateTime: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const features = [
        'GPS-tracked deliveries',
        'Fully insured & vetted drivers',
        'Competitive pricing (from £1.10/mile)',
        '24/7 customer support',
    ];

    const phoneNumber = '+441211234567';
    const whatsappNumber = '441211234567';

    // Parcel types with icons and labels (Small to Big)
    const parcelTypes = [
        { value: 'small', label: 'Small', icon: FaBox, size: '18px' },
        { value: 'medium', label: 'Medium', icon: FaTruck, size: '28px' },
        { value: 'large', label: 'Large', icon: FaShippingFast, size: '36px' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleParcelTypeClick = (value) => {
        setFormData((prev) => ({
            ...prev,
            parcelType: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${API_URL}/api/contact`, {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject: 'Quote Request',
                message: `
Pickup Postcode: ${formData.pickupPostcode}
Delivery Postcode: ${formData.deliveryPostcode}
Parcel Type: ${formData.parcelType}
Date & Time: ${formData.dateTime}

Additional Details: ${formData.message}
        `,
            });

            if (response.data.success) {
                setSuccess(true);
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    pickupPostcode: '',
                    deliveryPostcode: '',
                    parcelType: '',
                    dateTime: '',
                    message: '',
                });

                setTimeout(() => {
                    setSuccess(false);
                }, 5000);
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to submit quote request. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="quote-section" className="why-choose-quote">
            <div className="container">
                <div className="why-choose-quote-wrapper">
                    {/* Left Side - Why Choose Us */}
                    <div className="why-choose-section">
                        <h2>Why Choose Us</h2>

                        <div className="features-list">
                            {features.map((feature, index) => (
                                <div key={index} className="feature-item">
                                    <FaCheckCircle className="check-icon" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="testimonial">
                            <p className="testimonial-text">
                                "Fast, professional, saved our day—thanks Indus Couriers!"
                            </p>
                            <p className="testimonial-author">— Sarah J.</p>
                        </div>
                    </div>

                    {/* Right Side - Get a Quote Form */}
                    <div className="quote-section">
                        <h2>Get a Quote</h2>

                        {success && (
                            <div className="quote-success">
                                ✅ Quote request submitted! We'll contact you shortly.
                            </div>
                        )}

                        {error && (
                            <div className="quote-error">
                                ❌ {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="quote-form">
                            {/* Row 1: Name and Phone */}
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name *"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number *"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Row 2: Email and Pickup Postcode */}
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email *"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="pickupPostcode"
                                        placeholder="Pickup Postcode *"
                                        value={formData.pickupPostcode}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Row 3: Delivery Postcode and Date */}
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="deliveryPostcode"
                                        placeholder="Delivery Postcode *"
                                        value={formData.deliveryPostcode}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="datetime-local"
                                        name="dateTime"
                                        placeholder="Date & Time *"
                                        value={formData.dateTime}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Row 4: Parcel Type (with icons) */}
                            <div className="parcel-type-section">
                                <label>Parcel Type *</label>
                                <div className="parcel-options">
                                    {parcelTypes.map((type) => {
                                        const IconComponent = type.icon;
                                        return (
                                            <button
                                                key={type.value}
                                                type="button"
                                                className={`parcel-option ${formData.parcelType === type.value ? 'active' : ''
                                                    }`}
                                                onClick={() => handleParcelTypeClick(type.value)}
                                                title={type.label}
                                            >
                                                <IconComponent size={type.size} />
                                                <span>{type.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Row 5: Additional Details */}
                            <div className="form-group-full">
                                <textarea
                                    name="message"
                                    placeholder="Additional Details (optional)"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="3"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn-submit"
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit for Quote'}
                            </button>

                            {/* Contact Info Below Form */}
                            <div className="contact-info-below">
                                <p className="contact-label">Or contact us directly:</p>
                                <div className="quick-contacts">
                                    <a href={`tel:${phoneNumber}`} className="quick-contact-link">
                                        <FaPhone /> Call
                                    </a>
                                    <a
                                        href={`https://wa.me/${whatsappNumber}?text=Hi%20I%20need%20a%20quote`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="quick-contact-link"
                                    >
                                        <FaWhatsapp /> WhatsApp
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseAndQuote;