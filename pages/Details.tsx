import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Star, Heart, Check } from 'lucide-react';
import { FOOD_MENU } from '../constants';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';

export const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const meal = FOOD_MENU.find(m => m.id === id);

  if (!meal) return <div className="text-white p-10">Meal not found</div>;

  const handleAddToCart = () => {
    addToCart(meal, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-black min-h-screen pb-24">
      {/* Image Header */}
      <div className="relative h-[45vh] w-full">
        <img src={meal.image} alt={meal.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
        
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center">
            <button 
            onClick={() => navigate(-1)} 
            className="p-2 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-colors"
            >
            <ArrowLeft size={24} />
            </button>

            <button 
            onClick={() => toggleFavorite(meal)}
            className="p-2 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-colors"
            >
            <Heart 
                size={24} 
                className={isFavorite(meal.id) ? "fill-gold text-gold" : "text-white"} 
            />
            </button>
        </div>
      </div>

      {/* Content Sheet */}
      <div className="relative -mt-10 bg-dark rounded-t-[40px] px-6 pt-10 pb-6 border-t border-white/5 min-h-[50vh]">
        <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-start mb-2">
                <h1 className="text-white text-3xl md:text-4xl font-bold font-serif leading-tight max-w-[70%]">
                    {meal.title}
                </h1>
                <div className="text-gold text-3xl font-bold">
                    ${meal.price}
                </div>
            </div>

            <p className="text-gray-400 text-lg mb-6">{meal.subtitle}</p>

            <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    <Star size={16} fill="#FFD700" className="text-gold mr-1" />
                    <span className="text-white font-bold">{meal.rating}</span>
                    <span className="text-gray-500 text-xs ml-1">(500+ reviews)</span>
                </div>
                <div className="text-gray-500 text-sm">{meal.category}</div>
            </div>

            <h3 className="text-white text-xl font-bold mb-3">Description</h3>
            <p className="text-gray-400 leading-relaxed mb-10">
                Enjoy a luxurious dining experience with ingredients sourced from the finest locations, prepared exclusively by Chef Ahmed Ramadan's team. This dish balances flavor and texture to perfection.
            </p>

            {/* Bottom Actions */}
            <div className="flex items-center gap-6">
                {/* Quantity */}
                <div className="flex items-center space-x-4 bg-white/5 rounded-2xl p-2 border border-white/10">
                    <button 
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="p-3 hover:bg-white/10 rounded-xl text-white transition-colors"
                    >
                        <Minus size={20} />
                    </button>
                    <span className="text-xl font-bold text-white w-4 text-center">{qty}</span>
                    <button 
                        onClick={() => setQty(qty + 1)}
                        className="p-3 hover:bg-white/10 rounded-xl text-white transition-colors"
                    >
                        <Plus size={20} />
                    </button>
                </div>

                {/* Add Button */}
                <div className="flex-1">
                    <Button fullWidth onClick={handleAddToCart} disabled={added} className={added ? "!bg-green-500 !text-white" : ""}>
                        {added ? (
                            <span className="flex items-center justify-center gap-2">
                                <Check size={20} /> Added
                            </span>
                        ) : "Add to Cart"}
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};