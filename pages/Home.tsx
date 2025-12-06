import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Star, ArrowRight, Heart, X } from 'lucide-react';
import { FOOD_MENU, CATEGORIES } from '../constants';
import { toggleDrawer } from '../services/navService';
import { useCart } from '../context/CartContext';

export const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toggleFavorite, isFavorite } = useCart();

  const filteredMenu = FOOD_MENU.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-24 min-h-screen bg-black">
      {/* Hero Header */}
      <div className="relative h-[300px] w-full">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1920')] bg-cover bg-center"></div>
         <div className="absolute inset-0 bg-black/50 bg-blend-darken"></div>
         
         {/* Navbar inside Hero */}
         <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-20">
            <button onClick={toggleDrawer} className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-gold backdrop-blur-md transition-colors">
              <Menu size={24} />
            </button>
            <h1 className="text-gold font-serif text-xl tracking-widest font-bold">AL AHLAM</h1>
            
            <div className="relative flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center bg-black/80 backdrop-blur-md rounded-full px-4 py-1 border border-gold/30 absolute right-0 w-64 animate-in fade-in slide-in-from-right-10">
                   <Search size={18} className="text-gold mr-2" />
                   <input 
                      autoFocus
                      type="text" 
                      placeholder="Search menu..." 
                      className="bg-transparent border-none outline-none text-white text-sm w-full placeholder-gray-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                   />
                   <button onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} className="ml-2 text-gray-400 hover:text-white">
                      <X size={18} />
                   </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md transition-colors"
                >
                  <Search size={24} />
                </button>
              )}
            </div>
         </div>

         {/* Hero Text */}
         <div className="absolute bottom-8 left-6 right-6">
            <p className="text-gray-300 text-xs uppercase tracking-wider mb-1">Chef Ahmed Ramadan Recommends</p>
            <h2 className="text-white text-3xl font-bold font-serif">Exquisite Tastes</h2>
         </div>
      </div>

      {/* Categories */}
      <div className="sticky top-0 bg-black z-10 py-4 pl-6 border-b border-white/5 shadow-xl">
        <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-hide pr-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all duration-300 ${
                activeCategory === cat 
                ? 'bg-gold text-black shadow-lg shadow-gold/20 scale-105' 
                : 'bg-dark text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Food List */}
      <div className="px-5 mt-6 space-y-6 max-w-3xl mx-auto">
        {filteredMenu.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>No items found matching "{searchQuery}"</p>
          </div>
        ) : (
          filteredMenu.map(meal => (
            <div key={meal.id} className="relative block group">
              <Link to={`/details/${meal.id}`}>
                <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5 transform group-hover:scale-[1.02] transition-transform duration-300">
                  <img src={meal.image} alt={meal.title} className="w-full h-full object-cover" />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-5">
                    <div className="flex justify-between items-end mb-2">
                      <h3 className="text-white text-2xl font-bold font-serif">{meal.title}</h3>
                      <span className="bg-gold text-black font-bold px-3 py-1 rounded-lg text-sm shadow-lg">
                        ${meal.price}
                      </span>
                    </div>
                    
                    <p className="text-white/70 text-sm mb-4">{meal.subtitle}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gold space-x-1">
                        <Star size={16} fill="#FFD700" />
                        <span className="text-white font-bold">{meal.rating}</span>
                      </div>
                      
                      <div className="flex items-center text-gold font-bold text-sm group-hover:translate-x-1 transition-transform">
                        <span className="mr-1">View Details</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Favorite Button (Outside Link to prevent navigation) */}
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(meal);
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-all z-10"
              >
                <Heart 
                  size={20} 
                  className={isFavorite(meal.id) ? "fill-gold text-gold" : "text-white"} 
                />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};