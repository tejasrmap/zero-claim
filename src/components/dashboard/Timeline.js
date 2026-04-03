import React from 'react';

export default function Timeline({ events, fullHeight }) {
  return (
    <div className={`pro-card flex flex-col bg-gradient-to-br from-slate-900 to-black/50 border-white/5 ${fullHeight ? 'min-h-[60vh]' : 'h-full max-h-[500px]'}`}>
      <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0a0f1e]/50">
        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-none">Security Telemetry</h4>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></div>
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
        {!events.length ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30 py-20">
            <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-[10px] font-black uppercase tracking-widest leading-none">Awaiting System Sync</p>
          </div>
        ) : (
          events.map((event, i) => (
            <div key={i} className="flex gap-5 group animate-in fade-in slide-in-from-left-2 duration-300">
              <div className="flex flex-col items-center shrink-0">
                <div className={`w-2 h-2 rounded-full mt-1.5 border border-white/10 ${
                  event.includes('Payout') || event.includes('Approved') 
                    ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' 
                    : event.includes('Trigger') || event.includes('Loss')
                    ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]'
                    : 'bg-blue-500'
                }`}></div>
                {i !== events.length - 1 && <div className="w-px h-full bg-white/5 my-2"></div>}
              </div>
              <div className="pb-2">
                <p className="text-[12px] font-bold text-slate-300 leading-snug group-hover:text-white transition-colors">{event}</p>
                <div className="flex items-center gap-2 mt-1.5 opacity-40">
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Verified</span>
                   <div className="w-1 h-1 bg-white ring-1 ring-white/10 rounded-full"></div>
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
