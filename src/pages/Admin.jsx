import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { LogIn, LogOut, Plus, Edit2, Trash2, Home, Check, X, ShieldAlert, Sparkles, FileText, BarChart2, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Admin({ onNavigateHome }) {
  const { currentUser, login, logout, loading: authLoading, isMock: authIsMock } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, uploadMedia } = useProducts();

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
