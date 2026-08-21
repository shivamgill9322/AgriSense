import React from 'react';
import { CheckCircle2, ShieldAlert, Droplets, Thermometer, Calendar, Sprout, Sparkles, ChevronRight, Activity } from 'lucide-react';

export default function CropResult({ result, onViewDetails, onAnalyzeSoil }) {
  if (!result) return null;

  const { crop, confidencePercent, metrics, previewUrl } = result;

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-agri-600/50 shadow-2xl space-y-6 animate-in fade-in duration-300">
      
      {/* Header Result Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-agri-800/60 pb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-agri-600 to-agri-900 border border-neon-green/40 flex items-center justify-center text-3xl shadow-xl flex-shrink-0">
            {crop.icon}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-agri-900 text-neon-green text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-agri-500/40 tracking-wider">
                AI Detected Crop
              </span>
              <span className="text-xs text-gray-400 font-medium">
                {crop.type}
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
              {crop.name}
            </h2>
          </div>
        </div>

        {/* Confidence Badge */}
        <div className="bg-gradient-to-br from-agri-950 via-dark-card to-agri-900 px-5 py-3 rounded-2xl border border-agri-500/50 flex items-center space-x-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-agri-600/30 flex items-center justify-center border border-neon-green/50">
            <CheckCircle2 className="w-6 h-6 text-neon-green" />
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
              Confidence Score
            </div>
            <div className="font-display font-extrabold text-2xl text-neon-green">
              {confidencePercent}%
            </div>
          </div>
        </div>
      </div>

      {/* Grid Specs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Season */}
        <div className="p-4 rounded-2xl bg-dark-surface/80 border border-agri-800/40">
          <div className="flex items-center space-x-2 text-agri-400 text-xs font-semibold mb-1">
            <Calendar className="w-4 h-4 text-neon-green" />
            <span>Growing Season</span>
          </div>
          <div className="font-bold text-sm text-white">{crop.season}</div>
        </div>

        {/* Water */}
        <div className="p-4 rounded-2xl bg-dark-surface/80 border border-agri-800/40">
          <div className="flex items-center space-x-2 text-agri-400 text-xs font-semibold mb-1">
            <Droplets className="w-4 h-4 text-blue-400" />
            <span>Water Requirement</span>
          </div>
          <div className="font-bold text-sm text-white">{crop.waterReq}</div>
        </div>

        {/* Temperature */}
        <div className="p-4 rounded-2xl bg-dark-surface/80 border border-agri-800/40">
          <div className="flex items-center space-x-2 text-agri-400 text-xs font-semibold mb-1">
            <Thermometer className="w-4 h-4 text-amber-400" />
            <span>Temperature</span>
          </div>
          <div className="font-bold text-sm text-white">{crop.temp}</div>
        </div>

        {/* Soil */}
        <div className="p-4 rounded-2xl bg-dark-surface/80 border border-agri-800/40">
          <div className="flex items-center space-x-2 text-agri-400 text-xs font-semibold mb-1">
            <Sprout className="w-4 h-4 text-neon-lime" />
            <span>Target Soil</span>
          </div>
          <div className="font-bold text-xs text-white truncate" title={crop.suitableSoil}>
            {crop.suitableSoil}
          </div>
        </div>
      </div>

      {/* Description & Overview */}
      <div className="p-4 rounded-2xl bg-agri-950/40 border border-agri-800/40 text-xs sm:text-sm text-gray-300 leading-relaxed">
        <p><strong className="text-white">Agronomic Insights:</strong> {crop.description}</p>
      </div>

      {/* Common Diseases & Remedies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-dark-surface/60 border border-red-950/50 space-y-2">
          <div className="flex items-center space-x-2 text-red-400 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Monitored Disease Risks</span>
          </div>
          <ul className="space-y-1 text-xs text-gray-300 list-disc list-inside">
            {crop.commonDiseases.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-dark-surface/60 border border-agri-800/50 space-y-2">
          <div className="flex items-center space-x-2 text-neon-green text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Organic Management Tips</span>
          </div>
          <ul className="space-y-1 text-xs text-gray-300 list-disc list-inside">
            {crop.organicRemedies.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interactive Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={() => onViewDetails && onViewDetails(crop)}
          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-dark-surface border border-agri-600/60 hover:border-neon-green text-gray-200 text-xs font-bold transition-all flex items-center justify-center space-x-2"
        >
          <span>View Detailed Agronomic Profile</span>
          <ChevronRight className="w-4 h-4 text-neon-green" />
        </button>

        {onAnalyzeSoil && (
          <button
            onClick={onAnalyzeSoil}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-agri-600 to-agri-500 text-white text-xs font-bold shadow-lg shadow-agri-900/80 hover:from-agri-500 hover:to-neon-lime hover:text-black transition-all flex items-center justify-center space-x-2"
          >
            <Activity className="w-4 h-4" />
            <span>Connect Soil Analysis Data →</span>
          </button>
        )}
      </div>

    </div>
  );
}
