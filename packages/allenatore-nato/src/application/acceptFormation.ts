import { matches, tactics } from 'bolt:data';

/**
 * Accetta formazione dal CRM e la integra nel Game Engine
 * Parte del modulo Allenatore Nato
 */

interface FormationPlayer {
  athlete_id: string;
  position: string;
  is_starter: boolean;
  shirt_number?: number;
}

interface AcceptFormationResult {
  success: boolean;
  formationId?: string;
  error?: string;
  validationErrors?: string[];
}

/**
 * Funzione principale per accettare formazione
 */
export async function acceptFormation(
  matchId: string,
  squad: FormationPlayer[]
): Promise<AcceptFormationResult> {
  try {
    console.log(`[GAME-ENGINE] Accepting formation for match ${matchId} with ${squad.length} players`);
    
    // Validazione input
    const validation = validateFormation(squad);
    if (!validation.isValid) {
      return {
        success: false,
        error: 'VALIDATION_FAILED',
        validationErrors: validation.errors
      };
    }
    
    // Verifica che la partita esista
    const match = await matches.get(matchId);
    if (!match) {
      return {
        success: false,
        error: 'MATCH_NOT_FOUND'
      };
    }
    
    // Separa titolari e riserve
    const starters = squad.filter(p => p.is_starter);
    const substitutes = squad.filter(p => !p.is_starter);
    
    // Genera ID formazione univoco
    const formationId = `formation_${matchId}_${Date.now()}`;
    
    // Aggiorna match con formazione
    const payload = { ...(match as any) };
    const updatedMatch = {
      ...payload,
      lineup: starters.map(p => ({
        athlete_id: p.athlete_id,
        position: p.position,
        shirt_number: p.shirt_number
      })),
      substitutes: substitutes.map(p => ({
        athlete_id: p.athlete_id,
        position: p.position,
        shirt_number: p.shirt_number
      })),
      formation_id: formationId,
      formation_received_at: new Date(),
      formation_status: 'confirmed'
    };
    
    // Salva nel dataset matches
    await matches.update(matchId, updatedMatch);
    
    // Crea/aggiorna tattica per la partita
    await createMatchTactics(matchId, starters, formationId);
    
    console.log(`[GAME-ENGINE] ✅ Formation accepted: ${starters.length} starters, ${substitutes.length} subs`);
    
    return {
      success: true,
      formationId
    };
    
  } catch (error) {
    console.error('[GAME-ENGINE] ❌ Error accepting formation:', error);
    const err = error as Error;
    
    return {
      success: false,
      error: err.message
    };
  }
}

/**
 * Valida la formazione ricevuta
 */
function validateFormation(squad: FormationPlayer[]): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Verifica numero giocatori
  if (!squad || squad.length === 0) {
    errors.push('Nessun giocatore nella formazione');
    return { isValid: false, errors };
  }
  
  // Separa titolari e riserve
  const starters = squad.filter(p => p.is_starter);
  const substitutes = squad.filter(p => !p.is_starter);
  
  // Validazione titolari
  if (starters.length !== 11) {
    errors.push(`Servono esattamente 11 titolari, trovati ${starters.length}`);
  }
  
  // Validazione riserve (max 7)
  if (substitutes.length > 7) {
    errors.push(`Massimo 7 riserve consentite, trovate ${substitutes.length}`);
  }
  
  // Verifica duplicati athlete_id
  const athleteIds = squad.map(p => p.athlete_id);
  const uniqueAthleteIds = new Set(athleteIds);
  if (athleteIds.length !== uniqueAthleteIds.size) {
    errors.push('Giocatori duplicati nella formazione');
  }
  
  // Verifica duplicati numeri maglia (se specificati)
  const shirtNumbers = squad
    .filter(p => p.shirt_number)
    .map(p => p.shirt_number);
  const uniqueShirtNumbers = new Set(shirtNumbers);
  if (shirtNumbers.length !== uniqueShirtNumbers.size) {
    errors.push('Numeri di maglia duplicati');
  }
  
  // Validazione posizioni
  const validPositions = ['GK', 'CB', 'LB', 'RB', 'LWB', 'RWB', 'CDM', 'CM', 'CAM', 'LM', 'RM', 'LW', 'RW', 'CF', 'ST'];
  for (const player of squad) {
    if (!validPositions.includes(player.position)) {
      errors.push(`Posizione non valida: ${player.position}`);
    }
  }
  
  // Verifica che ci sia almeno un portiere tra i titolari
  const goalkeepers = starters.filter(p => p.position === 'GK');
  if (goalkeepers.length === 0) {
    errors.push('Manca il portiere tra i titolari');
  }
  if (goalkeepers.length > 1) {
    errors.push('Troppi portieri tra i titolari');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Crea tattica per la partita basata sulla formazione
 */
async function createMatchTactics(
  matchId: string,
  starters: FormationPlayer[],
  formationId: string
): Promise<void> {
  try {
    // Determina modulo tattico basato sulle posizioni
    const formation = determineFormation(starters);
    
    // Crea record tattica
    const tacticsData = {
      id: `tactics_${formationId}`,
      match_id: matchId,
      formation,
      mentality: 'balanced', // Default
      pressing: 5, // Default medio
      tempo: 5, // Default medio
      width: 5, // Default medio
      positions: starters.reduce((acc, player) => {
        acc[player.athlete_id] = {
          position: player.position,
          x: getPositionX(player.position),
          y: getPositionY(player.position),
          role: player.position
        };
        return acc;
      }, {} as Record<string, any>),
      is_match_specific: true,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    await tactics.insert(tacticsData);
    
    console.log(`[GAME-ENGINE] Created match tactics: ${formation} formation`);
    
  } catch (error) {
    console.error('[GAME-ENGINE] Error creating match tactics:', error);
    // Non bloccare il processo principale per errori tattici
  }
}

/**
 * Determina il modulo tattico dalle posizioni dei giocatori
 */
function determineFormation(starters: FormationPlayer[]): string {
  const positionCounts = starters.reduce((acc, player) => {
    const role = getPlayerRole(player.position);
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const defenders = positionCounts.DF || 0;
  const midfielders = positionCounts.MF || 0;
  const forwards = positionCounts.FW || 0;
  
  return `${defenders}-${midfielders}-${forwards}`;
}

/**
 * Converte posizione specifica in ruolo generale
 */
function getPlayerRole(position: string): string {
  if (position === 'GK') return 'GK';
  if (['CB', 'LB', 'RB', 'LWB', 'RWB'].includes(position)) return 'DF';
  if (['CDM', 'CM', 'CAM', 'LM', 'RM'].includes(position)) return 'MF';
  if (['LW', 'RW', 'CF', 'ST'].includes(position)) return 'FW';
  return 'MF'; // Default
}

/**
 * Calcola posizione X sul campo (0-100)
 */
function getPositionX(position: string): number {
  const positionMap: Record<string, number> = {
    'GK': 50,
    'CB': 50, 'LB': 20, 'RB': 80, 'LWB': 15, 'RWB': 85,
    'CDM': 50, 'CM': 50, 'CAM': 50, 'LM': 20, 'RM': 80,
    'LW': 20, 'RW': 80, 'CF': 50, 'ST': 50
  };
  return positionMap[position] || 50;
}

/**
 * Calcola posizione Y sul campo (0-100, 0=porta propria)
 */
function getPositionY(position: string): number {
  const positionMap: Record<string, number> = {
    'GK': 5,
    'CB': 20, 'LB': 25, 'RB': 25, 'LWB': 30, 'RWB': 30,
    'CDM': 40, 'CM': 50, 'CAM': 60, 'LM': 45, 'RM': 45,
    'LW': 70, 'RW': 70, 'CF': 75, 'ST': 80
  };
  return positionMap[position] || 50;
}

/**
 * Ottiene formazione corrente per una partita
 */
export async function getMatchFormation(matchId: string): Promise<FormationPlayer[] | null> {
  try {
    const match = await matches.get(matchId);
    if (!match) {
      return null;
    }
    
    const current = match as any; // TODO refine
    if (!current.lineup) {
      return null;
    }
    
    const formation: FormationPlayer[] = [
      ...current.lineup.map((p: any) => ({ ...p, is_starter: true })),
      ...(current.substitutes || []).map((p: any) => ({ ...p, is_starter: false }))
    ];
    
    return formation;
    
  } catch (error) {
    console.error('[GAME-ENGINE] Error getting match formation:', error);
    return null;
  }
}

/**
 * Rimuove formazione da una partita
 */
export async function clearMatchFormation(matchId: string): Promise<boolean> {
  try {
    const match = await matches.get(matchId);
    if (!match) {
      return false;
    }
    
    await matches.update(matchId, {
      lineup: null,
      substitutes: null,
      formation_id: null,
      formation_status: 'pending'
    });
    
    console.log(`[GAME-ENGINE] Formation cleared for match ${matchId}`);
    return true;
    
  } catch (error) {
    console.error('[GAME-ENGINE] Error clearing formation:', error);
    return false;
  }
}