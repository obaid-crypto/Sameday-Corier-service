import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseAndQuote from '../components/WhyChooseAndQuote';
import AboutUs from '../components/AboutUs';
import '../styles/Home.css';

const Home = () => {
    return (
        <main>
            <section id="home">
                <Hero />
            </section>

            <section id="services">
                <Services />
            </section>

            <section id="quote-section">
                <WhyChooseAndQuote />
            </section>

            <section id="about">
                <AboutUs />
            </section>
        </main>
    );
};

export default Home;