import React, { useEffect } from 'react';
import ScrollProgressBar from '../components/ScrollProgressBar';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedCollections from '../components/FeaturedCollections';
import ProductShowcase from '../components/ProductShowcase';
import CustomOrders from '../components/CustomOrders';
import AboutBrand from '../components/AboutBrand';
import Testimonials from '../components/Testimonials';
import InstagramGallery from '../components/InstagramGallery';
import ContactSection from '../components/ContactSection';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import Footer from '../components/Footer';

export default function Home({ onNavigateAdmin }) {
  
  // Set elegant document title on mount
  useEffect(() => {
    document.title = "Jharkhand Chitra — Premium Handmade Crafts & Clay Artistry";
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-brand-cream dark:bg-brand-espresso text-brand-mocha dark:text-brand-cream font-sans">
      {/* 1. Sleek Scroll Progress indicator at the very top */}
      <ScrollProgressBar />

      {/* 2. Glassmorphism responsive Navbar */}
      <Navbar onNavigateAdmin={onNavigateAdmin} />

      {/* 3. Cinematic loop Hero section */}
      <Hero />

      {/* 4. Category collection cards */}
      <FeaturedCollections />

      {/* 5. Swipeable product reel showcase */}
      <ProductShowcase />

      {/* 6. Special custom orders commission banner */}
      <CustomOrders />

      {/* 7. Warm artisanal brand history story */}
      <AboutBrand />

      {/* 8. Slidewise customer testimonials */}
      <Testimonials />

      {/* 9. Masonry Instagram grid profile CTA */}
      <InstagramGallery />

      {/* 10. Direct social channel glowing contact boxes */}
      <ContactSection />

      {/* 11. Custom green pulsing floating chat action */}
      <FloatingWhatsApp />

      {/* 12. Minimal luxury credits */}
      <Footer />
    </div>
  );
}
