import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Instagram, Compass, Sparkles } from 'lucide-react';

export default function ContactSection() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '917294866490';
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Jharkhand Chitra! ✨ I'd love to chat about ordering some clay charms / custom dashboard designs.")}`;
  const instaLink = "https://instagram.com/jharkhand._chitra";

  return (
    <section id="contact" className="py-24 bg-brand-cream/50 dark:bg-brand-cocoa/30 relative overflow-hidden">
      
      {/* Light glow effects */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-brand-bronze/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center justify-center space-x-2 text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <Sparkles size={12} />
            <span>Connect & Order</span>
          </div>
          
          <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-brand-mocha dark:text-brand-cream">
            Commission A Craft
          </h2>
          
          <p className="mt-4 text-sm text-brand-mocha/60 dark:text-brand-cream/60 max-w-md mx-auto font-light leading-relaxed">
            We operate fully through personal channels to ensure each client gets individual custom craft advice.
          </p>
        </div>

        {/* Contact glowing blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          
          {/* WhatsApp Card */}
          <motion.a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="group rounded-[2.5rem] p-8 glass-panel border border-brand-gold/15 flex flex-col items-center justify-between text-center relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:border-emerald-500/20"
          >
            {/* Glowing background */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex flex-col items-center">
              {/* WhatsApp Icon wrapper with gold pulse border */}
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-emerald-500/10">
                <MessageSquare size={26} className="fill-emerald-500/10" />
              </div>

              <h3 className="font-serif text-2xl text-brand-mocha dark:text-brand-cream font-medium tracking-wide">
                Direct WhatsApp
              </h3>
              
              <p className="text-xs text-brand-mocha/60 dark:text-brand-cream/60 mt-2 font-light max-w-xs leading-relaxed">
                Connect with our artisan directly. Order catalogue designs or negotiate bulk orders instantly.
              </p>
            </div>

            <div className="mt-8 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white w-full rounded-2xl text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-emerald-500/20 transition-all duration-300">
              Chat on WhatsApp
            </div>
          </motion.a>

          {/* Instagram DM Card */}
          <motion.a
            href={instaLink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group rounded-[2.5rem] p-8 glass-panel border border-brand-gold/15 flex flex-col items-center justify-between text-center relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:border-brand-gold/30"
          >
            {/* Glowing background */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex flex-col items-center">
              {/* Instagram Icon wrapper */}
              <div className="w-16 h-16 rounded-3xl bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-brand-gold/10">
                <Instagram size={26} />
              </div>

              <h3 className="font-serif text-2xl text-brand-mocha dark:text-brand-cream font-medium tracking-wide">
                Instagram DMs
              </h3>
              
              <p className="text-xs text-brand-mocha/60 dark:text-brand-cream/60 mt-2 font-light max-w-xs leading-relaxed">
                Send us designs and references. We coordinate closely on customizations and details!
              </p>
            </div>

            <div className="mt-8 px-6 py-3.5 bg-brand-mocha dark:bg-brand-gold text-brand-cream dark:text-brand-mocha w-full rounded-2xl text-xs uppercase tracking-widest font-bold shadow-md transition-all duration-300">
              Message on Instagram
            </div>
          </motion.a>

        </div>

        {/* Dispatch details grid */}
        <div className="mt-16 text-center max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-2 text-brand-gold/80 text-[10px] uppercase tracking-widest font-bold">
            <Compass size={12} />
            <span>Pan-India Shipping Available</span>
          </div>
          <p className="text-[11px] text-brand-mocha/50 dark:text-brand-cream/50 mt-1 font-light">
            All crafts are packed in secure multi-layered shockproof bubble wrapping to avoid damages in transit.
          </p>
        </div>
      </div>
    </section>
  );
}
