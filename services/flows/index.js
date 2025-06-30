export default async function handleRequest(req) {
  const url = new URL(req.url);
  const parts = url.pathname.split('/');
  const flowName = parts[parts.length - 1];

  if (!flowName) {
    return new Response(JSON.stringify({ success: false, error: 'FLOW_NOT_SPECIFIED' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, error: 'METHOD_NOT_ALLOWED' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const body = await req.json();
    const module = await import(`../../flows/${flowName}.js`);
    const result = await module.default(body, {});
    return new Response(JSON.stringify({ success: true, data: result }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
