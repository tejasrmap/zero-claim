import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import StatCard from './components/dashboard/StatCard';
import PlanSelector from './components/dashboard/PlanSelector';
import SimulationHub from './components/dashboard/SimulationHub';
import Timeline from './components/dashboard/Timeline';
import Register from './components/auth/Register';
import PolicyDetails from './components/dashboard/PolicyDetails';
import BottomNav from './components/layout/BottomNav';
import InsuranceHistory from './components/dashboard/InsuranceHistory';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('zc_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [registry, setRegistry] = useState(() => {
    const savedRegistry = localStorage.getItem('zc_user_registry');
    return savedRegistry ? JSON.parse(savedRegistry) : [];
  });

  const [orders, setOrders] = useState(24);
  const [risk, setRisk] = useState("Low");
  const [score, setScore] = useState(18);
  const [plan, setPlan] = useState(() => {
    const savedPlan = localStorage.getItem('zc_plan');
    return savedPlan ? JSON.parse(savedPlan) : null;
  });
  const [logs, setLogs] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [insuranceHistory, setInsuranceHistory] = useState(() => {
    const saved = localStorage.getItem('zc_insurance_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeView, setActiveView] = useState('current'); // 'current' or 'history' for desktop

  // Persistence Effects
  useEffect(() => {
    if (user) {
      localStorage.setItem('zc_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('zc_user');
      localStorage.removeItem('zc_plan');
    }
  }, [user]);

  useEffect(() => {
    if (plan) {
      localStorage.setItem('zc_plan', JSON.stringify(plan));
    }
  }, [plan]);

  useEffect(() => {
    localStorage.setItem('zc_user_registry', JSON.stringify(registry));
  }, [registry]);

  useEffect(() => {
    localStorage.setItem('zc_insurance_history', JSON.stringify(insuranceHistory));
  }, [insuranceHistory]);

  // Auto-clear success message
  useEffect(() => {
    if (hasTriggered) {
      const timer = setTimeout(() => setHasTriggered(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [hasTriggered]);

  const handleRegister = (data) => {
    // Check if ID already exists in registry
    if (registry.some(u => u.workerId === data.workerId)) {
      return { success: false, message: "This Partner ID is already registered. Please Login." };
    }
    
    setRegistry(prev => [...prev, data]);
    setUser(data);
    setLogs([`New Partner Registered: ${data.name}`, `Security Password Set: ********`, `Zone: ${data.zone}`]);
    return { success: true };
  };

  const handleLogin = (id, password) => {
    const foundUser = registry.find(u => u.workerId === id);
    
    if (!foundUser) {
      return { success: false, message: "Partner ID not found. Have you registered?" };
    }
    
    if (foundUser.password !== password) {
      return { success: false, message: "Credential mismatch. Authentication failed." };
    }
    
    setUser(foundUser);
    setLogs([`Secure Login Success: ${foundUser.name}`, `Identity Verified (${foundUser.workerId})`, `Session Handshake Confirmed`]);
    return { success: true };
  };

  const handleLogout = () => {
    if (window.confirm("Disconnect from secure environment?")) {
      setUser(null);
      setPlan(null);
      setLogs([]);
      localStorage.removeItem('zc_user');
      localStorage.removeItem('zc_plan');
    }
  };

  const handleSimulate = (intensity, triggerName) => {
    if (!plan) {
      alert("No active policy found. Select a coverage plan first.");
      return;
    }

    setIsSimulating(true);
    setHasTriggered(false);
    
    setTimeout(() => {
      setOrders(prev => Math.max(2, Math.floor(prev / 6)));
      setRisk("Extreme Risk");
      setScore(intensity > 40 ? 94 : 52);
      
      const payout = intensity > 50 ? 500 : 200;
      const newLogs = [
        `Automated Trigger: ${triggerName} detected via Satellite API`,
        `Prediction matched: Income Loss verified in ${user.zone}`,
        "AI Parametric Engine: Zero-touch compliance check PASSED",
        `KYC/Worker ID: Authenticated (${user.workerId})`,
        `Claim Approved: Instant payout initiated to ${user.platform} wallet`,
        `₹${payout} Payout Credited via Smart Contract`
      ];

      setLogs(prev => [...newLogs.reverse(), ...prev]);

      // Update Insurance History with payout
      setInsuranceHistory(prev => {
        const latest = [...prev];
        if (latest.length > 0) {
          latest[0].claims = (latest[0].claims || 0) + payout;
        }
        return latest;
      });
      
      if (intensity > 40) {
        setHasTriggered(true);
      }
      
      setIsSimulating(false);
      setActiveTab('dashboard'); // Switch back to dashboard view on claim
    }, 2500);
  };

  const handleSetPlan = (newPlan) => {
    setPlan(newPlan);
    const historyEntry = {
      id: `POL-${Math.floor(Math.random() * 100000)}`,
      planName: newPlan.name,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      premium: newPlan.price,
      coverage: newPlan.coverage,
      status: 'Active',
      claims: 0
    };
    setInsuranceHistory(prev => [historyEntry, ...prev.map(p => ({...p, status: 'Closed'}))]);
  };

  if (!user) {
    return <Register onRegister={handleRegister} onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] font-outfit pb-24 lg:pb-0">
      <Navbar user={user} onLogout={handleLogout} />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-10 w-full space-y-6 lg:space-y-10">
        
        {/* MOBILE VIEW LOGIC */}
        <div className="lg:hidden">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <section className="grid grid-cols-2 gap-4">
                <StatCard title="Revenue" value="₹4,890" subtext="Predicted" trend={{ type: 'down', value: '4%' }} color="blue" />
                <StatCard title="Velocity" value={orders} subtext={user.platform} color="emerald" />
              </section>
              <PolicyDetails user={user} selectedPlan={plan} />
              <Timeline events={logs} />
            </div>
          )}
          {activeTab === 'policy' && (
            <PlanSelector selectedPlan={plan} onSelect={handleSetPlan} />
          )}
          {activeTab === 'simulate' && (
            <SimulationHub onSimulate={handleSimulate} isSimulating={isSimulating} hasTriggered={hasTriggered} selectedPlan={plan} />
          )}
          {activeTab === 'history' && (
            <InsuranceHistory history={insuranceHistory} />
          )}
        </div>

        {/* DESKTOP VIEW GRID */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Stats & Main Action (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <section className="grid grid-cols-4 gap-6">
              <StatCard title="Weekly Revenue" value="₹4,890" subtext="Predicted vs Actual" trend={{ type: 'down', value: '4%' }} color="blue" />
              <StatCard title="Order Velocity" value={orders} subtext={`Platform: ${user.platform}`} color="emerald" />
              <StatCard title="Localized Risk" value={risk} subtext={user.zone} color={risk === "Extreme Risk" ? "rose" : "blue"} />
              <StatCard title="ML Confidence" value={`${score}/100`} subtext="Detection Score" color="amber" />
            </section>

            <div className="flex justify-between items-center bg-[#0f172a] p-1.5 rounded-2xl border border-white/5 max-w-[340px]">
               <button 
                onClick={() => setActiveView('current')}
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeView === 'current' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
               >
                 Simulation Hub
               </button>
               <button 
                onClick={() => setActiveView('history')}
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeView === 'history' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
               >
                 Insurance Ledger
               </button>
            </div>

            {activeView === 'current' ? (
              <>
                <div className="grid grid-cols-2 gap-8">
                   <PlanSelector selectedPlan={plan} onSelect={handleSetPlan} />
                   <PolicyDetails user={user} selectedPlan={plan} />
                </div>
                
                <SimulationHub onSimulate={handleSimulate} isSimulating={isSimulating} hasTriggered={hasTriggered} selectedPlan={plan} />
              </>
            ) : (
              <InsuranceHistory history={insuranceHistory} />
            )}
          </div>

          {/* Right Column: Identity & Timeline (4 cols) */}
          <div className="lg:col-span-4 space-y-8 h-full">
            <div className="pro-card p-6 bg-gradient-to-br from-slate-900 to-black/50 border-white/5">
                <div className="flex justify-between items-center mb-6">
                   <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-none">Security Identity</h4>
                   <button 
                    onClick={handleLogout}
                    className="text-[9px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-400 transition-colors"
                   >
                     Disconnect
                   </button>
                </div>
                <div className="flex items-center gap-5">
                   <div className="w-16 h-16 rounded-2xl bg-[#0f172a] border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-2xl">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Worker" />
                   </div>
                   <div>
                      <p className="text-white font-black leading-tight text-xl">{user.name}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="badge-blue">{user.platform} Partner</span>
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest italic"># {user.workerId}</span>
                      </div>
                   </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                   <span className="text-slate-500">Protection Status</span>
                   <span className={plan ? "text-emerald-500" : "text-amber-500"}>{plan ? "Active" : "Pending Selection"}</span>
                </div>
            </div>
            <Timeline events={logs} />
          </div>

        </div>

      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      <footer className="hidden lg:block py-10 border-t border-white/5 bg-[#030712]">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
           <p>© 2026 ZeroClaim AI. Advanced Protection Engine.</p>
           <div className="flex gap-10">
               <a href="/" className="hover:text-white transition-colors">Safety SLA</a>
               <a href="/" className="hover:text-white transition-colors">Privacy</a>
               <a href="/" className="hover:text-white transition-colors">Systems</a>
           </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
