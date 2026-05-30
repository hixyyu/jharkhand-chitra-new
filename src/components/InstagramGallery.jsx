import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle, Play, Sparkles } from 'lucide-react';

export default function InstagramGallery() {
  const feed = [
    {
      id: 1,
      image: '/public/clay-charms.png',
      likes: '1,424',
      comments: '112',
      isReel: true
    },
    {
      id: 2,
      image: '/public/keyrings.png',
      likes: '890',
      comments: '64',
      isReel: false
    },
    {
      id: 3,
      image: '/public/dashboard-decor.png',
      likes: '2,105',
      comments: '189',
      isReel: true
    },
    {
      id: 4,
      image: '/public/earrings.png',
      likes: '1,201',
      comments: '78',
      isReel: false
    },
    {
      id: 5,
      image: '/public/custom-pins.png',
      likes: '960',
      comments: '53',
      isReel: true
    },
    {
      id: 6,
      image: '/public/flags.png',
      likes: '1,840',
      comments: '142',
      isReel: true
    }
  ];

  return (
    <section id="instagram" className="py-24 bg-brand-cream dark:bg-brand-espresso relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-2 text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold mb-3"
          >
            <Instagram size={14} />
            <span>Join Our Social Circle</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-brand-mocha dark:text-brand-cream"
          >
            The Insta-Vibe
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-xs sm:text-sm text-brand-mocha/60 dark:text-brand-cream/60 max-w-md mx-auto font-light font-sans"
          >
            Behind the scenes, quick tutorials, aesthetic clay moulding reels, and custom creations daily.
          </motion.p>

          {/* Social Username Link */}
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            href="https://instagram.com/jharkhand._chitra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-sm font-bold text-brand-gold hover:text-brand-mocha dark:hover:text-brand-cream tracking-wide transition-colors duration-200"
          >
            @jharkhand._chitra
          </motion.a>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {feed.map((post, index) => (
            <motion.a
              key={post.id}
              href="https://instagram.com/jharkhand._chitra"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="group relative aspect-square rounded-[2rem] overflow-hidden border border-brand-gold/10 shadow-sm block bg-brand-cream dark:bg-brand-cocoa"
            >
              {/* Image */}
              <img
                src={post.image}
                alt="Instagram clay craft upload"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Reels icon indicator */}
              {post.isReel && (
                <div className="absolute top-4 right-4 p-1.5 bg-black/40 rounded-full text-white backdrop-blur-xs shadow-md">
                  <Play size={10} className="fill-white" />
                </div>
              )}

              {/* Hover Translucent Glass Overlay Mask */}
              <div className="absolute inset-0 bg-brand-espresso/50 backdrop-blur-xs flex items-center justify-center space-x-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center space-x-1.5">
                  <Heart size={16} className="fill-white" />
                  <span className="text-xs font-bold font-sans">{post.likes}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MessageCircle size={16} className="fill-white" />
                  <span className="text-xs font-bold font-sans">{post.comments}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Premium Profile card CTA banner below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 max-w-xl mx-auto rounded-3xl p-6 glass-panel border border-brand-gold/15 flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center space-x-4">
            {/* Mock Profile pic */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-gold to-brand-bronze p-[2px] shadow-md flex-shrink-0">
              <div className="w-full h-full rounded-full bg-brand-cream dark:bg-brand-cocoa flex items-center justify-center text-lg font-serif">
                ✨
              </div>
            </div>

            <div>
              <h4 className="font-serif text-lg text-brand-mocha dark:text-brand-cream font-bold leading-tight flex items-center space-x-1">
                <span>Jharkhand Chitra</span>
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full inline-block animate-pulse" />
              </h4>
              <p className="text-[10px] text-brand-mocha/50 dark:text-brand-cream/50 uppercase tracking-widest mt-0.5">
                5.2K Followers — Clay Studio
              </p>
            </div>
          </div>

          <a
            href="https://instagram.com/jharkhand._chitra"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-brand-mocha dark:bg-brand-gold text-brand-cream dark:text-brand-mocha rounded-xl text-[10px] uppercase tracking-widest font-bold shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
          >
            Follow
          </a>
        </motion.div>

      </div>
    </section>
  );
}
