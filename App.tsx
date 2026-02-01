
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AirStatus, AirConfig, HealthLog } from './types';
import AirStatusScreen from './components/AirStatusScreen';
import HealthRecorder from './components/HealthRecorder';
import NotificationBanner from './components/NotificationBanner';
import SimulationControls from './components/SimulationControls';
import LogHistory from './components/LogHistory';
import SplashScreen from './components/SplashScreen';
import InfoScreen from './components/InfoScreen';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'history' | 'info'>('home');
  const [airValue, setAirValue] = useState<number>(2);
  const [prevStatus, setPrevStatus] = useState<AirStatus>(AirStatus.OK);
  const [notification, setNotification] = useState<{ title: string; body: string } | null>(null);
  const [notifPermission, setNotifPermission] = useState<NotificationPermission>('default');
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [countdown, setCountdown] = useState(15);

  // Fix: Using 'any' instead of 'NodeJS.Timeout' to avoid namespace issues in browser environment
  const timerRef = useRef<any>(null);

  // Splash screen effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Check current permission status
  useEffect(() => {
    if ('Notification' in window) {
      setNotifPermission(Notification.permission);
    }
  }, []);

  const triggerNativeNotification = useCallback((title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        // Fix: Casting options to any because 'renotify' may not be defined in some NotificationOptions types
        new Notification(title, {
          body: body,
          icon: 'https://cdn-icons-png.flaticon.com/512/3208/3208752.png',
          tag: 'air-alert-status', // Prevents flooding by replacing old notifications
          renotify: true
        } as any);
      } catch (e) {
        console.error("Notification failed", e);
      }
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotifPermission(permission);
      if (permission === 'granted') {
        triggerNativeNotification('Alerts Enabled', 'You will now receive phone alerts for changes in air quality.');
      }
    }
  };

  // Simulated Sensor Detection Loop
  useEffect(() => {
    if (!isAutoMode || loading) return;

    const sensorCycle = [2, 7, 12]; // OK -> Warning -> Bad
    let currentIndex = sensorCycle.indexOf(airValue);
    if (currentIndex === -1) currentIndex = 0;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          const nextIndex = (currentIndex + 1) % sensorCycle.length;
          setAirValue(sensorCycle[nextIndex]);
          return 15; // Reset countdown
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isAutoMode, airValue, loading]);

  const getAirConfig = (val: number): AirConfig => {
    if (val < 5) {
      return {
        value: val, status: AirStatus.OK, color: 'bg-emerald-500',
        title: 'Air is OK', subtitle: 'Normal activities allowed'
      };
    } else if (val < 10) {
      return {
        value: val, status: AirStatus.WARNING, color: 'bg-amber-400',
        title: 'Smell Warning', subtitle: 'Close windows soon'
      };
    } else {
      return {
        value: val, status: AirStatus.BAD, color: 'bg-rose-600',
        title: 'BAD AIR NOW ⚠️', subtitle: 'Stay indoors immediately'
      };
    }
  };

  const currentConfig = getAirConfig(airValue);

  // Status change triggers both UI banner and Native Notification
  useEffect(() => {
    if (currentConfig.status !== prevStatus) {
      let title = '';
      let body = '';

      if (currentConfig.status === AirStatus.BAD) {
        title = '🚨 BAD AIR NOW';
        body = 'Sensor detected dangerous levels. Close windows and stay indoors.';
      } else if (currentConfig.status === AirStatus.WARNING) {
        title = '⚠️ Smell Warning';
        body = 'Sulphur levels rising. Smell expected soon.';
      } else if (currentConfig.status === AirStatus.OK && prevStatus !== AirStatus.OK) {
        title = '✅ Air is OK';
        body = 'Pollutants have cleared. Safe to open windows.';
      }

      if (title && body) {
        setNotification({ title, body });
        triggerNativeNotification(title, body);
      }
      setPrevStatus(currentConfig.status);
    }
  }, [currentConfig.status, prevStatus, triggerNativeNotification]);

  const handleLogSymptom = (symptom: string) => {
    const newLog: HealthLog = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      symptom,
      airLevel: airValue
    };
    const existingLogs = JSON.parse(localStorage.getItem('air_alert_logs') || '[]');
    localStorage.setItem('air_alert_logs', JSON.stringify([newLog, ...existingLogs]));
    alert(`Success: ${symptom} recorded.`);
  };

  if (loading) return <SplashScreen />;

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col overflow-hidden select-none">
      {/* Simulation Banner */}
      <div className="bg-black text-[10px] text-white py-1 px-4 flex justify-between items-center font-bold uppercase tracking-widest z-[60]">
        <span>Prototype: Simulated Sensor</span>
        {isAutoMode && (
          <span className="text-emerald-400">Next check in {countdown}s...</span>
        )}
      </div>

      {notification && (
        <NotificationBanner 
          title={notification.title} 
          body={notification.body} 
          onClose={() => setNotification(null)} 
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto pb-24">
        {activeTab === 'home' && (
          <div className="flex flex-col min-h-full">
            <header className="px-6 pt-8 pb-4 flex justify-between items-center bg-white">
               <div>
                 <h1 className="text-2xl font-black text-gray-900 leading-none">AIR ALERT</h1>
                 <p className="text-xs font-bold text-emerald-600 uppercase mt-1 flex items-center gap-1">
                   <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 
                   {isAutoMode ? 'Auto-Detecting' : 'Manual Override'}
                 </p>
               </div>
               <SimulationControls 
                currentValue={airValue} 
                onChange={(v) => {
                  setAirValue(v);
                  setIsAutoMode(false); // Stop auto loop if user interacts
                }} 
               />
            </header>
            
            {/* Permission Prompt Card */}
            {notifPermission !== 'granted' && (
              <div className="mx-4 mb-4 p-4 bg-indigo-50 border-2 border-indigo-200 rounded-2xl flex flex-col items-center text-center shadow-sm">
                <span className="text-2xl mb-2">🔔</span>
                <p className="text-sm font-black text-indigo-900 uppercase">Enable Mobile Alerts</p>
                <p className="text-xs text-indigo-700 mb-3 leading-relaxed">To test phone alerts, tap the button below and allow notifications.</p>
                <button 
                  onClick={requestPermission}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-full font-black text-xs uppercase shadow-lg active:scale-95 transition-transform"
                >
                  Authorize Notifications
                </button>
              </div>
            )}

            <div className={`mx-4 mt-2 p-8 rounded-[2rem] shadow-xl text-white transition-colors duration-500 ${currentConfig.color}`}>
              <AirStatusScreen config={currentConfig} compact />
            </div>

            <div className="px-4 mt-4">
               {!isAutoMode && (
                 <button 
                  onClick={() => {
                    setIsAutoMode(true);
                    setCountdown(15);
                  }}
                  className="w-full bg-gray-200 text-gray-600 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest"
                 >
                   Resume Auto-Detection Loop
                 </button>
               )}
            </div>

            {currentConfig.status === AirStatus.BAD && (
              <div className="px-4 mt-6">
                 <HealthRecorder onRecord={handleLogSymptom} />
              </div>
            )}

            <div className="px-6 mt-8 mb-8">
              <h2 className="text-lg font-black uppercase text-gray-400 mb-4">Current Conditions</h2>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Wind Speed</p>
                    <p className="text-xl font-black">12 km/h</p>
                 </div>
                 <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Direction</p>
                    <p className="text-xl font-black">Northeast</p>
                 </div>
                 <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Mill Status</p>
                    <p className="text-xl font-black text-emerald-500">Active</p>
                 </div>
                 <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Sensor ID</p>
                    <p className="text-xl font-black text-gray-300">#0422</p>
                 </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="p-6">
            <h2 className="text-3xl font-black uppercase mb-6">Past Reports</h2>
            <LogHistory />
          </div>
        )}

        {activeTab === 'info' && <InfoScreen />}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
