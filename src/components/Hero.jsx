import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export default function Hero() {
  const canvasRef = useRef(null);
  const { siteImages } = useProducts();

  // Floating gold dust particle effect on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.4 - 0.05; // float upwards
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reset if particles go off-screen
        if (this.y < 0) this.y = canvas.height;
        if (this.x < 0 || this.x > canvas.width) this.x = Math.random() * canvas.width;
      }
      draw() {
        ctx.fillStyle = `rgba(212, 163, 115, ${this.opacity})`; // brand gold tint
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleCount = 60;
    const particles = Array.from({ length: particleCount }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleScrollToProducts = (e) => {
    e.preventDefault();
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const isVideo = siteImages.hero_video?.includes('.mp4') || siteImages.hero_video?.includes('.webm') || siteImages.hero_video?.includes('video') || siteImages.hero_video?.startsWith('data:video/');

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-brand-cream dark:bg-brand-espresso">
      
      {/* 1. Cinematic Autoplay Video Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Aesthetic warm soft-blur cover overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/50 via-brand-cream/70 to-brand-cream dark:from-brand-espresso/40 dark:via-brand-espresso/60 dark:to-brand-espresso z-10" />
        <div className="absolute inset-0 bg-brand-mocha/5 dark:bg-brand-cream/[0.02] backdrop-blur-xs z-10" />
        
        {/* HTML5 autoloop video or fallback image */}
        {isVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={siteImages.hero_fallback_image}
            className="w-full h-full object-cover scale-105 select-none pointer-events-none opacity-85 dark:opacity-60 saturate-[0.85] contrast-[0.95]"
          >
            <source src={siteImages.hero_video} type="video/mp4" />
            Your browser does not support HTML5 video loops.
          </video>
        ) : (
          <img
            src={siteImages.hero_video || siteImages.hero_fallback_image}
            alt="Artisanal craft backdrop"
            className="w-full h-full object-cover scale-105 select-none pointer-events-none opacity-85 dark:opacity-60 saturate-[0.85] contrast-[0.95]"
          />
        )}
      </div>

      {/* 2. Interactive Gold Canvas Particles */}
      <canvas ref={canvasRef} className="particle-canvas" />

      {/* 3. Luxury Radial Lighting Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none z-10 select-none animate-pulse-glow" />

      {/* 4. Elegant Text Reveal Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Micro-heading badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6 px-4 py-1.5 glass-panel rounded-full text-[10px] tracking-[0.25em] font-semibold uppercase text-brand-mocha dark:text-brand-cream border border-brand-gold/20 flex items-center space-x-2"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
          <span>Handcrafted Luxury Studio</span>
        </motion.div>

        {/* Main Header */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight font-medium text-brand-mocha dark:text-brand-cream leading-none"
        >
          Handmade With <br />
          <span className="italic font-light text-luxury-gradient">Creativity</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
          className="mt-6 text-sm sm:text-base lg:text-lg max-w-2xl text-brand-mocha/70 dark:text-brand-cream/70 leading-relaxed font-light font-sans"
        >
          Handcrafted clay charms, keyrings, dashboard decor, and aesthetic accessories designed to add creativity and personality to everyday life.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
        >
          {/* Explore Button */}
          <a
            href="#products"
            onClick={handleScrollToProducts}
            className="w-full sm:w-auto px-8 py-4 bg-brand-mocha dark:bg-brand-gold text-brand-cream dark:text-brand-mocha font-semibold text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center space-x-2 border border-transparent shadow-lg dark:shadow-brand-gold/10 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <span>Explore Collection</span>
            <ArrowRight size={14} />
          </a>

          {/* Instagram Order Button */}
          <a
            href="https://instagram.com/jharkhand._chitra"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 glass-panel text-brand-mocha dark:text-brand-cream font-semibold text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center space-x-2 border border-brand-gold/20 hover:bg-brand-cream/80 dark:hover:bg-brand-espresso/80 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <Instagram size={14} className="text-brand-gold" />
            <span>DM To Order</span>
          </a>
        </motion.div>
      </div>

      {/* Decorative Bottom Scroll Down Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-brand-mocha/40 dark:text-brand-cream/40 mb-2">Scroll</span>
        <div className="w-[1.5px] h-8 bg-gradient-to-b from-brand-gold to-transparent" />
      </motion.div>
    </section>
  );
}
