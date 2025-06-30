/* Placeholder fino alla modellazione definitiva */
export interface Player { 
  id: string; 
  name: string; 
  position: string; 
  firstName: string;
  lastName: string;
  age: number;
  nationality: string;
  teamId: string;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
  fitness: number;
  morale: number;
  injuryStatus: string;
  salary: number;
  contractEnd: Date;
  marketValue: number;
  appearances: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlayerAttributes { 
  [k: string]: number;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
}

export interface PlayerStatistics {
  appearances: number;
  starts: number;
  minutesPlayed: number;
  goals: number;
  assists: number;
  shotsTotal: number;
  shotsOnTarget: number;
  passesTotal: number;
  passesCompleted: number;
  passAccuracy: number;
  tackles: number;
  interceptions: number;
  clearances: number;
  yellowCards: number;
  redCards: number;
  foulsCommitted: number;
  foulsReceived: number;
}

export interface TeamStatistics {
  position: number;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  form: string[];
  averageRating: number;
  cleanSheets: number;
}

export enum PlayerPosition {
  // Portieri
  GK = 'GK',
  
  // Difensori
  CB = 'CB',   // Centrale
  LB = 'LB',   // Terzino sinistro
  RB = 'RB',   // Terzino destro
  LWB = 'LWB', // Esterno sinistro
  RWB = 'RWB', // Esterno destro
  
  // Centrocampisti
  CDM = 'CDM', // Mediano difensivo
  CM = 'CM',   // Centrale
  CAM = 'CAM', // Trequartista
  LM = 'LM',   // Esterno sinistro
  RM = 'RM',   // Esterno destro
  
  // Attaccanti
  LW = 'LW',   // Ala sinistra
  RW = 'RW',   // Ala destra
  CF = 'CF',   // Centravanti
  ST = 'ST'    // Punta
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