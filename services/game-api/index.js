// TODO: Implementare API per motore di gioco
// - Simulazione partite
// - Gestione mercato
// - Salvataggio progressi

export default async function handler(req, res) {
  return new Response(JSON.stringify({ 
    service: 'game-api',
    status: 'TODO',
    version: '1.0.0'
  }), {
    headers: { 'Content-Type': 'application/json' }
  })
}