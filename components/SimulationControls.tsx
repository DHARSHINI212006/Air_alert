
import React from 'react';

interface Props {
  currentValue: number;
  onChange: (val: number) => void;
}

const SimulationControls: React.FC<Props> = ({ currentValue, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] uppercase font-black text-white/50 hidden sm:inline">Simulate Sensor</span>
      <div className="flex bg-black/20 p-1 rounded-full gap-1">
        <button 
          onClick={() => onChange(2)}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${currentValue < 5 ? 'bg-white text-emerald-600' : 'text-white'}`}
        >
          OK
        </button>
        <button 
          onClick={() => onChange(7)}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${currentValue >= 5 && currentValue < 10 ? 'bg-white text-amber-600' : 'text-white'}`}
        >
          WARNING
        </button>
        <button 
          onClick={() => onChange(12)}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${currentValue >= 10 ? 'bg-white text-rose-600' : 'text-white'}`}
        >
          BAD
        </button>
      </div>
    </div>
  );
};

export default SimulationControls;
