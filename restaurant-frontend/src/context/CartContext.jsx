// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé au sein d\'un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('burger_house_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Erreur de chargement du panier depuis localStorage:', error);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('burger_house_cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Erreur de sauvegarde du panier:', error);
    }
  }, [cart]);

  // Ajouter un article au panier
  const addToCart = (dish, quantity = 1, selectedOptions = [], customDetails = null) => {
    setCart((prevCart) => {
      // Pour les burgers personnalisés ou avec options spécifiques, on traite souvent comme un nouvel item
      const itemKey = customDetails 
        ? `custom-${Date.now()}` 
        : `${dish._id || dish.id}-${selectedOptions.join('-')}`;

      const existingIndex = prevCart.findIndex((item) => item.key === itemKey);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem = {
          key: itemKey,
          id: dish._id || dish.id,
          name: dish.name,
          price: Number(dish.price),
          image: dish.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
          category: dish.category || 'Burger',
          quantity: quantity,
          selectedOptions: selectedOptions,
          customDetails: customDetails,
        };
        return [...prevCart, newItem];
      }
    });

    toast.success(`${dish.name} ajouté au panier !`, {
      icon: '🍔',
      duration: 2500,
    });
  };

  // Supprimer un article par sa clé
  const removeFromCart = (itemKey) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find((i) => i.key === itemKey);
      if (itemToRemove) {
        toast(`${itemToRemove.name} retiré`, { icon: '🗑️' });
      }
      return prevCart.filter((item) => item.key !== itemKey);
    });
  };

  // Modifier la quantité d'un article
  const updateQuantity = (itemKey, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.key === itemKey) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  // Vider complètement le panier
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('burger_house_cart');
  };

  // Calculs totaux
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
