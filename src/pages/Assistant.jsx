import React from 'react';
import { Bot, Sparkles } from 'lucide-react';
import AssistantChat from '../components/AssistantChat';

export default function Assistant({ detectedCrop, soilAnalysis }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-agri-950 border border-agri-500/40 text-neon-green text-xs font-bold uppercase tracking-wider">
          <Bot className="w-3.5 h-3.5" />
          <span>AgriSense Conversational Agent</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
          AgriSense Assistant
        </h1>
        <p className="text-sm sm:text-base text-gray-300">
          Ask questions about your detected crop, soil test values, fertilizer dosages, or disease management.
        </p>
      </div>

      {/* Main Chat Interface */}
      <AssistantChat detectedCrop={detectedCrop} soilAnalysis={soilAnalysis} />

    </div>
  );
}
