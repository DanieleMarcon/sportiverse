import { users } from 'bolt:data';
import { ACL, hasPermission } from './acl';

export async function checkPermission(userId: string, clubId: string, permission: keyof typeof ACL): Promise<void> {
  const user = await users.get(userId);
  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }
  if (user.club_id !== clubId) {
    throw new Error('FORBIDDEN');
  }
  const requiredRole = ACL[permission];
  if (!requiredRole) {
    throw new Error('PERMISSION_UNDEFINED');
  }
  if (!hasPermission(user.role, requiredRole)) {
    throw new Error('INSUFFICIENT_ROLE');
  }
}
