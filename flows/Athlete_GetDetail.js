import { checkPermission } from '@/services/auth/checkPermission';
import { ACL } from '@/services/auth/acl';
import { athletes, documents, athlete_notes } from 'bolt:data';

export default async function Athlete_GetDetail(input, context) {
  await checkPermission(context.user.id, context.club.id, ACL.ATHLETE_VIEW);

  const athlete_id = input.athlete_id;
  if (!athlete_id) throw new Error('athlete_id required');

  const athlete = await athletes.get(athlete_id);
  if (!athlete) {
    throw new Error('ATHLETE_NOT_FOUND');
  }
  if (athlete.club_id !== context.club.id) {
    throw new Error('FORBIDDEN');
  }
  if (context.user.role === 'ALLENATORE' && athlete.team_id !== context.user.team_id) {
    throw new Error('FORBIDDEN');
  }

  const docs = await documents.find({ athlete_id });
  const notes = await athlete_notes.find({ athlete_id, is_archived: false });
  return {
    athlete,
    documents: docs,
    notes,
    events: []
  };
}
