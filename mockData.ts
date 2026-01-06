
import { Property } from './types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "aspen-001",
    name: "Aspen Peak Residence",
    image: "https://picsum.photos/id/1015/800/400",
    location: {
      address: "123 Mountain View Dr, Aspen, CO 81611",
      coordinates: { lat: 39.1911, lon: -106.8175 }
    },
    timezone: "America/Denver",
    environmental: {
      temperature: -2,
      feelsLike: -8,
      condition: "Heavy Snow",
      humidity: 78,
      windSpeed: 15,
      aqi: 12,
      alerts: ["Winter storm warning until 8 PM MST"]
    },
    security: {
      armed: true,
      mode: "ARMED",
      sensors: {
        doors: { total: 18, open: 0, faulted: 0 },
        windows: { total: 32, open: 0, faulted: 0 },
        motion: { active: 14, triggered: 0 },
        cameras: { total: 24, online: 24, recording: 24 }
      },
      lastArmed: "2024-05-20T14:30:00Z"
    },
    hvac: [
      { id: "z1", name: "Main Hall", currentTemp: 21, targetTemp: 21, mode: "heat", status: "optimal", fanSpeed: "auto" },
      { id: "z2", name: "Master Suite", currentTemp: 20, targetTemp: 22, mode: "heat", status: "warning", fanSpeed: "medium" },
      { id: "z3", name: "Guest Wing", currentTemp: 19, targetTemp: 18, mode: "off", status: "optimal", fanSpeed: "low" }
    ],
    power: {
      generator: {
        status: "standby",
        fuelLevel: 88,
        runtime: "72 hours",
        lastTest: "2024-05-18T10:00:00Z"
      }
    },
    wineCellar: {
      enabled: true,
      tier: 2,
      inventory: { totalBottles: 1240, estimatedValue: 850000 },
      environmental: { temperature: 13, targetTemp: 13, humidity: 65, targetHumidity: 65, vibration: "normal", light: "off" }
    },
    staff: [
      { id: "s1", name: "Marcus Thorne", role: "Estate Manager", status: "on-site", location: "Security Hub", lastCheckIn: "2024-05-20T08:00:00Z" },
      { id: "s2", name: "Elena Rossi", role: "Private Chef", status: "on-site", location: "Main Kitchen", lastCheckIn: "2024-05-20T07:30:00Z" }
    ],
    alerts: [
      { id: "a1", severity: "warning", message: "Low humidity in Master Suite HVAC", timestamp: "2024-05-20T10:15:00Z", acknowledged: false },
      { id: "a2", severity: "info", message: "Snow clearing service scheduled for 18:00", timestamp: "2024-05-20T09:00:00Z", acknowledged: true }
    ]
  },
  {
    id: "monaco-002",
    name: "Villa du Cap",
    image: "https://picsum.photos/id/1016/800/400",
    location: {
      address: "7 Avenue de la Costa, Monte Carlo 98000",
      coordinates: { lat: 43.7384, lon: 7.4246 }
    },
    timezone: "Europe/Monaco",
    environmental: {
      temperature: 24,
      feelsLike: 26,
      condition: "Clear Sky",
      humidity: 45,
      windSpeed: 8,
      aqi: 22,
      alerts: []
    },
    security: {
      armed: false,
      mode: "DISARMED",
      sensors: {
        doors: { total: 12, open: 2, faulted: 0 },
        windows: { total: 24, open: 4, faulted: 0 },
        motion: { active: 8, triggered: 0 },
        cameras: { total: 18, online: 18, recording: 18 }
      },
      lastArmed: "2024-05-19T23:45:00Z"
    },
    hvac: [
      { id: "z1", name: "Grand Salon", currentTemp: 23, targetTemp: 23, mode: "cool", status: "optimal", fanSpeed: "auto" },
      { id: "z2", name: "Library", currentTemp: 24, targetTemp: 22, mode: "cool", status: "optimal", fanSpeed: "high" }
    ],
    power: {
      generator: {
        status: "standby",
        fuelLevel: 95,
        runtime: "120 hours",
        lastTest: "2024-05-15T09:00:00Z"
      }
    },
    wineCellar: {
      enabled: true,
      tier: 2,
      inventory: { totalBottles: 3500, estimatedValue: 2400000 },
      environmental: { temperature: 14, targetTemp: 14, humidity: 62, targetHumidity: 65, vibration: "normal", light: "off" }
    },
    staff: [
      { id: "s3", name: "Jean-Pierre", role: "Chief of Staff", status: "on-site", location: "Entry Portico", lastCheckIn: "2024-05-20T10:00:00Z" }
    ],
    alerts: []
  }
];
