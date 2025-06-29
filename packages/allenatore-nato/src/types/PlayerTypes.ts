// ⚽ Player Types - Tipi per giocatori e attributi
// Seguendo la struttura del dataset players documentato

export interface Player {
  id: string
  teamId: string
  
  // Informazioni base
  firstName: string
  lastName: string
  name: string // firstName + lastName
  nationality: string
  position: PlayerPosition
  
  // Dati fisici
  age: number
  height: number // cm
  weight: number // kg
  foot: 'left' | 'right' | 'both'
  
  // Attributi calcistici (0-100)
  pace: number
  shooting: number
  passing: number
  dribbling: number
  defending: number
  physical: number
  
  // Attributi mentali (0-100)
  workRate: number
  aggression: number
  positioning: number
  vision: number
  composure: number
  
  // Attributi portiere (0-100, solo per GK)
  diving?: number
  handling?: number
  kicking?: number
  reflexes?: number
  speed?: number
  positioning_gk?: number
  
  // Stato fisico
  fitness: number // 0-100
  stamina: number // 0-100
  morale: number // 0-100
  
  // Infortuni
  injuryStatus: InjuryStatus
  injuryType?: string
  injuryDaysRemaining?: number
  
  // Statistiche stagionali
  appearances: number
  goals: number
  assists: number
  yellowCards: number
  redCards: number
  minutesPlayed: number
  
  // Contratto
  salary: number
  contractEnd: Date
  marketValue: number
  
  // Potenziale e sviluppo
  potential: number // 0-100
  growthRate: number // moltiplicatore crescita
  
  // Metadati
  createdAt: Date
  updatedAt: Date
}

export enum PlayerPosition {
  // Portieri
  GK = 'GK',
  
  // Difensori
  CB = 'CB',   // Centrale
  LB = 'LB',   // Terzino sinistro
  RB = 'RB',   // Terzino destro
  LWB = 'LWB', // Esterno sinistro
  RWB = 'RWB', // Esterno destro
  
  // Centrocampisti
  CDM = 'CDM', // Mediano difensivo
  CM = 'CM',   // Centrale
  CAM = 'CAM', // Trequartista
  LM = 'LM',   // Esterno sinistro
  RM = 'RM',   // Esterno destro
  
  // Attaccanti
  LW = 'LW',   // Ala sinistra
  RW = 'RW',   // Ala destra
  CF = 'CF',   // Centravanti
  ST = 'ST'    // Punta
}

export enum InjuryStatus {
  HEALTHY = 'healthy',
  INJURED = 'injured',
  RECOVERING = 'recovering',
  DOUBTFUL = 'doubtful'
}

export interface PlayerAttributes {
  // Tecnici
  pace: number
  shooting: number
  passing: number
  dribbling: number
  defending: number
  physical: number
  
  // Mentali
  workRate: number
  aggression: number
  positioning: number
  vision: number
  composure: number
  
  // Portiere (opzionali)
  diving?: number
  handling?: number
  kicking?: number
  reflexes?: number
  speed?: number
  positioning_gk?: number
}

export interface PlayerStatistics {
  // Partite
  appearances: number
  starts: number
  minutesPlayed: number
  
  // Gol e assist
  goals: number
  assists: number
  shotsTotal: number
  shotsOnTarget: number
  
  // Passaggi
  passesTotal: number
  passesCompleted: number
  passAccuracy: number
  
  // Difesa
  tackles: number
  interceptions: number
  clearances: number
  
  // Disciplina
  yellowCards: number
  redCards: number
  foulsCommitted: number
  foulsReceived: number
  
  // Portiere (se applicabile)
  saves?: number
  cleanSheets?: number
  goalsConceded?: number
}

export interface PlayerDevelopment {
  currentAttributes: PlayerAttributes
  potentialAttributes: PlayerAttributes
  growthRate: number
  trainingFocus: TrainingFocus[]
  lastImprovement: Date
}

export enum TrainingFocus {
  PACE = 'pace',
  SHOOTING = 'shooting',
  PASSING = 'passing',
  DRIBBLING = 'dribbling',
  DEFENDING = 'defending',
  PHYSICAL = 'physical',
  MENTAL = 'mental',
  GOALKEEPING = 'goalkeeping'
}

// TODO: Aggiungere altri tipi per:
// - Player history tracking
// - Scouting data
// - Performance analytics
// - Contract details