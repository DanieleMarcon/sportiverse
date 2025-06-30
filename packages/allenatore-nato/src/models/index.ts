// ⚽ Models Index - Export tutti i modelli
export * from './Player';
export * from './Team';
export * from './Match';
export * from './Tactics';

// Re-export per compatibilità
export type { Player, PlayerAttributes, PlayerStatistics } from './Player';
export type { Team, TeamStatistics, LeagueStanding } from './Team';
export type { Match, MatchEvent, MatchResult, Substitution } from './Match';
export type { Tactics, PlayerPosition, TacticalInstruction, TacticalPreset } from './Tactics';
export { MatchStatus, MatchEventType } from './Match';
export { Formation, TacticalMentality } from './Tactics';