import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CropDetailModal from './components/CropDetailModal';
import AgriBackground from './components/AgriBackground';

// Pages
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import CropDetection from './pages/CropDetection';
import SoilAnalysis from './pages/SoilAnalysis';
import Recommendations from './pages/Recommendations';
import Assistant from './pages/Assistant';

// Utils
import { analyzeSoilData } from './utils/soilEngine';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Top-level state for session intelligence
  const [detectedCrop, setDetectedCrop] = useState(null);
  
  // Default soil analysis initialized with balanced parameters
  const [soilAnalysis, setSoilAnalysis] = useState(() =>
    analyzeSoilData({
      soilType: 'Loamy',
      ph: 6.5,
      nitrogen: 45,
      phosphorus: 30,
      potassium: 40,
      moisture: 55
    })
  );

  const [selectedModalCrop, setSelectedModalCrop] = useState(null);

  const handleCropDetected = (result) => {
    setDetectedCrop(result);
  };

  const handleAnalyzeSoil = (formData) => {
    const analysis = analyzeSoilData(formData);
    setSoilAnalysis(analysis);
  };

  const handleViewDetails = (crop) => {
    setSelectedModalCrop(crop);
  };

  return (
    <div className="relative min-h-screen bg-dark-bg text-gray-100 font-sans flex flex-col overflow-x-hidden selection:bg-agri-500 selection:text-white">
      
      {/* Animated Atmospheric Background */}
      <AgriBackground />

      {/* Main Sticky Navbar */}
      <Navbar />

      {/* Page Slide Container */}
      <main className="flex-1 relative z-10">
        <div key={location.pathname} className="page-slide-enter">
          <Routes location={location}>
            <Route
              path="/"
              element={
                <Landing
                  onCropDetected={(res) => {
                    handleCropDetected(res);
                    navigate('/crop-detection');
                  }}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  detectedCrop={detectedCrop}
                  soilAnalysis={soilAnalysis}
                  onCropDetected={handleCropDetected}
                />
              }
            />
            <Route
              path="/crop-detection"
              element={
                <CropDetection
                  detectedCrop={detectedCrop}
                  onCropDetected={handleCropDetected}
                  onViewDetails={handleViewDetails}
                  onAnalyzeSoil={() => navigate('/soil-analysis')}
                />
              }
            />
            <Route
              path="/soil-analysis"
              element={
                <SoilAnalysis
                  soilAnalysis={soilAnalysis}
                  onAnalyzeSoil={handleAnalyzeSoil}
                />
              }
            />
            <Route
              path="/recommendations"
              element={
                <Recommendations
                  soilAnalysis={soilAnalysis}
                  onSelectCrop={handleViewDetails}
                />
              }
            />
            <Route
              path="/assistant"
              element={
                <Assistant
                  detectedCrop={detectedCrop}
                  soilAnalysis={soilAnalysis}
                />
              }
            />
          </Routes>
        </div>
      </main>

      {/* Global Crop Detail Modal */}
      {selectedModalCrop && (
        <CropDetailModal
          crop={selectedModalCrop}
          onClose={() => setSelectedModalCrop(null)}
        />
      )}

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
