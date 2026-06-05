import React from 'react';
import '../styles/AboutUs.css';

const AboutUs = () => {
    return (
        <section className="about-us">
            <div className="container">
                <div className="about-wrapper">
                    <div className="about-content">
                        <h2>About Us</h2>
                        <p>
                            Indus Couriers is a trusted same-day delivery specialist with local roots and
                            nationwide reach. Track, insure, deliver.
                        </p>
                        <p>
                            We've been serving businesses and individuals across the UK with fast, reliable
                            courier services. Our team of experienced drivers and modern fleet ensure your
                            packages arrive on time, every time.
                        </p>
                        <p>
                            With GPS tracking, full insurance, and 24/7 customer support, you can trust us
                            with your most important deliveries.
                        </p>
                    </div>

                    <div className="about-image">
                        <img
                            src="https://via.placeholder.com/400x400/cccccc/666666?text=Courier+Driver"
                            alt="Courier Driver"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;