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

export interface Team { 
  id: string; 
  name: string; 
  roster: Player[];
  league: string;
  budget: number;
  morale: number;
  reputation: number;
  isUserTeam: boolean;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Match { 
  id: string; 
  home: Team; 
  away: Team;
  homeTeam: Team;
  awayTeam: Team;
  homeTeamId: string;
  awayTeamId: string;
  matchday: number;
  season: string;
  competition: string;
  date: Date;
  venue: string;
  homeScore?: number;
  awayScore?: number;
  status: MatchStatus;
  homeFormation?: string;
  awayFormation?: string;
  homeLineup?: string[];
  awayLineup?: string[];
  weather?: string;
  temperature?: number;
  attendance?: number;
  referee?: string;
  matchReportId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MatchResult {
  homeScore: number;
  awayScore: number;
  events: any[];
  statistics: {
    possession: { home: number; away: number };
    shots: { home: number; away: number };
    shotsOnTarget: { home: number; away: number };
  };
  duration: number;
}

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

export enum MatchStatus {
  SCHEDULED = 'scheduled',
  LIVE = 'live',
  HALF_TIME = 'half_time',
  COMPLETED = 'completed',
  POSTPONED = 'postponed',
  CANCELLED = 'cancelled'
}

export interface Tactics { 
  formation: string; 
  style: string;
  id: string;
  teamId: string;
  mentality: string;
  pressing: number;
  tempo: number;
  width: number;
  positions: Record<string, any>;
  captainId?: string;
  penaltyTakerId?: string;
  freeKickTakerId?: string;
  cornerTakerId?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

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