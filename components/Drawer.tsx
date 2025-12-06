import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uiEvents } from '../services/navService';
import { X, User, Clock, Heart, Settings, Utensils } from 'lucide-react';

export const Drawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setIsOpen(prev => !prev);
    uiEvents.on('toggleDrawer', handler);
    return () => {
      uiEvents.off('toggleDrawer', handler);
    };
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer Content */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-dark z-50 transform transition-transform duration-300 border-r border-white/10 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="relative h-48 bg-black">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800')] bg-cover opacity-40"></div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="absolute top-4 right-4 text-white hover:text-gold"
          >
            <X size={24} />
          </button>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
             <Utensils className="text-gold mb-3" size={48} />
             <h2 className="text-gold text-2xl font-bold tracking-widest font-serif">AL AHLAM</h2>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <DrawerItem icon={<User size={20} />} label="My Profile" onClick={() => handleNavigate('/profile')} />
          <DrawerItem icon={<Clock size={20} />} label="Order History" onClick={() => handleNavigate('/orders')} />
          <DrawerItem icon={<Heart size={20} />} label="Favorites" onClick={() => handleNavigate('/favorites')} />
          <DrawerItem icon={<Settings size={20} />} label="Settings" onClick={() => handleNavigate('/settings')} />
        </div>

        <div className="absolute bottom-8 left-0 w-full text-center">
           <p className="text-gray-500 text-sm italic">
             Managed by<br />
             <span className="text-gray-400 font-semibold">Ahmed Ramadan</span>
           </p>
        </div>
      </div>
    </>
  );
};

const DrawerItem: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center space-x-4 w-full p-4 text-white hover:bg-white/5 rounded-lg transition-colors group"
  >
    <span className="text-gold group-hover:scale-110 transition-transform">{icon}</span>
    <span className="font-medium text-lg">{label}</span>
  </button>
);