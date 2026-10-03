import { DataDictionaryEntry } from '../types/neo';

export const DATA_DICTIONARY: DataDictionaryEntry[] = [
  {
    name: "designation / name",
    definition: "The unique provisional or permanent alphanumeric designation assigned to a minor planet by the Minor Planet Center (MPC) and NASA JPL.",
    unit: "String / IAU Identifier",
    source: "NASA NeoWs / IAU MPC",
    sourceUrl: "https://minorplanetcenter.net/",
    type: "Raw API Observation",
    usedByModel: false,
    notes: "Follows IAU standard nomenclature (e.g. '99942 Apophis', '(101955) 1999 RQ36')."
  },
  {
    name: "relative_velocity",
    definition: "The relative velocity vector magnitude between the Near-Earth Object and Earth's geocenter at the exact instant of closest approach.",
    unit: "km/s (also converted to km/h and mph)",
    source: "NASA NeoWs REST API",
    sourceUrl: "https://api.nasa.gov/neo/",
    type: "Raw API Observation",
    usedByModel: true,
    modelWeight: "28% Feature Importance",
    notes: "Crucial metric for kinetic energy calculus (E = 0.5 * m * v²). Higher velocities dramatically increase destructive potential upon hypothetical atmospheric entry."
  },
  {
    name: "miss_distance (astronomical)",
    definition: "The minimum separation distance between the center of mass of the NEO and the center of mass of Earth during close approach.",
    unit: "Astronomical Units (AU)",
    source: "NASA NeoWs / JPL Horizons",
    sourceUrl: "https://ssd.jpl.nasa.gov/horizons/",
    type: "Raw API Observation",
    usedByModel: true,
    modelWeight: "34% Feature Importance (evaluated as Lunar Distances)",
    notes: "1 AU = 149,597,870.7 km (mean Earth-Sun distance). NASA's threshold for PHA classification requires MOID ≤ 0.05 AU (~7.48 million km)."
  },
  {
    name: "miss_distance (lunar)",
    definition: "The closest approach distance expressed in Lunar Distances (LD), representing the average distance from Earth to the Moon.",
    unit: "Lunar Distance (LD)",
    source: "NASA NeoWs",
    sourceUrl: "https://api.nasa.gov/neo/",
    type: "Derived Value",
    usedByModel: true,
    modelWeight: "34% Feature Importance",
    notes: "1 LD = 384,400 km. Objects passing within 1.0 LD travel between Earth and the Moon's orbit."
  },
  {
    name: "absolute_magnitude_h",
    definition: "The apparent visual magnitude that an asteroid would have if it were located at 1 AU from both the Sun and the observer, at zero phase angle.",
    unit: "Magnitude (dimensionless logarithmic scale)",
    source: "NASA NeoWs / JPL SBDB",
    sourceUrl: "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html",
    type: "Raw API Observation",
    usedByModel: true,
    modelWeight: "16% Feature Importance",
    notes: "Inverse logarithmic scale: smaller numbers represent brighter, larger objects. NASA uses H ≤ 22.0 as the physical criterion corresponding to diameter ≥ 140m."
  },
  {
    name: "estimated_diameter_min / max",
    definition: "Estimated bounds for the physical diameter of the asteroid, calculated from absolute magnitude H under assumed geometric albedo ranges (typically pv = 0.05 to 0.25).",
    unit: "Meters / Kilometers",
    source: "NASA NeoWs",
    sourceUrl: "https://api.nasa.gov/neo/",
    type: "Derived Value",
    usedByModel: true,
    modelWeight: "22% Feature Importance (geometric mean applied)",
    notes: "Calculated via NASA formula: D = (1329 / sqrt(pv)) * 10^(-0.2 * H). Radar or thermal infrared (NEOWISE) observations yield exact dimensions when available."
  },
  {
    name: "is_potentially_hazardous_asteroid (PHA)",
    definition: "Official binary flag designated by NASA/JPL for asteroids that have an Earth Minimum Orbit Intersection Distance (MOID) ≤ 0.05 AU and an absolute magnitude H ≤ 22.0.",
    unit: "Boolean (true / false)",
    source: "NASA JPL CNEOS / NeoWs",
    sourceUrl: "https://cneos.jpl.nasa.gov/",
    type: "Raw API Observation",
    usedByModel: false,
    notes: "NASA ground truth target for model validation. PHA designation does NOT mean an object will impact Earth; it designates objects requiring rigorous trajectory monitoring."
  },
  {
    name: "earth_moid",
    definition: "Earth Minimum Orbit Intersection Distance: the minimum geometric distance between the osculating orbits of the asteroid and Earth, without regard to object positions.",
    unit: "Astronomical Units (AU)",
    source: "JPL Horizons / SBDB",
    sourceUrl: "https://ssd.jpl.nasa.gov/horizons/",
    type: "Orbital Element",
    usedByModel: true,
    notes: "A fundamental parameter in planetary defense. MOID ≤ 0.05 AU is the primary spatial criterion for PHA status."
  },
  {
    name: "orbital_eccentricity (e)",
    definition: "The elongation of the asteroid's orbit around the Sun, where e = 0 is a circle, 0 < e < 1 is an ellipse, and e ≥ 1 is parabolic/hyperbolic.",
    unit: "Dimensionless (0.0 to 1.0)",
    source: "NASA NeoWs / JPL SBDB",
    sourceUrl: "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html",
    type: "Orbital Element",
    usedByModel: false,
    notes: "High eccentricity indicates an orbit that crosses multiple planetary orbital planes."
  },
  {
    name: "orbital_inclination (i)",
    definition: "The angle between the plane of the asteroid's orbit and the ecliptic plane (the plane of Earth's orbit around the Sun).",
    unit: "Degrees (°)",
    source: "NASA NeoWs / JPL SBDB",
    sourceUrl: "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html",
    type: "Orbital Element",
    usedByModel: false,
    notes: "Objects with low inclination stay closer to Earth's orbital plane, increasing intersection frequency."
  },
  {
    name: "model_confidence",
    definition: "Statistical probability score generated by NEO-SCOPE's educational Random Forest classifier indicating model certainty in separating PHA characteristics from nominal passes.",
    unit: "Percentage (0.0% to 100.0%)",
    source: "NEO-SCOPE Random Forest Model",
    sourceUrl: "#risk-lab",
    type: "Model Output",
    usedByModel: false,
    notes: "Explicitly labeled 'MODEL CONFIDENCE', NOT 'IMPACT PROBABILITY'. Measures how strongly the object's features correlate with known historical PHA clusters."
  },
  {
    name: "shap_attribution_value",
    definition: "SHapley Additive exPlanations (SHAP) value measuring the marginal contribution of an individual feature toward shifting the model's prediction relative to the baseline rate E[f(x)].",
    unit: "Log-odds / Probability shift (-1.0 to +1.0)",
    source: "NEO-SCOPE Client SHAP Engine",
    sourceUrl: "#explainability",
    type: "Model Output",
    usedByModel: false,
    notes: "Positive values (+f(x)) push the prediction toward the hazardous classification; negative values (-f(x)) mitigate risk."
  }
];
