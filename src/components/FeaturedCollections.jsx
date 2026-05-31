import React from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function FeaturedCollections() {
  const { setSelectedCategory, siteImages } = useProducts();

  const collections = [
    {
      name: 'Clay Charms',
      image: siteImages.category_clay_charms,
      count: 'Aesthetic Handmoulds',
      glow: 'rgba(212, 163, 115, 0.25)',
      desc: 'Dainty bakes curated for bags & items.'
    },
    {
      name: 'Keyrings',
      image: siteImages.category_keyrings,
      count: 'Chic Tassels',
      glow: 'rgba(226, 149, 120, 0.25)',
      desc: 'Tribal Mandala wood & clay lines.'
    },
    {
      name: 'Dashboard Decor',
      image: siteImages.category_dashboard_decor,
      count: 'Miniature Sovereign',
      glow: 'rgba(212, 163, 115, 0.25)',
      desc: 'Stunning premium earthen pot decor.'
    },
    {
      name: 'Earrings',
      image: siteImages.category_earrings,
      count: 'Lightweight Drops',
      glow: 'rgba(226, 149, 120, 0.25)',
      desc: 'Traditional clay drops matching modern wear.'
    },
    {
      name: 'Custom Pins',
      image: siteImages.category_custom_pins,
      count: 'Tribal Sohrai',
      glow: 'rgba(212, 163, 115, 0.25)',
      desc: 'Hand-painted metal backed clay accents.'
    },
    {
      name: 'Car & Bike Flags',
      image: siteImages.category_flags,
      count: 'National Heritage',
      glow: 'rgba(226, 149, 120, 0.25)',
      desc: 'Elegant terracotta mounted bike indicators.'
    }
  ];

  const handleSelectCollection = (name) => {
    setSelectedCategory(name);
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="collections" className="py-24 bg-brand-cream/50 dark:bg-brand-cocoa/30 relative">
      {/* Visual Accent backgrounds */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-bronze/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-2 text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold mb-3"
          >
            <Sparkles size={14} />
            <span>Aesthetic Categories</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-brand-mocha dark:text-brand-cream"
          >
            Featured Collections
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-brand-mocha/60 dark:text-brand-cream/60 max-w-xl mx-auto font-light font-sans"
          >
            Discover meticulously handcrafted clay artistry designed to embed premium ethnic grace and creative soul into everyday articles.
          </motion.p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => handleSelectCollection(item.name)}
              className="group cursor-pointer rounded-[2.5rem] overflow-hidden glass-panel border border-brand-mocha/5 dark:border-brand-latte/5 p-4 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{
                '--tw-shadow': `0 20px 40px -15px ${item.glow}`
              }}
            >
              {/* Media Preview Box */}
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-5 border border-brand-gold/10">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter saturate-[0.95] dark:opacity-90"
                />
                
                {/* Soft warm vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Micro CTA overlay on hover */}
                <div className="absolute bottom-4 right-4 bg-brand-cream/90 dark:bg-brand-espresso/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center space-x-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 border border-brand-gold/20 shadow-md">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-brand-mocha dark:text-brand-cream">
                    Explore
                  </span>
                  <ArrowRight size={10} className="text-brand-gold" />
                </div>
              </div>

              {/* Text Card Info */}
              <div className="px-2 pb-2">
                <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-brand-gold">
                  {item.count}
                </span>
                
                <h3 className="font-serif text-2xl text-brand-mocha dark:text-brand-cream font-medium tracking-wide mt-1 group-hover:text-brand-gold transition-colors duration-300">
                  {item.name}
                </h3>
                
                <p className="text-xs text-brand-mocha/60 dark:text-brand-cream/60 mt-1 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
