import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Compass, Sparkles } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export default function AboutBrand() {
  const { siteImages } = useProducts();

  return (
    <section id="about" className="py-24 bg-brand-cream/30 dark:bg-brand-cocoa/10 relative overflow-hidden">
      
      {/* Visual background details */}
      <div className="absolute top-1/3 right-[-100px] w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Visual Column: Aesthetic collage-style image layout */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            
            {/* Primary Large Image Frame */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-72 sm:w-96 aspect-[3/4] rounded-[3rem] overflow-hidden border border-brand-gold/15 shadow-2xl z-10"
            >
              <img
                src={siteImages.about_primary}
                alt="Artist Handcrafting Clay"
                className="w-full h-full object-cover filter saturate-[0.9] dark:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-mocha/30 to-transparent" />
            </motion.div>

            {/* Secondary Layer Image Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 30, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="absolute right-2 bottom-[-30px] w-48 sm:w-60 aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-brand-gold/20 shadow-xl hidden sm:block z-20"
            >
              <img
                src={siteImages.about_secondary}
                alt="Clay details close up"
                className="w-full h-full object-cover filter saturate-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-mocha/30 to-transparent" />
            </motion.div>

            {/* Interactive absolute badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute left-[-20px] bottom-6 z-25 p-5 glass-panel rounded-3xl border border-brand-gold/20 flex flex-col items-center shadow-lg pointer-events-none"
            >
              <span className="font-serif text-3xl font-bold text-brand-mocha dark:text-brand-cream">100%</span>
              <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">Soil Sculpted</span>
            </motion.div>
          </div>

          {/* Storyteller description column */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2 text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold mb-4"
            >
              <Sparkles size={12} />
              <span>Our Artisanal Narrative</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-brand-mocha dark:text-brand-cream leading-tight"
            >
              Baking Soul <br />
              Into Earthen <span className="italic font-light text-luxury-gradient">Artistry</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-sm sm:text-base text-brand-mocha/70 dark:text-brand-cream/70 font-light leading-relaxed font-sans"
            >
              Born in the heart of Jharkhand, a land renowned for its rich red soil and vibrant Sohrai tribal wall paintings, **Jharkhand Chitra** is a celebration of local legacy meeting modern chic accessories. 
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-sm text-brand-mocha/65 dark:text-brand-cream/65 font-light leading-relaxed font-sans"
            >
              Our founder began this journey with a block of soil, a tiny paint brush, and a burning desire to capture the elegant symmetry of ethnic tribal paintings in dainty everyday accessories. Every single key charm, dashboard miniature, and flag holder is hand-moulded, meticulously baked, detailed with specialized pigments, and wrapped in double-coat resin protective shields for lasting weather resistance.
            </motion.p>

            {/* Core Values pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-start space-x-3.5"
              >
                <div className="p-3 bg-brand-gold/10 rounded-2xl text-brand-gold flex-shrink-0">
                  <Compass size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-brand-mocha dark:text-brand-cream">
                    Heritage Preserved
                  </h4>
                  <p className="text-xs text-brand-mocha/60 dark:text-brand-cream/60 mt-1 font-light leading-snug">
                    Carrying ancestral tribal forms like Sohrai art into modern pocket accessories.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-start space-x-3.5"
              >
                <div className="p-3 bg-brand-gold/10 rounded-2xl text-brand-gold flex-shrink-0">
                  <Heart size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-brand-mocha dark:text-brand-cream">
                    Made With Love
                  </h4>
                  <p className="text-xs text-brand-mocha/60 dark:text-brand-cream/60 mt-1 font-light leading-snug">
                    Zero machines used. Fully hand-formed, hand-detailed, and packed by native hands.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
