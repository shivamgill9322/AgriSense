import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Sparkles } from 'lucide-react';

export default function ImageMarquee() {
  const column1 = [
    { id: '11', src: '/images/image11.jpg', title: 'Field Telemetry & Drip Irrigation', tag: 'Smart Irrigation' },
    { id: '20', src: '/images/image_20.jpg', title: 'Autonomous Farm Robots & Eco-City', tag: 'Futuristic Ag' },
    { id: '14', src: '/images/image14.jpg', title: 'AgTech Control Center', tag: 'Soil Analytics' },
    { id: '7', src: '/images/image7.jpg', title: 'Holographic Crop Interface', tag: 'AR Vision' },
    { id: '17', src: '/images/image17.jpg', title: 'Tech + Nature Integration', tag: 'AI Agriculture' },
  ];

  const column2 = [
    { id: '15', src: '/images/image15.jpg', title: 'Digital Circuit Root System', tag: 'Soil Intelligence' },
    { id: '21', src: '/images/image21.jpg', title: 'Drone Spraying & Wind Towers', tag: 'Aerial Scouting' },
    { id: '12', src: '/images/image12.jpg', title: 'Autonomous Drone Scouting', tag: 'Crop Scanner' },
    { id: '19', src: '/images/image19.jpg', title: 'Planetary Eco Intelligence', tag: 'Green & Blue' },
    { id: '16', src: '/images/image16.jpg', title: 'Soil Macro Diagnostics', tag: 'NPK Analysis' },
  ];

  const column3 = [
    { id: '13', src: '/images/image13.jpg', title: 'Robotic Greenhouse Harvester', tag: 'Smart Harvesting' },
    { id: '4', src: '/images/image_4.jpg', title: 'Bionic AI Eye Crop Scanner', tag: 'Neural Vision' },
    { id: '18', src: '/images/image18.jpg', title: 'Sustainable Green Innovation', tag: 'Eco Tech' },
    { id: '3', src: '/images/image_3.jpg', title: 'Neuralink AI Assistant Dashboard', tag: 'Neural AI' },
    { id: '16', src: '/images/image16.jpg', title: 'Microbe & Soil Sensing', tag: 'Field Diagnostic' },
  ];

  // Duplicate items for 100% seamless vertical loop
  const col1Items = [...column1, ...column1];
  const col2Items = [...column2, ...column2];
  const col3Items = [...column3, ...column3];

  return (
    <div className="relative w-full h-full min-h-[700px] sm:min-h-[820px] lg:min-h-[90vh] overflow-hidden marquee-container">
      
      {/* Top & Bottom Soft Fade Overlays */}
      <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-[#060b07] via-[#060b07]/70 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#060b07] via-[#060b07]/70 to-transparent z-20 pointer-events-none" />

      {/* 3 Tall Vertical Poster Columns with Enlarged Tiles */}
      <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-7 h-full px-2 sm:px-4 pt-20 sm:pt-24 pb-6">
        
        {/* Column 1: Moving UP */}
        <div className="flex flex-col space-y-5 sm:space-y-7 animate-marquee-up">
          {col1Items.map((item, index) => (
            <div
              key={`c1-${index}`}
              className="relative aspect-[2/3] min-h-[260px] sm:min-h-[340px] lg:min-h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl group hover:border-white/60 transition-all duration-500 flex-shrink-0 bg-black/60"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-[0.93] group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent p-4 sm:p-5 flex flex-col justify-end opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] sm:text-[11px] font-extrabold text-neon-green uppercase tracking-wider bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10 w-fit mb-2">
                  {item.tag}
                </span>
                <h4 className="font-display font-bold text-sm sm:text-base lg:text-lg text-white line-clamp-2 leading-snug">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Column 2: Moving DOWN */}
        <div className="flex flex-col space-y-5 sm:space-y-7 animate-marquee-down">
          {col2Items.map((item, index) => (
            <div
              key={`c2-${index}`}
              className="relative aspect-[2/3] min-h-[260px] sm:min-h-[340px] lg:min-h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl group hover:border-white/60 transition-all duration-500 flex-shrink-0 bg-black/60"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-[0.93] group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent p-4 sm:p-5 flex flex-col justify-end opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] sm:text-[11px] font-extrabold text-neon-green uppercase tracking-wider bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10 w-fit mb-2">
                  {item.tag}
                </span>
                <h4 className="font-display font-bold text-sm sm:text-base lg:text-lg text-white line-clamp-2 leading-snug">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Column 3: Moving UP */}
        <div className="flex flex-col space-y-5 sm:space-y-7 animate-marquee-up">
          {col3Items.map((item, index) => (
            <div
              key={`c3-${index}`}
              className="relative aspect-[2/3] min-h-[260px] sm:min-h-[340px] lg:min-h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl group hover:border-white/60 transition-all duration-500 flex-shrink-0 bg-black/60"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-[0.93] group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent p-4 sm:p-5 flex flex-col justify-end opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] sm:text-[11px] font-extrabold text-neon-green uppercase tracking-wider bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10 w-fit mb-2">
                  {item.tag}
                </span>
                <h4 className="font-display font-bold text-sm sm:text-base lg:text-lg text-white line-clamp-2 leading-snug">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
