import React from 'react';
import { Sprout, Activity, Sparkles, ArrowRight } from 'lucide-react';
import SoilForm from '../components/SoilForm';
import SoilCard from '../components/SoilCard';
import { useNavigate } from 'react-router-dom';

export default function SoilAnalysis({ soilAnalysis, onAnalyzeSoil }) {
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    onAnalyzeSoil(data);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-agri-950 border border-agri-500/40 text-neon-green text-xs font-bold uppercase tracking-wider">
          <Sprout className="w-3.5 h-3.5" />
          <span>Soil Health Diagnostic</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
          Know your soil.
        </h1>
        <p className="text-sm sm:text-base text-gray-300">
          Enter your soil testing values to understand current fertility levels, nutrient balances, and pH stability.
        </p>
      </div>

      {/* Main Grid: Soil Form + Soil Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Interactive Input Form */}
        <div className="lg:col-span-6 space-y-6">
          <SoilForm onAnalyze={handleFormSubmit} initialValues={soilAnalysis} />
        </div>

        {/* Right Col: Health Visualizations */}
        <div className="lg:col-span-6 space-y-6">
          {soilAnalysis ? (
            <div className="space-y-6">
              <SoilCard analysis={soilAnalysis} />

              {/* Action Button to Crop Recommendations */}
              <div className="glass-panel p-6 rounded-3xl border border-agri-600/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-display font-bold text-base text-white">
                    Ready for Crop Recommendations?
                  </h4>
                  <p className="text-xs text-gray-300">
                    See which crops match your soil's exact NPK and pH values.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/recommendations')}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-agri-600 to-agri-500 hover:from-agri-500 hover:to-neon-lime text-white hover:text-black text-xs font-extrabold shadow-lg transition-all flex items-center justify-center space-x-1.5 flex-shrink-0"
                >
                  <span>View Suitability Ranks</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="glass-panel p-10 rounded-3xl border border-agri-800/40 text-center space-y-4 text-gray-400">
              <div className="w-14 h-14 rounded-2xl bg-dark-surface border border-agri-800/40 flex items-center justify-center mx-auto text-agri-400">
                <Sprout className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">
                No soil information yet.
              </h3>
              <p className="text-xs max-w-sm mx-auto text-gray-400 leading-relaxed">
                Adjust pH, NPK sliders, or choose a quick preset on the form to run a comprehensive soil health diagnostic.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
