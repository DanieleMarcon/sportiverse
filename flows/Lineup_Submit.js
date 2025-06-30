import { checkPermission } from '@/services/auth/checkPermission';
import { ACL } from '@/services/auth/acl';
import { lineups, lineup_players, matches, athletes } from 'bolt:data';

export default async function Lineup_Submit(input, context) {
  // Controllo ACL - Solo ALLENATORE per propria squadra
  await checkPermission(context.user.id, context.club.id, ACL.LINEUP_SUBMIT);
  
  // Validazione input
  if (!input.match_id || !input.players || !Array.isArray(input.players)) {
    throw new Error('INVALID_INPUT: match_id e players (array) sono obbligatori');
  }
  
  // Verifica che la partita esista
  const match = await matches.get(input.match_id);
  if (!match) {
    throw new Error('MATCH_NOT_FOUND: partita non trovata');
  }
  
  // Validazione completa formazione
  const validation = await validateLineup(input.players, context);
  if (!validation.isValid) {
    throw new Error(`VALIDATION_FAILED: ${validation.errors.join(', ')}`);
  }
  
  try {
    // Salvataggio CRM - Crea record lineup
    const lineupId = await lineups.insert({
      match_id: input.match_id,
      coach_id: context.user.id,
      club_id: context.club.id,
      formation: input.formation || '4-4-2',
      created_at: new Date(),
      updated_at: new Date(),
      sync_status: 'pending'
    });
    
    // Salva giocatori della formazione
    const lineupPlayersData = input.players.map(player => ({
      lineup_id: lineupId,
      athlete_id: player.athlete_id,
      position: player.position,
      is_starter: player.is_starter || false,
      shirt_number: player.shirt_number || null
    }));
    
    await lineup_players.bulkInsert(lineupPlayersData);
    
    console.log(`[LINEUP] Lineup saved: ${lineupId} with ${input.players.length} players`);
    
    // Sync API - POST a Game Engine con retry
    let syncSuccess = false;
    let syncError = null;
    
    try {
      // Chiamata API interna per sincronizzazione
      const apiResponse = await fetch('/services/game-api/formation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${context.token}`
        },
        body: JSON.stringify({
          match_id: input.match_id,
          lineup_id: lineupId
        })
      });
      
      const responseData = await apiResponse.json();
      
      if (responseData.success) {
        syncSuccess = true;
        console.log(`[LINEUP] ✅ Sync successful: ${responseData.data.game_engine_id}`);
        
        // Aggiorna stato sincronizzazione
        await lineups.update(lineupId, {
          sync_status: 'completed',
          synced_at: new Date(),
          game_engine_id: responseData.data.game_engine_id
        });
      } else {
        throw new Error(responseData.error || 'Game Engine sync failed');
      }
      
    } catch (syncErr) {
      syncError = syncErr.message;
      console.error(`[LINEUP] ❌ Sync failed: ${syncError}`);
      
      // Aggiorna stato errore
      await lineups.update(lineupId, {
        sync_status: 'failed',
        sync_error: syncError,
        sync_attempted_at: new Date()
      });
      
      // Non bloccare il processo CRM per errori di sync
      // L'utente può riprovare la sincronizzazione
    }
    
    // Logging audit completo
    console.log(`[AUDIT] Lineup submitted: ${lineupId} by coach ${context.user.id} for match ${input.match_id}`);
    console.log(`[AUDIT] Players: ${input.players.filter(p => p.is_starter).length} starters, ${input.players.filter(p => !p.is_starter).length} subs`);
    console.log(`[AUDIT] Sync status: ${syncSuccess ? 'SUCCESS' : 'FAILED'}`);
    
    return {
      lineup_id: lineupId,
      success: true,
      message: 'Formazione inviata con successo',
      sync_status: syncSuccess ? 'completed' : 'failed',
      sync_error: syncError,
      data: {
        match_id: input.match_id,
        players_count: input.players.length,
        starters_count: input.players.filter(p => p.is_starter).length,
        formation: input.formation || '4-4-2'
      }
    };
    
  } catch (error) {
    console.error('[LINEUP] Submit failed:', error);
    throw new Error(`SUBMIT_FAILED: ${error.message}`);
  }
}

/**
 * Validazione completa della formazione
 */
async function validateLineup(players, context) {
  const errors = [];
  
  // Verifica numero giocatori
  if (players.length === 0) {
    errors.push('Nessun giocatore selezionato');
    return { isValid: false, errors };
  }
  
  // Separa titolari e riserve
  const starters = players.filter(p => p.is_starter);
  const substitutes = players.filter(p => !p.is_starter);
  
  // Validazione titolari (esattamente 11)
  if (starters.length !== 11) {
    errors.push(`Servono esattamente 11 titolari, selezionati ${starters.length}`);
  }
  
  // Validazione riserve (massimo 7)
  if (substitutes.length > 7) {
    errors.push(`Massimo 7 riserve consentite, selezionate ${substitutes.length}`);
  }
  
  // Verifica duplicati athlete_id
  const athleteIds = players.map(p => p.athlete_id);
  const uniqueAthleteIds = new Set(athleteIds);
  if (athleteIds.length !== uniqueAthleteIds.size) {
    errors.push('Giocatori duplicati nella formazione');
  }
  
  // Verifica duplicati numeri maglia
  const shirtNumbers = players
    .filter(p => p.shirt_number)
    .map(p => p.shirt_number);
  const uniqueShirtNumbers = new Set(shirtNumbers);
  if (shirtNumbers.length !== uniqueShirtNumbers.size) {
    errors.push('Numeri di maglia duplicati');
  }
  
  // Controllo disponibilità giocatori
  for (const player of players) {
    try {
      const athlete = await athletes.get(player.athlete_id);
      
      if (!athlete) {
        errors.push(`Atleta ${player.athlete_id} non trovato`);
        continue;
      }
      
      // Verifica che l'atleta appartenga al club
      if (athlete.club_id !== context.club.id) {
        errors.push(`Atleta ${athlete.first_name} ${athlete.last_name} non appartiene al tuo club`);
      }
      
      // Verifica stato atleta (sano e tesserato)
      if (athlete.status === 'injured') {
        errors.push(`Atleta ${athlete.first_name} ${athlete.last_name} è infortunato`);
      }
      
      if (athlete.status === 'suspended') {
        errors.push(`Atleta ${athlete.first_name} ${athlete.last_name} è sospeso`);
      }
      
      if (!athlete.is_registered) {
        errors.push(`Atleta ${athlete.first_name} ${athlete.last_name} non è tesserato`);
      }
      
      // Controllo team specifico per ALLENATORE
      if (context.user.role === 'ALLENATORE') {
        if (athlete.team_id !== context.user.team_id) {
          errors.push(`Atleta ${athlete.first_name} ${athlete.last_name} non appartiene alla tua squadra`);
        }
      }
      
    } catch (athleteError) {
      errors.push(`Errore verifica atleta ${player.athlete_id}: ${athleteError.message}`);
    }
  }
  
  // Validazione posizioni
  const validPositions = ['GK', 'CB', 'LB', 'RB', 'LWB', 'RWB', 'CDM', 'CM', 'CAM', 'LM', 'RM', 'LW', 'RW', 'CF', 'ST'];
  for (const player of players) {
    if (!validPositions.includes(player.position)) {
      errors.push(`Posizione non valida: ${player.position}`);
    }
  }
  
  // Verifica portiere tra i titolari
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