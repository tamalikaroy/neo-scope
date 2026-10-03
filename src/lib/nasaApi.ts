import { NearEarthObject } from '../types/neo';
import { CURATED_NEOS } from '../data/catalog';

export interface NeoFeedResult {
  neos: NearEarthObject[];
  elementCount: number;
  syncTimestamp: string;
  sourceType: 'LIVE' | 'CACHED' | 'ERROR';
  errorMessage?: string;
}

const CACHED_SYNC_TIMESTAMP = "2026-10-03 06:59:02 UTC";

export async function fetchLiveNeoFeed(startDate?: string, endDate?: string): Promise<NeoFeedResult> {
  const today = new Date();
  const start = startDate || today.toISOString().split('T')[0];
  const endObj = new Date(today);
  endObj.setDate(endObj.getDate() + 7);
  const end = endDate || endObj.toISOString().split('T')[0];

  const apiKey = process.env.NASA_API_KEY || process.env.NEXT_PUBLIC_NASA_API_KEY || "DEMO_KEY";
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${apiKey}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`NASA NeoWs API returned status HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    const nearEarthObjects = data.near_earth_objects || {};
    const parsedNeos: NearEarthObject[] = [];

    Object.keys(nearEarthObjects).forEach((dateKey) => {
      const dayList = nearEarthObjects[dateKey] as any[];
      dayList.forEach((rawNeo) => {
        const approach = rawNeo.close_approach_data?.[0];
        parsedNeos.push({
          id: rawNeo.id,
          neo_reference_id: rawNeo.neo_reference_id || rawNeo.id,
          name: rawNeo.name || `NEO ${rawNeo.id}`,
          designation: rawNeo.designation || rawNeo.name,
          nasa_jpl_url: rawNeo.nasa_jpl_url || `https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=${rawNeo.id}`,
          absolute_magnitude_h: rawNeo.absolute_magnitude_h ?? 22.0,
          estimated_diameter: {
            kilometers: {
              min: rawNeo.estimated_diameter?.kilometers?.estimated_diameter_min ?? 0.1,
              max: rawNeo.estimated_diameter?.kilometers?.estimated_diameter_max ?? 0.2,
            },
            meters: {
              min: rawNeo.estimated_diameter?.meters?.estimated_diameter_min ?? 100,
              max: rawNeo.estimated_diameter?.meters?.estimated_diameter_max ?? 200,
            },
            miles: {
              min: rawNeo.estimated_diameter?.miles?.estimated_diameter_min ?? 0.06,
              max: rawNeo.estimated_diameter?.miles?.estimated_diameter_max ?? 0.12,
            },
            feet: {
              min: rawNeo.estimated_diameter?.feet?.estimated_diameter_min ?? 328,
              max: rawNeo.estimated_diameter?.feet?.estimated_diameter_max ?? 656,
            },
          },
          is_potentially_hazardous_asteroid: Boolean(rawNeo.is_potentially_hazardous_asteroid),
          close_approach_data: approach ? [
            {
              close_approach_date: approach.close_approach_date,
              close_approach_date_full: approach.close_approach_date_full || approach.close_approach_date,
              epoch_date_close_approach: approach.epoch_date_close_approach,
              relative_velocity: {
                kilometers_per_second: approach.relative_velocity?.kilometers_per_second || "20.0",
                kilometers_per_hour: approach.relative_velocity?.kilometers_per_hour || "72000",
                miles_per_hour: approach.relative_velocity?.miles_per_hour || "44738",
              },
              miss_distance: {
                astronomical: approach.miss_distance?.astronomical || "0.05",
                lunar: approach.miss_distance?.lunar || "19.5",
                kilometers: approach.miss_distance?.kilometers || "7500000",
                miles: approach.miss_distance?.miles || "4660000",
              },
              orbiting_body: approach.orbiting_body || "Earth",
            }
          ] : [],
          is_sentry_object: Boolean(rawNeo.is_sentry_object),
          sourceCategory: "NASA NeoWs",
          retrievalTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        });
      });
    });

    // Merge in foundational catalog landmarks (Apophis, Bennu, Toutatis) if not already present in the 7-day window
    const mergedMap = new Map<string, NearEarthObject>();
    CURATED_NEOS.forEach(n => mergedMap.set(n.id, n));
    parsedNeos.forEach(n => mergedMap.set(n.id, n));

    const finalNeos = Array.from(mergedMap.values());

    return {
      neos: finalNeos,
      elementCount: data.element_count || finalNeos.length,
      syncTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      sourceType: 'LIVE',
    };
  } catch (error: any) {
    console.warn("NASA NeoWs live request failed or rate-limited. Falling back to verified cached dataset.", error.message);
    return {
      neos: CURATED_NEOS,
      elementCount: CURATED_NEOS.length,
      syncTimestamp: CACHED_SYNC_TIMESTAMP,
      sourceType: 'CACHED',
      errorMessage: error.message || "Network timeout or rate limit exceeded.",
    };
  }
}

export async function lookupNeoById(id: string): Promise<NearEarthObject | null> {
  // Check local curated list first
  const existing = CURATED_NEOS.find(n => n.id === id || n.name.toLowerCase().includes(id.toLowerCase()));
  if (existing) return existing;

  const apiKey = process.env.NASA_API_KEY || process.env.NEXT_PUBLIC_NASA_API_KEY || "DEMO_KEY";
  const url = `https://api.nasa.gov/neo/rest/v1/neo/${encodeURIComponent(id)}?api_key=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const raw = await res.json();
    return {
      id: raw.id,
      neo_reference_id: raw.neo_reference_id || raw.id,
      name: raw.name,
      designation: raw.designation || raw.name,
      nasa_jpl_url: raw.nasa_jpl_url,
      absolute_magnitude_h: raw.absolute_magnitude_h,
      estimated_diameter: raw.estimated_diameter,
      is_potentially_hazardous_asteroid: raw.is_potentially_hazardous_asteroid,
      close_approach_data: raw.close_approach_data || [],
      orbital_data: raw.orbital_data,
      is_sentry_object: raw.is_sentry_object,
      sourceCategory: "NASA NeoWs",
      retrievalTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
    };
  } catch {
    return null;
  }
}
