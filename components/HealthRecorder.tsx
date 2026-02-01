
import React from 'react';

interface Props {
  onRecord: (symptom: string) => void;
}

const HealthRecorder: React.FC<Props> = ({ onRecord }) => {
  const symptoms = [
    { label: 'Headache', icon: '🤕' },
    { label: 'Eye irritation', icon: '👁️' },
    { label: 'Breathing problem', icon: '🫁' },
    { label: 'Nausea', icon: '🤢' }
  ];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl animate-bounce-in border-4 border-rose-100">
      <h2 className="text-xl font-black text-rose-700 text-center mb-6 uppercase tracking-wider leading-tight">
        Feeling discomfort? <br/><span className="text-sm opacity-60">Tap to record anonymously</span>
      </h2>
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        {symptoms.map((s) => (
          <button
            key={s.label}
            onClick={() => onRecord(s.label)}
            className="flex flex-col items-center justify-center bg-gray-50 text-rose-700 py-5 px-2 rounded-2xl active:bg-rose-50 transition-colors border-2 border-transparent active:border-rose-200"
          >
            <span className="text-3xl mb-1">{s.icon}</span>
            <span className="font-black uppercase text-[10px] leading-tight text-center">
              {s.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HealthRecorder;
