
export type Status = 'optimal' | 'warning' | 'critical' | 'info';

export interface Location {
  address: string;
  coordinates: { lat: number; lon: number };
}

export interface Environmental {
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  aqi?: number;
  alerts: string[];
}

export interface Security {
  armed: boolean;
  mode: 'ARMED' | 'DISARMED' | 'PERIMETER';
  sensors: {
    doors: { total: number; open: number; faulted: number };
    windows: { total: number; open: number; faulted: number };
    motion: { active: number; triggered: number };
    cameras: { total: number; online: number; recording: number };
  };
  lastArmed: string;
}

export interface HVACZone {
  id: string;
  name: string;
  currentTemp: number;
  targetTemp: number;
  mode: 'heat' | 'cool' | 'off' | 'auto';
  status: Status;
  fanSpeed: string;
}

export interface Power {
  generator: {
    status: 'standby' | 'running' | 'testing' | 'fault';
    fuelLevel: number;
    runtime: string;
    lastTest: string;
  };
}

export interface Falcon {
  id: string;
  name: string;
  species: string;
  weight: number; // grams
  status: 'resting' | 'training' | 'medical';
  feedStatus: 'fed' | 'pending';
}

export interface Falconry {
  enabled: boolean;
  facilityName: string;
  falcons: Falcon[];
  environmental: {
    temperature: number;
    humidity: number;
    airQuality: 'pure' | 'filtered' | 'warning';
  };
}

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  status: 'ready' | 'service' | 'charging';
  batteryLevel?: number; // for EVs
  location: string;
}

export interface VaultItem {
  id: string;
  name: string;
  category: 'watch' | 'jewelry' | 'art';
  status: 'secure' | 'accessed';
}

export interface Collections {
  fleet: Vehicle[];
  vault: {
    items: VaultItem[];
    humidity: number;
    temp: number;
    status: 'secure' | 'warning';
  };
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  status: 'on-site' | 'off-duty' | 'en-route';
  location: string;
  lastCheckIn: string;
}

export interface Alert {
  id: string;
  severity: Status;
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface WineCellar {
  inventory: {
    totalBottles: number;
  };
  environmental: {
    temperature: number;
    humidity: number;
  };
}

export interface Property {
  id: string;
  name: string;
  location: Location;
  timezone: string;
  image: string;
  environmental: Environmental;
  security: Security;
  hvac: HVACZone[];
  power: Power;
  falconry?: Falconry; // Optional now
  collections: Collections;
  staff: Staff[];
  alerts: Alert[];
  wineCellar?: WineCellar;
}
