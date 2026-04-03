import React from 'react';

export default function StatCard({ title, value, subtext, trend, color = 'blue' }) {
  const colors = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  };

  return (
    <div className="pro-card p-5 pro-card-hover flex flex-col justify-between min-h-[140px] group">
      <div className="flex justify-between items-start">
        <div className="space-y-0.5">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{title}</p>
          <h3 className="text-2xl font-black text-white tracking-tighter group-hover:text-blue-400 transition-colors">{value}</h3>
        </div>
        {trend && (
           <div className={`px-2 py-1 rounded-lg border text-[10px] font-black ${colors[color]}`}>
              {trend.type === 'up' ? '↑' : '↓'} {trend.value}
           </div>
        )}
      </div>
      
      <div className="mt-4 flex items-end justify-between">
        <div className="space-y-1">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{subtext}</p>
           <div className="flex gap-1 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-tighter">Live Sync</span>
           </div>
        </div>
        <div className="flex gap-0.5 items-end h-6 opacity-40 group-hover:opacity-100 transition-opacity">
           {[4,7,3,8,5,10,6].map((h, i) => (
             <div key={i} className={`w-1 rounded-full ${color === 'rose' ? 'bg-rose-500' : 'bg-blue-500'}`} style={{ height: `${h*10}%` }}></div>
           ))}
        </div>
      </div>
    </div>
  );
}
