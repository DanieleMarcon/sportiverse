import { lineups, lineup_players, matches } from 'bolt:data';
import { acceptFormation } from '@sportiverse/allenatore-nato';

/**
 * API interna per sincronizzazione formazioni CRM → Game Engine
 * POST /services/game-api/formation
 */
export default async function formationHandler(req: Request): Promise<Response> {
  try {
    // Parsing request body
    const body = await req.json();
    const { match_id, lineup_id } = body;
    
    // Validazione input
    if (!match_id || !lineup_id) {
      return new Response(JSON.stringify({
        success: false,
        error: 'INVALID_INPUT: match_id e lineup_id sono obbligatori'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    console.log(`[GAME-API] Processing formation sync: match=${match_id}, lineup=${lineup_id}`);
    
    // Verifica che la partita esista
    const match = await matches.get(match_id);
    if (!match) {
      return new Response(JSON.stringify({
        success: false,
        error: 'MATCH_NOT_FOUND: partita non trovata'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Recupera formazione dal CRM
    const lineup = await lineups.get(lineup_id);
    if (!lineup) {
      return new Response(JSON.stringify({
        success: false,
        error: 'LINEUP_NOT_FOUND: formazione non trovata'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Recupera giocatori della formazione
    const lineupPlayers = await lineup_players.find({ lineup_id });
    
    if (!lineupPlayers || lineupPlayers.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: 'NO_PLAYERS: nessun giocatore nella formazione'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Validazione formazione (11 titolari)
    const starters = lineupPlayers.filter(p => (p as any).is_starter);
    if (starters.length !== 11) {
      return new Response(JSON.stringify({
        success: false,
        error: `INVALID_FORMATION: servono 11 titolari, trovati ${starters.length}`
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Trasforma dati per Game Engine
    const formationData = lineupPlayers.map(player => ({
      athlete_id: (player as any).athlete_id,
      position: (player as any).position,
      is_starter: (player as any).is_starter,
      shirt_number: (player as any).shirt_number || null
    }));
    
    // Chiama Game Engine per accettare formazione
    const gameResult = await acceptFormation(match_id, formationData);
    
    if (!gameResult.success) {
      return new Response(JSON.stringify({
        success: false,
        error: `GAME_ENGINE_ERROR: ${gameResult.error}`
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Log successo
    console.log(`[GAME-API] ✅ Formation synced successfully: ${starters.length} starters, ${lineupPlayers.length - starters.length} subs`);
    
    // Aggiorna stato sincronizzazione nel CRM
    await lineups.update(lineup_id, {
      synced_at: new Date(),
      sync_status: 'completed',
      game_engine_id: gameResult.formationId
    });
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Formazione sincronizzata con successo',
      data: {
        match_id,
        lineup_id,
        players_count: lineupPlayers.length,
        starters_count: starters.length,
        game_engine_id: gameResult.formationId,
        synced_at: new Date().toISOString()
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('[GAME-API] ❌ Formation sync error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'INTERNAL_ERROR: errore interno del server',
      details: (error as Error).message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Gestisce richieste OPTIONS per CORS
 */
export async function handleOptions(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}

/**
 * Router principale per gestire diversi metodi HTTP
 */
export async function handleRequest(req: Request): Promise<Response> {
  const method = req.method;
  
  switch (method) {
    case 'POST':
      return formationHandler(req);
    case 'OPTIONS':
      return handleOptions();
    default:
      return new Response(JSON.stringify({
        success: false,
        error: 'METHOD_NOT_ALLOWED: solo POST supportato'
      }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
  }
}