
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-emerald-500 flex flex-col items-center justify-center z-[100]">
      <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl mb-6 animate-bounce">
         <span className="text-5xl">🌬️</span>
      </div>
      <h1 className="text-4xl font-black text-white uppercase tracking-widest">Air Alert</h1>
      <p className="text-white/60 font-bold uppercase mt-2 tracking-widest text-sm italic">Protecting Your Health</p>
      
      <div className="absolute bottom-12 w-12 h-1 w-48 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-white animate-loading-bar" />
      </div>
    </div>
  );
};

export default SplashScreen;
