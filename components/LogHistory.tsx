
import React from 'react';
import { HealthLog } from '../types';

const LogHistory: React.FC = () => {
  const logs: HealthLog[] = JSON.parse(localStorage.getItem('air_alert_logs') || '[]');

  if (logs.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-400 font-bold uppercase">No records found yet.</p>
        <p className="text-gray-500 mt-2">Logs will appear here when you report discomfort during bad air alerts.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <div key={log.id} className="border-b-4 border-gray-100 pb-4">
          <div className="flex justify-between items-start mb-1">
            <span className="text-2xl font-black text-rose-600 uppercase">{log.symptom}</span>
            <span className="bg-gray-100 px-2 py-1 rounded text-[10px] font-black uppercase text-gray-500">
              Sulphur Level: {log.airLevel}
            </span>
          </div>
          <p className="text-gray-500 font-bold">{log.timestamp}</p>
        </div>
      ))}
      <button 
        onClick={() => {
            if(confirm('Clear all history?')) {
                localStorage.removeItem('air_alert_logs');
                window.location.reload();
            }
        }}
        className="w-full py-4 mt-8 border-2 border-red-500 text-red-500 font-black uppercase rounded-xl"
      >
        Clear All History
      </button>
    </div>
  );
};

export default LogHistory;
