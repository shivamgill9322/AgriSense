import React from 'react';
import { Sparkles, Calendar, Droplets, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function RecommendationCard({ recommendation, onSelectCrop }) {
  const { crop, suitabilityPercent, suitabilityTier, badgeColor, reason } = recommendation;

  return (
    <div className="glass-card p-5 sm:p-6 rounded-3xl flex flex-col justify-between space-y-4 group">
      
      <div>
        {/* Top bar */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-agri-700 to-agri-950 border border-agri-500/40 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
              {crop.icon}
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white group-hover:text-neon-green transition-colors">
                {crop.name}
              </h3>
              <span className="text-xs text-gray-400 font-medium">
                {crop.type}
              </span>
            </div>
          </div>

          {/* Suitability Score */}
          <div className={`px-3 py-1 rounded-full text-xs font-extrabold border ${badgeColor} shadow-md`}>
            {suitabilityPercent}% Match
          </div>
        </div>

        {/* Reason snippet */}
        <p className="text-xs text-gray-300 leading-relaxed bg-dark-bg/60 p-3 rounded-xl border border-agri-900/40">
          <strong className="text-white">Why:</strong> {reason}
        </p>
      </div>

      {/* Footer Specs & Action */}
      <div className="pt-2 border-t border-agri-900/60 space-y-3">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-neon-green" />
            <span>Season: <strong className="text-gray-200">{crop.season.split(' ')[0]}</strong></span>
          </span>
          <span className="flex items-center space-x-1">
            <Droplets className="w-3.5 h-3.5 text-blue-400" />
            <span>Water: <strong className="text-gray-200">{crop.waterReq}</strong></span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => onSelectCrop && onSelectCrop(crop)}
          className="w-full py-2.5 rounded-xl bg-dark-surface hover:bg-agri-600/90 text-gray-200 hover:text-white border border-agri-700/50 hover:border-neon-green text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-md"
        >
          <span>View Full Profile & Cultivation Guide</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-neon-green" />
        </button>
      </div>

    </div>
  );
}
