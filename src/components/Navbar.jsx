import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductContext';
import { Menu, X, Sun, Moon, Heart, Search, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onNavigateAdmin }) {
  const { theme, toggleTheme } = useTheme();
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
  const { searchQuery, setSearchQuery } = useProducts();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Monitor scroll for header background transitions
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Collections', href: '#collections' },
    { name: 'Products', href: '#products' },
    { name: 'Custom Orders', href: '#custom-orders' },
    { name: 'About Brand', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  // Send consolidated WhatsApp wishlist
  const handleWishlistCheckout = () => {
    const number = import.meta.env.VITE_WHATSAPP_NUMBER || '917294866490';
    let text = "Hi Jharkhand Chitra! ✨ I'd love to place an order for the following items in my wishlist:\n\n";
    wishlist.forEach((item, index) => {
      const finalPrice = item.discount > 0 ? Math.round(item.price * (1 - item.discount / 100)) : item.price;
      text += `${index + 1}. ${item.name} - ₹${finalPrice}\n`;
    });
    text += `\nPlease let me know custom designs & delivery timelines!`;
    const waLink = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
    window.open(waLink, '_blank');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'py-3 bg-brand-cream/80 dark:bg-brand-espresso/80 backdrop-blur-lg border-b border-brand-mocha/5 dark:border-brand-latte/5 shadow-sm' 
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo - Animated text reveal styling */}
          <a href="#home" className="flex items-center space-x-2 group">
            <span className="text-xl sm:text-2xl font-serif font-bold tracking-widest text-brand-mocha dark:text-brand-cream group-hover:text-brand-gold transition-colors duration-300">
              Jharkhand Chitra
            </span>
          </a>

          {/* Desktop Navigation Link items */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-widest font-medium text-brand-mocha/70 dark:text-brand-cream/70 hover:text-brand-gold dark:hover:text-brand-gold transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            {/* Direct Admin navigation hook */}
            <button
              onClick={onNavigateAdmin}
              className="text-xs uppercase tracking-widest font-medium text-brand-mocha/70 dark:text-brand-cream/70 hover:text-brand-gold dark:hover:text-brand-gold transition-colors duration-200"
            >
              Portal
            </button>
          </nav>

          {/* Interactive Icon actions */}
          <div className="flex items-center space-x-4">
            {/* Search toggler */}
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (!isSearchOpen) {
                  // scroll down to product listing
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="p-2 text-brand-mocha/80 dark:text-brand-cream/80 hover:text-brand-gold transition-colors duration-200"
              aria-label="Search items"
            >
              <Search size={20} />
            </button>

            {/* Dark/Light mode selector */}
            <button
              onClick={toggleTheme}
              className="p-2 text-brand-mocha/80 dark:text-brand-cream/80 hover:text-brand-gold transition-colors duration-200"
              aria-label="Change Color Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Wishlist triggers */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-brand-mocha/80 dark:text-brand-cream/80 hover:text-brand-gold transition-colors duration-200 relative"
              aria-label="View Wishlist"
            >
              <Heart size={20} className={wishlist.length > 0 ? "fill-brand-gold text-brand-gold animate-pulse" : ""} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-mocha dark:bg-brand-gold text-brand-cream dark:text-brand-mocha text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden text-brand-mocha/80 dark:text-brand-cream/80 hover:text-brand-gold transition-colors duration-200"
              aria-label="Toggle Navigation Panel"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Global Expandable Search input */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-brand-cream/95 dark:bg-brand-espresso/95 border-b border-brand-mocha/5 dark:border-brand-latte/5 backdrop-blur-md overflow-hidden"
            >
              <div className="max-w-3xl mx-auto px-4 py-4 flex items-center">
                <Search size={18} className="text-brand-mocha/40 dark:text-brand-cream/40 mr-3" />
                <input
                  type="text"
                  placeholder="Search clay charms, keyrings, dashboard decor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-brand-mocha dark:text-brand-cream placeholder-brand-mocha/40 dark:placeholder-brand-cream/40 text-sm focus:ring-0 outline-none"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1.5 text-xs text-brand-mocha/60 dark:text-brand-cream/60 hover:text-brand-mocha dark:hover:text-brand-cream"
                  >
                    Clear
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MOBILE FULLSCREEN LAYER DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 pt-24 bg-brand-cream dark:bg-brand-espresso flex flex-col justify-between px-6 pb-12"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, index) => (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-3xl font-medium tracking-wide text-brand-mocha dark:text-brand-cream hover:text-brand-gold dark:hover:text-brand-gold transition-colors duration-200"
                >
                  {link.name}
                </motion.a>
              ))}
              {/* Portal navigation in mobile */}
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigateAdmin();
                }}
                className="font-serif text-3xl font-medium tracking-wide text-left text-brand-mocha dark:text-brand-cream hover:text-brand-gold dark:hover:text-brand-gold transition-colors duration-200"
              >
                Owner Portal
              </motion.button>
            </div>
            
            <div className="border-t border-brand-mocha/10 dark:border-brand-cream/10 pt-6 text-center">
              <p className="text-xs uppercase tracking-widest text-brand-gold font-medium mb-1">
                Jharkhand Chitra
              </p>
              <p className="text-[10px] text-brand-mocha/50 dark:text-brand-cream/50">
                Premium Handcrafted Artistry &copy; 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WISHLIST SLIDEOUT SIDEBAR */}
      <AnimatePresence>
        {isWishlistOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishlistOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />
            {/* Sidebar drawer content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-brand-cream dark:bg-brand-cocoa shadow-2xl p-6 flex flex-col justify-between border-l border-brand-gold/10"
            >
              <div>
                <div className="flex items-center justify-between border-b border-brand-mocha/10 dark:border-brand-cream/10 pb-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Heart size={20} className="fill-brand-gold text-brand-gold" />
                    <h2 className="font-serif text-2xl text-brand-mocha dark:text-brand-cream font-medium tracking-wide">
                      My Wishlist
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsWishlistOpen(false)}
                    className="p-1 hover:text-brand-gold text-brand-mocha/80 dark:text-brand-cream/80"
                  >
                    <X size={20} />
                  </button>
                </div>

                {wishlist.length === 0 ? (
                  <div className="text-center py-20">
                    <ShoppingBag size={48} className="mx-auto text-brand-mocha/20 dark:text-brand-cream/20 mb-4 stroke-[1.25]" />
                    <p className="font-serif text-lg text-brand-mocha/70 dark:text-brand-cream/70 italic">
                      Your wishlist is empty
                    </p>
                    <p className="text-xs text-brand-mocha/50 dark:text-brand-cream/50 mt-1">
                      Double-tap or click the heart icon on crafts to add them here!
                    </p>
                    <button
                      onClick={() => {
                        setIsWishlistOpen(false);
                        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="mt-6 text-xs uppercase tracking-widest font-semibold text-brand-gold border-b border-brand-gold/50 hover:border-brand-gold pb-1 transition-all duration-300"
                    >
                      Browse Collection
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar pr-1">
                    {wishlist.map((item) => {
                      const finalPrice = item.discount > 0 ? Math.round(item.price * (1 - item.discount / 100)) : item.price;
                      return (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 p-3 bg-brand-cream/40 dark:bg-brand-espresso/30 rounded-2xl border border-brand-mocha/5 dark:border-brand-latte/5"
                        >
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover border border-brand-gold/10"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-serif text-base text-brand-mocha dark:text-brand-cream font-medium truncate">
                              {item.name}
                            </h3>
                            <p className="text-[10px] uppercase text-brand-gold tracking-widest">
                              {item.category}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-sm font-semibold text-brand-mocha dark:text-brand-cream">
                                ₹{finalPrice}
                              </span>
                              {item.discount > 0 && (
                                <span className="text-xs line-through text-brand-mocha/40 dark:text-brand-cream/40">
                                  ₹{item.price}
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => toggleWishlist(item)}
                            className="p-2 text-brand-mocha/40 hover:text-red-500 transition-colors duration-200"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {wishlist.length > 0 && (
                <div className="border-t border-brand-mocha/10 dark:border-brand-cream/10 pt-6 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={clearWishlist}
                      className="flex items-center text-xs tracking-wider text-brand-mocha/60 dark:text-brand-cream/60 hover:text-red-500 transition-colors duration-200 font-medium"
                    >
                      <Trash2 size={14} className="mr-1.5" />
                      Clear All
                    </button>
                    <span className="text-xs text-brand-mocha/50 dark:text-brand-cream/50">
                      {wishlist.length} item{wishlist.length > 1 ? 's' : ''} saved
                    </span>
                  </div>

                  <button
                    onClick={handleWishlistCheckout}
                    className="w-full py-4 bg-brand-mocha dark:bg-brand-gold text-brand-cream dark:text-brand-mocha rounded-2xl flex items-center justify-center space-x-2 text-sm uppercase tracking-widest font-semibold hover:shadow-lg dark:hover:shadow-brand-gold/10 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
                  >
                    <span>Checkout Wishlist</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
