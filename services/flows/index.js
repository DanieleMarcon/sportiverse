import { verify } from '../auth/jwt.ts';

export default async function handleRequest(req) {
  const url = new URL(req.url);
  const parts = url.pathname.split('/');
  const flowName = parts[parts.length - 1];

  if (!flowName) {
    return new Response(JSON.stringify({ success: false, error: 'FLOW_NOT_SPECIFIED' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, error: 'METHOD_NOT_ALLOWED' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const auth = req.headers.get('authorization');
  if (!auth) {
    return new Response(JSON.stringify({ success: false, error: 'UNAUTHORIZED' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let payload;
  try {
    payload = verify(auth.replace('Bearer ', ''));
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: 'INVALID_TOKEN' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await req.json();
    const module = await import(`../../flows/${flowName}.js`);
    const context = { user: { id: payload.id, role: payload.role }, club: { id: payload.club_id }, token: auth.replace('Bearer ', '') };
    const result = await module.default(body, context);
    return new Response(JSON.stringify({ success: true, data: result }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
