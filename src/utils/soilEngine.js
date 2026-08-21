import { CROPS_DATA } from '../data/cropsData';

/**
 * Analyzes soil metrics (pH, N, P, K, Moisture, soilType)
 * Returns structured health evaluations and suitability ranks for all crops.
 */
export function analyzeSoilData(soilData) {
  const {
    soilType = 'Loamy',
    ph = 6.5,
    nitrogen = 45,
    phosphorus = 30,
    potassium = 40,
    moisture = 55
  } = soilData;

  // 1. pH Evaluation
  let phStatus = 'Optimal';
  let phColor = 'text-neon-green';
  let phBadgeBg = 'bg-agri-900/60 border-agri-500/50';
  let phAdvice = 'pH is in the ideal range for nutrient absorption.';
  if (ph < 5.8) {
    phStatus = 'Acidic';
    phColor = 'text-amber-400';
    phBadgeBg = 'bg-amber-950/60 border-amber-500/50';
    phAdvice = 'Consider adding agricultural lime (calcium carbonate) to raise pH.';
  } else if (ph > 7.5) {
    phStatus = 'Alkaline';
    phColor = 'text-amber-400';
    phBadgeBg = 'bg-amber-950/60 border-amber-500/50';
    phAdvice = 'Consider adding elemental sulfur or organic compost to lower pH.';
  }

  // 2. Nitrogen Evaluation (Target: 40-75 mg/kg)
  let nStatus = 'Optimal';
  let nColor = 'text-neon-green';
  let nAdvice = 'Adequate nitrogen for leafy vegetation and protein synthesis.';
  if (nitrogen < 30) {
    nStatus = 'Low / Deficient';
    nColor = 'text-red-400';
    nAdvice = 'Supplement with organic vermicompost, urea, or legume intercropping.';
  } else if (nitrogen > 80) {
    nStatus = 'Excessive';
    nColor = 'text-amber-400';
    nAdvice = 'Reduce nitrogen inputs to avoid excessive vegetative growth over fruiting.';
  }

  // 3. Phosphorus Evaluation (Target: 25-50 mg/kg)
  let pStatus = 'Good';
  let pColor = 'text-neon-green';
  let pAdvice = 'Healthy phosphorus levels to promote strong root expansion.';
  if (phosphorus < 20) {
    pStatus = 'Low';
    pColor = 'text-red-400';
    pAdvice = 'Apply rock phosphate or bone meal prior to sowing.';
  } else if (phosphorus > 65) {
    pStatus = 'High';
    pColor = 'text-amber-400';
    pAdvice = 'Phosphorus is plentiful; avoid additional phosphate fertilizers.';
  }

  // 4. Potassium Evaluation (Target: 30-65 mg/kg)
  let kStatus = 'Moderate';
  let kColor = 'text-neon-green';
  let kAdvice = 'Sufficient potassium for disease resistance and water regulation.';
  if (potassium < 25) {
    kStatus = 'Deficient';
    kColor = 'text-red-400';
    kAdvice = 'Incorporate wood ash or muriate of potash (MOP).';
  }

  // 5. Moisture Evaluation (Target: 45-70%)
  let mStatus = 'Optimal';
  let mColor = 'text-neon-green';
  let mAdvice = 'Ideal moisture level supporting seedling germination and root uptake.';
  if (moisture < 35) {
    mStatus = 'Dry';
    mColor = 'text-amber-400';
    mAdvice = 'Schedule irrigation or apply straw mulching to conserve moisture.';
  } else if (moisture > 80) {
    mStatus = 'Saturated';
    mColor = 'text-blue-400';
    mAdvice = 'Ensure field drainage channels are clear to prevent root hypoxia.';
  }

  // Calculate Overall Soil Health Score (0 - 100)
  let score = 100;
  if (ph < 5.5 || ph > 7.8) score -= 15;
  if (nitrogen < 30 || nitrogen > 85) score -= 15;
  if (phosphorus < 20) score -= 10;
  if (potassium < 25) score -= 10;
  if (moisture < 35 || moisture > 80) score -= 10;
  score = Math.max(50, Math.min(98, score));

  // 6. Calculate Suitability Rank for each Crop
  const cropRecommendations = CROPS_DATA.map((crop) => {
    let matchScore = 70; // baseline

    // pH match
    const [minpH, maxpH] = crop.idealpH;
    if (ph >= minpH && ph <= maxpH) {
      matchScore += 15;
    } else {
      const diff = Math.min(Math.abs(ph - minpH), Math.abs(ph - maxpH));
      matchScore -= Math.min(25, diff * 12);
    }

    // Soil type match
    if (crop.soilTypes.includes(soilType)) {
      matchScore += 15;
    }

    // Moisture match
    const [minM, maxM] = crop.idealMoisture;
    if (moisture >= minM && moisture <= maxM) {
      matchScore += 10;
    } else {
      const diff = Math.min(Math.abs(moisture - minM), Math.abs(moisture - maxM));
      matchScore -= Math.min(15, diff * 0.5);
    }

    // NPK match
    const [minN, maxN] = crop.idealN;
    if (nitrogen >= minN && nitrogen <= maxN) matchScore += 5;

    const suitabilityPercent = Math.max(40, Math.min(96, Math.round(matchScore)));

    let suitabilityTier = 'High Suitability';
    let badgeColor = 'bg-agri-900/80 text-neon-green border-agri-500/50';
    if (suitabilityPercent < 65) {
      suitabilityTier = 'Moderate Suitability';
      badgeColor = 'bg-amber-950/80 text-amber-300 border-amber-500/50';
    } else if (suitabilityPercent < 50) {
      suitabilityTier = 'Low Suitability';
      badgeColor = 'bg-red-950/80 text-red-300 border-red-500/50';
    }

    return {
      crop,
      suitabilityPercent,
      suitabilityTier,
      badgeColor,
      reason: `Matches ${soilType} soil with pH ${ph}. Water requirement is ${crop.waterReq.toLowerCase()}.`
    };
  });

  // Sort recommendations descending by suitability
  cropRecommendations.sort((a, b) => b.suitabilityPercent - a.suitabilityPercent);

  return {
    overallScore: score,
    metrics: {
      ph: { value: ph, status: phStatus, color: phColor, badgeBg: phBadgeBg, advice: phAdvice },
      nitrogen: { value: nitrogen, status: nStatus, color: nColor, advice: nAdvice },
      phosphorus: { value: phosphorus, status: pStatus, color: pColor, advice: pAdvice },
      potassium: { value: potassium, status: kStatus, color: kColor, advice: kAdvice },
      moisture: { value: moisture, status: mStatus, color: mColor, advice: mAdvice }
    },
    soilType,
    recommendations: cropRecommendations
  };
}

/**
 * Combines Crop Detection + Soil Intelligence for joint AI Insights
 */
export function generateIntegratedInsight(detectedCrop, soilAnalysis) {
  if (!detectedCrop || !soilAnalysis) return null;

  const crop = detectedCrop.crop || detectedCrop;
  const ph = soilAnalysis.metrics.ph.value;
  const moisture = soilAnalysis.metrics.moisture.value;
  const soilType = soilAnalysis.soilType;

  // Check compatibility
  const [minpH, maxpH] = crop.idealpH;
  const isPhOptimal = ph >= minpH && ph <= maxpH;
  const isSoilTypeCompatible = crop.soilTypes.includes(soilType);

  let statusTitle = 'High Compatibility Detected';
  let statusBadgeBg = 'bg-agri-900/90 text-neon-green border-agri-500';
  let overview = `Your soil conditions (${soilType}, pH ${ph}) are strongly aligned with ${crop.name}.`;

  if (!isPhOptimal && !isSoilTypeCompatible) {
    statusTitle = 'Action Recommended for Optimal Yield';
    statusBadgeBg = 'bg-amber-950/90 text-amber-300 border-amber-500';
    overview = `Your detected crop (${crop.name}) requires slightly adjusted soil parameters for peak productivity.`;
  }

  const recommendationsList = [
    `Soil pH is currently ${ph}. Ideal for ${crop.name} is ${minpH} - ${maxpH}.`,
    `Moisture level of ${moisture}% is ${moisture < crop.idealMoisture[0] ? 'slightly low; schedule light drip irrigation' : 'within healthy operating parameters'}.`,
    `Current soil type '${soilType}' ${isSoilTypeCompatible ? 'is well-suited for root aeration' : 'may require organic compost addition for better soil texture'}.`
  ];

  return {
    cropName: crop.name,
    cropIcon: crop.icon,
    statusTitle,
    statusBadgeBg,
    overview,
    recommendationsList,
    growingSeason: crop.season,
    waterReq: crop.waterReq
  };
}
