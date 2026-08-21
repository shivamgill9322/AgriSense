import React from 'react';
import { Cpu, Sprout, ArrowRight } from 'lucide-react';
import RecommendationCard from '../components/RecommendationCard';
import { analyzeSoilData } from '../utils/soilEngine';

export default function Recommendations({ soilAnalysis, onSelectCrop }) {
  // Use session soil analysis or generate default analysis
  const activeAnalysis = soilAnalysis || analyzeSoilData({
    soilType: 'Loamy',
    ph: 6.5,
    nitrogen: 45,
    phosphorus: 30,
    potassium: 40,
    moisture: 55
  });

  const recommendations = activeAnalysis.recommendations;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-agri-800/60 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-agri-950 border border-agri-500/40 text-neon-green text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Agricultural Recommendation Engine</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
            What should you grow?
          </h1>
          <p className="text-sm text-gray-300">
            Explore crops prioritized for your field based on provided soil chemistry and regional parameters.
          </p>
        </div>
      </div>

      {/* Active Soil Parameters Banner */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-agri-700/40 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <Sprout className="w-4 h-4 text-neon-green" />
          <span className="text-gray-300 font-semibold">Current Soil Profile:</span>
          <span className="bg-agri-950 px-2.5 py-1 rounded-full text-neon-green font-bold border border-agri-800">
            {activeAnalysis.soilType} • pH {activeAnalysis.metrics.ph.value} • N:{activeAnalysis.metrics.nitrogen.value} P:{activeAnalysis.metrics.phosphorus.value} K:{activeAnalysis.metrics.potassium.value}
          </span>
        </div>

        <span className="text-gray-400">
          Showing <strong className="text-white">{recommendations.length}</strong> evaluated crops
        </span>
      </div>

      {/* Recommendation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec) => (
          <RecommendationCard
            key={rec.crop.id}
            recommendation={rec}
            onSelectCrop={onSelectCrop}
          />
        ))}
      </div>

    </div>
  );
}
