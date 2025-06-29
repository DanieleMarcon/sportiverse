import { checkPermission } from '@/services/auth/checkPermission';
import { ACL } from '@/services/auth/acl';
import { athlete_notes, athletes } from 'bolt:data';

export default async function Athlete_AddNote(input, context) {
  // Controllo ACL - Solo ALLENATORE può aggiungere note tecniche
  await checkPermission(context.user.id, context.club.id, ACL.ATHLETE_ADDNOTE);
  
  // Validazione input
  if (!input.athlete_id || !input.note_text) {
    throw new Error('INVALID_INPUT: athlete_id e note_text sono obbligatori');
  }
  
  // Verifica che l'atleta esista e appartenga al club
  const athlete = await athletes.get(input.athlete_id);
  if (!athlete) {
    throw new Error('ATHLETE_NOT_FOUND: atleta non trovato');
  }
  
  if (athlete.club_id !== context.club.id) {
    throw new Error('UNAUTHORIZED: atleta non appartiene al tuo club');
  }
  
  // Validazione lunghezza nota (max 2000 caratteri)
  if (input.note_text.length > 2000) {
    throw new Error('NOTE_TOO_LONG: nota massimo 2000 caratteri');
  }
  
  // Controllo team specifico per ALLENATORE
  if (context.user.role === 'ALLENATORE') {
    if (athlete.team_id !== context.user.team_id) {
      throw new Error('FORBIDDEN: puoi aggiungere note solo ai tuoi atleti');
    }
  }
  
  try {
    // Inserisci nota tecnica
    const noteId = await athlete_notes.insert({
      athlete_id: input.athlete_id,
      coach_id: context.user.id,
      note_text: input.note_text.trim(),
      visibility: input.visibility || 'team', // team, staff, private
      tags: input.tags || [], // tattica, fisica, mentale, disciplinare
      created_at: new Date(),
      updated_at: new Date()
    });
    
    // Log operazione per audit
    console.log(`[AUDIT] Note added: ${noteId} for athlete ${input.athlete_id} by coach ${context.user.id}`);
    
    return { 
      note_id: noteId,
      success: true,
      message: 'Nota tecnica aggiunta con successo'
    };
    
  } catch (error) {
    console.error('[ERROR] Add note failed:', error);
    throw new Error(`ADD_NOTE_FAILED: ${error.message}`);
  }
}