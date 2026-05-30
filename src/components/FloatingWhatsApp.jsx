import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingWhatsApp() {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || '917294866490';
  const customMessage = encodeURIComponent("Hi Jharkhand Chitra! ✨ I absolute love your page and would love to inquire about ordering custom handcrafted clay accessories.");
  const waLink = `https://wa.me/${number}?text=${customMessage}`;

  return (
    <motion.a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-tr from-emerald-600 to-emerald-400 dark:from-emerald-700 dark:to-emerald-500 text-white rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.3)] dark:shadow-[0_10px_30px_rgba(16,185,129,0.15)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group border border-emerald-300/20"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
      aria-label="Order on WhatsApp"
    >
      {/* Decorative Outer Pulsing Glow */}
      <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-25 scale-125 group-hover:scale-150 transition-transform duration-500" />
      
      {/* Tooltip text revealed on hover */}
      <span className="absolute right-16 bg-brand-cream dark:bg-brand-cocoa text-brand-mocha dark:text-brand-cream border border-brand-gold/20 shadow-md rounded-xl text-xs py-1.5 px-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-medium">
        💬 Order Craft via WhatsApp
      </span>
      
      <MessageCircle size={26} className="relative z-10 transition-transform duration-300 group-hover:rotate-12" />
    </motion.a>
  );
}
