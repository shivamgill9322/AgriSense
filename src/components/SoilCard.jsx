import React from 'react';
import { Activity, ShieldCheck, AlertCircle, Droplets, Gauge, Info } from 'lucide-react';

export default function SoilCard({ analysis }) {
  if (!analysis) return null;

  const { overallScore, metrics, soilType } = analysis;

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-agri-600/50 shadow-2xl space-y-6 animate-in fade-in duration-300">
      
      {/* Header Score Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-agri-800/60 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-agri-900 text-neon-green text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-agri-500/40 tracking-wider">
              SOIL HEALTH DIAGNOSTIC
            </span>
            <span className="text-xs text-gray-400 font-semibold">
              Classification: {soilType}
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
            Soil Quality Assessment
          </h2>
        </div>

        {/* Health Score Circle / Badge */}
        <div className="bg-gradient-to-br from-agri-950 via-dark-card to-agri-900 px-6 py-3.5 rounded-2xl border border-agri-500/50 flex items-center space-x-4 shadow-xl">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle cx="24" cy="24" r="20" stroke="#1f3324" strokeWidth="4" fill="transparent" />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="#70e000"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray="125.6"
                strokeDashoffset={125.6 - (125.6 * overallScore) / 100}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <span className="absolute font-display font-extrabold text-sm text-white">{overallScore}</span>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
              Health Index
            </div>
            <div className="font-display font-bold text-lg text-neon-green">
              {overallScore >= 85 ? 'Optimal Health' : overallScore >= 70 ? 'Good Condition' : 'Needs Amendment'}
            </div>
          </div>
        </div>
      </div>

      {/* 5 Soil Characteristic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* pH Card */}
        <div className="p-5 rounded-2xl bg-dark-surface/80 border border-agri-800/50 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">pH Level</span>
            <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${metrics.ph.badgeBg} ${metrics.ph.color}`}>
              {metrics.ph.status}
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display font-extrabold text-3xl text-white">{metrics.ph.value}</span>
            <span className="text-xs text-gray-400">pH Index</span>
          </div>
          <p className="text-[11px] text-gray-300 leading-relaxed pt-1 border-t border-agri-900/60">
            {metrics.ph.advice}
          </p>
        </div>

        {/* Nitrogen Card */}
        <div className="p-5 rounded-2xl bg-dark-surface/80 border border-agri-800/50 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nitrogen (N)</span>
            <span className={`text-xs font-extrabold ${metrics.nitrogen.color}`}>
              {metrics.nitrogen.status}
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display font-extrabold text-3xl text-white">{metrics.nitrogen.value}</span>
            <span className="text-xs text-gray-400">mg / kg</span>
          </div>
          <div className="w-full bg-dark-bg h-1.5 rounded-full overflow-hidden">
            <div className="bg-neon-green h-full rounded-full" style={{ width: `${Math.min(100, (metrics.nitrogen.value / 100) * 100)}%` }} />
          </div>
          <p className="text-[11px] text-gray-300 leading-relaxed">
            {metrics.nitrogen.advice}
          </p>
        </div>

        {/* Phosphorus Card */}
        <div className="p-5 rounded-2xl bg-dark-surface/80 border border-agri-800/50 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phosphorus (P)</span>
            <span className={`text-xs font-extrabold ${metrics.phosphorus.color}`}>
              {metrics.phosphorus.status}
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display font-extrabold text-3xl text-white">{metrics.phosphorus.value}</span>
            <span className="text-xs text-gray-400">mg / kg</span>
          </div>
          <div className="w-full bg-dark-bg h-1.5 rounded-full overflow-hidden">
            <div className="bg-agri-400 h-full rounded-full" style={{ width: `${Math.min(100, (metrics.phosphorus.value / 80) * 100)}%` }} />
          </div>
          <p className="text-[11px] text-gray-300 leading-relaxed">
            {metrics.phosphorus.advice}
          </p>
        </div>

        {/* Potassium Card */}
        <div className="p-5 rounded-2xl bg-dark-surface/80 border border-agri-800/50 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Potassium (K)</span>
            <span className={`text-xs font-extrabold ${metrics.potassium.color}`}>
              {metrics.potassium.status}
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display font-extrabold text-3xl text-white">{metrics.potassium.value}</span>
            <span className="text-xs text-gray-400">mg / kg</span>
          </div>
          <div className="w-full bg-dark-bg h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-400 h-full rounded-full" style={{ width: `${Math.min(100, (metrics.potassium.value / 100) * 100)}%` }} />
          </div>
          <p className="text-[11px] text-gray-300 leading-relaxed">
            {metrics.potassium.advice}
          </p>
        </div>

        {/* Moisture Card */}
        <div className="p-5 rounded-2xl bg-dark-surface/80 border border-agri-800/50 space-y-3 sm:col-span-2 lg:col-span-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center space-x-1">
              <Droplets className="w-4 h-4 text-blue-400" />
              <span>Soil Moisture Hydration</span>
            </span>
            <span className={`text-xs font-extrabold ${metrics.moisture.color}`}>
              {metrics.moisture.status} ({metrics.moisture.value}%)
            </span>
          </div>
          <div className="w-full bg-dark-bg h-2 rounded-full overflow-hidden p-0.5 border border-agri-800/40">
            <div className="bg-gradient-to-r from-blue-500 to-neon-green h-full rounded-full transition-all duration-700" style={{ width: `${metrics.moisture.value}%` }} />
          </div>
          <p className="text-[11px] text-gray-300 leading-relaxed">
            {metrics.moisture.advice}
          </p>
        </div>

      </div>

    </div>
  );
}
