import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Leaf, Cpu, Sprout, BarChart3, Bot, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { to: '/crop-detection', label: 'Crop Detection', icon: Leaf },
    { to: '/soil-analysis', label: 'Soil Analysis', icon: Sprout },
    { to: '/recommendations', label: 'Recommendations', icon: Cpu },
    { to: '/assistant', label: 'AI Assistant', icon: Bot },
  ];

  return (
    <header className="absolute top-0 inset-x-0 z-50 bg-transparent transition-all duration-300">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center space-x-3 group z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-agri-500 to-agri-800 p-0.5 shadow-lg shadow-agri-900/50 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-dark-bg rounded-[10px] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-neon-green group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                  AgriSense
                </span>
                <span className="bg-agri-900/90 text-neon-green border border-agri-500/40 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-gray-400 hidden sm:block font-medium -mt-0.5">
                Soil & Crop Intelligence
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-xl z-10">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-agri-600/90 text-white shadow-md border border-neon-green/40'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="hidden sm:flex items-center space-x-3 z-10">
            <Link
              to="/crop-detection"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-gray-300/50 hover:border-white text-white hover:bg-white/10 backdrop-blur-md transition-all duration-300 text-xs font-semibold shadow-lg group"
            >
              <span>Get started</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-gray-300 hover:text-white hover:bg-agri-900/50 focus:outline-none z-10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-agri-800/40 bg-dark-bg/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-agri-600 text-white font-semibold shadow-md shadow-agri-900/60'
                      : 'text-gray-300 hover:bg-agri-900/40 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-neon-green" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
          <div className="pt-2">
            <Link
              to="/crop-detection"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-agri-600 to-agri-500 text-white text-sm font-bold shadow-lg"
            >
              <Leaf className="w-4 h-4" />
              <span>Start Crop Analysis</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
