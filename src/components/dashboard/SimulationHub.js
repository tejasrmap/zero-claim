import React from 'react';

export default function SimulationHub({ onSimulate, isSimulating, hasTriggered, selectedPlan }) {
  const triggers = [
    { id: 'rain', name: 'Heavy Rain', intensity: 45, icon: '🌧️', desc: '> 40mm detected' },
    { id: 'flood', name: 'Water Logging', intensity: 65, icon: '🌊', desc: 'Zone Overflow' },
    { id: 'flash', name: 'Flash Flood', intensity: 85, icon: '🌩️', desc: 'Sudden Catchment' },
    { id: 'storm', name: 'Tropical Storm', intensity: 75, icon: '🌪️', desc: 'Wind > 60km/h' },
    { id: 'heat', name: 'Extreme Heat', intensity: 95, icon: '☀️', desc: 'Temp > 45°C' },
  ];

  return (
    <div className={`pro-card p-6 bg-gradient-to-br from-[#0f172a] to-slate-900 border-white/5 relative overflow-hidden transition-all duration-700 ${!selectedPlan ? 'grayscale-[0.8] opacity-50' : ''}`}>
      
      {!selectedPlan && (
        <div className="absolute inset-0 z-[50] flex flex-col items-center justify-center bg-[#030712]/40 backdrop-blur-[2px]">
           <div className="flex flex-col items-center gap-3 animate-premium-fade text-center p-6 bg-[#0f172a]/80 rounded-2xl border border-white/10 shadow-2xl">
              <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-widest">Simulation Locked</p>
                <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Active Protection Policy Required</p>
              </div>
           </div>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="space-y-1">
          <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] leading-none text-blue-400">Simulation Console</h4>
          <p className="text-xl font-black text-white tracking-tighter uppercase italic">Manual Override</p>
        </div>
        <div className="flex items-center gap-3">
           <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">System Status:</span>
           <div className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ${isSimulating ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-500'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isSimulating ? 'bg-blue-400 animate-pulse' : 'bg-slate-600'}`}></div>
              {isSimulating ? 'Processing' : 'Standby'}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
        {triggers.map((t) => (
          <button
            key={t.id}
            disabled={isSimulating || !selectedPlan}
            onClick={() => onSimulate(t.intensity, t.name)}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 group ${
              isSimulating || !selectedPlan
                ? 'opacity-20 cursor-not-allowed border-transparent' 
                : 'bg-[#1e293b]/50 border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 hover:-translate-y-1 active:scale-95 shadow-lg shadow-black/20'
            }`}
          >
            <span className="text-3xl mb-3 filter grayscale group-hover:grayscale-0 transition-all group-hover:scale-125 duration-300">{t.icon}</span>
            <p className="text-[10px] font-black text-white uppercase tracking-widest text-center leading-tight mb-1">{t.name}</p>
            <p className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter text-center">{t.desc}</p>
          </button>
        ))}
      </div>

      {hasTriggered && (
        <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-4 animate-in fade-in zoom-in duration-500 relative z-10">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          <div>
            <p className="text-sm font-black text-white leading-none">CLAIM AUTOMATICALLY TRIGGERED</p>
            <p className="text-[10px] font-bold text-emerald-500/80 uppercase mt-1 tracking-widest leading-none">Instant Payout Initiated • Zero-Touch Verified</p>
          </div>
        </div>
      )}

      {!hasTriggered && !isSimulating && (
        <div className="mt-8 text-center border-t border-white/5 pt-6 opacity-30">
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] leading-none">Parametric Engine Monitoring for Anomalies</p>
        </div>
      )}
    </div>
  );
}
