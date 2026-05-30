import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Check if Firebase environment variables are configured
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const isFirebaseConfigured = !!(
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== 'your_api_key_here' &&
  firebaseConfig.projectId
);

let app;
let firestoreDb;
let firebaseAuth;
let firebaseStorage;
let isMock = true;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    firestoreDb = getFirestore(app);
    firebaseAuth = getAuth(app);
    firebaseStorage = getStorage(app);
    isMock = false;
    console.log("🔥 Firebase initialized successfully!");
  } catch (error) {
    console.error("⚠️ Failed to initialize Firebase, falling back to mock mode:", error);
    isMock = true;
  }
} else {
  console.log("✨ Firebase is not configured. Running in premium Local Mock Mode!");
}

// -------------------------------------------------------------
// INITIAL MOCK PRODUCTS DATA (Premium, visually beautiful)
// -------------------------------------------------------------
const initialMockProducts = [
  {
    id: "mock_1",
    name: "Golden Terracotta Ganesha Clay Charm",
    description: "An elegant, handcrafted clay charm displaying traditional Ganesha artistry. Perfectly baked, coated in weather-resistant clear resin, and accented with golden highlights.",
    price: 499,
    discount: 15,
    images: ["/public/clay-charms.png"],
    video: "",
    category: "Clay Charms",
    stockStatus: "in-stock",
    featuredStatus: true,
    customOrderOption: true,
    createdDate: new Date("2026-05-01").toISOString()
  },
  {
    id: "mock_2",
    name: "Ethnic Mandala Mocha Keyring",
    description: "A gorgeous, circular keyring carved with delicate tribal patterns. Hand-painted in soft cream and mocha beige, and adorned with traditional woolen tassels.",
    price: 299,
    discount: 10,
    images: ["/public/keyrings.png"],
    video: "",
    category: "Keyrings",
    stockStatus: "in-stock",
    featuredStatus: true,
    customOrderOption: false,
    createdDate: new Date("2026-05-02").toISOString()
  },
  {
    id: "mock_3",
    name: "Vintage Sovereign Dashboard Decor",
    description: "Indulge your drive with this handcrafted clay miniature dashboard set. Inspired by traditional Jharkhand earthen pots, finished in a luxury ceramic smooth glow.",
    price: 899,
    discount: 20,
    images: ["/public/dashboard-decor.png"],
    video: "",
    category: "Dashboard Decor",
    stockStatus: "in-stock",
    featuredStatus: true,
    customOrderOption: true,
    createdDate: new Date("2026-05-03").toISOString()
  },
  {
    id: "mock_4",
    name: "Earthy Terracotta Drop Earrings",
    description: "Premium handcrafted lightweight clay earrings. Handmoulded patterns featuring abstract leaf lines that seamlessly bring ethnic aesthetics to contemporary apparel.",
    price: 399,
    discount: 5,
    images: ["/public/earrings.png"],
    video: "",
    category: "Earrings",
    stockStatus: "in-stock",
    featuredStatus: false,
    customOrderOption: true,
    createdDate: new Date("2026-05-04").toISOString()
  },
  {
    id: "mock_5",
    name: "Jharkhand Tribal Heritage Pin Set",
    description: "Handcrafted copper-baked clay pins displaying the iconic Sohrai art. Ideal to accent jackets, laptop bags, and key straps for the modern aesthetic enthusiast.",
    price: 349,
    discount: 0,
    images: ["/public/custom-pins.png"],
    video: "",
    category: "Custom Pins",
    stockStatus: "in-stock",
    featuredStatus: false,
    customOrderOption: true,
    createdDate: new Date("2026-05-05").toISOString()
  },
  {
    id: "mock_6",
    name: "Luxury Miniature Earthen Flag Charm",
    description: "A compact, premium terracotta dashboard flag holder with an intricate national theme, mounted on an elegant high-quality mahogany-colored support.",
    price: 599,
    discount: 25,
    images: ["/public/flags.png"],
    video: "",
    category: "Car & Bike Flags",
    stockStatus: "out-of-stock",
    featuredStatus: true,
    customOrderOption: true,
    createdDate: new Date("2026-05-06").toISOString()
  }
];

// Initialize mock DB items in local storage if not already existing
if (isMock) {
  if (!localStorage.getItem("jc_mock_products")) {
    localStorage.setItem("jc_mock_products", JSON.stringify(initialMockProducts));
  }
  if (!localStorage.getItem("jc_mock_auth")) {
    localStorage.setItem("jc_mock_auth", JSON.stringify({ isLoggedIn: false }));
  }
}

// -------------------------------------------------------------
// UNIFIED API SERVICE FOR FIREBASE AND MOCK FALLBACK
// -------------------------------------------------------------
export const dbService = {
  isMock,

  // Fetch all products
  getProducts: async () => {
    if (!isMock) {
      try {
        const q = query(collection(firestoreDb, 'products'), orderBy('createdDate', 'desc'));
        const querySnapshot = await getDocs(q);
        const products = [];
        querySnapshot.forEach((docSnap) => {
          products.push({ id: docSnap.id, ...docSnap.data() });
        });
        // If firestore is empty, let's load mock products as a seed
        if (products.length === 0) {
          console.log("🌱 Firestore is empty, seeding with initial products...");
          for (let p of initialMockProducts) {
            const { id, ...data } = p;
            await addDoc(collection(firestoreDb, 'products'), {
              ...data,
              createdDate: new Date().toISOString()
            });
          }
          // fetch again
          const newSnapshot = await getDocs(q);
          const seeded = [];
          newSnapshot.forEach((docSnap) => {
            seeded.push({ id: docSnap.id, ...docSnap.data() });
          });
          return seeded;
        }
        return products;
      } catch (err) {
        console.error("Firestore getProducts error, pulling from cache:", err);
      }
    }
    
    // Mock Mode
    const stored = localStorage.getItem("jc_mock_products");
    return stored ? JSON.parse(stored) : initialMockProducts;
  },

  // Add a product
  addProduct: async (productData) => {
    if (!isMock) {
      const docRef = await addDoc(collection(firestoreDb, 'products'), {
        ...productData,
        createdDate: new Date().toISOString()
      });
      return { id: docRef.id, ...productData };
    }

    // Mock Mode
    const products = JSON.parse(localStorage.getItem("jc_mock_products") || "[]");
    const newProduct = {
      id: "mock_" + Date.now(),
      ...productData,
      createdDate: new Date().toISOString()
    };
    products.unshift(newProduct);
    localStorage.setItem("jc_mock_products", JSON.stringify(products));
    return newProduct;
  },

  // Update a product
  updateProduct: async (id, productData) => {
    if (!isMock) {
      const docRef = doc(firestoreDb, 'products', id);
      await updateDoc(docRef, productData);
      return { id, ...productData };
    }

    // Mock Mode
    const products = JSON.parse(localStorage.getItem("jc_mock_products") || "[]");
    const updatedProducts = products.map((p) => 
      p.id === id ? { ...p, ...productData } : p
    );
    localStorage.setItem("jc_mock_products", JSON.stringify(updatedProducts));
    return { id, ...productData };
  },

  // Delete a product
  deleteProduct: async (id) => {
    if (!isMock) {
      const docRef = doc(firestoreDb, 'products', id);
      await deleteDoc(docRef);
      return id;
    }

    // Mock Mode
    const products = JSON.parse(localStorage.getItem("jc_mock_products") || "[]");
    const filteredProducts = products.filter((p) => p.id !== id);
    localStorage.setItem("jc_mock_products", JSON.stringify(filteredProducts));
    return id;
  },

  // Upload Media (returns url)
  uploadMedia: async (file, type) => {
    if (!isMock && firebaseStorage) {
      try {
        const fileRef = ref(firebaseStorage, `${type}/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        return downloadUrl;
      } catch (err) {
        console.error("Firebase upload failed, using local conversion:", err);
      }
    }

    // Mock Mode: Convert to Base64 dataURL for visual showcase
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  },

  // Auth Operations
  login: async (email, password) => {
    if (!isMock) {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      return userCredential.user;
    }

    // Mock Mode: credentials admin@chitra.com / chitra123
    if (email === 'admin@chitra.com' && password === 'chitra123') {
      localStorage.setItem("jc_mock_auth", JSON.stringify({ isLoggedIn: true, email }));
      return { email, uid: "mock_admin_uid" };
    }
    throw new Error("Invalid mock credentials. Hint: admin@chitra.com / chitra123");
  },

  logout: async () => {
    if (!isMock) {
      await signOut(firebaseAuth);
      return;
    }
    localStorage.setItem("jc_mock_auth", JSON.stringify({ isLoggedIn: false }));
  },

  onAuthStateChangedListener: (callback) => {
    if (!isMock) {
      return onAuthStateChanged(firebaseAuth, callback);
    }

    // Mock Mode: Listen via storage polling or simple callback trigger
    const checkState = () => {
      const authState = JSON.parse(localStorage.getItem("jc_mock_auth") || '{"isLoggedIn":false}');
      if (authState.isLoggedIn) {
        callback({ email: authState.email || 'admin@chitra.com', uid: "mock_admin_uid" });
      } else {
        callback(null);
      }
    };
    checkState();
    
    // Poll changes on page focus/action
    window.addEventListener('focus', checkState);
    return () => window.removeEventListener('focus', checkState);
  }
};
