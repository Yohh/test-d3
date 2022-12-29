export interface Temp {
  min: number;
  max: number;
}

export interface Day {
  date: Date | null;
  dt: number;
  temp: Temp;
}

export interface Data {
  daily: Day[];
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}
