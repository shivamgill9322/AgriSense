import React, { useState, useEffect } from 'react';
import { Sliders, Sparkles, Activity, CheckCircle2 } from 'lucide-react';
import { SOIL_TYPES_DATA } from '../data/soilTypesData';

export default function SoilForm({ onAnalyze, initialValues = null }) {
  const [soilType, setSoilType] = useState(initialValues?.soilType || 'Loamy');
  const [ph, setPh] = useState(initialValues?.ph ?? 6.5);
  const [nitrogen, setNitrogen] = useState(initialValues?.nitrogen ?? 45);
  const [phosphorus, setPhosphorus] = useState(initialValues?.phosphorus ?? 30);
  const [potassium, setPotassium] = useState(initialValues?.potassium ?? 40);
  const [moisture, setMoisture] = useState(initialValues?.moisture ?? 55);

  const presets = [
    { label: 'Optimal Fertile Loam', type: 'Loamy', ph: 6.5, n: 55, p: 35, k: 45, m: 60 },
    { label: 'High Moisture Clay Field', type: 'Clay', ph: 6.2, n: 70, p: 40, k: 55, m: 80 },
    { label: 'Light Sandy Soil', type: 'Sandy Loam', ph: 6.0, n: 30, p: 25, k: 30, m: 45 },
    { label: 'Acidic Red Soil', type: 'Red Soil', ph: 5.2, n: 25, p: 18, k: 25, m: 40 },
    { label: 'Alkaline Black Soil', type: 'Black Soil (Regur)', ph: 7.8, n: 50, p: 30, k: 60, m: 65 },
  ];

  // Auto-trigger analysis whenever any parameter changes
  useEffect(() => {
    if (onAnalyze) {
      onAnalyze({
        soilType,
        ph: parseFloat(ph),
        nitrogen: parseInt(nitrogen, 10),
        phosphorus: parseInt(phosphorus, 10),
        potassium: parseInt(potassium, 10),
        moisture: parseInt(moisture, 10)
      });
    }
  }, [soilType, ph, nitrogen, phosphorus, potassium, moisture]);

  const applyPreset = (preset) => {
    setSoilType(preset.type);
    setPh(preset.ph);
    setNitrogen(preset.n);
    setPhosphorus(preset.p);
    setPotassium(preset.k);
    setMoisture(preset.m);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAnalyze) {
      onAnalyze({
        soilType,
        ph: parseFloat(ph),
        nitrogen: parseInt(nitrogen, 10),
        phosphorus: parseInt(phosphorus, 10),
        potassium: parseInt(potassium, 10),
        moisture: parseInt(moisture, 10)
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-agri-600/50 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-agri-800/60 pb-4">
        <div>
          <h3 className="font-display font-bold text-xl text-white flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-neon-green" />
            <span>Enter Soil Parameters</span>
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Real-time update: adjust parameters to instantly see updated recommendations
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => applyPreset(preset)}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-dark-surface border border-agri-700/50 hover:border-neon-green text-gray-300 hover:text-white transition-all flex items-center space-x-1"
            >
              <Sparkles className="w-3 h-3 text-neon-green" />
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Soil Type Select */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
            Soil Type Classification
          </label>
          <select
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
            className="w-full glass-input px-4 py-3 rounded-2xl text-sm font-semibold cursor-pointer"
          >
            {SOIL_TYPES_DATA.map((st) => (
              <option key={st.id} value={st.id} className="bg-dark-card text-white">
                {st.name} ({st.tag})
              </option>
            ))}
          </select>
          <p className="text-[11px] text-gray-400">
            {SOIL_TYPES_DATA.find(s => s.id === soilType)?.description}
          </p>
        </div>

        {/* pH Level Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-300 uppercase tracking-wider">
            <span>pH Level (Acidity / Alkalinity)</span>
            <span className="text-neon-green font-display text-base font-extrabold">{ph}</span>
          </div>
          <input
            type="range"
            min="4.0"
            max="9.0"
            step="0.1"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
            className="w-full h-2 bg-dark-bg rounded-lg appearance-none cursor-pointer accent-neon-green"
          />
          <div className="flex justify-between text-[10px] text-gray-500 font-semibold">
            <span>4.0 (Acidic)</span>
            <span className="text-agri-400">6.5 (Optimal)</span>
            <span>9.0 (Alkaline)</span>
          </div>
        </div>

        {/* Nitrogen (N) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-300 uppercase tracking-wider">
            <span>Nitrogen (N) Content</span>
            <span className="text-neon-green font-display text-base font-extrabold">{nitrogen} <span className="text-[10px] text-gray-400">mg/kg</span></span>
          </div>
          <input
            type="range"
            min="0"
            max="120"
            value={nitrogen}
            onChange={(e) => setNitrogen(e.target.value)}
            className="w-full h-2 bg-dark-bg rounded-lg appearance-none cursor-pointer accent-neon-green"
          />
          <div className="flex justify-between text-[10px] text-gray-500 font-semibold">
            <span>Low (&lt;30)</span>
            <span className="text-agri-400">Optimal (40 - 75)</span>
            <span>High (&gt;80)</span>
          </div>
        </div>

        {/* Phosphorus (P) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-300 uppercase tracking-wider">
            <span>Phosphorus (P) Content</span>
            <span className="text-neon-green font-display text-base font-extrabold">{phosphorus} <span className="text-[10px] text-gray-400">mg/kg</span></span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={phosphorus}
            onChange={(e) => setPhosphorus(e.target.value)}
            className="w-full h-2 bg-dark-bg rounded-lg appearance-none cursor-pointer accent-neon-green"
          />
          <div className="flex justify-between text-[10px] text-gray-500 font-semibold">
            <span>Low (&lt;20)</span>
            <span className="text-agri-400">Optimal (25 - 50)</span>
            <span>High (&gt;60)</span>
          </div>
        </div>

        {/* Potassium (K) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-300 uppercase tracking-wider">
            <span>Potassium (K) Content</span>
            <span className="text-neon-green font-display text-base font-extrabold">{potassium} <span className="text-[10px] text-gray-400">mg/kg</span></span>
          </div>
          <input
            type="range"
            min="0"
            max="120"
            value={potassium}
            onChange={(e) => setPotassium(e.target.value)}
            className="w-full h-2 bg-dark-bg rounded-lg appearance-none cursor-pointer accent-neon-green"
          />
          <div className="flex justify-between text-[10px] text-gray-500 font-semibold">
            <span>Deficient (&lt;25)</span>
            <span className="text-agri-400">Optimal (30 - 65)</span>
            <span>High (&gt;80)</span>
          </div>
        </div>

        {/* Moisture % */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-300 uppercase tracking-wider">
            <span>Soil Moisture Level</span>
            <span className="text-blue-400 font-display text-base font-extrabold">{moisture}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={moisture}
            onChange={(e) => setMoisture(e.target.value)}
            className="w-full h-2 bg-dark-bg rounded-lg appearance-none cursor-pointer accent-blue-400"
          />
          <div className="flex justify-between text-[10px] text-gray-500 font-semibold">
            <span>Dry (&lt;35%)</span>
            <span className="text-blue-400">Balanced (45 - 70%)</span>
            <span>Saturated (&gt;80%)</span>
          </div>
        </div>

      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-agri-600 to-agri-500 hover:from-agri-500 hover:to-neon-lime hover:text-black text-white font-display font-extrabold text-sm shadow-xl shadow-agri-900/80 transition-all flex items-center justify-center space-x-2 border border-agri-400/40"
        >
          <Activity className="w-4 h-4" />
          <span>Apply Parameters & View Updated Analysis</span>
        </button>
      </div>

    </form>
  );
}
