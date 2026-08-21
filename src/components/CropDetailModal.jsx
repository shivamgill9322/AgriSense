import React from 'react';
import { X, Calendar, Droplets, Thermometer, Sprout, ShieldAlert, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export default function CropDetailModal({ crop, onClose }) {
  if (!crop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] glass-panel rounded-3xl border border-agri-500/50 shadow-2xl overflow-y-auto p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-dark-surface hover:bg-agri-800 text-gray-400 hover:text-white border border-agri-700/50 transition-all"
          aria-label="Close Crop Detail"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-4 border-b border-agri-800/60 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-agri-600 to-agri-950 border border-neon-green/40 flex items-center justify-center text-3xl shadow-xl flex-shrink-0">
            {crop.icon}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-agri-900 text-neon-green text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-agri-500/40 tracking-wider">
                AGRONOMIC PROFILE
              </span>
              <span className="text-xs text-gray-400 font-semibold">{crop.type}</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
              {crop.name} Profile
            </h2>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-dark-surface/80 border border-agri-800/40">
            <div className="flex items-center space-x-1.5 text-agri-400 text-xs font-semibold mb-1">
              <Calendar className="w-3.5 h-3.5 text-neon-green" />
              <span>Season</span>
            </div>
            <div className="font-bold text-xs text-white">{crop.season}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-dark-surface/80 border border-agri-800/40">
            <div className="flex items-center space-x-1.5 text-agri-400 text-xs font-semibold mb-1">
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
              <span>Water Requirement</span>
            </div>
            <div className="font-bold text-xs text-white">{crop.waterReq}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-dark-surface/80 border border-agri-800/40">
            <div className="flex items-center space-x-1.5 text-agri-400 text-xs font-semibold mb-1">
              <Thermometer className="w-3.5 h-3.5 text-amber-400" />
              <span>Ideal Temperature</span>
            </div>
            <div className="font-bold text-xs text-white">{crop.temp}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-dark-surface/80 border border-agri-800/40">
            <div className="flex items-center space-x-1.5 text-agri-400 text-xs font-semibold mb-1">
              <Clock className="w-3.5 h-3.5 text-neon-green" />
              <span>Growth Duration</span>
            </div>
            <div className="font-bold text-xs text-white">{crop.duration}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-dark-surface/80 border border-agri-800/40">
            <div className="flex items-center space-x-1.5 text-agri-400 text-xs font-semibold mb-1">
              <Sprout className="w-3.5 h-3.5 text-neon-lime" />
              <span>Ideal pH Range</span>
            </div>
            <div className="font-bold text-xs text-white">{crop.idealpH[0]} - {crop.idealpH[1]} pH</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-dark-surface/80 border border-agri-800/40">
            <div className="flex items-center space-x-1.5 text-agri-400 text-xs font-semibold mb-1">
              <Sprout className="w-3.5 h-3.5 text-neon-green" />
              <span>Target Soil</span>
            </div>
            <div className="font-bold text-xs text-white truncate" title={crop.suitableSoil}>
              {crop.suitableSoil}
            </div>
          </div>
        </div>

        {/* Detailed Agronomic Overview */}
        <div className="p-4 rounded-2xl bg-agri-950/50 border border-agri-800/50 space-y-2">
          <h4 className="font-display font-bold text-sm text-white flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-neon-green" />
            <span>AI Agricultural Advisory Summary</span>
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            {crop.description}
          </p>
        </div>

        {/* Common Diseases & Remedies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-dark-surface/60 border border-red-950/50 space-y-2">
            <div className="flex items-center space-x-2 text-red-400 text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>Monitored Pathogens</span>
            </div>
            <ul className="space-y-1 text-xs text-gray-300 list-disc list-inside">
              {crop.commonDiseases.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-dark-surface/60 border border-agri-800/50 space-y-2">
            <div className="flex items-center space-x-2 text-neon-green text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Recommended Practices</span>
            </div>
            <ul className="space-y-1 text-xs text-gray-300 list-disc list-inside">
              {crop.organicRemedies.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
