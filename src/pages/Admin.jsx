import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { LogIn, LogOut, Plus, Edit2, Trash2, Home, Check, X, ShieldAlert, Sparkles, FileText, BarChart2, Package, Image, Settings, RefreshCw, UploadCloud, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const customizerSections = [
  {
    title: "Cinematic Hero Banner",
    desc: "Update the core landing video or display image.",
    fields: [
      { key: 'hero_video', label: 'Looping Backdrop Video / Image', desc: 'Looping background video (URL or .mp4) or cover image.' },
      { key: 'hero_fallback_image', label: 'Backdrop Fallback Image', desc: 'Display cover before video playback starts or if video fails to load.' }
    ]
  },
  {
    title: "Artisanal Narrative (About Us)",
    desc: "Customize the beautiful overlapping collage elements in the brand history block.",
    fields: [
      { key: 'about_primary', label: 'Narrative Primary Photo', desc: 'The large underlying history image block.' },
      { key: 'about_secondary', label: 'Narrative Detail Accent', desc: 'The smaller overlapping detail photo block.' }
    ]
  },
  {
    title: "Category Card Previews",
    desc: "Update the thumbnails shown in the 'Featured Collections' slider grid.",
    fields: [
      { key: 'category_clay_charms', label: 'Clay Charms Card', desc: 'Category card image for Clay Charms.' },
      { key: 'category_keyrings', label: 'Keyrings Card', desc: 'Category card image for Keyrings.' },
      { key: 'category_dashboard_decor', label: 'Dashboard Decor Card', desc: 'Category card image for Dashboard Decor.' },
      { key: 'category_earrings', label: 'Earrings Card', desc: 'Category card image for Earrings.' },
      { key: 'category_custom_pins', label: 'Custom Pins Card', desc: 'Category card image for Custom Pins.' },
      { key: 'category_flags', label: 'Car & Bike Flags Card', desc: 'Category card image for Car & Bike Flags.' }
    ]
  },
  {
    title: "Instagram Grid Vibe Showcase",
    desc: "Tailor the mock Instagram feed post images at the bottom page section.",
    fields: [
      { key: 'insta_post_1', label: 'Feed Post #1', desc: 'Mock grid item 1.' },
      { key: 'insta_post_2', label: 'Feed Post #2', desc: 'Mock grid item 2.' },
      { key: 'insta_post_3', label: 'Feed Post #3', desc: 'Mock grid item 3.' },
      { key: 'insta_post_4', label: 'Feed Post #4', desc: 'Mock grid item 4.' },
      { key: 'insta_post_5', label: 'Feed Post #5', desc: 'Mock grid item 5.' },
      { key: 'insta_post_6', label: 'Feed Post #6', desc: 'Mock grid item 6.' }
    ]
  }
];

export default function Admin({ onNavigateHome }) {
  const { currentUser, login, logout, loading: authLoading, isMock: authIsMock } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, uploadMedia, siteImages, updateSiteImages, defaultSiteImages } = useProducts();

  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'customizer'
  const [customizerImages, setCustomizerImages] = useState({});
  const [savingCustomizer, setSavingCustomizer] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);

  // Synchronize local customizer state with global site images
  useEffect(() => {
    if (siteImages) {
      setCustomizerImages(siteImages);
    }
  }, [siteImages]);

  // Login states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);

  // Form states (Add/Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Clay Charms');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('0');
  const [description, setDescription] = useState('');
  const [stockStatus, setStockStatus] = useState('in-stock');
  const [featuredStatus, setFeaturedStatus] = useState(false);
  const [customOrderOption, setCustomOrderOption] = useState(true);
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState('');
  const [submittingForm, setSubmittingForm] = useState(false);

  const categories = ['Clay Charms', 'Keyrings', 'Dashboard Decor', 'Earrings', 'Custom Pins', 'Car & Bike Flags'];

  // Handle Login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoadingLogin(true);
    try {
      await login(email, password);
    } catch (err) {
      setLoginError(err.message || "Authentication failed. Check credentials!");
    } finally {
      setLoadingLogin(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Customizer Event Handlers
  const handleCustomizerUrlChange = (key, value) => {
    setCustomizerImages((prev) => ({ ...prev, [key]: value }));
  };

  const handleCustomizerFileChange = async (key, file) => {
    if (!file) return;
    setUploadingField(key);
    try {
      const url = await uploadMedia(file, 'site');
      setCustomizerImages((prev) => ({ ...prev, [key]: url }));
    } catch (err) {
      console.error("Customizer upload failed:", err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingField(null);
    }
  };

  const handleSaveCustomizer = async () => {
    setSavingCustomizer(true);
    try {
      await updateSiteImages(customizerImages);
      alert("✨ Excellent! Your custom showcase assets were synchronized globally.");
    } catch (err) {
      console.error("Save customizations failed:", err);
      alert("Failed to save. Check your connection.");
    } finally {
      setSavingCustomizer(false);
    }
  };

  const handleResetCustomizer = async () => {
    if (window.confirm("Are you absolutely sure you want to discard all custom image files and reset the showcase to brand default files?")) {
      setSavingCustomizer(true);
      try {
        await updateSiteImages(defaultSiteImages);
        setCustomizerImages(defaultSiteImages);
        alert("🔄 Reset completed successfully!");
      } catch (err) {
        console.error("Reset failed:", err);
        alert("Failed to reset.");
      } finally {
        setSavingCustomizer(false);
      }
    }
  };

  // Open Add Form
  const openAddForm = () => {
    setEditingId(null);
    setName('');
    setCategory('Clay Charms');
    setPrice('');
    setDiscount('0');
    setDescription('');
    setStockStatus('in-stock');
    setFeaturedStatus(false);
    setCustomOrderOption(true);
    setMediaFile(null);
    setMediaUrl('');
    setIsFormOpen(true);
  };

  // Open Edit Form
  const openEditForm = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price.toString());
    setDiscount(product.discount.toString());
    setDescription(product.description);
    setStockStatus(product.stockStatus);
    setFeaturedStatus(product.featuredStatus);
    setCustomOrderOption(product.customOrderOption);
    setMediaFile(null);
    setMediaUrl(product.images[0]);
    setIsFormOpen(true);
  };

  // Handle Form submit (Add/Edit)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || (!mediaFile && !mediaUrl)) {
      alert("Please fill in Name, Price, and upload an Image!");
      return;
    }

    setSubmittingForm(true);
    try {
      let finalMediaUrl = mediaUrl;

      // Upload file if chosen
      if (mediaFile) {
        finalMediaUrl = await uploadMedia(mediaFile, 'products');
      }

      const productPayload = {
        name,
        category,
        price: Number(price),
        discount: Number(discount),
        description,
        stockStatus,
        featuredStatus,
        customOrderOption,
        images: [finalMediaUrl],
        video: ""
      };

      if (editingId) {
        await updateProduct(editingId, productPayload);
      } else {
        await addProduct(productPayload);
      }

      setIsFormOpen(false);
    } catch (err) {
      console.error("Form submit error:", err);
      alert("Failed to save product. Check permissions & networks.");
    } finally {
      setSubmittingForm(false);
    }
  };

  // Delete product action
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you absolutely sure you want to delete this handcrafted craft item from the catalog?")) {
      try {
        await deleteProduct(id);
      } catch (err) {
        alert("Failed to delete item.");
      }
    }
  };

  // Calculate quick stats
  const totalItems = products.length;
  const inStockItems = products.filter(p => p.stockStatus === 'in-stock').length;
  const featuredCount = products.filter(p => p.featuredStatus).length;
  const averagePrice = totalItems > 0 ? Math.round(products.reduce((acc, curr) => acc + curr.price, 0) / totalItems) : 0;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-brand-cream dark:bg-brand-espresso flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-brand-gold rounded-full border-t-transparent" />
      </div>
    );
  }

  // -------------------------------------------------------------
  // SECURE AUTHENTICATION SCREEN
  // -------------------------------------------------------------
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-brand-cream dark:bg-brand-espresso flex flex-col items-center justify-center p-4 relative overflow-hidden">
        
        {/* Glow Details */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Back home arrow */}
        <button
          onClick={onNavigateHome}
          className="absolute top-6 left-6 flex items-center space-x-2 text-xs uppercase tracking-widest text-brand-mocha/70 dark:text-brand-cream/70 hover:text-brand-gold transition-colors duration-200"
        >
          <Home size={14} />
          <span>Back to Site</span>
        </button>

        {/* Login Container Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-[2.5rem] p-8 sm:p-10 glass-panel border border-brand-gold/20 shadow-2xl relative"
        >
          <div className="text-center mb-8">
            <span className="text-3xl">🔑</span>
            <h1 className="font-serif text-3xl font-bold tracking-wide text-brand-mocha dark:text-brand-cream mt-3">
              Owner Portal
            </h1>
            <p className="text-xs uppercase tracking-widest text-brand-gold font-semibold mt-1">
              Jharkhand Chitra Studio
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-brand-mocha/60 dark:text-brand-cream/60 font-semibold block mb-2">
                Manager Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@chitra.com"
                className="w-full bg-brand-cream/40 dark:bg-brand-espresso/40 border border-brand-mocha/10 dark:border-brand-latte/10 rounded-2xl px-4 py-3 text-sm text-brand-mocha dark:text-brand-cream outline-none focus:border-brand-gold transition-colors duration-200"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-brand-mocha/60 dark:text-brand-cream/60 font-semibold block mb-2">
                Secret Passcode
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-brand-cream/40 dark:bg-brand-espresso/40 border border-brand-mocha/10 dark:border-brand-latte/10 rounded-2xl px-4 py-3 text-sm text-brand-mocha dark:text-brand-cream outline-none focus:border-brand-gold transition-colors duration-200"
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl flex items-center space-x-2">
                <ShieldAlert size={14} className="flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loadingLogin}
              className="w-full py-4 bg-brand-mocha dark:bg-brand-gold text-brand-cream dark:text-brand-mocha rounded-2xl text-xs uppercase tracking-widest font-bold shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center space-x-2"
            >
              {loadingLogin ? (
                <div className="animate-spin w-4 h-4 border-2 border-brand-cream dark:border-brand-mocha rounded-full border-t-transparent" />
              ) : (
                <>
                  <LogIn size={14} />
                  <span>Authenticate Portal</span>
                </>
              )}
            </button>
          </form>


        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // PRIMARY SECURE OWNER PORTAL DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-brand-cream dark:bg-brand-espresso text-brand-mocha dark:text-brand-cream p-4 sm:p-6 lg:p-8 font-sans">
      
      {/* Upper header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-brand-mocha/5 dark:border-brand-latte/5 pb-6 mb-8">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">✨</span>
            <h1 className="font-serif text-3xl font-bold tracking-wide">
              Manager Panel
            </h1>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-[9px] uppercase tracking-widest font-bold bg-brand-gold/15 text-brand-gold px-2.5 py-0.5 rounded-full">
              {authIsMock ? "Local Sandbox Sandbox" : "Live Firebase Firestore"}
            </span>
            <span className="text-xs text-brand-mocha/50 dark:text-brand-cream/50">
              Admin: {currentUser.email}
            </span>
          </div>
        </div>

        {/* Global actions */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onNavigateHome}
            className="flex items-center space-x-2 px-5 py-3 glass-panel border border-brand-mocha/10 rounded-2xl text-xs uppercase tracking-widest font-bold hover:bg-brand-cream dark:hover:bg-brand-cocoa transition-all duration-300"
          >
            <Home size={14} />
            <span>Visit Site</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-5 py-3 bg-red-500 text-white rounded-2xl text-xs uppercase tracking-widest font-bold hover:bg-red-600 transition-all duration-300 shadow-md"
          >
            <LogOut size={14} />
            <span>Lock</span>
          </button>
        </div>
      </div>

      {/* Dynamic Tab Switcher */}
      <div className="max-w-7xl mx-auto flex items-center space-x-4 mb-8 bg-brand-cream/40 dark:bg-brand-cocoa/30 p-1.5 rounded-2xl border border-brand-mocha/5 w-max">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
            activeTab === 'catalog'
              ? 'bg-brand-mocha dark:bg-brand-gold text-brand-cream dark:text-brand-mocha shadow-md'
              : 'text-brand-mocha/65 dark:text-brand-cream/65 hover:bg-brand-sand/50 dark:hover:bg-brand-espresso/50'
          }`}
        >
          <Package size={14} />
          <span>Product Catalog</span>
        </button>
        <button
          onClick={() => setActiveTab('customizer')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
            activeTab === 'customizer'
              ? 'bg-brand-mocha dark:bg-brand-gold text-brand-cream dark:text-brand-mocha shadow-md'
              : 'text-brand-mocha/65 dark:text-brand-cream/65 hover:bg-brand-sand/50 dark:hover:bg-brand-espresso/50'
          }`}
        >
          <Settings size={14} />
          <span>Website Customizer</span>
        </button>
      </div>

      {activeTab === 'catalog' ? (
        <>
          {/* Metrics Row */}
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        
        <div className="glass-panel p-5 rounded-3xl border border-brand-mocha/5 dark:border-brand-latte/5 flex items-center space-x-4">
          <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-2xl">
            <Package size={20} />
          </div>
          <div>
            <span className="text-2xl font-bold block leading-none">{totalItems}</span>
            <span className="text-[10px] uppercase tracking-widest text-brand-mocha/50 dark:text-brand-cream/50 font-semibold mt-1 block">Total Ornaments</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-brand-mocha/5 dark:border-brand-latte/5 flex items-center space-x-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
            <Check size={20} />
          </div>
          <div>
            <span className="text-2xl font-bold block leading-none">{inStockItems}</span>
            <span className="text-[10px] uppercase tracking-widest text-brand-mocha/50 dark:text-brand-cream/50 font-semibold mt-1 block">In Stock</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-brand-mocha/5 dark:border-brand-latte/5 flex items-center space-x-4">
          <div className="p-3 bg-brand-mocha/10 dark:bg-brand-cream/10 text-brand-mocha dark:text-brand-cream rounded-2xl">
            <Sparkles size={20} />
          </div>
          <div>
            <span className="text-2xl font-bold block leading-none">{featuredCount}</span>
            <span className="text-[10px] uppercase tracking-widest text-brand-mocha/50 dark:text-brand-cream/50 font-semibold mt-1 block">Featured Items</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-brand-mocha/5 dark:border-brand-latte/5 flex items-center space-x-4">
          <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-2xl">
            <BarChart2 size={20} />
          </div>
          <div>
            <span className="text-2xl font-bold block leading-none">₹{averagePrice}</span>
            <span className="text-[10px] uppercase tracking-widest text-brand-mocha/50 dark:text-brand-cream/50 font-semibold mt-1 block">Average Pricing</span>
          </div>
        </div>

      </div>

      {/* Primary Catalog Container */}
      <div className="max-w-7xl mx-auto glass-panel border border-brand-mocha/5 dark:border-brand-latte/5 rounded-[2.5rem] p-6 sm:p-8">
        
        {/* Catalog Table Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-mocha dark:text-brand-cream">
              Product Catalog
            </h2>
            <p className="text-xs text-brand-mocha/50 dark:text-brand-cream/50 mt-0.5">
              Instantly create, modify, restock or delete clay items in the list.
            </p>
          </div>

          <button
            onClick={openAddForm}
            className="w-full sm:w-auto px-6 py-3.5 bg-brand-mocha dark:bg-brand-gold text-brand-cream dark:text-brand-mocha rounded-2xl text-xs uppercase tracking-widest font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Plus size={16} />
            <span>Add Craft</span>
          </button>
        </div>

        {/* Product listing grid */}
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brand-mocha/10 dark:border-brand-cream/10 text-[10px] uppercase tracking-widest text-brand-mocha/40 dark:text-brand-cream/40 font-bold">
                <th className="py-4">Ornament Detail</th>
                <th className="py-4">Category</th>
                <th className="py-4">Pricing</th>
                <th className="py-4">Stock Status</th>
                <th className="py-4">Custom Option</th>
                <th className="py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-mocha/5 dark:divide-brand-latte/5">
              {products.map((item) => {
                const finalPrice = item.discount > 0 ? Math.round(item.price * (1 - item.discount / 100)) : item.price;
                return (
                  <tr key={item.id} className="text-sm font-sans">
                    {/* Visual & name */}
                    <td className="py-4 pr-4">
                      <div className="flex items-center space-x-3.5">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover border border-brand-gold/15 bg-brand-sand"
                        />
                        <div className="min-w-0">
                          <h4 className="font-serif text-base text-brand-mocha dark:text-brand-cream font-bold truncate max-w-[200px] sm:max-w-xs">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-brand-mocha/50 dark:text-brand-cream/50 mt-0.5 line-clamp-1 max-w-[200px] sm:max-w-xs">
                            {item.description}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4">
                      <span className="text-[9px] uppercase tracking-widest font-bold bg-brand-sand dark:bg-brand-cocoa text-brand-mocha dark:text-brand-gold px-3 py-1 rounded-full border border-brand-mocha/5 dark:border-brand-latte/5">
                        {item.category}
                      </span>
                    </td>

                    {/* Pricing */}
                    <td className="py-4">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-semibold text-brand-mocha dark:text-brand-cream">
                          ₹{finalPrice}
                        </span>
                        {item.discount > 0 && (
                          <span className="text-[10px] line-through text-brand-mocha/45 dark:text-brand-cream/45">
                            ₹{item.price}
                          </span>
                        )}
                      </div>
                      {item.discount > 0 && (
                        <span className="text-[8px] bg-red-500/10 text-red-500 font-bold px-1.5 py-0.5 rounded uppercase tracking-wider block w-max mt-0.5">
                          {item.discount}% OFF
                        </span>
                      )}
                    </td>

                    {/* Stock switch info */}
                    <td className="py-4">
                      <button
                        onClick={async () => {
                          const newStatus = item.stockStatus === 'in-stock' ? 'out-of-stock' : 'in-stock';
                          await updateProduct(item.id, { ...item, stockStatus: newStatus });
                        }}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold border ${
                          item.stockStatus === 'in-stock'
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                            : 'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}
                      >
                        <span className={`w-1 h-1 rounded-full ${item.stockStatus === 'in-stock' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                        <span>{item.stockStatus === 'in-stock' ? 'In Stock' : 'Sold Out'}</span>
                      </button>
                    </td>

                    {/* Custom order badge */}
                    <td className="py-4">
                      <span className={`inline-block ${item.customOrderOption ? 'text-brand-gold font-bold text-xs' : 'text-brand-mocha/30'}`}>
                        {item.customOrderOption ? "✨ Yes" : "No"}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openEditForm(item)}
                          className="p-2 rounded-xl bg-brand-sand dark:bg-brand-cocoa text-brand-mocha/70 dark:text-brand-cream/70 hover:text-brand-gold transition-colors duration-200"
                          aria-label="Edit product item"
                        >
                          <Edit2 size={14} />
                        </button>
                        
                        <button
                          onClick={() => handleDeleteProduct(item.id)}
                          className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200"
                          aria-label="Delete product item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </>
      ) : (
        <div className="max-w-7xl mx-auto space-y-8 font-sans">
          
          <div className="glass-panel border border-brand-mocha/5 dark:border-brand-latte/5 rounded-[2.5rem] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-brand-mocha dark:text-brand-cream">
                  Website Customizer
                </h2>
                <p className="text-xs text-brand-mocha/50 dark:text-brand-cream/50 mt-0.5">
                  Seamlessly personalize showcase images, looping videos, categories and Instagram feed layouts globally.
                </p>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button
                  onClick={handleResetCustomizer}
                  disabled={savingCustomizer}
                  className="w-full sm:w-auto px-5 py-3 border border-brand-mocha/10 rounded-2xl text-xs uppercase tracking-widest font-bold hover:bg-brand-sand dark:hover:bg-brand-cocoa transition-all duration-300 flex items-center justify-center space-x-2 text-brand-mocha/70 dark:text-brand-cream/70"
                >
                  <RefreshCw size={14} className={savingCustomizer ? "animate-spin" : ""} />
                  <span>Reset to Defaults</span>
                </button>
                <button
                  onClick={handleSaveCustomizer}
                  disabled={savingCustomizer}
                  className="w-full sm:w-auto px-6 py-3.5 bg-brand-mocha dark:bg-brand-gold text-brand-cream dark:text-brand-mocha rounded-2xl text-xs uppercase tracking-widest font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  {savingCustomizer ? (
                    <div className="animate-spin w-4 h-4 border-2 border-brand-cream dark:border-brand-mocha rounded-full border-t-transparent" />
                  ) : (
                    <>
                      <Check size={14} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Customizer Subgroups */}
            <div className="space-y-12">
              {customizerSections.map((section, sIdx) => (
                <div key={section.title} className="border-t border-brand-mocha/15 dark:border-brand-cream/10 pt-8 first:border-t-0 first:pt-0">
                  <div className="mb-6">
                    <h3 className="font-serif text-lg font-bold text-brand-mocha dark:text-brand-cream flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                      <span>{section.title}</span>
                    </h3>
                    <p className="text-[11px] text-brand-mocha/50 dark:text-brand-cream/50 mt-0.5">
                      {section.desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.fields.map((field) => {
                      const currentVal = customizerImages[field.key] || '';
                      const isFieldVideo = field.key === 'hero_video' && (currentVal.includes('.mp4') || currentVal.includes('.webm') || currentVal.includes('video') || currentVal.startsWith('data:video/'));
                      const isUploading = uploadingField === field.key;

                      return (
                        <div
                          key={field.key}
                          className="glass-panel border border-brand-mocha/5 dark:border-brand-latte/5 rounded-3xl p-5 hover:border-brand-gold/25 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-center sm:items-stretch group animate-fade-in"
                        >
                          {/* Visual Live Preview */}
                          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-brand-gold/15 flex-shrink-0 bg-brand-sand/35 dark:bg-brand-espresso/30 flex items-center justify-center">
                            {isUploading ? (
                              <div className="animate-spin w-6 h-6 border-2 border-brand-gold rounded-full border-t-transparent" />
                            ) : currentVal ? (
                              isFieldVideo ? (
                                <video
                                  src={currentVal}
                                  muted
                                  loop
                                  autoPlay
                                  playsInline
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <img
                                  src={currentVal}
                                  alt={field.label}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  onError={(e) => {
                                    e.target.src = "/clay-charms.png";
                                  }}
                                />
                              )
                            ) : (
                              <Image size={24} className="text-brand-mocha/20 dark:text-brand-cream/20" />
                            )}

                            {/* Fullscreen hover review button */}
                            {currentVal && !isUploading && (
                              <a
                                href={currentVal}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-300 cursor-pointer"
                                title="Open full size"
                              >
                                <Eye size={18} />
                              </a>
                            )}
                          </div>

                          {/* Settings controls */}
                          <div className="flex-1 flex flex-col justify-between w-full font-sans">
                            <div>
                              <h4 className="text-xs uppercase tracking-widest font-bold text-brand-mocha dark:text-brand-cream">
                                {field.label}
                              </h4>
                              <p className="text-[10px] text-brand-mocha/50 dark:text-brand-cream/50 mt-0.5 leading-snug font-sans font-light">
                                {field.desc}
                              </p>
                            </div>

                            <div className="mt-3 flex gap-2">
                              {/* Direct URL input */}
                              <input
                                type="text"
                                value={currentVal}
                                onChange={(e) => handleCustomizerUrlChange(field.key, e.target.value)}
                                placeholder="Paste asset image URL or file path..."
                                className="flex-1 bg-brand-cream/40 dark:bg-brand-espresso/40 border border-brand-mocha/10 dark:border-brand-latte/10 rounded-xl px-3 py-2 text-xs text-brand-mocha dark:text-brand-cream outline-none focus:border-brand-gold transition-colors font-sans"
                              />

                              {/* Direct media file loader */}
                              <div className="relative">
                                <input
                                  type="file"
                                  accept={field.key === 'hero_video' ? "video/*,image/*" : "image/*"}
                                  onChange={(e) => handleCustomizerFileChange(field.key, e.target.files?.[0])}
                                  id={`file-picker-${field.key}`}
                                  className="hidden"
                                  disabled={isUploading}
                                />
                                <label
                                  htmlFor={`file-picker-${field.key}`}
                                  className={`p-2 rounded-xl border border-brand-mocha/10 bg-brand-sand dark:bg-brand-cocoa text-brand-mocha dark:text-brand-cream hover:border-brand-gold hover:text-brand-gold transition-all duration-300 flex items-center justify-center cursor-pointer ${
                                    isUploading ? "opacity-50 pointer-events-none" : ""
                                  }`}
                                  title="Upload from device"
                                >
                                  <UploadCloud size={14} />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions Banner */}
            <div className="mt-12 pt-8 border-t border-brand-mocha/15 dark:border-brand-cream/10 flex items-center justify-end gap-4">
              <button
                onClick={handleResetCustomizer}
                disabled={savingCustomizer}
                className="px-6 py-3 border border-brand-mocha/10 rounded-2xl text-xs uppercase tracking-widest font-bold hover:bg-brand-sand dark:hover:bg-brand-cocoa transition-all duration-300 text-brand-mocha/70 dark:text-brand-cream/70"
              >
                Reset to Defaults
              </button>
              <button
                onClick={handleSaveCustomizer}
                disabled={savingCustomizer}
                className="px-8 py-4 bg-brand-mocha dark:bg-brand-gold text-brand-cream dark:text-brand-mocha rounded-2xl text-xs uppercase tracking-widest font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center space-x-2"
              >
                {savingCustomizer ? (
                  <div className="animate-spin w-4 h-4 border-2 border-brand-cream dark:border-brand-mocha rounded-full border-t-transparent" />
                ) : (
                  <>
                    <Check size={14} />
                    <span>Synchronize Custom Images</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD/EDIT FORM DRAWER MODAL OVERLAY */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="w-full max-w-2xl bg-brand-cream dark:bg-brand-cocoa rounded-[2.5rem] overflow-hidden shadow-2xl p-6 sm:p-8 relative border border-brand-gold/15 max-h-[90vh] overflow-y-auto"
              >
                {/* Close Form */}
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-brand-cream dark:bg-brand-espresso text-brand-mocha dark:text-brand-cream shadow-md border border-brand-gold/10 z-10"
                >
                  <X size={16} />
                </button>

                <h3 className="font-serif text-2xl font-bold text-brand-mocha dark:text-brand-cream mb-6">
                  {editingId ? "Edit Craft Details" : "Create New Craft"}
                </h3>

                <form onSubmit={handleFormSubmit} className="space-y-5">
                  {/* Name field */}
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-brand-mocha/50 dark:text-brand-cream/50 font-bold block mb-2">
                      Ornament Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vintage Sovereignty Pot Miniature"
                      className="w-full bg-brand-cream/40 dark:bg-brand-espresso/40 border border-brand-mocha/10 dark:border-brand-latte/10 rounded-2xl px-4 py-3 text-sm text-brand-mocha dark:text-brand-cream outline-none focus:border-brand-gold"
                    />
                  </div>

                  {/* Category & Pricing grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-brand-mocha/50 dark:text-brand-cream/50 font-bold block mb-2">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-brand-cream/40 dark:bg-brand-espresso/40 border border-brand-mocha/10 dark:border-brand-latte/10 rounded-2xl px-4 py-3 text-sm text-brand-mocha dark:text-brand-cream outline-none focus:border-brand-gold appearance-none"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat} className="bg-brand-cream text-brand-mocha dark:bg-brand-cocoa dark:text-brand-cream">
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-brand-mocha/50 dark:text-brand-cream/50 font-bold block mb-2">
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="399"
                        className="w-full bg-brand-cream/40 dark:bg-brand-espresso/40 border border-brand-mocha/10 dark:border-brand-latte/10 rounded-2xl px-4 py-3 text-sm text-brand-mocha dark:text-brand-cream outline-none focus:border-brand-gold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-brand-mocha/50 dark:text-brand-cream/50 font-bold block mb-2">
                        Discount Percentage (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        placeholder="0"
                        className="w-full bg-brand-cream/40 dark:bg-brand-espresso/40 border border-brand-mocha/10 dark:border-brand-latte/10 rounded-2xl px-4 py-3 text-sm text-brand-mocha dark:text-brand-cream outline-none focus:border-brand-gold"
                      />
                    </div>
                  </div>

                  {/* File Media Uploader */}
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-brand-mocha/50 dark:text-brand-cream/50 font-bold block mb-2">
                      Aesthetic Media Uploader *
                    </label>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Image Thumbnail preview */}
                      {(mediaFile || mediaUrl) && (
                        <img
                          src={mediaFile ? URL.createObjectURL(mediaFile) : mediaUrl}
                          alt="Thumbnail preview"
                          className="w-20 h-20 rounded-2xl object-cover border border-brand-gold/15 bg-brand-sand"
                        />
                      )}
                      
                      <div className="flex-1 w-full relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
                          className="hidden"
                          id="admin-file-picker"
                        />
                        <label
                          htmlFor="admin-file-picker"
                          className="w-full bg-brand-cream/40 dark:bg-brand-espresso/40 border border-dashed border-brand-mocha/20 dark:border-brand-latte/20 rounded-2xl py-5 text-xs text-brand-mocha/60 dark:text-brand-cream/60 flex items-center justify-center cursor-pointer hover:border-brand-gold hover:text-brand-gold transition-colors duration-200 font-semibold"
                        >
                          {mediaFile ? `Selected: ${mediaFile.name}` : "Click to select PNG or JPG craft photo"}
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Description field */}
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-brand-mocha/50 dark:text-brand-cream/50 font-bold block mb-2">
                      Artisanal Narrative Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Share the ethnic history, design motifs and curing detail..."
                      rows={3}
                      className="w-full bg-brand-cream/40 dark:bg-brand-espresso/40 border border-brand-mocha/10 dark:border-brand-latte/10 rounded-2xl px-4 py-3 text-sm text-brand-mocha dark:text-brand-cream outline-none focus:border-brand-gold resize-none"
                    />
                  </div>

                  {/* Options toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-brand-sand/35 dark:bg-brand-espresso/30 p-4 rounded-2xl border border-brand-mocha/5 dark:border-brand-latte/5">
                    
                    {/* Stock Status toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-widest text-brand-mocha/70 dark:text-brand-cream/70 font-semibold">
                        In Stock status
                      </span>
                      <button
                        type="button"
                        onClick={() => setStockStatus(stockStatus === 'in-stock' ? 'out-of-stock' : 'in-stock')}
                        className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-200 ${stockStatus === 'in-stock' ? 'bg-emerald-500' : 'bg-red-500'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 ${stockStatus === 'in-stock' ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    {/* Featured Status toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-widest text-brand-mocha/70 dark:text-brand-cream/70 font-semibold">
                        Featured Craft
                      </span>
                      <button
                        type="button"
                        onClick={() => setFeaturedStatus(!featuredStatus)}
                        className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-200 ${featuredStatus ? 'bg-brand-gold' : 'bg-brand-mocha/20'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 ${featuredStatus ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    {/* Customisable Status toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-widest text-brand-mocha/70 dark:text-brand-cream/70 font-semibold">
                        Customisable
                      </span>
                      <button
                        type="button"
                        onClick={() => setCustomOrderOption(!customOrderOption)}
                        className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-200 ${customOrderOption ? 'bg-brand-gold' : 'bg-brand-mocha/20'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 ${customOrderOption ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </div>

                  </div>

                  {/* Submission Row */}
                  <div className="pt-4 flex items-center justify-end space-x-4 border-t border-brand-mocha/5 dark:border-brand-latte/5">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-5 py-3 rounded-xl border border-brand-mocha/10 text-xs uppercase tracking-widest font-bold hover:bg-brand-sand dark:hover:bg-brand-cocoa"
                    >
                      Cancel
                    </button>
                    
                    <button
                      type="submit"
                      disabled={submittingForm}
                      className="px-8 py-3 bg-brand-mocha dark:bg-brand-gold text-brand-cream dark:text-brand-mocha rounded-xl text-xs uppercase tracking-widest font-bold shadow-md flex items-center space-x-2"
                    >
                      {submittingForm ? (
                        <div className="animate-spin w-4 h-4 border-2 border-brand-cream dark:border-brand-mocha rounded-full border-t-transparent" />
                      ) : (
                        <span>Save Ornament</span>
                      )}
                    </button>
                  </div>

                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
