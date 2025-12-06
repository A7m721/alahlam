import React from 'react';
import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Home as HomeIcon, ShoppingCart } from 'lucide-react';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { Details } from './pages/Details';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { OrderHistory } from './pages/OrderHistory';
import { Favorites } from './pages/Favorites';
import { Settings } from './pages/Settings';
import { Drawer } from './components/Drawer';
import { CartProvider, useCart } from './context/CartContext';

// Navigation Bar Component
const BottomNav = () => {
  const location = useLocation();
  const { itemsCount } = useCart();
  
  // Hide bottom nav on onboarding, details, cart and secondary pages
  const hideNavRoutes = ['/', '/details', '/profile', '/orders', '/favorites', '/settings', '/cart'];
  const shouldHide = hideNavRoutes.some(route => location.pathname === '/' || location.pathname.startsWith(route) && route !== '/');

  if (shouldHide) return null;

  return (
    <div className="fixed bottom-0 w-full bg-dark border-t border-white/5 py-3 pb-6 md:pb-3 px-6 z-30">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <Link to="/home" className={`flex flex-col items-center ${location.pathname === '/home' ? 'text-gold' : 'text-gray-500'}`}>
           <HomeIcon size={28} />
           <span className="text-xs mt-1 font-medium">Home</span>
        </Link>
        <Link to="/cart" className={`relative flex flex-col items-center ${location.pathname === '/cart' ? 'text-gold' : 'text-gray-500'}`}>
           <div className="relative">
             <ShoppingCart size={28} />
             {itemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-dark">
                    {itemsCount}
                </span>
             )}
           </div>
           <span className="text-xs mt-1 font-medium">Cart</span>
        </Link>
      </div>
    </div>
  );
};

const AppContent = () => {
  return (
    <>
      <Drawer />
      <div className="min-h-screen bg-black text-white font-sans selection:bg-gold selection:text-black">
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
      <BottomNav />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </CartProvider>
  );
}

export default App;