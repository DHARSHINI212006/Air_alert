
import React from 'react';

const InfoScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-black uppercase mb-6">Stay Safe</h2>
      
      <div className="space-y-6">
        <section className="bg-white p-6 rounded-2xl border-l-8 border-rose-500 shadow-sm">
          <h3 className="text-xl font-black uppercase mb-2">When Air is Red</h3>
          <ul className="text-gray-600 font-medium space-y-2">
            <li>• Close all windows immediately</li>
            <li>• Use fans to circulate indoor air</li>
            <li>• Avoid heavy exercise</li>
            <li>• Report symptoms in this app</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-2xl border-l-8 border-amber-400 shadow-sm">
          <h3 className="text-xl font-black uppercase mb-2">The Sulphur Smell</h3>
          <p className="text-gray-600 font-medium leading-relaxed">
            The paper mill produces sulphur compounds. While the smell is strong, closing your home helps prevent irritation to your eyes and throat.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-black uppercase mb-2 text-gray-400">Emergency Contacts</h3>
          <div className="space-y-3">
             <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="font-bold">Community Health</span>
                <span className="font-black text-rose-600 underline">555-0199</span>
             </div>
             <div className="flex justify-between items-center py-2">
                <span className="font-bold">Mill Support Line</span>
                <span className="font-black text-emerald-600 underline">555-0212</span>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InfoScreen;
