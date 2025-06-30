// ⚽ Player Model - Modello giocatore per Allenatore Nato
export interface Player {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  position: string;
  age: number;
  nationality: string;
  teamId: string;
  
  // Attributi calcistici
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
  
  // Stato
  fitness: number;
  morale: number;
  injuryStatus: 'healthy' | 'injured' | 'recovering';
  
  // Contratto
  salary: number;
  contractEnd: Date;
  marketValue: number;
  
  // Statistiche
  appearances: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  
  // Metadati
  createdAt: Date;
  updatedAt: Date;
}

export interface PlayerAttributes {
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