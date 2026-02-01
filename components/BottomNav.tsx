
import React from 'react';

interface Props {
  activeTab: 'home' | 'history' | 'info';
  setActiveTab: (tab: 'home' | 'history' | 'info') => void;
}

const BottomNav: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'history', label: 'History', icon: '📝' },
    { id: 'info', label: 'Health Info', icon: 'ℹ️' },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 flex justify-around items-center h-20 pb-4 px-6 z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center justify-center flex-1 transition-all ${activeTab === tab.id ? 'text-black scale-110' : 'text-gray-400 opacity-60'}`}
        >
          <span className="text-2xl mb-1">{tab.icon}</span>
          <span className="text-[10px] font-black uppercase tracking-wider">{tab.label}</span>
          {activeTab === tab.id && (
            <div className="w-1 h-1 bg-black rounded-full mt-1" />
          )}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
