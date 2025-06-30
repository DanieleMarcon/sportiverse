// PlayerTypes centralizzati
export type { Player, PlayerAttributes, PlayerStatistics } from '../models/Player';

// Enum per posizioni
export enum PlayerPosition {
  GK = 'GK',
  CB = 'CB',
  LB = 'LB',
  RB = 'RB',
  LWB = 'LWB',
  RWB = 'RWB',
  CDM = 'CDM',
  CM = 'CM',
  CAM = 'CAM',
  LM = 'LM',
  RM = 'RM',
  LW = 'LW',
  RW = 'RW',
  CF = 'CF',
  ST = 'ST'
}

export enum InjuryStatus {
  HEALTHY = 'healthy',
  INJURED = 'injured',
  RECOVERING = 'recovering',
  DOUBTFUL = 'doubtful'
}

// Placeholder per development
export interface PlayerDevelopment {
  currentAttributes: PlayerAttributes;
  potentialAttributes: PlayerAttributes;
  growthRate: number;
  trainingFocus: string[];
  lastImprovement: Date;
}