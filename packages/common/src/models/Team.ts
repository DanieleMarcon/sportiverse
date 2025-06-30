// Team model centralizzato
import type { Player } from './Player';

export interface Team {
  id: string;
  name: string;
  league: string;
  budget: number;
  morale: number;
  reputation: number;
  isUserTeam: boolean;
  
  // Statistiche campionato
  points: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  
  // Rosa giocatori
  roster: Player[];
  
  // Metadati
  createdAt: Date;
  updatedAt: Date;
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