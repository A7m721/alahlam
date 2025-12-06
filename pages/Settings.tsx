import React, { useState } from 'react';
import { ArrowLeft, Bell, Moon, Shield, Info, ChevronRight, Globe, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-black pb-24">
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-center">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-4 p-2 text-white hover:text-gold transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-serif text-gold tracking-widest font-bold">SETTINGS</h1>
      </div>

      <div className="p-6 max-w-2xl mx-auto space-y-8">
        
        {/* Section 1 */}
        <div>
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 ml-2">Preferences</h3>
          <div className="bg-dark rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Bell size={20} />
                </div>
                <span className="text-white font-medium">Push Notifications</span>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-gold' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${notifications ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <Moon size={20} />
                </div>
                <span className="text-white font-medium">Dark Mode</span>
              </div>
              <span className="text-gray-500 text-sm">Always On</span>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div>
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 ml-2">Account</h3>
          <div className="bg-dark rounded-2xl border border-white/5 overflow-hidden">
            <SettingItem icon={<Lock size={20} />} color="text-green-400" bg="bg-green-500/10" label="Change Password" />
            <div className="border-t border-white/5"></div>
            <SettingItem icon={<Globe size={20} />} color="text-orange-400" bg="bg-orange-500/10" label="Language" value="English" />
            <div className="border-t border-white/5"></div>
            <SettingItem icon={<Shield size={20} />} color="text-red-400" bg="bg-red-500/10" label="Privacy Policy" />
          </div>
        </div>

        {/* Section 3 */}
        <div>
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 ml-2">About</h3>
          <div className="bg-dark rounded-2xl border border-white/5 overflow-hidden">
             <SettingItem icon={<Info size={20} />} color="text-blue-400" bg="bg-blue-500/10" label="Version" value="1.0.0" />
          </div>
        </div>

        <div className="text-center pt-8">
          <p className="text-gray-600 text-sm">AL AHLAM App © 2023</p>
        </div>

      </div>
    </div>
  );
};

const SettingItem: React.FC<{ icon: React.ReactNode; color: string; bg: string; label: string; value?: string }> = ({ icon, color, bg, label, value }) => (
  <button className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors text-left">
    <div className="flex items-center space-x-4">
      <div className={`p-2 rounded-lg ${bg} ${color}`}>
        {icon}
      </div>
      <span className="text-white font-medium">{label}</span>
    </div>
    <div className="flex items-center space-x-2 text-gray-500">
      {value && <span className="text-sm">{value}</span>}
      <ChevronRight size={16} />
    </div>
  </button>
);