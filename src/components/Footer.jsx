import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ShieldCheck, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-agri-900/60 bg-dark-bg/95 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-agri-900/40">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-agri-600 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-neon-green" />
              </div>
              <span className="font-display font-extrabold text-xl text-white">
                AgriSense <span className="text-neon-green font-normal text-sm uppercase">AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm">
              Understand your soil. Know your crop. Grow smarter. Empowering modern farmers with computer vision and soil intelligence.
            </p>
            <div className="flex items-center space-x-4 text-xs text-agri-400">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-neon-green" />
                <span>Agricultural Integrity</span>
              </span>
              <span className="flex items-center space-x-1">
                <Cpu className="w-3.5 h-3.5 text-neon-green" />
                <span>Client Computer Vision</span>
              </span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link to="/dashboard" className="hover:text-neon-green transition-colors">Dashboard Overview</Link>
              </li>
              <li>
                <Link to="/crop-detection" className="hover:text-neon-green transition-colors">AI Crop Detection</Link>
              </li>
              <li>
                <Link to="/soil-analysis" className="hover:text-neon-green transition-colors">Soil Health Testing</Link>
              </li>
              <li>
                <Link to="/recommendations" className="hover:text-neon-green transition-colors">Crop Suitability</Link>
              </li>
              <li>
                <Link to="/assistant" className="hover:text-neon-green transition-colors">AgriSense Assistant</Link>
              </li>
            </ul>
          </div>

          {/* Supported Crops */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider mb-3">
              Supported Crops
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs text-gray-400">
              {['Wheat', 'Rice', 'Maize', 'Cotton', 'Sugarcane', 'Potato', 'Tomato', 'Soybean', 'Mustard', 'Groundnut'].map((c) => (
                <span key={c} className="bg-agri-950/80 border border-agri-800/40 text-gray-300 px-2 py-0.5 rounded-full text-[11px]">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 space-y-3 sm:space-y-0">
          <p>© {new Date().getFullYear()} AgriSense AI. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-400 cursor-pointer">Agricultural Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
