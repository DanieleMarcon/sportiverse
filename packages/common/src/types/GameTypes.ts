// GameTypes centralizzati
export type { Player, Team, Match, Tactics } from '../models';
export type { PlayerAttributes, PlayerStatistics } from '../models/Player';
export type { TeamStatistics } from '../models/Team';
export type { MatchResult } from '../models/Match';
export type { PlayerPosition } from '../models/Tactics';
export { MatchStatus } from '../models/Match';

// Placeholder types per evitare import rotti
export interface GameState {
  currentDate: Date;
  season: string;
  matchday: number;
  userTeam: any;
  nextMatch: any;
  upcomingEvents: any[];
}

export interface GameData {
  teams: any[];
  players: any[];
  matches: any[];
  userTeam: any;
  currentDate: Date;
  season: string;
}