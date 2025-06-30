// ⚽ Tactics Model - Modello tattiche per Allenatore Nato

export interface Tactics {
  id: string;
  teamId: string;
  formation: Formation;
  mentality: TacticalMentality;
  
  // Impostazioni tattiche
  pressing: number; // 1-10
  tempo: number; // 1-10
  width: number; // 1-10
  
  // Posizioni giocatori
  positions: Record<string, PlayerPosition>;
  
  // Specialisti
  captainId?: string;
  penaltyTakerId?: string;
  freeKickTakerId?: string;
  cornerTakerId?: string;
  
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

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

export interface PlayerPosition {
  x: number; // 0-100 (percentuale campo)
  y: number; // 0-100 (percentuale campo)
  role: string; // GK, DF, MF, FW
  instructions?: string[];
}

export interface TacticalInstruction {
  type: 'formation' | 'mentality' | 'pressing' | 'tempo' | 'width';
  value: string | number;
  description: string;
}

export interface TacticalPreset {
  id: string;
  name: string;
  formation: Formation;
  mentality: TacticalMentality;
  pressing: number;
  tempo: number;
  width: number;
  description: string;
  isCustom: boolean;
}