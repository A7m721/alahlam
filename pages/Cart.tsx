import React, { useState } from 'react';
import { Trash2, CheckCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, totalPrice, placeOrder } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    placeOrder();
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    navigate('/orders'); // Redirect to order history to see the new order
  };

  return (
    <div className="bg-black h-[100dvh] flex flex-col relative">
      {/* Header */}
      <div className="px-4 py-4 flex items-center justify-center relative border-b border-white/5 bg-black/50 backdrop-blur-sm z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-4 p-2 text-white hover:text-gold transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-gold text-xl font-bold font-serif tracking-wide">MY ORDER</h1>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 px-4 overflow-y-auto w-full max-w-3xl mx-auto py-4">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
             <p>Your cart is empty.</p>
             <button onClick={() => navigate('/home')} className="mt-4 text-gold hover:underline">Browse Menu</button>
          </div>
        ) : (
          <div className="space-y-4 pb-4">
            {cart.map((item, index) => (
              <div key={`${item.meal.id}-${index}`} className="flex items-center bg-dark p-3 rounded-2xl border border-white/5">
                <img src={item.meal.image} alt={item.meal.title} className="w-16 h-16 rounded-xl object-cover" />
                <div className="ml-4 flex-1">
                  <h3 className="text-white font-bold text-base font-serif line-clamp-1">{item.meal.title}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-gold font-bold">${item.meal.price * item.qty}</p>
                    <div className="flex items-center text-gray-400 text-xs">
                        <span>Qty: {item.qty}</span>
                    </div>
                  </div>
                </div>
                <button 
                    onClick={() => removeFromCart(item.meal.id)}
                    className="p-3 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                >
                    <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Bottom Section */}
      {cart.length > 0 && (
        <div className="bg-dark p-6 rounded-t-[30px] border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] w-full z-20">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-between items-end mb-6">
                  <span className="text-gray-400 text-lg">Total</span>
                  <span className="text-gold text-3xl font-bold font-serif">${totalPrice}</span>
              </div>
              <Button fullWidth onClick={handleCheckout} className="py-4 text-lg shadow-gold/20">
                  Place Order
              </Button>
            </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-dark p-8 rounded-3xl border border-gold/20 max-w-sm w-full text-center animate-in fade-in zoom-in duration-300">
                <CheckCircle size={64} className="text-gold mx-auto mb-6" />
                <h2 className="text-white text-2xl font-bold mb-2">Order Placed!</h2>
                <p className="text-gray-400 mb-8">You can track your order in Order History.</p>
                <Button fullWidth onClick={handleCloseSuccess}>
                    View Orders
                </Button>
            </div>
        </div>
      )}
    </div>
  );
};