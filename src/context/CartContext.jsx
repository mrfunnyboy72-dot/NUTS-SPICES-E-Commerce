import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CATEGORIES, STORE_WHATSAPP_NUMBER } from '../data/products';
import { 
  INITIAL_STORE_SETTINGS, 
  INITIAL_ORDERS, 
  INITIAL_OFFERS, 
  INITIAL_REVIEWS 
} from '../data/mockAdminData';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. STORE & APPLICATION SETTINGS (Admin Configurable)
  const [storeSettings, setStoreSettings] = useState(() => {
    const saved = localStorage.getItem('nuts_spices_store_settings');
    return saved ? JSON.parse(saved) : INITIAL_STORE_SETTINGS;
  });

  // 2. PRODUCTS STATE (Admin Editable)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('nuts_spices_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  // 3. CATEGORIES STATE (Admin Editable)
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('nuts_spices_categories');
    return saved ? JSON.parse(saved) : CATEGORIES;
  });

  // 4. ORDERS STATE (Admin & Customer Live Sync)
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('nuts_spices_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // 5. OFFERS STATE (Admin Editable)
  const [offers, setOffers] = useState(() => {
    const saved = localStorage.getItem('nuts_spices_offers');
    return saved ? JSON.parse(saved) : INITIAL_OFFERS;
  });

  // 6. REVIEWS STATE (Admin Editable)
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('nuts_spices_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // 7. CART & WISHLIST STATE
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('nuts_spices_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('nuts_spices_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // 8. NAVIGATION & ROUTING STATE
  const [activePage, setActivePage] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path.startsWith('/admin')) {
        return 'admin';
      }
    }
    return 'home';
  });

  const [adminTab, setAdminTab] = useState('dashboard'); // dashboard | products | categories | orders | customers | offers | reviews | settings
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  // Sync initial URL pathname and handle browser back/forward buttons
  useEffect(() => {
    const syncRouteFromPath = () => {
      if (typeof window === 'undefined') return;
      const path = window.location.pathname.toLowerCase();
      if (path.startsWith('/admin')) {
        setActivePage('admin');
      } else if (path === '/' || path === '') {
        setActivePage('home');
      }
    };

    syncRouteFromPath();
    window.addEventListener('popstate', syncRouteFromPath);
    return () => window.removeEventListener('popstate', syncRouteFromPath);
  }, []);

  // 9. AUTHENTICATION (USER & ADMIN)
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('nuts_spices_registered_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nuts_spices_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    const saved = localStorage.getItem('nuts_spices_admin_logged');
    return saved ? JSON.parse(saved) : true;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // Persist States
  useEffect(() => {
    localStorage.setItem('nuts_spices_store_settings', JSON.stringify(storeSettings));
  }, [storeSettings]);

  useEffect(() => {
    localStorage.setItem('nuts_spices_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('nuts_spices_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('nuts_spices_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('nuts_spices_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('nuts_spices_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('nuts_spices_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('nuts_spices_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('nuts_spices_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('nuts_spices_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nuts_spices_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nuts_spices_admin_logged', JSON.stringify(isAdminLoggedIn));
  }, [isAdminLoggedIn]);

  // USER AUTH HANDLERS
  const registerUser = (userData) => {
    const newUser = {
      name: userData.name,
      phone: userData.phone || userData.identifier || '',
      email: userData.email || '',
      password: userData.password || ''
    };

    setRegisteredUsers(prev => {
      const filtered = prev.filter(u => 
        !(u.phone && u.phone === newUser.phone) && 
        !(u.email && u.email.toLowerCase() === newUser.email.toLowerCase())
      );
      return [...filtered, newUser];
    });

    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const loginUser = (loginData) => {
    const identifier = (loginData.identifier || loginData.phone || loginData.email || '').trim().toLowerCase();
    
    const foundUser = registeredUsers.find(u => 
      (u.phone && u.phone.toLowerCase() === identifier) ||
      (u.email && u.email.toLowerCase() === identifier)
    );

    if (foundUser) {
      setUser({
        name: foundUser.name,
        phone: foundUser.phone,
        email: foundUser.email
      });
    } else if (loginData.name) {
      setUser(loginData);
      setRegisteredUsers(prev => [...prev, {
        name: loginData.name,
        phone: loginData.phone || loginData.identifier || '',
        email: loginData.email || '',
        password: loginData.password || ''
      }]);
    } else {
      const fallbackName = identifier.includes('@') ? identifier.split('@')[0] : 'Customer';
      const formattedName = fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1);
      const fallbackUser = {
        name: formattedName,
        identifier: identifier,
        email: identifier.includes('@') ? identifier : 'customer@nutsandspices.in',
        phone: identifier.includes('@') ? '9876543210' : identifier
      };
      setUser(fallbackUser);
      setRegisteredUsers(prev => [...prev, fallbackUser]);
    }

    setIsAuthModalOpen(false);
  };

  const logoutUser = () => {
    setUser(null);
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  // ADMIN AUTH HANDLERS
  const loginAdmin = (username, password) => {
    // Simple demo authentication check (admin / admin123)
    if ((username === 'admin' || username === 'admin@nutsandspices.store') && password === 'admin123') {
      setIsAdminLoggedIn(true);
      return { success: true };
    }
    // Also accept any non-empty demo submission for user convenience
    if (username.trim() && password.trim()) {
      setIsAdminLoggedIn(true);
      return { success: true };
    }
    return { success: false, message: 'Invalid Admin Credentials' };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  // NAVIGATION & ROUTING
  const navigate = (page, params = {}) => {
    if (params.category) {
      setSelectedCategory(params.category);
    }
    if (params.product) {
      setSelectedProduct(params.product);
    }
    if (params.adminTab) {
      setAdminTab(params.adminTab);
    }
    setActivePage(page);

    // Update browser URL bar
    if (typeof window !== 'undefined') {
      if (page === 'admin') {
        window.history.pushState({}, '', '/admin');
      } else if (page === 'home') {
        window.history.pushState({}, '', '/');
      } else {
        window.history.pushState({}, '', `/${page}`);
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // CART HANDLERS
  const addToCart = (product, weightObj, quantity = 1) => {
    const weightLabel = weightObj ? weightObj.label : (product.weights && product.weights[0] ? product.weights[0].label : 'Standard');
    const itemPrice = weightObj ? weightObj.price : (product.weights && product.weights[0] ? product.weights[0].price : product.price || 100);
    const cartItemId = `${product.id}-${weightLabel}`;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            productId: product.id,
            name: product.name,
            image: product.image,
            categoryName: product.categoryName || 'General',
            weight: weightLabel,
            price: itemPrice,
            quantity
          }
        ];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.cartItemId === cartItemId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // WHATSAPP GENERATION USING DYNAMIC STORE SETTINGS
  const activeWhatsAppNumber = storeSettings.whatsappNumber || STORE_WHATSAPP_NUMBER;

  const generateWhatsAppMessage = (orderDetails) => {
    const { customer, items, total, orderId } = orderDetails;
    
    let msg = `🛒 *${storeSettings.storeName || 'NUTS & SPICES'} - NEW ORDER*\n`;
    msg += `🆔 *Order ID:* #${orderId}\n`;
    msg += `------------------------------------\n`;
    msg += `👤 *Customer:* ${customer.name}\n`;
    msg += `📞 *Phone:* ${customer.phone}\n`;
    msg += `📍 *Address:* ${customer.address}, ${customer.city} - ${customer.pincode}\n`;
    if (customer.notes) {
      msg += `📝 *Notes:* ${customer.notes}\n`;
    }
    msg += `------------------------------------\n`;
    msg += `📦 *Items Ordered:*\n`;

    items.forEach((item, index) => {
      const lineTotal = item.price * item.quantity;
      msg += `${index + 1}. ${item.name} (${item.weight}) x ${item.quantity} = ₹${lineTotal}\n`;
    });

    msg += `------------------------------------\n`;
    msg += `💰 *Total Amount:* ₹${total.toLocaleString('en-IN')}\n`;
    msg += `------------------------------------\n`;
    msg += `Thank you! Please confirm order & delivery timeline.`;

    return encodeURIComponent(msg);
  };

  const getWhatsAppUrl = (orderDetails) => {
    const encodedText = generateWhatsAppMessage(orderDetails);
    return `https://wa.me/${activeWhatsAppNumber}?text=${encodedText}`;
  };

  // ADMIN - PRODUCT CRUD
  const addProduct = (newProductData) => {
    const newId = `prod-${Date.now()}`;
    const productToAdd = {
      id: newId,
      badge: newProductData.badge || 'New',
      rating: 5.0,
      reviews: 0,
      status: 'Active',
      ...newProductData
    };
    setProducts(prev => [productToAdd, ...prev]);
    return productToAdd;
  };

  const updateProduct = (productId, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, ...updatedFields } : p));
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const toggleProductStatus = (productId) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newStatus = (p.status === 'Inactive' || p.active === false) ? 'Active' : 'Inactive';
        return { ...p, status: newStatus, active: newStatus === 'Active' };
      }
      return p;
    }));
  };

  // ADMIN - CATEGORIES CRUD
  const addCategory = (categoryData) => {
    const newId = categoryData.id || `cat-${Date.now()}`;
    const newCategory = { id: newId, ...categoryData };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (categoryId, updatedFields) => {
    setCategories(prev => prev.map(c => c.id === categoryId ? { ...c, ...updatedFields } : c));
  };

  const deleteCategory = (categoryId) => {
    setCategories(prev => prev.filter(c => c.id !== categoryId));
  };

  // ADMIN - ORDERS CRUD & CUSTOMER CHECKOUT CREATION
  const createNewOrder = (orderDetails) => {
    const newOrderObj = {
      orderId: orderDetails.orderId || `NS${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: orderDetails.customer.name,
      phone: orderDetails.customer.phone,
      email: orderDetails.customer.email || `${orderDetails.customer.name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      address: orderDetails.customer.address,
      city: orderDetails.customer.city || 'Chennai',
      pincode: orderDetails.customer.pincode || '600001',
      date: new Date().toISOString().split('T')[0],
      status: 'NEW',
      total: orderDetails.total,
      items: orderDetails.items,
      notes: orderDetails.customer.notes || ''
    };
    setOrders(prev => [newOrderObj, ...prev]);
    setLastOrder(newOrderObj);
    return newOrderObj;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.orderId !== orderId));
  };

  // ADMIN - OFFERS CRUD
  const addOffer = (offerData) => {
    const newOffer = {
      id: `off-${Date.now()}`,
      status: 'ACTIVE',
      ...offerData
    };
    setOffers(prev => [newOffer, ...prev]);
  };

  const updateOffer = (offerId, updatedFields) => {
    setOffers(prev => prev.map(off => off.id === offerId ? { ...off, ...updatedFields } : off));
  };

  const deleteOffer = (offerId) => {
    setOffers(prev => prev.filter(off => off.id !== offerId));
  };

  // ADMIN - REVIEWS CRUD
  const updateReviewStatus = (reviewId, newStatus) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: newStatus } : r));
  };

  const deleteReview = (reviewId) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
  };

  // ADMIN - SETTINGS UPDATE
  const updateStoreSettings = (newSettings) => {
    setStoreSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <CartContext.Provider
      value={{
        // Store config
        storeSettings,
        updateStoreSettings,
        activeWhatsAppNumber,

        // Data lists
        products,
        categories,
        orders,
        offers,
        reviews,

        // Cart & Wishlist
        cart,
        wishlist,
        cartTotal,
        cartItemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        generateWhatsAppMessage,
        getWhatsAppUrl,

        // Navigation
        activePage,
        adminTab,
        setAdminTab,
        selectedCategory,
        selectedProduct,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        lastOrder,
        setLastOrder,
        navigate,

        // User Auth
        user,
        registeredUsers,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        loginUser,
        registerUser,
        logoutUser,
        openAuthModal,

        // Admin Auth
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,

        // Admin Product Actions
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStatus,

        // Admin Category Actions
        addCategory,
        updateCategory,
        deleteCategory,

        // Admin Order Actions
        createNewOrder,
        updateOrderStatus,
        deleteOrder,

        // Admin Offer Actions
        addOffer,
        updateOffer,
        deleteOffer,

        // Admin Review Actions
        updateReviewStatus,
        deleteReview
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
