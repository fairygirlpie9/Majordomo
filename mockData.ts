
import { Property } from './types';

// --- ENGLISH DATASET (Western Persona: Wine, Ski, Urban) ---
export const PROPERTIES_EN: Property[] = [
  {
    id: "aspen-001",
    name: "Aspen Peak Residence",
    image: "https://picsum.photos/id/1015/800/400",
    location: {
      address: "Red Mountain Rd, Aspen, CO 81611, USA",
      coordinates: { lat: 39.1911, lon: -106.8175 }
    },
    timezone: "America/Denver",
    environmental: {
      temperature: -2,
      feelsLike: -5,
      condition: "Snowing",
      humidity: 45,
      windSpeed: 15,
      aqi: 12,
      alerts: ["Heavy Snow Warning"]
    },
    security: {
      armed: true,
      mode: "ARMED",
      sensors: {
        doors: { total: 18, open: 0, faulted: 0 },
        windows: { total: 42, open: 0, faulted: 0 },
        motion: { active: 20, triggered: 0 },
        cameras: { total: 32, online: 32, recording: 32 }
      },
      lastArmed: "2024-05-20T18:00:00Z"
    },
    hvac: [
      { id: "z1", name: "Great Room", currentTemp: 21, targetTemp: 21, mode: "heat", status: "optimal", fanSpeed: "auto" },
      { id: "z2", name: "Master Suite", currentTemp: 22, targetTemp: 20, mode: "heat", status: "optimal", fanSpeed: "low" }
    ],
    power: {
      generator: {
        status: "standby",
        fuelLevel: 98,
        runtime: "48 hours",
        lastTest: "2024-05-15T12:00:00Z"
      }
    },
    wineCellar: {
      inventory: { totalBottles: 1500 },
      environmental: { temperature: 13, humidity: 65 }
    },
    collections: {
      fleet: [
        { id: "c1", name: "Range Rover SV", type: "SUV", status: "ready", location: "Heated Garage" },
        { id: "c2", name: "Porsche 911 Dakar", type: "Sport", status: "service", location: "Service Center" }
      ],
      vault: {
        status: "secure",
        humidity: 40,
        temp: 20,
        items: [{ id: "v1", name: "Patek Philippe Grandmaster", category: "watch", status: "secure" }]
      }
    },
    staff: [
      { id: "s1", name: "Sarah Jenkins", role: "House Manager", status: "on-site", location: "Office", lastCheckIn: "2024-05-20T08:00:00Z" }
    ],
    alerts: []
  },
  {
    id: "london-002",
    name: "Belgravia Manor",
    image: "https://picsum.photos/id/1016/800/400",
    location: {
      address: "Chester Square, London SW1W, UK",
      coordinates: { lat: 51.496, lon: -0.148 }
    },
    timezone: "Europe/London",
    environmental: {
      temperature: 12,
      feelsLike: 10,
      condition: "Rain",
      humidity: 80,
      windSpeed: 20,
      aqi: 45,
      alerts: []
    },
    security: {
      armed: true,
      mode: "PERIMETER",
      sensors: {
        doors: { total: 12, open: 0, faulted: 0 },
        windows: { total: 30, open: 0, faulted: 0 },
        motion: { active: 15, triggered: 0 },
        cameras: { total: 24, online: 24, recording: 24 }
      },
      lastArmed: "2024-05-20T09:00:00Z"
    },
    hvac: [
      { id: "z1", name: "Drawing Room", currentTemp: 20, targetTemp: 21, mode: "heat", status: "optimal", fanSpeed: "auto" }
    ],
    power: {
      generator: {
        status: "standby",
        fuelLevel: 100,
        runtime: "24 hours",
        lastTest: "2024-05-01T10:00:00Z"
      }
    },
    wineCellar: {
      inventory: { totalBottles: 850 },
      environmental: { temperature: 12, humidity: 70 }
    },
    collections: {
      fleet: [
        { id: "c1", name: "Rolls-Royce Phantom", type: "Luxury", status: "ready", location: "Mews Garage" }
      ],
      vault: {
        status: "secure",
        humidity: 45,
        temp: 21,
        items: [{ id: "v1", name: "Vintage Rolex Collection", category: "watch", status: "secure" }]
      }
    },
    staff: [
      { id: "s1", name: "Arthur Pennyworth", role: "Butler", status: "on-site", location: "Pantry", lastCheckIn: "2024-05-20T07:30:00Z" }
    ],
    alerts: []
  }
];

// --- ARABIC DATASET (Gulf Persona: Falconry, No Wine, Hot Climate) ---
export const PROPERTIES_AR: Property[] = [
  {
    id: "riyadh-001",
    name: "Al-Safa Estate",
    image: "https://picsum.photos/id/1015/800/400",
    location: {
      address: "Al Hada District, Riyadh 11564, KSA",
      coordinates: { lat: 24.6657, lon: 46.6664 }
    },
    timezone: "Asia/Riyadh",
    environmental: {
      temperature: 38,
      feelsLike: 40,
      condition: "Clear",
      humidity: 12,
      windSpeed: 22,
      aqi: 45,
      alerts: ["High UV Index Warning"]
    },
    security: {
      armed: true,
      mode: "ARMED",
      sensors: {
        doors: { total: 24, open: 0, faulted: 0 },
        windows: { total: 56, open: 0, faulted: 0 },
        motion: { active: 32, triggered: 0 },
        cameras: { total: 48, online: 48, recording: 48 }
      },
      lastArmed: "2024-05-20T14:30:00Z"
    },
    hvac: [
      { id: "z1", name: "Majlis", currentTemp: 21, targetTemp: 20, mode: "cool", status: "optimal", fanSpeed: "high" },
      { id: "z2", name: "Royal Suite", currentTemp: 22, targetTemp: 22, mode: "cool", status: "optimal", fanSpeed: "auto" }
    ],
    power: {
      generator: {
        status: "standby",
        fuelLevel: 94,
        runtime: "120 hours",
        lastTest: "2024-05-18T10:00:00Z"
      }
    },
    falconry: {
      enabled: true,
      facilityName: "Royal Mews",
      environmental: { temperature: 22, humidity: 45, airQuality: 'pure' },
      falcons: [
        { id: "f1", name: "Shaheen", species: "Peregrine", weight: 980, status: "training", feedStatus: "fed" },
        { id: "f2", name: "Zumourrod", species: "Gyrfalcon", weight: 1350, status: "resting", feedStatus: "pending" }
      ]
    },
    collections: {
      fleet: [
        { id: "c1", name: "Rolls-Royce Spectre", type: "EV", status: "charging", batteryLevel: 85, location: "Main Garage" },
        { id: "c2", name: "G-Wagon 6x6", type: "SUV", status: "ready", location: "Courtyard" }
      ],
      vault: {
        status: "secure",
        humidity: 45,
        temp: 20,
        items: [
          { id: "v1", name: "Diamond Set", category: "jewelry", status: "accessed" }
        ]
      }
    },
    staff: [
      { id: "s1", name: "Tariq Al-Fayed", role: "Estate Manager", status: "on-site", location: "Ops Center", lastCheckIn: "2024-05-20T08:00:00Z" },
      { id: "s2", name: "Dr. Hamza", role: "Falconer", status: "on-site", location: "Mews", lastCheckIn: "2024-05-20T07:30:00Z" }
    ],
    alerts: [
      { id: "a1", severity: "warning", message: "Filtration maintenance required for Fountain 3", timestamp: "2024-05-20T10:15:00Z", acknowledged: false }
    ]
  },
  {
    id: "dubai-002",
    name: "Azure Coast Villa",
    image: "https://picsum.photos/id/1016/800/400",
    location: {
      address: "Frond N, Palm Jumeirah, Dubai",
      coordinates: { lat: 25.1124, lon: 55.1390 }
    },
    timezone: "Asia/Dubai",
    environmental: {
      temperature: 32,
      feelsLike: 36,
      condition: "Hazy",
      humidity: 65,
      windSpeed: 14,
      aqi: 55,
      alerts: []
    },
    security: {
      armed: false,
      mode: "DISARMED",
      sensors: {
        doors: { total: 30, open: 2, faulted: 0 },
        windows: { total: 45, open: 4, faulted: 0 },
        motion: { active: 20, triggered: 0 },
        cameras: { total: 36, online: 36, recording: 36 }
      },
      lastArmed: "2024-05-19T23:45:00Z"
    },
    hvac: [
      { id: "z1", name: "Grand Salon", currentTemp: 22, targetTemp: 22, mode: "cool", status: "optimal", fanSpeed: "auto" }
    ],
    power: {
      generator: {
        status: "standby",
        fuelLevel: 98,
        runtime: "120 hours",
        lastTest: "2024-05-15T09:00:00Z"
      }
    },
    falconry: {
      enabled: false, // Explicitly disabled, no facility
      facilityName: "",
      environmental: { temperature: 0, humidity: 0, airQuality: 'pure' },
      falcons: []
    },
    collections: {
      fleet: [
        { id: "c1", name: "Bugatti Chiron", type: "Sport", status: "ready", location: "Display Garage" },
        { id: "c2", name: "Yacht Tender", type: "Marine", status: "ready", location: "Private Berth" }
      ],
      vault: {
        status: "secure",
        humidity: 50,
        temp: 21,
        items: []
      }
    },
    staff: [
      { id: "s3", name: "James Sterling", role: "Butler", status: "on-site", location: "Main Hall", lastCheckIn: "2024-05-20T10:00:00Z" }
    ],
    alerts: []
  }
];

// --- FRENCH DATASET (French Persona: Wine, Estate) ---
export const PROPERTIES_FR: Property[] = [
  {
    id: "provence-003",
    name: "Château de Lumière",
    image: "https://picsum.photos/id/1018/800/400",
    location: {
      address: "Aix-en-Provence, 13100, France",
      coordinates: { lat: 43.5297, lon: 5.4474 }
    },
    timezone: "Europe/Paris",
    environmental: {
      temperature: 24,
      feelsLike: 25,
      condition: "Sunny",
      humidity: 45,
      windSpeed: 10,
      aqi: 30,
      alerts: []
    },
    security: {
      armed: true,
      mode: "PERIMETER",
      sensors: {
        doors: { total: 18, open: 1, faulted: 0 },
        windows: { total: 42, open: 6, faulted: 0 },
        motion: { active: 15, triggered: 0 },
        cameras: { total: 24, online: 24, recording: 24 }
      },
      lastArmed: "2024-05-20T09:00:00Z"
    },
    hvac: [
      { id: "z1", name: "Grand Hall", currentTemp: 20, targetTemp: 21, mode: "auto", status: "optimal", fanSpeed: "low" },
      { id: "z2", name: "Library", currentTemp: 19, targetTemp: 20, mode: "heat", status: "optimal", fanSpeed: "auto" }
    ],
    power: {
      generator: {
        status: "standby",
        fuelLevel: 96,
        runtime: "10 hours",
        lastTest: "2024-05-10T14:00:00Z"
      }
    },
    wineCellar: {
      inventory: {
        totalBottles: 4250,
      },
      environmental: {
        temperature: 12,
        humidity: 70
      }
    },
    collections: {
      fleet: [
        { id: "c1", name: "Aston Martin DB5", type: "Classic", status: "ready", location: "Carriage House" }
      ],
      vault: {
        status: "secure",
        humidity: 50,
        temp: 18,
        items: [
           { id: "v1", name: "Cartier Tank", category: "watch", status: "secure" }
        ]
      }
    },
    staff: [
      { id: "s4", name: "Jean-Luc Dubois", role: "Estate Manager", status: "on-site", location: "Office", lastCheckIn: "2024-05-20T08:30:00Z" },
      { id: "s5", name: "Marie Laurent", role: "Sommelier", status: "on-site", location: "Cellar", lastCheckIn: "2024-05-20T09:15:00Z" }
    ],
    alerts: [
       { id: "a3", severity: "info", message: "Wine delivery scheduled for 14:00", timestamp: "2024-05-20T10:00:00Z", acknowledged: false }
    ]
  }
];
