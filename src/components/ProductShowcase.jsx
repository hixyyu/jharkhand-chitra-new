import React, { useState, useRef } from 'react';
import { useProducts } from '../context/ProductContext';
import { useWishlist } from '../context/WishlistContext';
import { Heart, Search, MessageSquare, Sparkles, Filter, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductShowcase() {
  const { filteredProducts, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useProducts();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const carouselRef = useRef(null);

  const categories = ['All', 'Clay Charms', 'Keyrings', 'Dashboard Decor', 'Earrings', 'Custom Pins', 'Car & Bike Flags'];

  // Handle order via WhatsApp
  const handleWhatsAppOrder = (product, e) => {
    e.stopPropagation(); // prevent modal trigger
    const number = import.meta.env.VITE_WHATSAPP_NUMBER || '917294866490';
    const finalPrice = product.discount > 0 ? Math.round(product.price * (1 - product.discount / 100)) : product.price;
    const msg = `Hi Jharkhand Chitra! ✨ I'd love to order your "${product.name}" (${product.category}) for ₹${finalPrice}.\n\nPlease let me know custom possibilities and checkout steps!`;
    const waLink = `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
    window.open(waLink, '_blank');
  };

  // Scroll carousel controls
  const scroll = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="py-24 bg-brand-cream dark:bg-brand-espresso relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              <Sparkles size={14} />
              <span>Aesthetic Reel Showcase</span>
            </div>
            
            <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-brand-mocha dark:text-brand-cream">
              The Clay Artistry
            </h2>
            
            <p className="mt-3 text-sm text-brand-mocha/60 dark:text-brand-cream/60 max-w-md font-light">
              Swipe or slide through our exclusive premium catalog of handcrafted ornaments. Each piece is completely unique.
            </p>
          </div>

          {/* Search bar inside showcase */}
          <div className="mt-6 md:mt-0 flex items-center bg-brand-cream/50 dark:bg-brand-cocoa/40 border border-brand-mocha/10 dark:border-brand-latte/10 rounded-2xl px-4 py-2.5 w-full md:w-80 backdrop-blur-md">
            <Search size={16} className="text-brand-mocha/40 dark:text-brand-cream/40 mr-2" />
            <input
              type="text"
              placeholder="Search specific craft..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-xs text-brand-mocha dark:text-brand-cream placeholder-brand-mocha/40 dark:placeholder-brand-cream/40 focus:ring-0 outline-none"
            />
          </div>
        </div>

        {/* Categories Navigation Pills */}
        <div className="flex overflow-x-auto no-scrollbar space-x-3 mb-10 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-brand-mocha text-brand-cream dark:bg-brand-gold dark:text-brand-mocha shadow-md scale-[1.02]'
                  : 'bg-brand-sand/55 dark:bg-brand-cocoa/30 text-brand-mocha/70 dark:text-brand-cream/70 hover:bg-brand-beige border border-brand-mocha/5 dark:border-brand-latte/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel Wrapper */}
        <div className="relative group">
          {/* Horizontal reel scroll button controls */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-[-16px] top-1/2 -translate-y-1/2 z-10 p-3 bg-brand-cream dark:bg-brand-cocoa border border-brand-gold/15 rounded-full shadow-lg text-brand-mocha dark:text-brand-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-105 active:scale-95 hidden md:block"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={18} />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-[-16px] top-1/2 -translate-y-1/2 z-10 p-3 bg-brand-cream dark:bg-brand-cocoa border border-brand-gold/15 rounded-full shadow-lg text-brand-mocha dark:text-brand-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-105 active:scale-95 hidden md:block"
            aria-label="Next Slide"
          >
            <ChevronRight size={18} />
          </button>

          {/* Swipeable Reel horizontal reel grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-brand-sand/20 dark:bg-brand-cocoa/10 rounded-[3rem] border border-dashed border-brand-mocha/10 dark:border-brand-latte/10">
              <p className="font-serif text-2xl text-brand-mocha/50 dark:text-brand-cream/50 italic">
                No matching crafts found
              </p>
              <p className="text-xs text-brand-mocha/40 dark:text-brand-cream/40 mt-1">
                Try refining your filters or category choice!
              </p>
            </div>
          ) : (
            <div
              ref={carouselRef}
              className="flex overflow-x-auto no-scrollbar gap-8 py-4 snap-x snap-mandatory px-2 scroll-smooth"
            >
              {filteredProducts.map((product) => {
                const finalPrice = product.discount > 0 ? Math.round(product.price * (1 - product.discount / 100)) : product.price;
                const isLiked = isInWishlist(product.id);

                return (
                  <motion.div
                    key={product.id}
                    layoutId={`product-card-${product.id}`}
                    onClick={() => setSelectedProduct(product)}
                    className="flex-shrink-0 w-[290px] sm:w-[320px] snap-start cursor-pointer rounded-[2.5rem] overflow-hidden glass-panel border border-brand-mocha/5 dark:border-brand-latte/5 p-4 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    {/* Visual Media Header Box */}
                    <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-4 border border-brand-gold/10 bg-brand-cream dark:bg-brand-cocoa">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />

                      {/* Badges bar */}
                      <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        {product.featuredStatus && (
                          <span className="bg-brand-mocha/90 dark:bg-brand-gold/95 text-brand-cream dark:text-brand-mocha text-[8px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-xs">
                            Featured
                          </span>
                        )}
                        {product.customOrderOption && (
                          <span className="bg-brand-gold/90 dark:bg-brand-cream/90 text-brand-mocha dark:text-brand-mocha text-[8px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-xs">
                            Customise ✨
                          </span>
                        )}
                      </div>

                      {/* Heart Toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                        className="absolute top-4 right-4 p-2.5 rounded-full bg-brand-cream/80 dark:bg-brand-espresso/80 backdrop-blur-md text-brand-mocha dark:text-brand-cream hover:scale-110 active:scale-90 transition-all duration-300 border border-brand-gold/10 z-10"
                        aria-label="Toggle Wishlist"
                      >
                        <Heart size={16} className={isLiked ? "fill-brand-gold text-brand-gold" : "text-brand-mocha/70 dark:text-brand-cream/70"} />
                      </button>

                      {/* Discount ribbon */}
                      {product.discount > 0 && (
                        <div className="absolute bottom-4 left-4 bg-red-500/90 text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-md">
                          {product.discount}% OFF
                        </div>
                      )}

                      {/* Out of stock cover overlay */}
                      {product.stockStatus === 'out-of-stock' && (
                        <div className="absolute inset-0 bg-brand-espresso/60 backdrop-blur-xs flex items-center justify-center">
                          <span className="bg-brand-cream/95 text-brand-mocha text-xs uppercase tracking-widest font-bold px-5 py-2.5 rounded-full shadow-lg">
                            Sold Out
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Metadata Content */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-brand-gold">
                          {product.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${product.stockStatus === 'in-stock' ? 'bg-emerald-500 animate-pulse' : 'bg-red-400'}`} />
                          <span className="text-[9px] text-brand-mocha/50 dark:text-brand-cream/50 uppercase tracking-widest">
                            {product.stockStatus === 'in-stock' ? 'In Stock' : 'Ordered'}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-serif text-xl text-brand-mocha dark:text-brand-cream font-medium tracking-wide leading-tight truncate">
                        {product.name}
                      </h3>
                      
                      <p className="text-[11px] text-brand-mocha/60 dark:text-brand-cream/60 mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Pricing row & CTA button */}
                      <div className="flex items-center justify-between mt-5 pt-3 border-t border-brand-mocha/5 dark:border-brand-latte/5">
                        <div className="flex items-baseline space-x-2">
                          <span className="font-serif text-2xl font-semibold text-brand-mocha dark:text-brand-cream">
                            ₹{finalPrice}
                          </span>
                          {product.discount > 0 && (
                            <span className="text-xs line-through text-brand-mocha/40 dark:text-brand-cream/40">
                              ₹{product.price}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={(e) => handleWhatsAppOrder(product, e)}
                          className="px-4 py-2.5 bg-brand-mocha dark:bg-brand-gold text-brand-cream dark:text-brand-mocha rounded-xl flex items-center justify-center space-x-1.5 text-[10px] uppercase tracking-widest font-bold hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                        >
                          <MessageSquare size={12} className="fill-brand-cream dark:fill-brand-mocha stroke-none" />
                          <span>Buy DM</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* FULL DETAILED CARD MODAL DIALOG */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
            />
            {/* Centered Modal content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                layoutId={`product-card-${selectedProduct.id}`}
                className="w-full max-w-4xl bg-brand-cream dark:bg-brand-cocoa rounded-[2.5rem] overflow-hidden shadow-2xl p-6 relative border border-brand-gold/15 flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-brand-cream dark:bg-brand-espresso text-brand-mocha dark:text-brand-cream shadow-md border border-brand-gold/10 hover:scale-105 z-10"
                >
                  <X size={16} />
                </button>

                {/* Media Column */}
                <div className="w-full md:w-1/2 aspect-[4/5] rounded-[2rem] overflow-hidden border border-brand-gold/10 relative">
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedProduct.discount > 0 && (
                    <span className="absolute bottom-4 left-4 bg-red-500 text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-md">
                      {selectedProduct.discount}% OFF
                    </span>
                  )}
                </div>

                {/* Info Description Column */}
                <div className="w-full md:w-1/2 flex flex-col justify-between pt-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-gold">
                      {selectedProduct.category}
                    </span>
                    
                    <h2 className="font-serif text-3xl font-medium tracking-wide text-brand-mocha dark:text-brand-cream mt-1 mb-3">
                      {selectedProduct.name}
                    </h2>

                    <div className="flex items-center space-x-3 mb-5">
                      <div className="flex items-center space-x-1">
                        <span className={`w-2 h-2 rounded-full ${selectedProduct.stockStatus === 'in-stock' ? 'bg-emerald-500 animate-pulse' : 'bg-red-400'}`} />
                        <span className="text-xs uppercase tracking-widest font-semibold text-brand-mocha/70 dark:text-brand-cream/70">
                          {selectedProduct.stockStatus === 'in-stock' ? 'In Stock' : 'Ordered'}
                        </span>
                      </div>
                      
                      {selectedProduct.customOrderOption && (
                        <span className="text-xs uppercase tracking-widest font-bold text-brand-gold bg-brand-gold/5 px-2.5 py-1 rounded-full border border-brand-gold/10">
                          ✨ Fully Customizable
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs uppercase tracking-widest text-brand-mocha/40 dark:text-brand-cream/40 mb-1">
                      Artisanal Narrative
                    </h4>
                    
                    <p className="text-sm text-brand-mocha/80 dark:text-brand-cream/80 leading-relaxed font-light font-sans mb-6">
                      {selectedProduct.description}
                    </p>

                    <div className="bg-brand-sand/40 dark:bg-brand-espresso/30 p-4 rounded-2xl border border-brand-mocha/5 dark:border-brand-latte/5">
                      <h4 className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold mb-1">
                        Handmade Quality Promise
                      </h4>
                      <p className="text-[11px] text-brand-mocha/60 dark:text-brand-cream/60 leading-normal">
                        Every ornament is sculpted in high-grade clay, slowly baked, treated with double-resin protection, and hand-finished with luxury pigment.
                      </p>
                    </div>
                  </div>

                  {/* CTA Footer row */}
                  <div className="mt-8 pt-4 border-t border-brand-mocha/10 dark:border-brand-cream/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-brand-mocha/40 dark:text-brand-cream/40 block">
                        Premium Price
                      </span>
                      <div className="flex items-baseline space-x-2">
                        <span className="font-serif text-3xl font-semibold text-brand-mocha dark:text-brand-cream">
                          ₹{selectedProduct.discount > 0 ? Math.round(selectedProduct.price * (1 - selectedProduct.discount / 100)) : selectedProduct.price}
                        </span>
                        {selectedProduct.discount > 0 && (
                          <span className="text-sm line-through text-brand-mocha/40 dark:text-brand-cream/40">
                            ₹{selectedProduct.price}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        handleWhatsAppOrder(selectedProduct, e);
                        setSelectedProduct(null);
                      }}
                      className="px-8 py-4 bg-brand-mocha dark:bg-brand-gold text-brand-cream dark:text-brand-mocha rounded-2xl flex items-center justify-center space-x-2 text-xs uppercase tracking-widest font-bold shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                    >
                      <MessageSquare size={14} className="fill-brand-cream dark:fill-brand-mocha stroke-none" />
                      <span>Order on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
