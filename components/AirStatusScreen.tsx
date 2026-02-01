
import React from 'react';
import { AirConfig } from '../types';

interface Props {
  config: AirConfig;
  compact?: boolean;
}

const AirStatusScreen: React.FC<Props> = ({ config, compact }) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center text-white ${compact ? '' : 'p-8 flex-1'}`}>
      <h1 className={`${compact ? 'text-4xl' : 'text-7xl sm:text-8xl'} font-black uppercase leading-tight mb-4 drop-shadow-md`}>
        {config.title}
      </h1>
      <p className={`${compact ? 'text-lg' : 'text-2xl sm:text-3xl'} font-medium opacity-90 leading-relaxed max-w-md drop-shadow-sm`}>
        {config.subtitle}
      </p>
    </div>
  );
};

export default AirStatusScreen;
