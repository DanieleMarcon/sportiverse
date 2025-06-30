// ⚽ Allenatore Nato - Football Manager Engine
// Motore di simulazione calcistica per Sportiverse

export const ALLENATORE_NATO_VERSION = '1.0.0'

// Core Engine Exports
export * from './engine/MatchEngine'
export * from './engine/TacticsEngine'
export * from './engine/TrainingEngine'
export * from './engine/TransferEngine'

// Data Models
export * from './models/Player'
export * from './models/Team'
export * from './models/Match'
export * from './models/Tactics'

// Services
export * from './services/GameService'
export * from './services/SimulationService'
export * from './services/StatisticsService'

// Utils
export * from './utils/GameUtils'
export * from './utils/AttributeUtils'
export * from './utils/RandomUtils'

// Types
export * from './types/GameTypes'
export * from './types/PlayerTypes'
export * from './types/MatchTypes'

// TODO: Implementare tutti i moduli sopra elencati
// Seguendo la documentazione in docs/datasets_overview.md e docs/flows_overview.md