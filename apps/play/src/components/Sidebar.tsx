// ⚽ Sidebar - Navigazione principale del gioco
// Implementa la struttura di navigazione documentata

import React from 'react'

interface SidebarProps {
  isOpen: boolean
  currentPage: string
  onNavigate: (page: string) => void
}

export function Sidebar({ isOpen, currentPage, onNavigate }: SidebarProps) {
  const navigationSections = [
    {
      title: 'Centro di Controllo',
      icon: '🏠',
      items: [
        { id: 'dashboard', icon: '📊', label: 'Dashboard' }
      ]
    },
    {
      title: 'Gestione Squadra',
      icon: '👥',
      items: [
        { id: 'team', icon: '⚽', label: 'Rosa Giocatori' },
        { id: 'team-stats', icon: '📈', label: 'Statistiche' },
        { id: 'team-morale', icon: '💪', label: 'Morale' }
      ]
    },
    {
      title: 'Partite',
      icon: '🏟️',
      items: [
        { id: 'next-match', icon: '🎯', label: 'Prossima Partita' },
        { id: 'calendar', icon: '📅', label: 'Calendario' },
        { id: 'results', icon: '🏆', label: 'Risultati' }
      ]
    },
    {
      title: 'Allenamento',
      icon: '🏃',
      items: [
        { id: 'training', icon: '📋', label: 'Pianificazione' },
        { id: 'training-programs', icon: '📚', label: 'Programmi' },
        { id: 'training-progress', icon: '📊', label: 'Progressi' }
      ]
    },
    {
      title: 'Tattiche',
      icon: '🧠',
      items: [
        { id: 'tactics', icon: '⚙️', label: 'Formazione' },
        { id: 'tactics-schemes', icon: '📐', label: 'Schemi' },
        { id: 'tactics-roles', icon: '🎭', label: 'Ruoli' }
      ]
    },
    {
      title: 'Mercato',
      icon: '💰',
      items: [
        { id: 'transfers', icon: '🛒', label: 'Trasferimenti' },
        { id: 'negotiations', icon: '🤝', label: 'Trattative' },
        { id: 'contracts', icon: '📄', label: 'Contratti' }
      ]
    },
    {
      title: 'Staff Tecnico',
      icon: '👔',
      items: [
        { id: 'staff', icon: '👥', label: 'Gestione Staff' }
      ]
    },
    {
      title: 'Osservazione',
      icon: '🔍',
      items: [
        { id: 'scouting', icon: '🎯', label: 'Scouting' },
        { id: 'shortlist', icon: '⭐', label: 'Lista Osservati' },
        { id: 'reports', icon: '📋', label: 'Report Scout' }
      ]
    },
    {
      title: 'Dirigenza',
      icon: '🏛️',
      items: [
        { id: 'board', icon: '👔', label: 'Consiglio' },
        { id: 'finances', icon: '💳', label: 'Finanze' }
      ]
    },
    {
      title: 'Media',
      icon: '📺',
      items: [
        { id: 'press', icon: '📰', label: 'Sala Stampa' }
      ]
    },
    {
      title: 'Storico',
      icon: '📈',
      items: [
        { id: 'history', icon: '📊', label: 'Progressi' }
      ]
    },
    {
      title: 'Sistema',
      icon: '⚙️',
      items: [
        { id: 'settings', icon: '🔧', label: 'Impostazioni' },
        { id: 'sessions', icon: '💾', label: 'Salvataggi' }
      ]
    }
  ]

  return (
    <nav className={`sidebar ${isOpen ? 'open' : 'hidden'}`}>
      <div className="sidebar-content">
        {navigationSections.map((section) => (
          <div key={section.title} className="nav-section">
            <h3 className="nav-section-title">
              <span>{section.icon}</span>
              <span>{section.title}</span>
            </h3>
            {section.items.map((item) => (
              <button
                key={item.id}
                className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </nav>
  )
}

// TODO: Implementare:
// - Stato attivo per sezioni
// - Badge notifiche
// - Collapse/expand sezioni
// - Keyboard navigation
// - Responsive behavior