import React from 'react';
import { Instagram, MessageCircle, Heart, Shield } from 'lucide-react';

export default function Footer() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '917294866490';
  const waLink = `https://wa.me/${whatsappNumber}`;
  const instaLink = "https://instagram.com/jharkhand._chitra";

  return (
    <footer className="bg-brand-cream dark:bg-brand-espresso border-t border-brand-mocha/5 dark:border-brand-latte/5 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Brand branding text */}
        <div className="text-center md:text-left">
          <h3 className="font-serif text-2xl font-bold tracking-widest text-brand-mocha dark:text-brand-cream">
            Jharkhand Chitra
          </h3>
          <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-semibold mt-1">
            Premium Handcrafted Artistry
          </p>
        </div>

        {/* Center: Social links and links */}
        <div className="flex items-center space-x-6">
          <a
            href={instaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-brand-sand dark:bg-brand-cocoa text-brand-mocha dark:text-brand-cream hover:bg-brand-gold hover:text-brand-mocha transition-all duration-300 shadow-sm"
            aria-label="Instagram handle"
          >
            <Instagram size={16} />
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-brand-sand dark:bg-brand-cocoa text-brand-mocha dark:text-brand-cream hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-sm"
            aria-label="WhatsApp handle"
          >
            <MessageCircle size={16} />
          </a>
        </div>

        {/* Right Side: Copyright details */}
        <div className="text-center md:text-right">
          <p className="text-[10px] text-brand-mocha/50 dark:text-brand-cream/50 tracking-wider">
            &copy; 2026 Jharkhand Chitra. All rights reserved.
          </p>
          <div className="flex items-center justify-center md:justify-end space-x-1.5 text-[9px] text-brand-gold/60 mt-0.5 font-medium uppercase tracking-widest">
            <Shield size={10} />
            <span>Pure Earth clay guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
