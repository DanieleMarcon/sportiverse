// TODO: Implementare API per la gestione pagamenti
// - Creazione piani di abbonamento
// - Gestione quote associative
// - Integrazione gateway di pagamento
export default async function handler(req) {
  return new Response(
    JSON.stringify({ service: 'billing', status: 'TODO', version: '0.1.0' }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
