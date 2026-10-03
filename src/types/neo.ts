export interface NeoEstimatedDiameter {
  min: number;
  max: number;
}

export interface NeoCloseApproach {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  relative_velocity: {
    kilometers_per_second: string;
    kilometers_per_hour: string;
    miles_per_hour: string;
  };
  miss_distance: {
    astronomical: string;
    lunar: string;
    kilometers: string;
    miles: string;
  };
  orbiting_body: string;
}

export interface NeoOrbitalData {
  orbit_id?: string;
  orbit_determination_date?: string;
  first_observation_date?: string;
  last_observation_date?: string;
  data_arc_in_days?: number;
  observations_used?: number;
  orbit_uncertainty?: string;
  minimum_orbit_intersection?: string;
  jupiter_tisserand_invariant?: string;
  epoch_osculation?: string;
  eccentricity?: string;
  semi_major_axis?: string;
  inclination?: string;
  ascending_node_longitude?: string;
  orbital_period?: string;
  perihelion_distance?: string;
  perihelion_argument?: string;
  aphelion_distance?: string;
  perihelion_time?: string;
  mean_anomaly?: string;
  mean_motion?: string;
  equinox?: string;
  orbit_class?: {
    orbit_class_type: string;
    orbit_class_description: string;
    orbit_class_range: string;
  };
}

export interface NearEarthObject {
  id: string;
  neo_reference_id: string;
  name: string;
  designation?: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: NeoEstimatedDiameter;
    meters: NeoEstimatedDiameter;
    miles: NeoEstimatedDiameter;
    feet: NeoEstimatedDiameter;
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: NeoCloseApproach[];
  orbital_data?: NeoOrbitalData;
  is_sentry_object?: boolean;
  notes?: string;
  sourceCategory?: 'NASA NeoWs' | 'JPL Horizons' | 'CNEOS Sentry';
  retrievalTimestamp?: string;
}

export interface ShapAttribution {
  feature: string;
  label: string;
  valueDisplay: string;
  shapValue: number; // positive = increases risk score (+f(x)), negative = reduces risk score (-f(x))
  impact: 'increases_risk' | 'reduces_risk';
  description: string;
  directionPct: number; // For rendering bar visual 0..100
}

export interface ModelInferenceResult {
  objectName: string;
  classification: 'POTENTIALLY HAZARDOUS ASTEROID (PHA)' | 'NOMINAL PASS (NON-HAZARDOUS)';
  isPha: boolean;
  modelConfidence: number; // 0..1
  predictedRiskProbability: number; // 0..1
  baseProbability: number;
  features: {
    missDistanceLd: number;
    missDistanceKm: number;
    relativeVelocityKms: number;
    relativeVelocityKmh: number;
    estimatedDiameterMeters: number;
    absoluteMagnitudeH: number;
    earthMoidAu: number;
  };
  shapAttributions: ShapAttribution[];
  metricsBenchmark: {
    precision: number;
    recall: number;
    f1Score: number;
    rocAuc: number;
  };
  educationalDisclaimer: string;
}

export interface DataDictionaryEntry {
  name: string;
  definition: string;
  unit: string;
  source: string;
  sourceUrl: string;
  type: 'Raw API Observation' | 'Derived Value' | 'Model Output' | 'Orbital Element';
  usedByModel: boolean;
  modelWeight?: string;
  notes?: string;
}

export interface SourceCitation {
  id: string;
  title: string;
  organization: string;
  url: string;
  usedFor: string[];
  retrievalTimestamp: string;
  category: 'NASA DATA' | 'JPL / CNEOS' | 'RESEARCH' | 'MODEL';
  isDerived: boolean;
  methodologyNotes: string;
  limitations: string;
}
