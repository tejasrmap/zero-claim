import React from 'react';
import RazorpayButton from './RazorpayButton';

export default function PlanSelector({ selectedPlan, onSelect }) {
  const plans = [
    { id: 'standard', name: 'Standard', price: 29, coverage: 5000, desc: 'Basic Rain & Heat Protection', buttonId: 'pl_SZ85n1VUKPNfjP' },
    { id: 'pro', name: 'Elite Plus', price: 49, coverage: 12000, desc: 'Full Disruption & Accident Support', buttonId: 'pl_SZ87DmkDu9qPn5' },
  ];

  return (
    <div className="pro-card p-6 bg-[#0a0f1e]/50 border-white/5 h-full">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-1">
          <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] leading-none text-blue-400">Coverage Tiers</h4>
          <p className="text-xl font-black text-white tracking-tighter uppercase italic">Select Protection</p>
        </div>
        <svg className="w-8 h-8 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
      </div>

      <div className="space-y-4">
        {plans.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 group ${
              selectedPlan?.id === p.id
                ? 'bg-blue-600/10 border-blue-500 shadow-xl shadow-blue-500/5'
                : 'bg-[#0f172a]/50 border-white/5 hover:border-white/10'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                 <p className="text-md font-black text-white leading-tight uppercase italic">{p.name}</p>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{p.desc}</p>
              </div>
              <div className="text-right">
                 <p className="text-xl font-black text-white leading-none">₹{p.price}</p>
                 <p className="text-[9px] font-black text-blue-400 uppercase tracking-tighter mt-1">/ Weekly</p>
              </div>
            </div>
            
            {selectedPlan?.id === p.id && p.buttonId ? (
              <div className="mt-6 flex justify-center animate-premium-fade">
                <RazorpayButton buttonId={p.buttonId} />
              </div>
            ) : (
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                  <div className="flex gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                    <div className="w-1 h-1 rounded-full bg-blue-500/30"></div>
                    <div className="w-1 h-1 rounded-full bg-blue-500/30"></div>
                  </div>
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">₹{p.coverage} Coverage</p>
                </div>
            )}
          </button>
        ))}
      </div>
      
      <p className="mt-6 text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] text-center italic opacity-40">
        * Hyper-local risk adjustments applied at checkout
      </p>
    </div>
  );
}
