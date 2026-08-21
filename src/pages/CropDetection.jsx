import React from 'react';
import { Leaf, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import CropUpload from '../components/CropUpload';
import CropResult from '../components/CropResult';

export default function CropDetection({ detectedCrop, onCropDetected, onViewDetails, onAnalyzeSoil }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-agri-950 border border-agri-500/40 text-neon-green text-xs font-bold uppercase tracking-wider">
          <Leaf className="w-3.5 h-3.5" />
          <span>AI Computer Vision Engine</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
          Identify Your Crop
        </h1>
        <p className="text-sm sm:text-base text-gray-300">
          Upload a clear image of your crop foliage or select a sample image below for real-time computer vision identification.
        </p>
      </div>

      {/* Main Upload Area */}
      <div className="max-w-3xl mx-auto space-y-8">
        <CropUpload onCropDetected={onCropDetected} initialCrop={detectedCrop} />

        {/* Detection Result */}
        {detectedCrop ? (
          <CropResult
            result={detectedCrop}
            onViewDetails={onViewDetails}
            onAnalyzeSoil={onAnalyzeSoil}
          />
        ) : (
          /* Empty State */
          <div className="glass-panel p-8 rounded-3xl border border-agri-800/40 text-center space-y-3 text-gray-400">
            <div className="w-12 h-12 rounded-2xl bg-dark-surface border border-agri-800/40 flex items-center justify-center mx-auto text-agri-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">
              Upload a crop image to begin.
            </h3>
            <p className="text-xs max-w-sm mx-auto text-gray-400">
              Once an image is selected, our computer vision model will evaluate color distribution and foliage characteristics to display crop insights.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
