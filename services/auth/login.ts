import { users } from 'bolt:data';
import { sign } from './jwt';

export default async function loginHandler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, error: 'METHOD_NOT_ALLOWED' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { email } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ success: false, error: 'EMAIL_REQUIRED' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const user = await users.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ success: false, error: 'INVALID_CREDENTIALS' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = sign({ id: user.id, email: user.email, role: user.role, club_id: user.club_id });

    return new Response(
      JSON.stringify({ success: true, token, user: { id: user.id, email: user.email, role: user.role, club_id: user.club_id } }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: (err as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
