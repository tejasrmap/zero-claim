import React from 'react';

export default function PolicyDetails({ user, selectedPlan }) {
  const getPremium = () => {
    if (!selectedPlan) return 0;
    let adjustment = 0;
    if (user.zone === 'Vijayawada Central') adjustment = -2;
    if (user.zone === 'Krishna Waterfront') adjustment = 5;
    return selectedPlan.price + adjustment;
  };

  const premium = getPremium();

  if (!selectedPlan) {
    return (
      <div className="pro-card p-8 flex flex-col items-center justify-center text-center space-y-4 border-dashed border-2 border-white/5 bg-transparent h-full">
         <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
            <svg className="w-6 h-6 shadow-[0_0_15px_rgba(245,158,11,0.3)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
         </div>
         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Security Status: Unprotected</p>
         <h4 className="text-white font-black text-lg leading-tight">No active policy detected for {user.name}</h4>
      </div>
    );
  }

  return (
    <div className="pro-card p-6 bg-gradient-to-br from-[#0f172a] to-black border-blue-500/20 relative overflow-hidden h-full group">
      <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none group-hover:opacity-10 transition-opacity">
         <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
      </div>
      
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="space-y-1">
           <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] leading-none">Protection Console</h4>
           <p className="text-2xl font-black text-white tracking-tighter">System Active</p>
        </div>
        <div className="badge-emerald flex items-center gap-2 py-1.5">
           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
           Encrypted
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="grid grid-cols-2 gap-6">
           <div className="space-y-1">
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Adjusted Prem</p>
              <div className="flex items-center gap-2">
                 <p className="text-lg font-black text-white">₹{premium}</p>
                 <span className={`text-[8px] font-black uppercase px-1 rounded ${premium < selectedPlan.price ? 'bg-emerald-500/10 text-emerald-500' : premium > selectedPlan.price ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-500'}`}>
                    {premium < selectedPlan.price ? 'Disc' : premium > selectedPlan.price ? 'Risk' : 'Std'}
                 </span>
              </div>
           </div>
           <div className="space-y-1 text-right">
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest text-right">Max Coverage</p>
              <p className="text-lg font-black text-emerald-500">₹{selectedPlan.coverage}</p>
           </div>
        </div>

        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-3">
           <div className="flex justify-between items-center">
              <p className="text-[10px] font-bold text-slate-400">Operating Zone</p>
              <p className="text-[10px] font-black text-white uppercase">{user.zone}</p>
           </div>
           <div className="flex justify-between items-center">
              <p className="text-[10px] font-bold text-slate-400">Validity</p>
              <p className="text-[10px] font-black text-blue-500 uppercase">Live 7D Shift</p>
           </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
           <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
           <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] leading-none">AI Parametric Smart Contract Certified</span>
        </div>
      </div>
    </div>
  );
}
