// ⚽ Game Types - Tipi TypeScript per il motore di gioco
// Definisce tutti i tipi seguendo la struttura dei dataset documentati

// === CORE GAME TYPES ===

export interface Team {
  id: string
  name: string
  league: string
  budget: number
  morale: number
  reputation: number
  isUserTeam: boolean
  
  // Statistiche campionato
  points: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  
  // Metadati
  createdAt: Date
  updatedAt: Date
}

export interface Tactics {
  id: string
  teamId: string
  formation: Formation
  mentality: TacticalMentality
  
  // Impostazioni tattiche
  pressing: number // 1-10
  tempo: number // 1-10
  width: number // 1-10
  
  // Posizioni giocatori
  positions: Record<string, PlayerPosition>
  
  // Specialisti
  captainId?: string
  penaltyTakerId?: string
  freeKickTakerId?: string
  cornerTakerId?: string
  
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Training {
  id: string
  teamId: string
  type: TrainingType
  intensity: number // 1-10
  duration: number // minuti
  
  // Partecipanti
  participants: string[] // player IDs
  staffId?: string
  
  // Condizioni
  facilities: FacilityQuality
  weather: WeatherCondition
  
  // Risultati
  completed: boolean
  completedAt?: Date
  results?: TrainingResult
  
  createdAt: Date
  updatedAt: Date
}

export interface Transfer {
  id: string
  playerId: string
  fromTeamId: string
  toTeamId: string
  
  // Dettagli trasferimento
  type: TransferType
  amount: number
  installments?: number
  
  // Contratto
  salary: number
  duration: number // mesi
  bonuses: ContractBonus[]
  
  // Stato
  status: TransferStatus
  negotiationStarted: Date
  deadline?: Date
  
  createdAt: Date
  updatedAt: Date
}

// === ENUMS ===

export enum Formation {
  F_4_4_2 = '4-4-2',
  F_4_3_3 = '4-3-3',
  F_3_5_2 = '3-5-2',
  F_4_2_3_1 = '4-2-3-1',
  F_5_3_2 = '5-3-2'
}

export enum TacticalMentality {
  VERY_DEFENSIVE = 'very_defensive',
  DEFENSIVE = 'defensive',
  BALANCED = 'balanced',
  ATTACKING = 'attacking',
  VERY_ATTACKING = 'very_attacking'
}

export enum TrainingType {
  FITNESS = 'fitness',
  TECHNICAL = 'technical',
  TACTICAL = 'tactical',
  MENTAL = 'mental',
  RECOVERY = 'recovery',
  MATCH_PREP = 'match_preparation'
}

export enum TransferType {
  PERMANENT = 'permanent',
  LOAN = 'loan',
  FREE = 'free_transfer'
}

export enum TransferStatus {
  NEGOTIATING = 'negotiating',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  EXPIRED = 'expired'
}

export enum FacilityQuality {
  POOR = 'poor',
  AVERAGE = 'average',
  GOOD = 'good',
  EXCELLENT = 'excellent'
}

export enum WeatherCondition {
  SUNNY = 'sunny',
  CLOUDY = 'cloudy',
  RAINY = 'rainy',
  WINDY = 'windy'
}

// === INTERFACE TYPES ===

export interface PlayerPosition {
  x: number // 0-100 (percentuale campo)
  y: number // 0-100 (percentuale campo)
  role: string // GK, DF, MF, FW
  instructions?: string[]
}

export interface ContractBonus {
  type: 'goal' | 'assist' | 'appearance' | 'win'
  amount: number
  threshold?: number
}

export interface TrainingResult {
  playersImproved: string[]
  injuries: string[]
  fitnessChanges: Record<string, number>
  moraleChanges: Record<string, number>
  events: string[]
}

export interface TransferOffer {
  amount: number
  salary: number
  duration: number
  bonuses: ContractBonus[]
  deadline: Date
}

export interface NegotiationResult {
  accepted: boolean
  counterOffer?: TransferOffer
  reason: string
  negotiationId: string
}

// TODO: Aggiungere altri tipi seguendo la documentazione dei dataset
// - Match types
// - Player types  
// - Statistics types
// - Event types