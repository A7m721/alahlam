import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { Meal, CartItem, CartContextType, Order } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial state from localStorage if available
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ahlam_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ahlam_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const [favorites, setFavorites] = useState<Meal[]>(() => {
    try {
      const saved = localStorage.getItem('ahlam_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('ahlam_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ahlam_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ahlam_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (meal: Meal, quantity: number = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.meal.id === meal.id);
      if (existing) {
        return prevCart.map((item) =>
          item.meal.id === meal.id ? { ...item, qty: item.qty + quantity } : item
        );
      }
      return [...prevCart, { meal, qty: quantity }];
    });
  };

  const removeFromCart = (mealId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.meal.id !== mealId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.meal.price * item.qty, 0);
  }, [cart]);

  const itemsCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }, [cart]);

  const placeOrder = () => {
    if (cart.length === 0) return;

    const newOrder: Order = {
      id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      total: totalPrice,
      status: 'Pending',
      items: [...cart]
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
  };

  const confirmOrderReceipt = (orderId: string) => {
    setOrders((prev) => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: 'Delivered' } : order
      )
    );
  };

  const toggleFavorite = (meal: Meal) => {
    setFavorites(prev => {
      const exists = prev.some(m => m.id === meal.id);
      if (exists) {
        return prev.filter(m => m.id !== meal.id);
      }
      return [...prev, meal];
    });
  };

  const isFavorite = (mealId: string) => {
    return favorites.some(m => m.id === mealId);
  };

  return (
    <CartContext.Provider
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        totalPrice, 
        itemsCount,
        orders,
        placeOrder,
        confirmOrderReceipt,
        favorites,
        toggleFavorite,
        isFavorite
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};