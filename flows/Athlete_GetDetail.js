import { athletes, documents, athlete_notes } from 'bolt:data';

export default async function Athlete_GetDetail(input, _context) {
  const athlete_id = input.athlete_id;
  if (!athlete_id) throw new Error('athlete_id required');
  const athlete = await athletes.get(athlete_id);
  const docs = await documents.find({ athlete_id });
  const notes = await athlete_notes.find({ athlete_id, is_archived: false });
  return {
    athlete,
    documents: docs,
    notes,
    events: []
  };
}
