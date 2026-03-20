import { useState } from "react";

export default function App() {
  const [orders, setOrders] = useState(20);
  const [risk, setRisk] = useState("Low");
  const [score, setScore] = useState(20);
  const [plan, setPlan] = useState(null);
  const [logs, setLogs] = useState([]);

  const simulate = () => {
    if (!plan) {
      alert("Please select a plan first");
      return;
    }

    setOrders(5);
    setRisk("High");
    setScore(85);

    setLogs([
      "Rain threshold exceeded",
      "Orders dropped by 75%",
      "AI verified income loss",
      "Fraud check passed",
      "₹300 payout credited"
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-8 py-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold">ZeroClaim AI</h1>
            <p className="text-gray-400 text-sm">
              No Claims. No Forms. Instant Protection
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-400">Rahul</span>
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* USER */}
          <div className="card">
            <h3 className="card-title">User</h3>
            <p>Weekly: ₹5000</p>
            <p>Orders: {orders}</p>
            <p className={risk === "High" ? "text-red-400" : ""}>
              Risk: {risk}
            </p>
            <p>AI Score: {score}/100</p>
            <p>Plan: {plan ? `₹${plan}/week` : "None"}</p>
          </div>

          {/* PLANS */}
          <div className="card">
            <h3 className="card-title">Weekly Plans</h3>

            <div className="flex gap-2 mt-2">
              {[20, 35, 50].map((p) => (
                <button
                  key={p}
                  onClick={() => setPlan(p)}
                  className={`btn ${
                    plan === p ? "bg-green-600" : ""
                  }`}
                >
                  ₹{p}
                </button>
              ))}
            </div>
          </div>

          {/* AI ENGINE */}
          <div className="card">
            <h3 className="card-title">AI Engine</h3>
            <p>Rain: {score > 50 ? 80 : 20} mm</p>
            <p>Drop: {score > 50 ? "75%" : "0%"}</p>
            <p className="text-yellow-400">
              {score > 50 ? "Trigger Claim" : "Normal"}
            </p>
          </div>

          {/* SIMULATION */}
          <div className="card">
            <h3 className="card-title">Simulation</h3>

            <button onClick={simulate} className="btn mt-2">
              Simulate Rain
            </button>

            <p className="mt-2">Expected: ₹500</p>
            <p>Actual: ₹{score > 50 ? 150 : 500}</p>

            {score > 50 && (
              <>
                <p className="text-yellow-400 mt-2">
                  Auto Claim Triggered
                </p>
                <p className="text-green-400">
                  ₹300 Credited
                </p>
              </>
            )}
          </div>
        </div>

        {/* SECOND ROW */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">

          {/* TIMELINE */}
          <div className="card">
            <h3 className="card-title">Claim Timeline</h3>
            {logs.map((log, index) => (
              <p key={index} className="text-gray-300">
                {log}
              </p>
            ))}
          </div>

          {/* ADMIN */}
          <div className="card">
            <h3 className="card-title">Admin Dashboard</h3>
            <p>Claims: 120</p>
            <p>Fraud Alerts: 3</p>
            <p>Zone: Vijayawada</p>
          </div>
        </div>
      </div>
    </div>
  );
}