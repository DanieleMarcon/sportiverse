import { checkPermission } from '@/services/auth/checkPermission';
import { ACL } from '@/services/auth/acl';
import { athletes } from 'bolt:data';

export default async function Athletes_List(_input, context) {
  await checkPermission(context.user.id, context.club.id, ACL.ATHLETE_VIEW);

  const query = { club_id: context.club.id };
  if (context.user.role === 'ALLENATORE') {
    query.team_id = context.user.team_id;
  }

  const list = await athletes.find(query);
  return { athletes: list };
}
