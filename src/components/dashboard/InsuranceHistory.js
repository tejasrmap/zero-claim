import React from 'react';

export default function InsuranceHistory({ history }) {
  return (
    <div className="pro-card flex flex-col bg-gradient-to-br from-slate-900 to-black/50 border-white/5 h-full min-h-[500px]">
      <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0a0f1e]/50">
        <div className="space-y-1">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-none">Insurance Registry</h4>
          <p className="text-xl font-black text-white tracking-tighter uppercase italic">Protection History</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
           <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
           <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest leading-none">Sync Live</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {!history || history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30 py-24">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-white mb-2">No Historical Data</p>
              <p className="text-[10px] font-bold text-slate-500 max-w-[200px] mx-auto">Select a protection policy to initialize your security ledger.</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {history.map((record, i) => (
              <div key={i} className="p-6 transition-all hover:bg-white/[0.02] group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                      record.status === 'Active' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-slate-800 text-slate-500 border border-white/5'
                    }`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-black text-white uppercase italic">{record.planName}</p>
                        {record.status === 'Active' && <span className="px-1.5 py-0.5 bg-emerald-500 text-[8px] font-black uppercase rounded text-white tracking-widest animate-pulse">Live</span>}
                      </div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">ID: {record.id}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:flex sm:items-center gap-6 sm:gap-10">
                    <div className="text-left sm:text-right">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] mb-1">Activation</p>
                       <p className="text-[11px] font-bold text-slate-300">{record.date}</p>
                    </div>
                    <div className="text-left sm:text-right">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] mb-1">Premium</p>
                       <p className="text-[11px] font-bold text-white">₹{record.premium}</p>
                    </div>
                    <div className="text-left sm:text-right hidden sm:block">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] mb-1">Coverage</p>
                       <p className="text-[11px] font-bold text-emerald-400">₹{record.coverage}</p>
                    </div>
                    <div className="text-left sm:text-right min-w-[80px]">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] mb-1">Claims</p>
                       <p className={`text-[11px] font-black ${record.claims > 0 ? 'text-blue-500' : 'text-slate-700'}`}>
                         {record.claims > 0 ? `₹${record.claims} Payout` : 'None'}
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-white/5 bg-black/20 text-center">
         <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest italic opacity-40">Blockchain Verified Policy Registry • Advanced Parametric Engine v2.4</p>
      </div>
    </div>
  );
}
