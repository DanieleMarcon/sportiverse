// ⚽ Router - Sistema di routing per l'app
// Gestisce la navigazione tra le pagine

import React from 'react'

// Import delle pagine
import { Dashboard } from './pages/Dashboard'
import { TeamManagement } from './pages/TeamManagement'
import { MatchSimulation } from './pages/MatchSimulation'
import { TransferMarket } from './pages/TransferMarket'
import { TacticalSetup } from './pages/TacticalSetup'
import { TrainingManagement } from './pages/TrainingManagement'
import { CalendarView } from './pages/CalendarView'
import { StaffManagement } from './pages/StaffManagement'

// Mappa delle route
export const routes = {
  'dashboard': Dashboard,
  'team': TeamManagement,
  'team-stats': () => <div className="page-placeholder"><h2>📈 Statistiche Squadra</h2><p>Pagina in sviluppo</p></div>,
  'team-morale': () => <div className="page-placeholder"><h2>💪 Morale Squadra</h2><p>Pagina in sviluppo</p></div>,
  'next-match': () => <div className="page-placeholder"><h2>🎯 Prossima Partita</h2><p>Pagina in sviluppo</p></div>,
  'calendar': CalendarView,
  'results': () => <div className="page-placeholder"><h2>🏆 Risultati</h2><p>Pagina in sviluppo</p></div>,
  'match-simulation': MatchSimulation,
  'match-analysis': () => <div className="page-placeholder"><h2>📊 Analisi Partita</h2><p>Pagina in sviluppo</p></div>,
  'training': TrainingManagement,
  'training-programs': () => <div className="page-placeholder"><h2>📚 Programmi Allenamento</h2><p>Pagina in sviluppo</p></div>,
  'training-progress': () => <div className="page-placeholder"><h2>📊 Progressi Allenamento</h2><p>Pagina in sviluppo</p></div>,
  'tactics': TacticalSetup,
  'tactics-schemes': () => <div className="page-placeholder"><h2>📐 Schemi Tattici</h2><p>Pagina in sviluppo</p></div>,
  'tactics-roles': () => <div className="page-placeholder"><h2>🎭 Ruoli Tattici</h2><p>Pagina in sviluppo</p></div>,
  'transfers': TransferMarket,
  'negotiations': () => <div className="page-placeholder"><h2>🤝 Trattative</h2><p>Pagina in sviluppo</p></div>,
  'contracts': () => <div className="page-placeholder"><h2>📄 Contratti</h2><p>Pagina in sviluppo</p></div>,
  'staff': StaffManagement,
  'scouting': () => <div className="page-placeholder"><h2>🎯 Scouting</h2><p>Pagina in sviluppo</p></div>,
  'shortlist': () => <div className="page-placeholder"><h2>⭐ Lista Osservati</h2><p>Pagina in sviluppo</p></div>,
  'reports': () => <div className="page-placeholder"><h2>📋 Report Scout</h2><p>Pagina in sviluppo</p></div>,
  'board': () => <div className="page-placeholder"><h2>👔 Consiglio</h2><p>Pagina in sviluppo</p></div>,
  'finances': () => <div className="page-placeholder"><h2>💳 Finanze</h2><p>Pagina in sviluppo</p></div>,
  'press': () => <div className="page-placeholder"><h2>📰 Sala Stampa</h2><p>Pagina in sviluppo</p></div>,
  'history': () => <div className="page-placeholder"><h2>📊 Storico Progressi</h2><p>Pagina in sviluppo</p></div>,
  'settings': () => <div className="page-placeholder"><h2>🔧 Impostazioni</h2><p>Pagina in sviluppo</p></div>,
  'sessions': () => <div className="page-placeholder"><h2>💾 Salvataggi</h2><p>Pagina in sviluppo</p></div>
}

// Router component
export function Router({ currentPage }: { currentPage: string }) {
  const PageComponent = routes[currentPage as keyof typeof routes]
  
  if (!PageComponent) {
    return (
      <div className="error-page">
        <h2>🚫 Pagina non trovata</h2>
        <p>La pagina "{currentPage}" non esiste nel sistema.</p>
        <button 
          className="button button-primary"
          onClick={() => window.location.hash = 'dashboard'}
        >
          Torna alla Dashboard
        </button>
      </div>
    )
  }

  return <PageComponent />
}

// Legacy router registration for main.js compatibility
if (typeof window !== 'undefined') {
  // @ts-ignore - Legacy compatibility
  window.router = {
    register: (hash: string, component: () => React.ReactElement) => {
      console.log(`🔗 Route registered: ${hash}`)
      // TODO: Implementare registrazione route legacy
    }
  }
  
  // Register all routes for legacy compatibility
  Object.keys(routes).forEach(route => {
    // @ts-ignore
    window.router.register(`#/${route}`, () => {
      const Component = routes[route as keyof typeof routes]
      return React.createElement(Component)
    })
  })
}

// TODO: Implementare:
// - Hash routing completo
// - Parametri URL
// - Navigazione programmatica
// - Route guards
// - Lazy loading pagine