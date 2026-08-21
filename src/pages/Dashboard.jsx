import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Leaf, Sprout, Cpu, Bot, ArrowRight, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import CropUpload from '../components/CropUpload';
import { generateIntegratedInsight } from '../utils/soilEngine';

export default function Dashboard({ detectedCrop, soilAnalysis, onCropDetected }) {
  const integratedInsight = generateIntegratedInsight(detectedCrop, soilAnalysis);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-agri-600/50 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-agri-900 text-neon-green text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-agri-500/40 tracking-wider">
              FIELD COMMAND DASHBOARD
            </span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
            Grow smarter with AI.
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Detect crops, understand your soil, and make more informed agricultural decisions.
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <Link
            to="/crop-detection"
            className="flex-1 md:flex-none px-5 py-2.5 rounded-full bg-gradient-to-r from-agri-600 to-agri-500 hover:from-agri-500 hover:to-neon-lime text-white hover:text-black text-xs font-bold shadow-lg transition-all text-center"
          >
            Analyze My Crop
          </Link>
          <Link
            to="/soil-analysis"
            className="flex-1 md:flex-none px-5 py-2.5 rounded-full bg-dark-surface hover:bg-agri-900 text-white border border-agri-700/50 text-xs font-bold transition-all text-center"
          >
            Check My Soil
          </Link>
        </div>
      </div>

      {/* 4 SUMMARY STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: Last Crop Detected */}
        <div className="glass-card p-5 rounded-3xl space-y-2 border border-agri-800/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Last Crop Detected</span>
            <Leaf className="w-4 h-4 text-neon-green" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display font-extrabold text-2xl text-white">
              {detectedCrop?.crop ? detectedCrop.crop.name : 'Wheat'}
            </span>
            <span className="text-xs text-neon-green font-bold">
              {detectedCrop?.confidencePercent ? `${detectedCrop.confidencePercent}%` : '94%'}
            </span>
          </div>
          <p className="text-[11px] text-gray-400">
            {detectedCrop?.crop ? `Season: ${detectedCrop.crop.season}` : 'Rabi Season • Cereal'}
          </p>
        </div>

        {/* Card 2: Soil Health Status */}
        <div className="glass-card p-5 rounded-3xl space-y-2 border border-agri-800/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Soil Status</span>
            <Sprout className="w-4 h-4 text-neon-green" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display font-extrabold text-2xl text-white">
              {soilAnalysis ? `${soilAnalysis.overallScore}/100` : 'Good (88)'}
            </span>
            <span className="text-xs text-neon-green font-bold">
              {soilAnalysis ? soilAnalysis.metrics.ph.status : 'Optimal pH'}
            </span>
          </div>
          <p className="text-[11px] text-gray-400">
            {soilAnalysis ? `Soil Type: ${soilAnalysis.soilType}` : 'Loamy Soil • pH 6.5'}
          </p>
        </div>

        {/* Card 3: Recommended Crops */}
        <div className="glass-card p-5 rounded-3xl space-y-2 border border-agri-800/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recommended Crops</span>
            <Cpu className="w-4 h-4 text-neon-green" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display font-extrabold text-2xl text-white">
              {soilAnalysis?.recommendations ? soilAnalysis.recommendations.length : '4'}
            </span>
            <span className="text-xs text-neon-green font-bold">High Match</span>
          </div>
          <p className="text-[11px] text-gray-400">
            Top match: {soilAnalysis?.recommendations ? soilAnalysis.recommendations[0].crop.name : 'Wheat (94%)'}
          </p>
        </div>

        {/* Card 4: AI Assistant */}
        <div className="glass-card p-5 rounded-3xl space-y-2 border border-agri-800/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">AI Assistant</span>
            <Bot className="w-4 h-4 text-neon-green" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display font-extrabold text-2xl text-white">Active</span>
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          </div>
          <p className="text-[11px] text-gray-400">
            Ready to answer field questions
          </p>
        </div>

      </div>

      {/* COMBINED CROP + SOIL INTELLIGENCE INSIGHT CARD */}
      {integratedInsight && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-agri-500/50 shadow-2xl space-y-4 bg-gradient-to-r from-agri-950/90 via-dark-card to-agri-900/90">
          <div className="flex items-center justify-between border-b border-agri-800/60 pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-neon-green" />
              <h3 className="font-display font-bold text-lg text-white">
                Contextual Crop + Soil Intelligence
              </h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${integratedInsight.statusBadgeBg}`}>
              {integratedInsight.statusTitle}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-200">
            {integratedInsight.overview}
          </p>

          <div className="space-y-2 bg-dark-bg/60 p-4 rounded-2xl border border-agri-800/40">
            <span className="text-xs font-bold text-neon-green uppercase tracking-wider block">
              AgriSense AI Observations & Monitoring Tips:
            </span>
            <ul className="space-y-1.5 text-xs text-gray-300 list-disc list-inside">
              {integratedInsight.recommendationsList.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* MAIN DASHBOARD CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Quick Crop Upload */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-xl text-white">
              Quick Crop Image Identification
            </h2>
            <Link to="/crop-detection" className="text-xs font-bold text-neon-green hover:underline flex items-center space-x-1">
              <span>Full Scanner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <CropUpload onCropDetected={onCropDetected} />
        </div>

        {/* Right Column: Active Recommendations Teaser */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-xl text-white">
              Current Crop Suitability Ranks
            </h2>
            <Link to="/recommendations" className="text-xs font-bold text-neon-green hover:underline flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {(soilAnalysis?.recommendations || [
              { crop: { icon: '🌾', name: 'Wheat', type: 'Cereal', season: 'Rabi' }, suitabilityPercent: 94, reason: 'Highly compatible with loamy soil pH 6.5.' },
              { crop: { icon: '🌽', name: 'Maize', type: 'Cereal', season: 'Kharif' }, suitabilityPercent: 88, reason: 'Well-drained soil supports root growth.' },
              { crop: { icon: '🌻', name: 'Mustard', type: 'Oilseed', season: 'Rabi' }, suitabilityPercent: 85, reason: 'Requires low water and moderate nitrogen.' }
            ]).slice(0, 3).map((rec, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-dark-surface/80 border border-agri-800/40 flex items-center justify-between group hover:border-neon-green/50 transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-agri-900 border border-agri-600/50 flex items-center justify-center text-xl">
                    {rec.crop.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-neon-green transition-colors">
                      {rec.crop.name}
                    </h4>
                    <p className="text-[11px] text-gray-400">{rec.crop.type} • {rec.crop.season}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-display font-extrabold text-sm text-neon-green block">
                    {rec.suitabilityPercent}% Match
                  </span>
                  <span className="text-[10px] text-gray-500">High Suitability</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Assistant Callout */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-agri-950 via-dark-card to-agri-900 border border-agri-600/50 space-y-3 shadow-xl">
            <div className="flex items-center space-x-2 text-neon-green">
              <Bot className="w-5 h-5" />
              <span className="font-display font-bold text-sm text-white">Ask AgriSense Assistant</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Have specific questions about nitrogen application or pest management for your field?
            </p>
            <Link
              to="/assistant"
              className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-neon-green hover:underline pt-1"
            >
              <span>Launch Conversational Assistant →</span>
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
