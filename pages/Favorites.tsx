import React from 'react';
import { ArrowLeft, Star, ArrowRight, Heart, Trash2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useCart();

  return (
    <div className="min-h-screen bg-black pb-24">
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-center">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-4 p-2 text-white hover:text-gold transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-serif text-gold tracking-widest font-bold">FAVORITES</h1>
      </div>

      <div className="p-6 grid gap-6 max-w-3xl mx-auto">
        {favorites.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center">
            <div className="bg-dark p-6 rounded-full mb-4">
               <Heart size={40} className="text-gray-600" />
            </div>
            <p className="text-gray-400 text-lg">No favorites yet.</p>
            <p className="text-gray-600 text-sm mt-2">Start adding items you love!</p>
            <button 
               onClick={() => navigate('/home')} 
               className="mt-6 text-gold font-bold hover:underline"
            >
               Browse Menu
            </button>
          </div>
        ) : (
          favorites.map((meal) => (
            <div key={meal.id} className="relative group">
              <Link to={`/details/${meal.id}`} className="block">
                <div className="bg-dark rounded-2xl overflow-hidden border border-white/5 flex h-32 hover:border-gold/30 transition-all duration-300">
                  <div className="w-32 h-full relative">
                    <img src={meal.image} alt={meal.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                  
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-white font-bold font-serif text-lg leading-tight">{meal.title}</h3>
                        <div className="flex items-center text-gold text-xs font-bold">
                           <Star size={12} fill="#FFD700" className="mr-1"/> {meal.rating}
                        </div>
                      </div>
                      <p className="text-gray-500 text-xs mt-1 line-clamp-1">{meal.subtitle}</p>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <span className="text-gold font-bold text-lg">${meal.price}</span>
                      <div className="p-2 rounded-full bg-white/5 hover:bg-gold hover:text-black text-white transition-colors">
                         <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Remove from favorites button */}
              <button 
                onClick={() => toggleFavorite(meal)}
                className="absolute top-2 left-2 p-1.5 rounded-full bg-black/60 text-white hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Heart size={16} className="fill-current" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};