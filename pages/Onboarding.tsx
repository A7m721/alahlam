import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1920')] bg-cover bg-center"
      ></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 pb-12 z-10 max-w-md mx-auto md:max-w-none md:mx-0">
        <div className="md:ml-20 md:mb-20">
          <p className="text-white/70 text-lg tracking-[0.2em] mb-2 uppercase">Welcome to</p>
          <h1 className="text-gold text-6xl md:text-8xl font-black font-serif mb-4 leading-tight">
            AL AHLAM
          </h1>
          <p className="text-white text-lg md:text-xl font-light leading-relaxed max-w-md mb-12">
            Experience luxury dining managed by Chef Ahmed Ramadan. Taste the difference of perfection.
          </p>
          
          <div className="w-full md:w-64">
            <Button fullWidth onClick={() => navigate('/home')}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};