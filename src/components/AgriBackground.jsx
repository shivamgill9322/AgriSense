import React, { useRef, useEffect } from 'react';

export default function AgriBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback handling
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-dark-bg">
      
      {/* High Clarity Live Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.85] contrast-[1.1] saturate-[1.15] scale-100 transition-all duration-700"
      >
        <source src="/video/video_ai.mp4" type="video/mp4" />
      </video>

      {/* Light Overlay Mask to maintain card contrast while keeping video crystal clear */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/60 via-dark-bg/35 to-dark-bg/70" />

      {/* Moving AgTech Grid Mesh */}
      <div className="absolute inset-0 bg-agri-grid opacity-30" />

      {/* Subtle Environmental Glowing Orbs */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-agri-600/15 to-neon-green/10 blur-[130px] animate-orb-1" />
      <div className="absolute bottom-20 right-10 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-agri-800/20 to-neon-lime/10 blur-[140px] animate-orb-2" />

      {/* Glowing Ambient Particles */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-neon-green/60 blur-[1px] animate-ping duration-1000" />
      <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 rounded-full bg-agri-300/50 blur-[1px] animate-pulse" />
    </div>
  );
}
