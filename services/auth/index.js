import loginHandler from './login.ts';

export default async function handler(req) {
  const url = new URL(req.url);
  if (url.pathname.endsWith('/login')) {
    return loginHandler(req);
  }

  return new Response(
    JSON.stringify({ service: 'auth', status: 'OK', version: '1.0.0' }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
