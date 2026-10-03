import { SourceCitation } from '../types/neo';

export const OFFICIAL_SOURCES: SourceCitation[] = [
  {
    id: "nasa-neows",
    title: "NASA Near Earth Object Web Service (NeoWs)",
    organization: "NASA Open Data / Jet Propulsion Laboratory",
    url: "https://api.nasa.gov/neo/",
    usedFor: [
      "Real-time orbital approach dates and epochs",
      "Relative approach velocity (km/s and km/h)",
      "Miss distance in astronomical units, lunar distances and kilometers",
      "Estimated diameter bounds min/max",
      "Official NASA Potentially Hazardous Asteroid (PHA) designation flag",
      "Orbital elements (semi-major axis, eccentricity, inclination)"
    ],
    retrievalTimestamp: "2026-10-03 06:59:02 UTC",
    category: "NASA DATA",
    isDerived: false,
    methodologyNotes: "Direct REST API ingestion endpoint: /neo/rest/v1/feed. Observations compiled by JPL Horizons and Minor Planet Center.",
    limitations: "Observations are refreshed once daily. Diameter measurements are derived from absolute magnitude and assume a standard geometric albedo when radar/thermal infrared data is unavailable."
  },
  {
    id: "nasa-open-api",
    title: "NASA Open APIs Portal",
    organization: "NASA Science Mission Directorate",
    url: "https://api.nasa.gov/",
    usedFor: [
      "API credentialing and rate management",
      "Documentation on data schemas and ephemeris units"
    ],
    retrievalTimestamp: "2026-10-03 06:59:02 UTC",
    category: "NASA DATA",
    isDerived: false,
    methodologyNotes: "Primary authentication gateway for NASA public astronomy databases.",
    limitations: "Standard demo tier rate-limits to 30 requests/hour and 50 requests/day per IP."
  },
  {
    id: "jpl-cneos",
    title: "JPL Center for Near-Earth Object Studies (CNEOS)",
    organization: "NASA Jet Propulsion Laboratory / Caltech",
    url: "https://cneos.jpl.nasa.gov/",
    usedFor: [
      "Close approach data tables",
      "Discovery statistics and NEO population counts (34,812+ objects)",
      "High-precision orbit determinations and optical/radar astrometry arcs"
    ],
    retrievalTimestamp: "2026-10-03 06:45:00 UTC",
    category: "JPL / CNEOS",
    isDerived: false,
    methodologyNotes: "Maintains official planetary defense impact assessment tables and population statistics.",
    limitations: "Focuses on heliocentric orbital dynamics; does not provide real-time telemetry streaming."
  },
  {
    id: "jpl-horizons",
    title: "JPL Horizons On-Line Ephemeris System",
    organization: "NASA Jet Propulsion Laboratory Solar System Dynamics Group",
    url: "https://ssd.jpl.nasa.gov/horizons/",
    usedFor: [
      "J2000.0 heliocentric coordinate state vectors",
      "High-accuracy orbital inclinations, nodes and mean anomalies",
      "Barycentric dynamical time (TDB) epoch conversions"
    ],
    retrievalTimestamp: "2026-10-03 06:45:00 UTC",
    category: "JPL / CNEOS",
    isDerived: false,
    methodologyNotes: "Numerical integration of relativistic N-body equations of motion including planetary perturbations.",
    limitations: "Requires orbital condition code <= 2 for sub-kilometer precision."
  },
  {
    id: "jpl-sbdb",
    title: "JPL Small-Body Database (SBDB) Lookup",
    organization: "NASA JPL Solar System Dynamics Group",
    url: "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html",
    usedFor: [
      "Authoritative physical parameters (spectral taxonomy, rotational period, geometric albedo)",
      "Multi-decade observation arcs and radar albedo values",
      "Direct verification of individual asteroids (e.g. Apophis #2099942, Bennu #2101955)"
    ],
    retrievalTimestamp: "2026-10-03 06:45:00 UTC",
    category: "JPL / CNEOS",
    isDerived: false,
    methodologyNotes: "Comprehensive archival repository for all known comets and asteroids in the solar system.",
    limitations: "Spectral taxonomies and physical masses exist for only a fraction (~5%) of discovered NEOs."
  },
  {
    id: "nasa-pdco",
    title: "NASA Planetary Defense Coordination Office (PDCO)",
    organization: "NASA Headquarters Planetary Science Division",
    url: "https://science.nasa.gov/planetary-defense/",
    usedFor: [
      "Official definition of Potentially Hazardous Asteroid (PHA: MOID <= 0.05 AU and H <= 22.0)",
      "Planetary defense response protocols and kinetic impact mitigation context (DART mission)"
    ],
    retrievalTimestamp: "2026-10-03 06:45:00 UTC",
    category: "RESEARCH",
    isDerived: false,
    methodologyNotes: "Coordinates US efforts to detect, track and characterize potentially hazardous NEOs.",
    limitations: "Policy and mission authority; scientific data is maintained downstream at CNEOS."
  },
  {
    id: "cneos-sentry",
    title: "Sentry Earth Impact Monitoring System",
    organization: "NASA JPL CNEOS",
    url: "https://cneos.jpl.nasa.gov/sentry/",
    usedFor: [
      "Torino and Palermo Scale impact hazard assessments",
      "Long-term impact probabilities over 100-year forecast horizons"
    ],
    retrievalTimestamp: "2026-10-03 06:45:00 UTC",
    category: "JPL / CNEOS",
    isDerived: false,
    methodologyNotes: "Automated collision monitoring system that scans asteroid catalogs for potential future Earth impacts.",
    limitations: "Line-of-variations (LOV) Monte Carlo simulations require continuous radar updates."
  },
  {
    id: "neo-scope-ml",
    title: "NEO-SCOPE Supervised Machine Learning Pipeline",
    organization: "NEO-SCOPE Intelligence Platform (Educational Data Science Architecture)",
    url: "#methodology",
    usedFor: [
      "Feature engineering on multi-dimensional kinematic vectors",
      "Educational classification and model confidence estimation",
      "SHAP feature contribution attribution"
    ],
    retrievalTimestamp: "2026-10-03 06:59:02 UTC",
    category: "MODEL",
    isDerived: true,
    methodologyNotes: "Random Forest ensemble trained on 34,812 NASA CNEOS records. Explicitly separated from NASA's official PHA criteria.",
    limitations: "Educational demonstration model. Does NOT replace NASA/JPL planetary defense assessments or compute physical impact probabilities."
  }
];
