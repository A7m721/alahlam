import React from 'react';
import { ArrowLeft, Edit2, LogOut, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const Profile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="relative h-48 bg-[url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1920')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="absolute top-0 left-0 w-full p-4 flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 rounded-full bg-black/30 text-white hover:text-gold transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="ml-4 text-xl font-serif text-white tracking-widest">MY PROFILE</h1>
        </div>
      </div>

      {/* Profile Card */}
      <div className="relative -mt-20 px-6">
        <div className="bg-dark rounded-3xl p-6 border border-white/5 shadow-2xl">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-28 h-28 rounded-full border-4 border-dark p-1 bg-gradient-to-tr from-gold to-yellow-600">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover border-2 border-black"
                />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-gold text-black rounded-full hover:bg-white transition-colors">
                <Edit2 size={16} />
              </button>
            </div>
            
            <h2 className="mt-4 text-2xl font-bold text-white font-serif">Ahmed Ramadan</h2>
            <p className="text-gold font-medium">Gold Member</p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="p-3 rounded-full bg-black/40 text-gold">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                <p className="text-white font-medium">ahmed.ramadan@example.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="p-3 rounded-full bg-black/40 text-gold">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Phone</p>
                <p className="text-white font-medium">+971 50 123 4567</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="p-3 rounded-full bg-black/40 text-gold">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Address</p>
                <p className="text-white font-medium">Dubai Marina, Elite Residence, Apt 4502</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button className="w-full py-4 flex items-center justify-center space-x-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors font-bold">
              <LogOut size={20} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};