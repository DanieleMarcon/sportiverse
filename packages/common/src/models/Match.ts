// Match model centralizzato
import type { Team } from './Team';

export interface Match {
  id: string;
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

export enum MatchStatus {
  SCHEDULED = 'scheduled',
  LIVE = 'live',
  HALF_TIME = 'half_time',
  COMPLETED = 'completed',
  POSTPONED = 'postponed',
  CANCELLED = 'cancelled'
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