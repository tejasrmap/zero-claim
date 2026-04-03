import React, { useState } from 'react';

export default function Register({ onRegister, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    platform: 'Zomato',
    zone: 'Vijayawada Central',
    workerId: '',
    password: '',
  });

  const platforms = [
    { id: 'Zomato', color: '#E23744', icon: '🔴' },
    { id: 'Swiggy', color: '#FC8019', icon: '🟠' },
    { id: 'Dunzo', color: '#00D290', icon: '🟢' },
    { id: 'UberEats', color: '#06C167', icon: '⬛️' },
  ];

  const zones = [
    { id: 'central', name: 'Vijayawada Central', risk: 'Low', discount: 2, desc: 'Safe Zone (Parametric)' },
    { id: 'east', name: 'Benz Circle (East)', risk: 'Medium', discount: 0, desc: 'Mixed Risk Environment' },
    { id: 'flood', name: 'Krishna Waterfront', risk: 'High', discount: -5, desc: 'Flood Prone / Vulnerable' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsValidating(true);

    // Mock network delay for professional feel
    await new Promise(resolve => setTimeout(resolve, 1500));

    let result;
    if (isLogin) {
      result = onLogin(formData.workerId, formData.password);
    } else {
      if (!formData.name || !formData.workerId || !formData.password) {
        setError("All fields are required for new registration.");
        setIsValidating(false);
        return;
      }
      result = onRegister(formData);
    }

    if (!result.success) {
      setError(result.message);
      setIsValidating(false);
    }
  };



  return (
    <div className="min-h-screen bg-[#030712] flex flex-col lg:flex-row font-outfit overflow-hidden">
      
      {/* LEFT SIDE: Brand & Context (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0a0f1e] items-center justify-center relative p-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="relative z-10 space-y-8 max-w-lg">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-600/20">
             <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
             </svg>
          </div>
          <h1 className="text-6xl font-black text-white leading-tight tracking-tighter">
            Zero-Touch <br/>
            <span className="text-blue-500">{isLogin ? 'Login.' : 'Protection.'}</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium leading-relaxed">
            {isLogin 
              ? 'Welcome back. Access your parametric insurance console and real-time security dashboard.'
              : 'Automated insurance for delivery professionals. No claims filing. No paperwork. Just satellite-verified payouts.'}
          </p>
          
          {!isLogin && (
            <div className="flex gap-4 pt-10">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0a0f1e] bg-slate-800 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}99`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm font-bold text-white leading-none">12,400+</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest">Active Partners</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-20 overflow-y-auto">
        <div className="max-w-md w-full space-y-8">
          
          <div className="text-center space-y-4 mb-8">
            <div className="lg:hidden w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl mb-4">
               <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
               </svg>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">Secure Access</h2>
            <div className="flex bg-[#0f172a] p-1 rounded-xl border border-white/5 mx-auto max-w-[280px]">
               <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${isLogin ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
               >
                 Partner Login
               </button>
               <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${!isLogin ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
               >
                 Join Now
               </button>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-[10px] font-black uppercase tracking-widest text-center animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Rahul Kumar"
                    className="auth-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Partner ID</label>
                  <input
                    type="text"
                    required
                    placeholder="WZ-2024"
                    className="auth-input"
                    value={formData.workerId}
                    onChange={(e) => setFormData({ ...formData, workerId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="auth-input"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Primary Platform</label>
                    <select
                      className="auth-input appearance-none"
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    >
                      {platforms.map(p => (
                        <option key={p.id} value={p.id} className="bg-[#0f172a]">{p.id}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Operating Zone (Local Risk)</label>
                    <div className="grid grid-cols-1 gap-2">
                      {zones.map((z) => (
                        <button
                          key={z.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, zone: z.name })}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            formData.zone === z.name
                              ? 'bg-blue-600/10 border-blue-500'
                              : 'bg-white/5 border-transparent hover:border-white/10'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <p className="text-xs font-black text-white">{z.name}</p>
                            <span className="text-[8px] font-black uppercase text-slate-500 tracking-tighter">{z.risk} Risk</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={isValidating}
              className="w-full py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-lg shadow-2xl shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
            >
              {isValidating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span className="uppercase tracking-[0.2em] text-sm">Authenticating...</span>
                </>
              ) : (
                <span className="uppercase tracking-[0.2em] text-sm">{isLogin ? 'Access Console' : 'Initialize Account'}</span>
              )}
            </button>
            
            <p className="text-center text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
              Encrypted Session • Parametric Identity Protocol
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
