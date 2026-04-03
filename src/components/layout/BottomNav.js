import React from 'react';

export default function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'dashboard', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>, label: 'Home' },
    { id: 'policy', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, label: 'Policy' },
    { id: 'simulate', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, label: 'Sim' },
    { id: 'history', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, label: 'History' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-6 left-6 right-6 z-[100] h-20 glass-card bg-[#0a0f1e]/80 border-white/10 flex items-center justify-around px-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange && onTabChange(tab.id)}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${
            activeTab === tab.id ? 'text-blue-500 scale-110' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          {tab.icon}
          <span className="text-[10px] font-black uppercase tracking-widest leading-none">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
