import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Sparkles } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Tanya Sen",
      location: "Mumbai, MH",
      review: "Absolutely obsessed with my terracotta Ganesha dashboard charm! The details are unbelievably precise, and the gold highlights glow so beautifully when sunlight hits it during my drives. Feels incredibly premium!",
      rating: 5,
      role: "Verified Art Collector"
    },
    {
      id: 2,
      name: "Rishi Raj",
      location: "Bangalore, KA",
      review: "Ordered custom clay keyrings for my design team as a year-end gift. Jharkhand Chitra took my brand emblem and hand-sculpted it with such gorgeous traditional tassels. Highly recommend WhatsApp custom commissions!",
      rating: 5,
      role: "Tech Lead & Designer"
    },
    {
      id: 3,
      name: "Prisha Mahato",
      location: "Ranchi, JH",
      review: "The drop earrings are so incredibly lightweight! I was worried they would feel heavy since they're made of clay, but they feel like feathers. The hand-painted Sohrai patterns add such an elegant ethnic touch to my modern outfits.",
      rating: 5,
      role: "Sohrai Art Enthusiast"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide trigger
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <section id="testimonials" className="py-24 bg-brand-cream/50 dark:bg-brand-cocoa/30 relative overflow-hidden">
      
      {/* Light glow accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-bronze/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-2 text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <Sparkles size={12} />
            <span>Customer Love</span>
          </div>
          
          <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-brand-mocha dark:text-brand-cream">
            Chitra Stories
          </h2>
        </div>

        {/* Sliding Card Frame */}
        <div className="relative min-h-[320px] sm:min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full rounded-[2.5rem] p-8 sm:p-12 glass-panel border border-brand-gold/15 relative overflow-hidden"
            >
              {/* Giant quote sign background icon */}
              <Quote className="absolute top-6 left-6 text-brand-gold/5 dark:text-brand-gold/[0.03] w-28 h-28 stroke-[1]" />
              
              <div className="flex flex-col items-center">
                {/* 5 Stars display */}
                <div className="flex items-center space-x-1 mb-5">
                  {Array.from({ length: reviews[currentIndex].rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-brand-gold text-brand-gold animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-serif text-lg sm:text-2xl text-brand-mocha dark:text-brand-cream leading-relaxed font-light italic max-w-2xl">
                  "{reviews[currentIndex].review}"
                </p>

                {/* Separator line */}
                <div className="w-12 h-[1px] bg-brand-gold/30 mt-6 mb-4" />

                {/* Author Name */}
                <h4 className="font-sans text-sm font-bold text-brand-mocha dark:text-brand-cream uppercase tracking-widest">
                  {reviews[currentIndex].name}
                </h4>
                
                {/* Role / Location info */}
                <p className="text-[10px] uppercase tracking-wider text-brand-gold mt-1 font-semibold">
                  {reviews[currentIndex].role} — {reviews[currentIndex].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel indicators dot controls */}
        <div className="flex justify-center space-x-2.5 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'w-8 bg-brand-mocha dark:bg-brand-gold' : 'w-2 bg-brand-mocha/20 dark:bg-brand-cream/20'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
