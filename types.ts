
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

export interface WineCellar {
  enabled: boolean;
  tier: number;
  inventory: {
    totalBottles: number;
    estimatedValue: number;
  };
  environmental: {
    temperature: number;
    targetTemp: number;
    humidity: number;
    targetHumidity: number;
    vibration: 'normal' | 'alert';
    light: 'on' | 'off';
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
  wineCellar: WineCellar;
  staff: Staff[];
  alerts: Alert[];
}
