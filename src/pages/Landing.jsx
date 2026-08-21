import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Sprout, Cpu, Bot, ArrowRight, CheckCircle2, Sparkles, Scan, Activity, Eye, ShieldCheck, Zap } from 'lucide-react';
import CropUpload from '../components/CropUpload';
import ImageMarquee from '../components/ImageMarquee';

export default function Landing({ onCropDetected }) {
  return (
    <div className="space-y-20 sm:space-y-32 pb-16">
      
      {/* SECTION 1: HERO (FLUSH CONNECTED TO TOP & RIGHT EDGES) */}
      <section className="relative min-h-[95vh] lg:min-h-screen flex flex-col justify-between overflow-hidden pt-28 sm:pt-32 pb-8">
        
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-[550px] h-[350px] bg-agri-600/15 rounded-full blur-[160px] pointer-events-none" />

        {/* Flush Top & Right Poster Marquee Wall (Desktop) */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[50vw] xl:w-[52vw] h-full overflow-hidden pointer-events-auto z-10">
          <ImageMarquee />
        </div>

        {/* Left Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full relative z-20 my-auto">
          <div className="w-full lg:w-1/2 pr-0 lg:pr-10 space-y-7 text-left">
            
            {/* Category Tag */}
            <div className="text-xs font-bold text-gray-400 uppercase tracking-[0.25em]">
              NEXT-GEN CROP & SOIL VISION, CURATED
            </div>

            {/* Massive Dual-Font Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white tracking-tight leading-[1.05]">
              <span className="font-display font-extrabold block">Grow smarter.</span>
              <span className="font-serif italic font-normal text-gray-100 block mt-1">Know your crop.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-300 max-w-xl font-normal leading-relaxed">
              AgriSense AI helps you analyze crops, diagnose soil health, and optimize field productivity — with instant computer vision, NPK analytics, and AI recommendations.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <Link
                to="/crop-detection"
                className="px-7 py-3.5 rounded-full bg-[#c084fc] hover:bg-[#a855f7] text-black font-display font-bold text-base shadow-xl transition-all flex items-center space-x-2 group"
              >
                <span>Build your AgriSense</span>
                <span className="text-lg group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </Link>

              <Link
                to="/recommendations"
                className="text-white hover:text-neon-green font-display font-semibold text-base flex items-center space-x-1 border-b border-white/30 hover:border-neon-green pb-1 transition-all"
              >
                <span>Explore the collection</span>
                <span className="text-lg">↗</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Mobile View Marquee Fallback */}
        <div className="block lg:hidden w-full h-[600px] relative overflow-hidden my-6 z-10">
          <ImageMarquee />
        </div>

        {/* Scroll Indicator */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full z-20 pt-4">
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.25em] flex items-center space-x-2">
            <span>SCROLL TO ENTER</span>
            <span className="text-sm">↓</span>
          </div>
        </div>

      </section>

      {/* SECTION 2: 4 CORE FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Comprehensive AI Agriculture Engine
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Four specialized tools designed to eliminate agricultural guesswork and optimize field productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="glass-card p-6 rounded-3xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-agri-900 border border-agri-500/40 flex items-center justify-center text-neon-green">
                <Scan className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">Crop Detection</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Upload crop imagery to identify crops, evaluate growth stages, and detect common plant health risks using computer vision.
              </p>
            </div>
            <Link to="/crop-detection" className="text-xs font-bold text-neon-green flex items-center space-x-1 hover:underline pt-2">
              <span>Try Crop Scanner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-6 rounded-3xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-agri-900 border border-agri-500/40 flex items-center justify-center text-neon-green">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">Soil Intelligence</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Analyze soil pH, NPK nutrient levels, moisture content, and physical structure to diagnose field fertility.
              </p>
            </div>
            <Link to="/soil-analysis" className="text-xs font-bold text-neon-green flex items-center space-x-1 hover:underline pt-2">
              <span>Test Soil Health</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-6 rounded-3xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-agri-900 border border-agri-500/40 flex items-center justify-center text-neon-green">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">Crop Recommendations</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Receive data-backed crop suitability rankings calculated from your field's exact micro-climate and soil characteristics.
              </p>
            </div>
            <Link to="/recommendations" className="text-xs font-bold text-neon-green flex items-center space-x-1 hover:underline pt-2">
              <span>View Recommendations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4 */}
          <div className="glass-card p-6 rounded-3xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-agri-900 border border-agri-500/40 flex items-center justify-center text-neon-green">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">AgriSense Assistant</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Ask questions about your detected crops or soil values to receive clear, actionable agricultural explanations.
              </p>
            </div>
            <Link to="/assistant" className="text-xs font-bold text-neon-green flex items-center space-x-1 hover:underline pt-2">
              <span>Ask AI Assistant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION 4: INTERACTIVE DEMO CROP SCANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-agri-600/50 relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mb-5 space-y-2">
            <span className="text-xs font-extrabold text-neon-green uppercase tracking-wider">
              Interactive Feature
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              Identify Your Crop in Seconds
            </h2>
            <p className="text-xs sm:text-sm text-gray-300">
              Upload a clear image of your crop foliage or select one of our pre-loaded field samples below.
            </p>
          </div>

          <CropUpload onCropDetected={onCropDetected} />
        </div>
      </section>

      {/* SECTION 4: PRODUCT SHOWCASE & SOIL SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="relative rounded-3xl overflow-hidden border border-agri-600/50 shadow-2xl">
            <img src="/images/image15.jpg" alt="Glowing AI root network in fertile soil" className="w-full h-[450px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/30 to-transparent p-6 sm:p-8 flex flex-col justify-end">
              <span className="text-xs font-bold text-neon-green uppercase tracking-wider">Deep Soil Intelligence</span>
              <h3 className="font-display font-extrabold text-2xl text-white mt-1">
                Connecting Underground Root Networks with Digital Data
              </h3>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-agri-950 border border-agri-500/40 text-neon-green text-xs font-bold uppercase">
              <Sprout className="w-3.5 h-3.5" />
              <span>Understand Your Soil</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
              Combine Crop Imagery with Physical Soil Chemistry
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              AgriSense AI goes beyond basic plant identification. By pairing crop computer vision with your soil's pH, Nitrogen, Phosphorus, Potassium, and Moisture profile, our system delivers personalized agricultural guidance.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-dark-surface/60 border border-agri-800/40">
                <CheckCircle2 className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">Precise Soil NPK & pH Diagnostics</h4>
                  <p className="text-xs text-gray-400">Evaluate key chemical metrics for balanced fertilization.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-dark-surface/60 border border-agri-800/40">
                <CheckCircle2 className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">Contextual Yield Advisory</h4>
                  <p className="text-xs text-gray-400">Distinguish between AI model predictions and practical agronomic facts.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/soil-analysis"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-agri-600 hover:bg-agri-500 text-white font-bold text-xs shadow-lg transition-all"
              >
                <span>Explore Soil Analytics →</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS (6 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            How AgriSense AI Works
          </h2>
          <p className="text-sm text-gray-400">
            A simple 6-step workflow designed for rapid field decision-making.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { step: '01', title: 'Upload Crop Image', desc: 'Take or browse a clear photo of your field crop.' },
            { step: '02', title: 'AI Crop Detection', desc: 'Computer vision identifies the crop and confidence score.' },
            { step: '03', title: 'Enter Soil Data', desc: 'Input soil type, pH, NPK, and moisture levels.' },
            { step: '04', title: 'Analyze Conditions', desc: 'Review soil health status and nutrient balances.' },
            { step: '05', title: 'Crop Suitability', desc: 'Explore top recommended crops for your soil.' },
            { step: '06', title: 'AI Assistant', desc: 'Ask natural questions for tailored farm guidance.' },
          ].map((s) => (
            <div key={s.step} className="p-5 rounded-2xl bg-dark-surface/60 border border-agri-800/40 space-y-2 text-center relative group hover:border-neon-green/50 transition-all">
              <span className="font-display font-extrabold text-2xl text-neon-green block">
                {s.step}
              </span>
              <h4 className="font-bold text-sm text-white">{s.title}</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-agri-500/50 shadow-2xl p-8 sm:p-16 text-center space-y-6">
          <img src="/images/image11.jpg" alt="High tech smart irrigation field" className="absolute inset-0 w-full h-full object-cover filter brightness-[0.3]" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white leading-tight">
              Understand your field. Grow with confidence.
            </h2>
            <p className="text-sm sm:text-base text-gray-300 font-normal">
              Let AI help you turn crop photos and soil information into actionable agricultural insights today.
            </p>
            <div className="pt-4">
              <Link
                to="/crop-detection"
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-gradient-to-r from-agri-600 to-agri-500 hover:from-agri-500 hover:to-neon-lime text-white hover:text-black font-display font-extrabold text-base shadow-2xl transition-all border border-neon-green/40"
              >
                <span>Start Crop Analysis →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
