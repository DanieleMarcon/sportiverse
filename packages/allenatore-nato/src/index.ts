// ⚽ Allenatore Nato - Football Manager Engine
// Motore di simulazione calcistica per Sportiverse

export const ALLENATORE_NATO_VERSION = '1.0.0'

// Core Engine Exports
export * from './engine/MatchEngine'
export * from './engine/TacticsEngine'
export * from './engine/TrainingEngine'
export * from './engine/TransferEngine'

// Services
export * from './services/GameService'
export * from './services/SimulationService'
export * from './services/StatisticsService'

// Utils
export * from './utils/GameUtils'
export * from './utils/AttributeUtils'
export * from './utils/RandomUtils'

// Application
export * from './application/acceptFormation'

// Re-export types from common
export type {
  Player,
  Team,
  Match,
  Tactics,
  PlayerPosition,
  TeamStatistics,
  MatchResult,
  GameState,
  GameData
} from "@common/types/GameTypes";

export type {
  PlayerAttributes,
  PlayerStatistics,
  PlayerDevelopment
} from "@common/types/PlayerTypes";

export { MatchStatus } from "@common/types/GameTypes";
export { PlayerPosition as PlayerPositionEnum, InjuryStatus } from "@common/types/PlayerTypes";