import React, { useState, useEffect } from 'react';

export default function Navbar({ user, onLogout }) {
  const [battery] = useState(84);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="sticky top-0 z-[100] backdrop-blur-xl bg-[#030712]/80 border-b border-white/5 font-outfit">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO & BRAND */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/30">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-lg font-black text-white tracking-tighter leading-none hidden sm:block">ZeroClaim <span className="text-blue-500 uppercase text-[10px] ml-1 tracking-widest">AI</span></h1>
        </div>

        {/* SYSTEM STATUS (Professional Feel) */}
        <div className="flex items-center gap-4 sm:gap-6 px-3 sm:px-6 py-1.5 bg-white/[0.03] border border-white/5 rounded-full">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">GPS Live</span>
           </div>
           <div className="h-3 w-px bg-white/10 hidden md:block"></div>
           <div className="hidden md:flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{battery}% PWR</span>
           </div>
           <div className="h-3 w-px bg-white/10"></div>
           <div className="flex items-center gap-2">
              <span className="text-[9px] sm:text-[10px] font-black text-white tracking-widest leading-none">{time}</span>
           </div>
        </div>

        {/* PROFILE & LOGOUT */}
        <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-white leading-none">{user?.name || 'Rahul K.'}</p>
              <p className="text-[9px] font-bold text-emerald-500 mt-1 uppercase tracking-widest italic">{user?.platform || 'Zomato'} Partner</p>
            </div>
            
            <button 
              onClick={onLogout}
              className="w-9 h-9 rounded-xl bg-[#0f172a] border border-white/10 flex items-center justify-center overflow-hidden shadow-lg hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group relative"
              title="Logout Session"
            >
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Rahul'}`} 
                  alt="User" 
                  className="group-hover:opacity-20 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </div>
            </button>
        </div>
      </div>
    </nav>
  );
}
