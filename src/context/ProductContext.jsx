import React, { createContext, useContext, useState, useEffect } from 'react';
import { dbService } from '../firebase/config';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  useEffect(() => {
    fetchProducts();
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
        isMock: dbService.isMock
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
