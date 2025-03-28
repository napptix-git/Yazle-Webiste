
import React from 'react';
import { motion } from 'framer-motion';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PartnersCarousel from '@/components/PartnersCarousel';
import AudienceCards from '@/components/AudienceCards';
import ServiceCards from '@/components/ServiceCards';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>
      
      {/* Partners Carousel */}
      <section id="partners">
        <PartnersCarousel />
      </section>
      
      {/* Advertisers and Publishers Section */}
      <section id="audience" className="mt-24">
        <AudienceCards />
      </section>
      
      {/* Services Cards */}
      <section id="solutions">
        <ServiceCards />
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
