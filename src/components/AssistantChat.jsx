import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, Sprout, Leaf, ArrowRight, HelpCircle, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { CROPS_DATA } from '../data/cropsData';
import { SOIL_TYPES_DATA } from '../data/soilTypesData';

export default function AssistantChat({ detectedCrop = null, soilAnalysis = null }) {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I am AgriSense Assistant, your specialized agricultural AI specialist. I analyze your live soil parameters (pH, NPK, moisture) and crop data to provide precise agronomic guidance.",
      suggestions: [
        "What are the main types of soil?",
        "What crops are best for my active soil data?",
        "How do I fix my current soil pH level?",
        "What fertilizer dosage do my NPK levels need?",
        "How do I control crop pests organically?"
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Generate dynamic context-aware agronomic response
    setTimeout(() => {
      const responseObj = generateAIResponse(query, detectedCrop, soilAnalysis);
      setMessages((prev) => [...prev, responseObj]);
      setIsTyping(false);
    }, 550);
  };

  const generateAIResponse = (query, cropData, soilData) => {
    const q = query.toLowerCase().trim();
    let text = '';
    let cards = [];
    let suggestions = [];

    const activeCrop = cropData?.crop;
    const ph = soilData?.metrics?.ph?.value ?? 6.5;
    const n = soilData?.metrics?.nitrogen?.value ?? 45;
    const p = soilData?.metrics?.phosphorus?.value ?? 30;
    const k = soilData?.metrics?.potassium?.value ?? 40;
    const m = soilData?.metrics?.moisture?.value ?? 55;
    const soilType = soilData?.soilType || 'Loamy';

    // ==========================================
    // 1. TYPES OF SOIL & SOIL CLASSIFICATION
    // ==========================================
    if (q.includes('types of soil') || q.includes('soil type') || q.includes('kinds of soil') || q.includes('classify soil') || q.includes('different soil')) {
      text = `Agricultural soils are classified into 6 primary types based on texture, mineral composition, and drainage:`;
      cards = [
        {
          title: "🌾 1. Loamy Soil (Ideal Balance)",
          content: "Balanced mixture of sand, silt, and clay (40-40-20). Highly fertile, optimal moisture retention & root aeration. Best for: Wheat, Vegetables, Fruits, Cotton."
        },
        {
          title: "🧱 2. Clay Soil (Heavy & Water-Retentive)",
          content: "Fine particles with high water retention and rich nutrient content, but poor drainage when wet. Best for: Paddy Rice, Wheat, Sugarcane."
        },
        {
          title: "🏜️ 3. Sandy Loam / Sandy Soil",
          content: "Coarse particles with high permeability and rapid warming, but low nutrient holding capacity. Best for: Potato, Groundnut, Carrot, Watermelon."
        },
        {
          title: "🌋 4. Black Soil (Regur)",
          content: "Rich in iron, lime, calcium, and clay. Self-plowing moisture retention capability. Best for: Cotton, Soybean, Wheat, Sunflower."
        },
        {
          title: "🔴 5. Red Soil",
          content: "Contains high iron oxide, porous structure, slightly acidic. Responds well to irrigation & fertilizers. Best for: Pulses, Millets, Oilseeds."
        },
        {
          title: "🌊 6. Alluvial Soil",
          content: "Deposited by river basins, rich in potash and humus. Extremely fertile for high-yield farming. Best for: Rice, Wheat, Sugarcane, Jute."
        }
      ];
      suggestions = ["What is my active soil type?", "What crop suits my active soil?", "How to improve soil health?"];

    // ==========================================
    // 2. CROP SUITABILITY & RECOMMENDATIONS
    // ==========================================
    } else if (q.includes('suitable') || q.includes('grow') || q.includes('recommend') || (q.includes('crop') && (q.includes('best') || q.includes('what') || q.includes('rank')))) {
      if (soilData?.recommendations) {
        const top3 = soilData.recommendations.slice(0, 3);
        text = `Based on your live field parameters (${soilType}, pH ${ph}, Moisture ${m}%, N: ${n}, P: ${p}, K: ${k}):`;
        cards = top3.map(r => ({
          title: `${r.crop.icon} ${r.crop.name} — ${r.suitabilityPercent}% Match (${r.suitabilityTier})`,
          content: `${r.reason} Growth Season: ${r.crop.season}. Water requirement: ${r.crop.waterReq}.`
        }));
      } else {
        text = `For your ${soilType} soil (pH ${ph}), crops like Wheat, Tomato, Maize, and Soybean show high baseline compatibility. Adjust sliders on the Soil Analysis page for real-time live rankings!`;
      }
      suggestions = ["How to improve soil pH?", "What fertilizer dosage is needed?"];

    // ==========================================
    // 3. SOIL pH & ACIDITY / ALKALINITY
    // ==========================================
    } else if (q.includes('ph') || q.includes('acid') || q.includes('alkaline') || q.includes('lime') || q.includes('sulfur') || q.includes('acidity')) {
      if (ph < 5.8) {
        text = `Your active soil pH is ${ph} (Acidic). Acidic soil restricts Nitrogen and Phosphorus absorption for most staple crops.`;
        cards = [
          { title: "🧪 Remedy: Agricultural Lime", content: "Apply 2.5 - 3.5 tons/hectare of agricultural limestone (calcium carbonate) or dolomite to raise soil pH to 6.0 - 7.0." },
          { title: "🌱 Acid-Tolerant Crops", content: "Potato (pH 5.0-6.5), Sweet Potato, and Rice can tolerate moderate soil acidity." }
        ];
      } else if (ph > 7.5) {
        text = `Your active soil pH is ${ph} (Alkaline). High alkalinity causes micronutrient lockout (Iron, Zinc, Manganese chlorosis).`;
        cards = [
          { title: "🧪 Remedy: Elemental Sulfur / Gypsum", content: "Incorporate 1.0 - 1.5 tons/hectare of elemental sulfur or organic compost into top 6 inches of soil to lower pH." },
          { title: "🌾 Alkaline-Tolerant Crops", content: "Cotton, Barley, and Sugarbeet perform well in mildly alkaline soils." }
        ];
      } else {
        text = `Your active soil pH is ${ph} (Optimal). This is ideal for maximum nutrient bioavailability and healthy soil biology.`;
        cards = [
          { title: "✅ Optimal Status", content: "No pH correction needed! Maintain organic matter by adding 5-10 tons/ha of farmyard manure annually." }
        ];
      }
      suggestions = ["What fertilizer dosage is needed?", "What crops suit my soil?"];

    // ==========================================
    // 4. FERTILIZER & NPK DEFICIENCIES
    // ==========================================
    } else if (q.includes('fertilizer') || q.includes('npk') || q.includes('nitrogen') || q.includes('urea') || q.includes('dap') || q.includes('potassium') || q.includes('manure') || q.includes('compost')) {
      text = `Analysis of your active NPK nutrient values (N: ${n} mg/kg, P: ${p} mg/kg, K: ${k} mg/kg):`;
      const npkCards = [];

      if (n < 30) {
        npkCards.push({ title: "🔴 Nitrogen Deficient (N: " + n + " mg/kg)", content: "Target: 45-70 mg/kg. Apply 40-50 kg/ha of Urea or organic neem-coated vermicompost." });
      } else {
        npkCards.push({ title: "🟢 Nitrogen Status (N: " + n + " mg/kg)", content: "Optimal level. Supports vigorous vegetative leaf growth and protein synthesis." });
      }

      if (p < 20) {
        npkCards.push({ title: "🔴 Phosphorus Low (P: " + p + " mg/kg)", content: "Target: 25-50 mg/kg. Apply Rock Phosphate or DAP (Di-Ammonium Phosphate) prior to sowing." });
      } else {
        npkCards.push({ title: "🟢 Phosphorus Status (P: " + p + " mg/kg)", content: "Sufficient phosphorus for robust root expansion and early seed initiation." });
      }

      if (k < 25) {
        npkCards.push({ title: "🔴 Potassium Deficient (K: " + k + " mg/kg)", content: "Target: 35-65 mg/kg. Apply Muriate of Potash (MOP) or wood ash to strengthen stalks and pest resistance." });
      } else {
        npkCards.push({ title: "🟢 Potassium Status (K: " + k + " mg/kg)", content: "Good potassium level supporting water osmotic regulation." });
      }

      cards = npkCards;
      suggestions = ["How does moisture affect fertilizer?", "Show top suitable crops"];

    // ==========================================
    // 5. ORGANIC FARMING & SUSTAINABLE PRACTICES
    // ==========================================
    } else if (q.includes('organic') || q.includes('natural') || q.includes('vermicompost') || q.includes('biofertilizer') || q.includes('eco')) {
      text = `Sustainable Organic Farming Best Practices:`;
      cards = [
        {
          title: "🪱 1. Vermicompost & Farmyard Manure (FYM)",
          content: "Apply 5-8 tons/ha of well-rotted vermicompost before sowing. Enhances soil water retention and introduces beneficial microbes."
        },
        {
          title: "🍃 2. Botanical Pest Control (Neem Spray)",
          content: "Mix 5ml Neem Oil (10,000 ppm) + 1ml liquid soap per liter of water. Effective against aphids, whiteflies, and caterpillars."
        },
        {
          title: "🦠 3. Bio-Fertilizers (Azotobacter & PSB)",
          content: "Treat seeds with Azotobacter (nitrogen-fixing) and Phosphobacteria (PSB) to unlock insoluble soil nutrients naturally."
        },
        {
          title: "🌾 4. Green Manuring & Legume Rotation",
          content: "Grow and plow in green manure crops (Dhaincha / Sunnhemp) or rotate with Gram / Cowpea to fix atmospheric nitrogen."
        }
      ];
      suggestions = ["How to control pests organically?", "Types of soil"];

    // ==========================================
    // 6. PESTS, INSECTS & DISEASE CONTROL
    // ==========================================
    } else if (q.includes('pest') || q.includes('insect') || q.includes('bug') || q.includes('aphid') || q.includes('whitefly') || q.includes('worm') || q.includes('disease') || q.includes('fungus') || q.includes('blight') || q.includes('rust') || q.includes('spot') || q.includes('yellow')) {
      text = `Integrated Pest & Disease Management (IPM) Protocols:`;
      if (activeCrop) {
        cards.push({
          title: `🔍 Monitored Risks for Active Crop: ${activeCrop.name}`,
          content: `Common issues: ${activeCrop.commonDiseases.join(', ')}. Recommended action: ${activeCrop.organicRemedies[0] || 'Apply neem solution.'}`
        });
      }
      cards.push(
        {
          title: "🪰 Yellow Sticky Traps for Sucking Pests",
          content: "Install 20-25 yellow sticky traps per hectare to monitor and capture aphids, whiteflies, and thrips early."
        },
        {
          title: "🍂 Fungal Leaf Spot / Blight Remediation",
          content: "Prune bottom necrotic leaves. Spray Copper Oxychloride (2.5g/L) or Trichoderma viride bio-fungicide (5g/L) in early morning."
        },
        {
          title: "🐛 Caterpillar & Stem Borer Control",
          content: "Use Bacillus thuringiensis (Bt) spray or Pheromone traps (5 traps/ha) to disrupt moth breeding cycles."
        }
      );
      suggestions = ["Upload a crop photo for AI diagnosis", "How to fix soil pH?"];

    // ==========================================
    // 7. IRRIGATION & WATER MANAGEMENT
    // ==========================================
    } else if (q.includes('moisture') || q.includes('water') || q.includes('irrigation') || q.includes('drip') || q.includes('sprinkler') || q.includes('drainage')) {
      text = `Your active soil moisture is ${m}%. Irrigation recommendations:`;
      if (m < 35) {
        cards = [
          { title: "⚠️ Dry Soil Warning (Moisture: " + m + "%)", content: "Schedule drip or furrow irrigation immediately. Apply 20-30 mm of water to prevent seedling moisture stress." },
          { title: "💡 Mulching Tip", content: "Spread a 2-inch straw mulching layer to conserve soil moisture and reduce surface evaporation by 50%." }
        ];
      } else if (m > 80) {
        cards = [
          { title: "💧 Saturated Soil Warning (Moisture: " + m + "%)", content: "Halt irrigation immediately! Clear drainage channels to prevent root rot and anaerobic hypoxia." }
        ];
      } else {
        cards = [
          { title: "✅ Optimal Moisture Level (Moisture: " + m + "%)", content: "Moisture is in the healthy operating range (45% - 70%). Maintain regular drip irrigation." }
        ];
      }
      suggestions = ["Show NPK nutrient status", "Which crops suit this moisture level?"];

    // ==========================================
    // 8. CROP ROTATION & INTERCROPPING
    // ==========================================
    } else if (q.includes('rotation') || q.includes('rotate') || q.includes('intercrop') || q.includes('companion') || q.includes('sequence')) {
      text = `Scientific Crop Rotation & Intercropping Guidelines:`;
      cards = [
        {
          title: "🔄 3-Season Rotation Pattern",
          content: "Monsoon (Rice/Maize) ➔ Winter (Wheat/Mustard) ➔ Summer Legume (Moong/Cowpea). Legumes rebuild soil nitrogen reserves."
        },
        {
          title: "🌾 Intercropping Pairs",
          content: "Mustard + Chickpea (4:1 row ratio) or Maize + Soybean (2:2 ratio). Reduces pest infestation while doubling land productivity."
        },
        {
          title: "🛡️ Benefits",
          content: "Breaks weed & soil pathogen lifecycles, balances deep vs shallow root nutrient uptake, and protects against climate risk."
        }
      ];
      suggestions = ["Types of soil", "Organic farming tips"];

    // ==========================================
    // 9. SPECIFIC CROPS (WHEAT, RICE, MAIZE, TOMATO, POTATO, COTTON, MUSTARD)
    // ==========================================
    } else if (q.includes('wheat') || q.includes('rice') || q.includes('paddy') || q.includes('maize') || q.includes('corn') || q.includes('tomato') || q.includes('potato') || q.includes('cotton') || q.includes('mustard')) {
      const matched = CROPS_DATA.find(c => q.includes(c.id) || q.includes(c.name.toLowerCase())) || CROPS_DATA[0];
      text = `Detailed Agronomic Profile for ${matched.icon} ${matched.name}:`;
      cards = [
        { title: `${matched.name} (${matched.type})`, content: matched.description },
        { title: "🌡️ Growing Conditions", content: `Season: ${matched.season} | Water: ${matched.waterReq} | Temp: ${matched.temp} | Target pH: ${matched.idealpH[0]} - ${matched.idealpH[1]}` },
        { title: "🛡️ Disease & Organic Care", content: `Monitored risks: ${matched.commonDiseases.join(', ')}. Organic tip: ${matched.organicRemedies.join('. ')}` }
      ];
      suggestions = ["Compare with another crop", "What fertilizer dosage is needed?"];

    // ==========================================
    // 10. SEASONS & WEATHER (KHARIF, RABI, ZAID)
    // ==========================================
    } else if (q.includes('season') || q.includes('rabi') || q.includes('kharif') || q.includes('zaid') || q.includes('winter') || q.includes('monsoon') || q.includes('summer') || q.includes('weather')) {
      text = `Cropping Seasons & Weather Planning:`;
      cards = [
        { title: "🌧️ 1. Kharif Season (Monsoon: June – Oct)", content: "Sown at onset of monsoon rains. Major crops: Rice, Maize, Cotton, Soybean, Groundnut." },
        { title: "❄️ 2. Rabi Season (Winter: Oct – April)", content: "Sown in autumn, harvested in spring. Major crops: Wheat, Mustard, Barley, Chickpea, Potato." },
        { title: "☀️ 3. Zaid Season (Summer: March – June)", content: "Short duration crops between Rabi & Kharif. Major crops: Watermelon, Muskmelon, Cucumber, Moong." }
      ];
      suggestions = ["What crops suit my active soil?", "Types of soil"];

    // ==========================================
    // 11. WEED CONTROL & MULCHING
    // ==========================================
    } else if (q.includes('weed') || q.includes('mulch') || q.includes('mulching') || q.includes('plow') || q.includes('tillage') || q.includes('land')) {
      text = `Effective Weed Management & Soil Conservation:`;
      cards = [
        { title: "🌾 Straw / Plastic Mulching", content: "Applying a 2-3 inch organic straw layer blocks 85% of weed germination and cuts irrigation needs in half." },
        { title: "🚜 Mechanical Hoeing", content: "Perform shallow hoeing at 20 and 40 days post-sowing to aerate the root zone and uproot young weeds." },
        { title: "🌱 Cover Crops", content: "Plant fast-growing cover crops (Clover / Cowpea) between rows to suppress weeds naturally." }
      ];
      suggestions = ["Organic farming tips", "How often to irrigate?"];

    // ==========================================
    // 12. DYNAMIC CUSTOMIZED AGRICULTURAL FALLBACK
    // ==========================================
    } else {
      text = `Custom Agronomic Advice for "${query}":`;
      cards = [
        {
          title: `🌾 Active Soil Context (${soilType} Soil)`,
          content: `pH: ${ph} (${ph < 5.8 ? 'Acidic' : ph > 7.5 ? 'Alkaline' : 'Optimal'}) | Moisture: ${m}% | NPK: ${n}-${p}-${k} mg/kg`
        },
        {
          title: "💡 Direct Field Recommendation",
          content: `For questions about "${query}", maintain balanced soil organic matter, monitor leaf undersides weekly for pests, and ensure your soil pH remains between 6.0 - 7.0 for maximum yield.`
        }
      ];
      if (activeCrop) {
        cards.push({
          title: `Detected Crop Context: ${activeCrop.icon} ${activeCrop.name}`,
          content: `${activeCrop.name} thrives in ${activeCrop.season} season with ${activeCrop.waterReq.toLowerCase()} water requirements.`
        });
      }
      suggestions = ["Types of soil", "What crops suit my active soil?", "How to fix soil pH?"];
    }

    return {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text,
      cards,
      suggestions,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="glass-panel rounded-3xl border border-agri-600/50 shadow-2xl flex flex-col h-[650px] overflow-hidden">
      
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-agri-800/60 bg-dark-bg/95 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-agri-500 to-agri-800 border border-neon-green/40 flex items-center justify-center text-neon-green shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-display font-bold text-base text-white">
                AgriSense Assistant
              </h3>
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            </div>
            <p className="text-[11px] text-gray-400">
              Active Context: {soilAnalysis ? `${soilAnalysis.soilType} Soil (pH ${soilAnalysis.metrics.ph.value})` : 'Default Soil'} {detectedCrop ? `• Crop: ${detectedCrop.crop.name}` : ''}
            </p>
          </div>
        </div>

        {/* Live Context Badge */}
        <div className="hidden sm:flex items-center space-x-1.5 text-xs text-neon-green font-semibold bg-agri-950 px-3 py-1 rounded-full border border-agri-500/40">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real-time Sync Active</span>
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-agri-600 text-white'
                  : 'bg-dark-surface border border-agri-600/50 text-neon-green'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Message Body */}
            <div className={`max-w-[88%] sm:max-w-[80%] space-y-2`}>
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-agri-600 text-white rounded-tr-none shadow-md'
                    : 'bg-dark-surface/90 border border-agri-800/60 text-gray-200 rounded-tl-none shadow-lg'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>

                {/* Formatted Response Cards */}
                {msg.cards && msg.cards.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {msg.cards.map((c, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-dark-bg/85 border border-agri-700/50 text-xs space-y-1">
                        <strong className="text-neon-green block font-bold text-xs">{c.title}</strong>
                        <span className="text-gray-300 block leading-relaxed">{c.content}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Dynamic Suggestions */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {msg.suggestions.map((sug, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSend(sug)}
                      className="text-[11px] font-semibold px-3 py-1 rounded-full bg-dark-bg hover:bg-agri-900 border border-agri-700/50 hover:border-neon-green text-gray-300 hover:text-white transition-all flex items-center space-x-1"
                    >
                      <Sparkles className="w-3 h-3 text-neon-green" />
                      <span>{sug}</span>
                    </button>
                  ))}
                </div>
              )}

              <span className="text-[10px] text-gray-500 block text-right px-1">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center space-x-2 text-xs text-agri-400 p-2">
            <Bot className="w-4 h-4 text-neon-green animate-bounce" />
            <span>AgriSense Assistant is evaluating query...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 sm:p-4 border-t border-agri-800/60 bg-dark-bg/95 flex items-center space-x-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask about types of soil, fertilizers, pest control, crop rotation..."
          className="flex-1 glass-input px-4 py-3 rounded-2xl text-xs sm:text-sm placeholder-gray-500"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim()}
          className="p-3 rounded-2xl bg-gradient-to-r from-agri-600 to-agri-500 hover:from-agri-500 hover:to-neon-lime text-white hover:text-black transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
