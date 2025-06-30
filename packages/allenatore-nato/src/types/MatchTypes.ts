// ⚽ Match Types - Tipi per partite e simulazione
// Seguendo la struttura dei dataset matches e match_reports

export interface Match {
  id: string
  
  // Squadre
  homeTeamId: string
  awayTeamId: string
  
  // Programmazione
  matchday: number
  season: string
  competition: string
  date: Date
  venue: string
  
  // Risultato
  homeScore?: number
  awayScore?: number
  status: MatchStatus
  
  // Formazioni
  homeFormation?: string
  awayFormation?: string
  homeLineup?: string[] // player IDs
  awayLineup?: string[] // player IDs
  
  // Sostituzioni
  homeSubstitutions?: Substitution[]
  awaySubstitutions?: Substitution[]
  
  // Condizioni
  weather?: string
  temperature?: number
  attendance?: number
  referee?: string
  
  // Report
  matchReportId?: string
  
  // Metadati
  createdAt: Date
  updatedAt: Date
}

export enum MatchStatus {
  SCHEDULED = 'scheduled',
  LIVE = 'live',
  HALF_TIME = 'half_time',
  COMPLETED = 'completed',
  POSTPONED = 'postponed',
  CANCELLED = 'cancelled'
}

export interface MatchEvent {
  id: string
  matchId: string
  
  // Timing
  minute: number
  extraTime?: number
  half: 1 | 2
  
  // Tipo evento
  type: MatchEventType
  team: 'home' | 'away'
  
  // Giocatori coinvolti
  playerId?: string
  assistPlayerId?: string
  targetPlayerId?: string // per sostituzioni
  
  // Dettagli
  description: string
  x?: number // posizione campo (0-100)
  y?: number // posizione campo (0-100)
  
  // Metadati
  createdAt: Date
}

export enum MatchEventType {
  // Gol
  GOAL = 'goal',
  OWN_GOAL = 'own_goal',
  PENALTY_GOAL = 'penalty_goal',
  
  // Cartellini
  YELLOW_CARD = 'yellow_card',
  RED_CARD = 'red_card',
  SECOND_YELLOW = 'second_yellow',
  
  // Sostituzioni
  SUBSTITUTION = 'substitution',
  
  // Altri eventi
  PENALTY_MISS = 'penalty_miss',
  INJURY = 'injury',
  OFFSIDE = 'offside',
  
  // Eventi di sistema
  KICK_OFF = 'kick_off',
  HALF_TIME = 'half_time',
  FULL_TIME = 'full_time'
}

export interface Substitution {
  minute: number
  playerOut: string
  playerIn: string
  reason?: 'tactical' | 'injury' | 'performance'
}

export interface MatchReport {
  id: string
  matchId: string
  
  // Giocatore migliore
  manOfTheMatch?: string
  
  // Eventi cronologici
  events: MatchEvent[]
  
  // Statistiche squadre
  homeStats: TeamMatchStats
  awayStats: TeamMatchStats
  
  // Valutazioni giocatori
  playerRatings: Record<string, number> // playerId -> rating (1-10)
  
  // Analisi tattica
  tacticalAnalysis?: string
  keyMoments?: string[]
  
  // Metadati
  generatedAt: Date
}

export interface TeamMatchStats {
  // Possesso e passaggi
  possession: number // percentuale
  passes: number
  passAccuracy: number
  
  // Attacco
  shots: number
  shotsOnTarget: number
  corners: number
  offsides: number
  
  // Difesa
  tackles: number
  interceptions: number
  clearances: number
  
  // Disciplina
  fouls: number
  yellowCards: number
  redCards: number
  
  // Portiere
  saves: number
}

export interface MatchResult {
  homeScore: number
  awayScore: number
  events: MatchEvent[]
  statistics: {
    possession: { home: number; away: number }
    shots: { home: number; away: number }
    shotsOnTarget: { home: number; away: number }
  }
  duration: number
}

export interface LiveMatchState {
  match: Match
  currentMinute: number
  currentHalf: 1 | 2
  ballPosition: { x: number; y: number }
  lastEvent?: MatchEvent
  isPlaying: boolean
  speed: MatchSpeed
}

export enum MatchSpeed {
  PAUSED = 0,
  SLOW = 1,
  NORMAL = 2,
  FAST = 3,
  VERY_FAST = 4
}

// TODO: Aggiungere altri tipi per:
// - Match simulation context
// - Tactical adjustments during match
// - Live commentary system
// - Match prediction models