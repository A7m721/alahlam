import React from 'react';
import { ArrowLeft, Clock, ChevronRight, CheckCircle, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const OrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const { orders, confirmOrderReceipt } = useCart();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'text-green-400 bg-green-900/30 border-green-800';
      case 'Pending':
        return 'text-yellow-400 bg-yellow-900/30 border-yellow-800';
      case 'Cancelled':
        return 'text-red-400 bg-red-900/30 border-red-800';
      default:
        return 'text-gray-400 bg-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-center">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-4 p-2 text-white hover:text-gold transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-serif text-gold tracking-widest font-bold">ORDER HISTORY</h1>
      </div>

      <div className="p-6 space-y-6 max-w-3xl mx-auto">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Package size={64} className="mb-4 opacity-50" />
            <p className="text-lg">No orders yet</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-dark rounded-2xl border border-white/5 p-5 hover:border-gold/30 transition-all duration-300 relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-white font-bold text-lg">{order.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] border uppercase font-bold tracking-wider ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock size={14} className="mr-1" />
                    {order.date}
                  </div>
                </div>
                <div className="text-gold text-xl font-bold font-serif">${order.total}</div>
              </div>

              <div className="border-t border-white/5 pt-4 mb-4">
                <p className="text-gray-400 text-sm">
                  {order.items.length > 0 
                    ? order.items.map(item => `${item.qty}x ${item.meal.title}`).join(', ') 
                    : 'Historic Order'}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                {order.status === 'Pending' ? (
                  <button 
                    onClick={() => confirmOrderReceipt(order.id)}
                    className="flex items-center space-x-2 bg-gold text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-white transition-colors"
                  >
                    <CheckCircle size={16} />
                    <span>Confirm Receipt</span>
                  </button>
                ) : (
                  <div className="text-green-500 flex items-center text-sm font-medium">
                    <CheckCircle size={16} className="mr-1" /> Completed
                  </div>
                )}
                
                <button className="flex items-center text-gray-500 text-sm hover:text-white transition-colors ml-auto">
                  Details <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};