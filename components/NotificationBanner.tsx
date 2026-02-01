
import React, { useEffect } from 'react';

interface Props {
  title: string;
  body: string;
  onClose: () => void;
}

const NotificationBanner: React.FC<Props> = ({ title, body, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 8000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 inset-x-4 z-[100] animate-slide-down">
      <div className="bg-black text-white p-5 rounded-2xl shadow-2xl flex items-start gap-4 border border-white/20">
        <div className="bg-rose-500 p-2 rounded-lg">
          <span className="text-xl">⚠️</span>
        </div>
        <div className="flex-1">
          <h3 className="font-black text-lg uppercase leading-none mb-1">{title}</h3>
          <p className="text-white/80 font-medium">{body}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-white/40 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default NotificationBanner;
