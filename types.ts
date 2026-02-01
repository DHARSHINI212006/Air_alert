
export enum AirStatus {
  OK = 'OK',
  WARNING = 'WARNING',
  BAD = 'BAD'
}

export interface HealthLog {
  id: string;
  timestamp: string;
  symptom: string;
  airLevel: number;
}

export interface AirConfig {
  value: number;
  status: AirStatus;
  color: string;
  title: string;
  subtitle: string;
}
