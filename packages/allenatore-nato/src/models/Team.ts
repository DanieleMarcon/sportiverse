// ⚽ Team Model - Modello squadra per Allenatore Nato
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
  form: string[]; // W, D, L for last 5 games
  averageRating: number;
  cleanSheets: number;
}

export interface LeagueStanding {
  position: number;
  team: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
}