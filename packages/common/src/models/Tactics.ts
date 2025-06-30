// Tactics model centralizzato
export interface Tactics {
  id: string;
  teamId: string;
  formation: string;
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

export interface PlayerPosition {
  x: number;
  y: number;
  role: string;
  instructions?: string[];
}