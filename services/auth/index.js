// TODO: Implementare servizio di autenticazione
// - JWT RS256 con rotazione chiave
// - Gestione sessioni
// - OAuth providers

export default async function handler(req, res) {
  return new Response(JSON.stringify({ 
    service: 'auth',
    status: 'TODO',
    version: '1.0.0'
  }), {
    headers: { 'Content-Type': 'application/json' }
  })
}