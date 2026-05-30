import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Sparkles, Wand2 } from 'lucide-react';

export default function CustomOrders() {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || '917294866490';
  const msg = encodeURIComponent("Hi Jharkhand Chitra! ✨ I'm interested in commissioning a custom clay ornament / dashboard decor. I'd love to share my design references!");
  const waLink = `https://wa.me/${number}?text=${msg}`;

  return (
    <section id="custom-orders" className="py-20 relative overflow-hidden bg-brand-cream dark:bg-brand-espresso">
      
      {/* Light glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-brand-bronze/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-[3rem] p-8 sm:p-14 glass-panel border border-brand-gold/20 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden"
        >
          {/* Internal golden highlights */}
          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-brand-gold/15 blur-[60px] pointer-events-none" />
          
          <div className="flex-1 text-center lg:text-left">
            {/* Header Badge */}
            <div className="inline-flex items-center space-x-2 text-brand-gold text-xs uppercase tracking-[0.25em] font-bold mb-4 bg-brand-cream/80 dark:bg-brand-cocoa/80 border border-brand-gold/10 px-4 py-1.5 rounded-full shadow-sm">
              <Sparkles size={12} className="animate-spin-slow" />
              <span>Tailored For You</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-brand-mocha dark:text-brand-cream leading-tight">
              ✨ Custom Orders Open
            </h2>
            
            <p className="mt-4 text-sm sm:text-base text-brand-mocha/70 dark:text-brand-cream/70 leading-relaxed font-light font-sans max-w-xl">
              Do you have a specific dream keychain, miniature dashboard charm, or custom clay gift in mind? We love co-creating! Share your sketches, color references, or design details and watch us sculpt your imagination into reality.
            </p>

            {/* Custom ordering steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-brand-mocha/5 dark:border-brand-latte/5 text-left">
              <div className="flex items-start space-x-3">
                <span className="text-xs font-serif font-bold text-brand-gold bg-brand-gold/10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest font-bold text-brand-mocha dark:text-brand-cream">Send Idea</h4>
                  <p className="text-[10px] text-brand-mocha/50 dark:text-brand-cream/50">DMs, references & dimensions</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-xs font-serif font-bold text-brand-gold bg-brand-gold/10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest font-bold text-brand-mocha dark:text-brand-cream">Clay Sculpt</h4>
                  <p className="text-[10px] text-brand-mocha/50 dark:text-brand-cream/50">Moulding, baking & resin sealing</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-xs font-serif font-bold text-brand-gold bg-brand-gold/10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest font-bold text-brand-mocha dark:text-brand-cream">Safe Delivery</h4>
                  <p className="text-[10px] text-brand-mocha/50 dark:text-brand-cream/50">Insured bubble packing with love</p>
                </div>
              </div>
            </div>
          </div>

          {/* Banner Button Column */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <motion.a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-5 bg-brand-mocha dark:bg-brand-gold text-brand-cream dark:text-brand-mocha font-bold text-xs uppercase tracking-widest rounded-2xl flex items-center space-x-2 border border-transparent shadow-xl dark:shadow-brand-gold/5"
            >
              <Wand2 size={16} />
              <span>DM Design Concept</span>
            </motion.a>
            <span className="text-[10px] text-brand-mocha/40 dark:text-brand-cream/40 mt-3 font-light">
              Avg. dispatch time: 4-6 days
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
