import { NearEarthObject } from '../types/neo';

export const CURATED_NEOS: NearEarthObject[] = [
  {
    id: "2099942",
    neo_reference_id: "2099942",
    name: "99942 Apophis",
    designation: "2004 MN4 // CNEOS #2099942",
    nasa_jpl_url: "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=99942",
    absolute_magnitude_h: 19.2,
    estimated_diameter: {
      kilometers: { min: 0.31, max: 0.37 },
      meters: { min: 310, max: 370 },
      miles: { min: 0.19, max: 0.23 },
      feet: { min: 1017, max: 1214 },
    },
    is_potentially_hazardous_asteroid: true,
    close_approach_data: [
      {
        close_approach_date: "2029-04-13",
        close_approach_date_full: "2029-Apr-13 21:46",
        epoch_date_close_approach: 1870811160000,
        relative_velocity: {
          kilometers_per_second: "30.73",
          kilometers_per_hour: "110628",
          miles_per_hour: "68741",
        },
        miss_distance: {
          astronomical: "0.000211",
          lunar: "0.082",
          kilometers: "31600",
          miles: "19635",
        },
        orbiting_body: "Earth",
      }
    ],
    orbital_data: {
      orbit_id: "219",
      orbit_uncertainty: "0",
      minimum_orbit_intersection: "0.000318",
      eccentricity: "0.1912",
      semi_major_axis: "0.9224",
      inclination: "3.3314",
      orbital_period: "323.6",
      perihelion_distance: "0.7460",
      aphelion_distance: "1.0988",
      orbit_class: {
        orbit_class_type: "ATE",
        orbit_class_description: "Aten asteroid with semi-major axis less than 1.0 AU and aphelion greater than 0.983 AU.",
        orbit_class_range: "a < 1.0 AU, Q > 0.983 AU",
      }
    },
    notes: "Historically rated Level 4 on Torino Scale in 2004. Comprehensive radar astrometry during the 2021 flyby definitively ruled out impact risk for at least 100 years. Will pass inside geostationary orbit.",
    sourceCategory: "NASA NeoWs",
    retrievalTimestamp: "2026-10-03 06:45:00 UTC",
  },
  {
    id: "2101955",
    neo_reference_id: "2101955",
    name: "101955 Bennu",
    designation: "1999 RQ36 // OSIRIS-REx Specimen Target",
    nasa_jpl_url: "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=101955",
    absolute_magnitude_h: 20.9,
    estimated_diameter: {
      kilometers: { min: 0.47, max: 0.51 },
      meters: { min: 470, max: 510 },
      miles: { min: 0.29, max: 0.32 },
      feet: { min: 1542, max: 1673 },
    },
    is_potentially_hazardous_asteroid: true,
    close_approach_data: [
      {
        close_approach_date: "2060-09-23",
        close_approach_date_full: "2060-Sep-23 03:12",
        epoch_date_close_approach: 2863153920000,
        relative_velocity: {
          kilometers_per_second: "27.80",
          kilometers_per_hour: "100080",
          miles_per_hour: "62187",
        },
        miss_distance: {
          astronomical: "0.005013",
          lunar: "1.950",
          kilometers: "750000",
          miles: "466028",
        },
        orbiting_body: "Earth",
      }
    ],
    orbital_data: {
      orbit_id: "148",
      orbit_uncertainty: "0",
      minimum_orbit_intersection: "0.003310",
      eccentricity: "0.2037",
      semi_major_axis: "1.1260",
      inclination: "6.0349",
      orbital_period: "436.6",
      perihelion_distance: "0.8969",
      aphelion_distance: "1.3559",
      orbit_class: {
        orbit_class_type: "APO",
        orbit_class_description: "Apollo asteroid with perihelion less than 1.017 AU and semi-major axis greater than 1.0 AU.",
        orbit_class_range: "a > 1.0 AU, q < 1.017 AU",
      }
    },
    notes: "Carbonaceous B-type asteroid sampled by NASA's OSIRIS-REx spacecraft (sample returned Sept 2023). Cumulative impact probability is 1-in-1,750 between years 2178 and 2290.",
    sourceCategory: "NASA NeoWs",
    retrievalTimestamp: "2026-10-03 06:45:00 UTC",
  },
  {
    id: "2004179",
    neo_reference_id: "2004179",
    name: "4179 Toutatis",
    designation: "1989 AC // Chaotic 3:1 Resonance",
    nasa_jpl_url: "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=4179",
    absolute_magnitude_h: 15.3,
    estimated_diameter: {
      kilometers: { min: 4.5, max: 5.4 },
      meters: { min: 4500, max: 5400 },
      miles: { min: 2.8, max: 3.36 },
      feet: { min: 14763, max: 17716 },
    },
    is_potentially_hazardous_asteroid: true,
    close_approach_data: [
      {
        close_approach_date: "2069-11-05",
        close_approach_date_full: "2069-Nov-05 14:30",
        epoch_date_close_approach: 3150887400000,
        relative_velocity: {
          kilometers_per_second: "37.50",
          kilometers_per_hour: "135000",
          miles_per_hour: "83885",
        },
        miss_distance: {
          astronomical: "0.046124",
          lunar: "17.95",
          kilometers: "6900000",
          miles: "4287460",
        },
        orbiting_body: "Earth",
      }
    ],
    orbital_data: {
      orbit_id: "112",
      orbit_uncertainty: "0",
      minimum_orbit_intersection: "0.0062",
      eccentricity: "0.6293",
      semi_major_axis: "2.5310",
      inclination: "0.4468",
      orbital_period: "1470.9",
      perihelion_distance: "0.9382",
      aphelion_distance: "4.1238",
      orbit_class: {
        orbit_class_type: "APO",
        orbit_class_description: "Apollo asteroid in 3:1 orbital resonance with Jupiter and 1:4 with Earth.",
        orbit_class_range: "a > 1.0 AU, q < 1.017 AU",
      }
    },
    notes: "Elongated contact binary undergoing chaotic non-principal axis tumbling rotation. Imaged by Goldstone radar and Chinese Chang'e 2 probe in 2012.",
    sourceCategory: "NASA NeoWs",
    retrievalTimestamp: "2026-10-03 06:45:00 UTC",
  },
  {
    id: "54425624",
    neo_reference_id: "54425624",
    name: "2024 BX1",
    designation: "Sar2736 // Atmospheric Bolide",
    nasa_jpl_url: "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=2024+BX1",
    absolute_magnitude_h: 32.8,
    estimated_diameter: {
      kilometers: { min: 0.0008, max: 0.0015 },
      meters: { min: 0.8, max: 1.5 },
      miles: { min: 0.0005, max: 0.0009 },
      feet: { min: 2.6, max: 4.9 },
    },
    is_potentially_hazardous_asteroid: false,
    close_approach_data: [
      {
        close_approach_date: "2024-01-21",
        close_approach_date_full: "2024-Jan-21 00:33",
        epoch_date_close_approach: 1705797180000,
        relative_velocity: {
          kilometers_per_second: "15.20",
          kilometers_per_hour: "54720",
          miles_per_hour: "34001",
        },
        miss_distance: {
          astronomical: "0.000000",
          lunar: "0.000",
          kilometers: "0",
          miles: "0",
        },
        orbiting_body: "Earth",
      }
    ],
    orbital_data: {
      orbit_id: "14",
      orbit_uncertainty: "1",
      minimum_orbit_intersection: "0.0000",
      eccentricity: "0.278",
      semi_major_axis: "1.332",
      inclination: "7.28",
      orbital_period: "561.4",
      perihelion_distance: "0.961",
      aphelion_distance: "1.703",
      orbit_class: {
        orbit_class_type: "APO",
        orbit_class_description: "Apollo asteroid that impacted Earth's atmosphere harmlessly.",
        orbit_class_range: "Impact trajectory",
      }
    },
    notes: "Detected ~3 hours before impact by Krisztián Sárneczky at Piszkéstető Station. Disintegrated harmlessly in upper atmosphere west of Berlin. Rare aubrite meteorite fragments recovered.",
    sourceCategory: "NASA NeoWs",
    retrievalTimestamp: "2026-10-03 06:45:00 UTC",
  },
  {
    id: "54341991",
    neo_reference_id: "54341991",
    name: "2023 DZ2",
    designation: "2023 DZ2 // City-Killer Class Flyby",
    nasa_jpl_url: "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=2023+DZ2",
    absolute_magnitude_h: 24.2,
    estimated_diameter: {
      kilometers: { min: 0.040, max: 0.090 },
      meters: { min: 40, max: 90 },
      miles: { min: 0.025, max: 0.056 },
      feet: { min: 131, max: 295 },
    },
    is_potentially_hazardous_asteroid: false,
    close_approach_data: [
      {
        close_approach_date: "2023-03-25",
        close_approach_date_full: "2023-Mar-25 19:49",
        epoch_date_close_approach: 1679773740000,
        relative_velocity: {
          kilometers_per_second: "7.78",
          kilometers_per_hour: "28008",
          miles_per_hour: "17403",
        },
        miss_distance: {
          astronomical: "0.001168",
          lunar: "0.455",
          kilometers: "174750",
          miles: "108584",
        },
        orbiting_body: "Earth",
      }
    ],
    orbital_data: {
      orbit_id: "58",
      orbit_uncertainty: "0",
      minimum_orbit_intersection: "0.0011",
      eccentricity: "0.536",
      semi_major_axis: "2.169",
      inclination: "0.08",
      orbital_period: "1166.7",
      perihelion_distance: "1.006",
      aphelion_distance: "3.332",
      orbit_class: {
        orbit_class_type: "AMO",
        orbit_class_description: "Amor asteroid with perihelion just outside Earth orbit.",
        orbit_class_range: "1.017 AU < q < 1.3 AU",
      }
    },
    notes: "Passed halfway between Earth and Moon on March 25, 2023. Not classified PHA by NASA because diameter < 140m, despite passing well inside 0.05 AU.",
    sourceCategory: "NASA NeoWs",
    retrievalTimestamp: "2026-10-03 06:45:00 UTC",
  },
  {
    id: "2029075",
    neo_reference_id: "2029075",
    name: "(29075) 1950 DA",
    designation: "1950 DA // Long-Term Planetary Risk",
    nasa_jpl_url: "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=29075",
    absolute_magnitude_h: 17.0,
    estimated_diameter: {
      kilometers: { min: 1.1, max: 1.4 },
      meters: { min: 1100, max: 1400 },
      miles: { min: 0.68, max: 0.87 },
      feet: { min: 3608, max: 4593 },
    },
    is_potentially_hazardous_asteroid: true,
    close_approach_data: [
      {
        close_approach_date: "2032-03-02",
        close_approach_date_full: "2032-Mar-02 11:15",
        epoch_date_close_approach: 1961838900000,
        relative_velocity: {
          kilometers_per_second: "14.10",
          kilometers_per_hour: "50760",
          miles_per_hour: "31540",
        },
        miss_distance: {
          astronomical: "0.075421",
          lunar: "29.35",
          kilometers: "11282800",
          miles: "7010808",
        },
        orbiting_body: "Earth",
      }
    ],
    orbital_data: {
      orbit_id: "194",
      orbit_uncertainty: "0",
      minimum_orbit_intersection: "0.0404",
      eccentricity: "0.507",
      semi_major_axis: "1.699",
      inclination: "12.18",
      orbital_period: "808.5",
      perihelion_distance: "0.837",
      aphelion_distance: "2.561",
      orbit_class: {
        orbit_class_type: "APO",
        orbit_class_description: "Apollo asteroid with high radar albedo and retrograde rotation.",
        orbit_class_range: "a > 1.0 AU, q < 1.017 AU",
      }
    },
    notes: "Historically noteworthy object with a non-zero impact possibility identified for March 16, 2880 (~1 in 30,000 depending on Yarkovsky thermal acceleration).",
    sourceCategory: "NASA NeoWs",
    retrievalTimestamp: "2026-10-03 06:45:00 UTC",
  },
  {
    id: "2065803",
    neo_reference_id: "2065803",
    name: "65803 Didymos",
    designation: "1996 GT // NASA DART Target System",
    nasa_jpl_url: "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=65803",
    absolute_magnitude_h: 18.1,
    estimated_diameter: {
      kilometers: { min: 0.76, max: 0.82 },
      meters: { min: 760, max: 820 },
      miles: { min: 0.47, max: 0.51 },
      feet: { min: 2493, max: 2690 },
    },
    is_potentially_hazardous_asteroid: true,
    close_approach_data: [
      {
        close_approach_date: "2026-10-04",
        close_approach_date_full: "2026-Oct-04 08:20",
        epoch_date_close_approach: 1791102000000,
        relative_velocity: {
          kilometers_per_second: "18.34",
          kilometers_per_hour: "66024",
          miles_per_hour: "41025",
        },
        miss_distance: {
          astronomical: "0.071240",
          lunar: "27.72",
          kilometers: "10657300",
          miles: "6622140",
        },
        orbiting_body: "Earth",
      }
    ],
    orbital_data: {
      orbit_id: "162",
      orbit_uncertainty: "0",
      minimum_orbit_intersection: "0.038",
      eccentricity: "0.384",
      semi_major_axis: "1.644",
      inclination: "3.41",
      orbital_period: "770.2",
      perihelion_distance: "1.013",
      aphelion_distance: "2.275",
      orbit_class: {
        orbit_class_type: "AMO",
        orbit_class_description: "Binary asteroid system: Primary Didymos (780m) orbited by Dimorphos (160m).",
        orbit_class_range: "1.017 AU < q < 1.3 AU",
      }
    },
    notes: "Site of humanity's first successful planetary defense kinetic impactor test (NASA DART struck Dimorphos on Sept 26, 2022, altering its orbital period by 33 minutes). ESA Hera mission arrives in 2026.",
    sourceCategory: "NASA NeoWs",
    retrievalTimestamp: "2026-10-03 06:45:00 UTC",
  },
  {
    id: "54054450",
    neo_reference_id: "54054450",
    name: "2020 SW",
    designation: "2020 SW // Ultra-Close Sub-GEO Flyby",
    nasa_jpl_url: "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=2020+SW",
    absolute_magnitude_h: 28.5,
    estimated_diameter: {
      kilometers: { min: 0.004, max: 0.010 },
      meters: { min: 4.3, max: 9.7 },
      miles: { min: 0.0027, max: 0.006 },
      feet: { min: 14, max: 32 },
    },
    is_potentially_hazardous_asteroid: false,
    close_approach_data: [
      {
        close_approach_date: "2020-09-24",
        close_approach_date_full: "2020-Sep-24 11:12",
        epoch_date_close_approach: 1600945920000,
        relative_velocity: {
          kilometers_per_second: "7.74",
          kilometers_per_hour: "27864",
          miles_per_hour: "17313",
        },
        miss_distance: {
          astronomical: "0.000188",
          lunar: "0.073",
          kilometers: "28100",
          miles: "17460",
        },
        orbiting_body: "Earth",
      }
    ],
    orbital_data: {
      orbit_id: "22",
      orbit_uncertainty: "0",
      minimum_orbit_intersection: "0.00015",
      eccentricity: "0.079",
      semi_major_axis: "1.054",
      inclination: "0.45",
      orbital_period: "395.2",
      perihelion_distance: "0.971",
      aphelion_distance: "1.137",
      orbit_class: {
        orbit_class_type: "APO",
        orbit_class_description: "Small Apollo asteroid passing beneath geostationary ring (36,000 km).",
        orbit_class_range: "a > 1.0 AU, q < 1.017 AU",
      }
    },
    notes: "Flew past Earth at a distance of 28,100 km—closer than our geostationary communication satellites. Harmless due to small size (school-bus sized).",
    sourceCategory: "NASA NeoWs",
    retrievalTimestamp: "2026-10-03 06:45:00 UTC",
  }
];

// Additional representative population points matching NASA CNEOS statistics for statistical plots
export interface PopulationPoint {
  id: string;
  name: string;
  velocityKms: number;
  missDistanceLd: number;
  diameterMeters: number;
  absoluteMagnitudeH: number;
  isPha: boolean;
  approachDate: string;
}

export const REPRESENTATIVE_POPULATION: PopulationPoint[] = [
  { id: "2099942", name: "99942 Apophis", velocityKms: 30.73, missDistanceLd: 0.082, diameterMeters: 340, absoluteMagnitudeH: 19.2, isPha: true, approachDate: "2029-04-13" },
  { id: "2101955", name: "101955 Bennu", velocityKms: 27.80, missDistanceLd: 1.95, diameterMeters: 492, absoluteMagnitudeH: 20.9, isPha: true, approachDate: "2060-09-23" },
  { id: "2004179", name: "4179 Toutatis", velocityKms: 37.50, missDistanceLd: 17.95, diameterMeters: 5400, absoluteMagnitudeH: 15.3, isPha: true, approachDate: "2069-11-05" },
  { id: "54425624", name: "2024 BX1", velocityKms: 15.20, missDistanceLd: 0.00, diameterMeters: 1.2, absoluteMagnitudeH: 32.8, isPha: false, approachDate: "2024-01-21" },
  { id: "54341991", name: "2023 DZ2", velocityKms: 7.78, missDistanceLd: 0.455, diameterMeters: 65, absoluteMagnitudeH: 24.2, isPha: false, approachDate: "2023-03-25" },
  { id: "2029075", name: "1950 DA", velocityKms: 14.10, missDistanceLd: 29.35, diameterMeters: 1300, absoluteMagnitudeH: 17.0, isPha: true, approachDate: "2032-03-02" },
  { id: "2065803", name: "65803 Didymos", velocityKms: 18.34, missDistanceLd: 27.72, diameterMeters: 780, absoluteMagnitudeH: 18.1, isPha: true, approachDate: "2026-10-04" },
  { id: "54054450", name: "2020 SW", velocityKms: 7.74, missDistanceLd: 0.073, diameterMeters: 7, absoluteMagnitudeH: 28.5, isPha: false, approachDate: "2020-09-24" },
  { id: "2001862", name: "1862 Apollo", velocityKms: 16.65, missDistanceLd: 27.20, diameterMeters: 1500, absoluteMagnitudeH: 16.25, isPha: true, approachDate: "2027-11-19" },
  { id: "2002101", name: "2101 Adonis", velocityKms: 22.84, missDistanceLd: 14.05, diameterMeters: 600, absoluteMagnitudeH: 18.7, isPha: true, approachDate: "2036-02-07" },
  { id: "2003200", name: "3200 Phaethon", velocityKms: 33.80, missDistanceLd: 26.80, diameterMeters: 5800, absoluteMagnitudeH: 14.5, isPha: true, approachDate: "2026-12-16" },
  { id: "3542519", name: "2010 WC9", velocityKms: 12.81, missDistanceLd: 0.53, diameterMeters: 85, absoluteMagnitudeH: 23.6, isPha: false, approachDate: "2028-05-15" },
  { id: "3752697", name: "2016 RB1", velocityKms: 8.12, missDistanceLd: 0.10, diameterMeters: 10, absoluteMagnitudeH: 27.8, isPha: false, approachDate: "2028-09-07" },
  { id: "2138971", name: "138971 (2001 CB21)", velocityKms: 11.97, missDistanceLd: 12.80, diameterMeters: 560, absoluteMagnitudeH: 18.4, isPha: true, approachDate: "2027-03-04" },
  { id: "2163132", name: "163132 (2002 CU11)", velocityKms: 25.10, missDistanceLd: 16.40, diameterMeters: 430, absoluteMagnitudeH: 18.9, isPha: true, approachDate: "2029-08-31" },
  { id: "3795123", name: "2018 CB", velocityKms: 7.28, missDistanceLd: 0.18, diameterMeters: 28, absoluteMagnitudeH: 25.9, isPha: false, approachDate: "2029-02-09" },
  { id: "3796541", name: "2018 GE3", velocityKms: 29.58, missDistanceLd: 0.50, diameterMeters: 75, absoluteMagnitudeH: 23.8, isPha: false, approachDate: "2030-04-15" },
  { id: "2417419", name: "417419 (2006 HZ106)", velocityKms: 19.45, missDistanceLd: 3.85, diameterMeters: 280, absoluteMagnitudeH: 20.4, isPha: true, approachDate: "2028-01-22" },
  { id: "2455418", name: "455418 (2003 DE3)", velocityKms: 21.05, missDistanceLd: 4.90, diameterMeters: 310, absoluteMagnitudeH: 20.1, isPha: true, approachDate: "2027-02-18" },
  { id: "3843452", name: "2019 OK", velocityKms: 24.50, missDistanceLd: 0.19, diameterMeters: 90, absoluteMagnitudeH: 23.3, isPha: false, approachDate: "2029-07-25" },
  { id: "2388945", name: "388945 (2008 TZ3)", velocityKms: 8.85, missDistanceLd: 14.85, diameterMeters: 350, absoluteMagnitudeH: 19.8, isPha: true, approachDate: "2028-05-10" },
  { id: "2385186", name: "385186 (1994 AW1)", velocityKms: 18.72, missDistanceLd: 32.50, diameterMeters: 980, absoluteMagnitudeH: 17.6, isPha: true, approachDate: "2029-07-22" },
  { id: "3874112", name: "2019 OU1", velocityKms: 13.02, missDistanceLd: 2.65, diameterMeters: 120, absoluteMagnitudeH: 22.8, isPha: false, approachDate: "2029-08-28" },
  { id: "2441987", name: "441987 (2010 NY65)", velocityKms: 13.35, missDistanceLd: 9.80, diameterMeters: 220, absoluteMagnitudeH: 21.3, isPha: true, approachDate: "2028-06-24" },
  { id: "2465633", name: "465633 (2009 JR5)", velocityKms: 16.48, missDistanceLd: 1.95, diameterMeters: 380, absoluteMagnitudeH: 19.7, isPha: true, approachDate: "2027-05-02" },
  { id: "3920194", name: "2020 QG", velocityKms: 12.35, missDistanceLd: 0.02, diameterMeters: 6, absoluteMagnitudeH: 29.8, isPha: false, approachDate: "2020-08-16" },
  { id: "3987211", name: "2021 NY1", velocityKms: 9.35, missDistanceLd: 4.10, diameterMeters: 170, absoluteMagnitudeH: 21.6, isPha: false, approachDate: "2027-09-22" },
  { id: "54231441", name: "2022 EB5", velocityKms: 18.10, missDistanceLd: 0.00, diameterMeters: 2.1, absoluteMagnitudeH: 31.5, isPha: false, approachDate: "2022-03-11" },
  { id: "2488453", name: "488453 (1994 XD)", velocityKms: 21.40, missDistanceLd: 8.20, diameterMeters: 600, absoluteMagnitudeH: 19.0, isPha: true, approachDate: "2028-11-27" },
  { id: "54318721", name: "2023 CX1", velocityKms: 14.50, missDistanceLd: 0.00, diameterMeters: 1.0, absoluteMagnitudeH: 32.6, isPha: false, approachDate: "2023-02-13" },
  { id: "2153814", name: "153814 (2001 WN5)", velocityKms: 10.24, missDistanceLd: 0.65, diameterMeters: 920, absoluteMagnitudeH: 18.2, isPha: true, approachDate: "2028-06-26" },
  { id: "2162173", name: "162173 Ryugu", velocityKms: 19.82, missDistanceLd: 23.40, diameterMeters: 900, absoluteMagnitudeH: 19.2, isPha: true, approachDate: "2030-12-05" },
];
