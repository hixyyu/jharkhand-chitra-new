import React, { createContext, useContext, useState, useEffect } from 'react';
import { dbService } from '../firebase/config';

const ProductContext = createContext();

const defaultSiteImages = {
  about_primary: "/clay-charms.png",
  about_secondary: "/dashboard-decor.png",
  category_clay_charms: "/clay-charms.png",
  category_keyrings: "/keyrings.png",
  category_dashboard_decor: "/dashboard-decor.png",
  category_earrings: "/earrings.png",
  category_custom_pins: "/custom-pins.png",
  category_flags: "/flags.png",
  insta_post_1: "/clay-charms.png",
  insta_post_2: "/keyrings.png",
  insta_post_3: "/dashboard-decor.png",
  insta_post_4: "/earrings.png",
  insta_post_5: "/custom-pins.png",
  insta_post_6: "/flags.png",
  hero_video: "https://assets.mixkit.co/videos/preview/mixkit-handmoulding-clay-pottery-details-close-up-42299-large.mp4",
  hero_fallback_image: "/clay-charms.png"
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [siteImages, setSiteImages] = useState(defaultSiteImages);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const fetched = await dbService.getProducts();
      setProducts(fetched);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSiteImages = async () => {
    try {
      const fetched = await dbService.getSiteImages();
      setSiteImages({ ...defaultSiteImages, ...fetched });
    } catch (err) {
      console.error("Error fetching site images:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSiteImages();
  }, []);

  const addProduct = async (productData) => {
    try {
      const added = await dbService.addProduct(productData);
      setProducts((prev) => [added, ...prev]);
      return added;
    } catch (err) {
      console.error("Error adding product:", err);
      throw err;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const updated = await dbService.updateProduct(id, productData);
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      return updated;
    } catch (err) {
      console.error("Error updating product:", err);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await dbService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      return id;
    } catch (err) {
      console.error("Error deleting product:", err);
      throw err;
    }
  };

  const uploadMedia = async (file, type) => {
    try {
      return await dbService.uploadMedia(file, type);
    } catch (err) {
      console.error("Error uploading media:", err);
      throw err;
    }
  };

  const updateSiteImages = async (newSiteImages) => {
    try {
      const updated = await dbService.saveSiteImages(newSiteImages);
      setSiteImages({ ...defaultSiteImages, ...updated });
      return updated;
    } catch (err) {
      console.error("Error saving site images:", err);
      throw err;
    }
  };

  // Perform search and filter locally
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        loading,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        uploadMedia,
        siteImages,
        updateSiteImages,
        defaultSiteImages,
        isMock: dbService.isMock
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
