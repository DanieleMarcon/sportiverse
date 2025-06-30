// ⚽ Team Management - Gestione squadra
// Implementa la pagina TeamManagement.page documentata

import React, { useState, useEffect } from 'react'
import { PlayerCard } from '../components/PlayerCard'
import { TeamOverview } from '../components/TeamOverview'

export function TeamManagement() {
  const [players, setPlayers] = useState([])
  const [team, setTeam] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // TODO: Caricare dati squadra e giocatori
    // Implementare chiamata ai dataset players e teams
    setTimeout(() => {
      setTeam({
        name: 'Aureliana',
        points: 25,
        wins: 8,
        morale: 75
      })
      setPlayers([
        { id: 1, name: 'Mario Rossi', position: 'GK', rating: 78 },
        { id: 2, name: 'Luigi Bianchi', position: 'DF', rating: 82 },
        { id: 3, name: 'Giuseppe Verdi', position: 'MF', rating: 85 },
        { id: 4, name: 'Antonio Neri', position: 'FW', rating: 79 }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredPlayers = players.filter(player => 
    filter === 'all' || player.position === filter
  )

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-stadium">
          <div className="loading-field"></div>
          <div className="loading-text">Caricamento Rosa...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="team-management-page">
      <h1>⚽ Rosa Giocatori</h1>
      
      {/* Team Overview */}
      <section className="team-section">
        <TeamOverview team={team} />
      </section>

      {/* Player Filters */}
      <section className="filters-section">
        <h2>Filtri Giocatori</h2>
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Tutti
          </button>
          <button 
            className={filter === 'GK' ? 'active' : ''}
            onClick={() => setFilter('GK')}
          >
            Portieri
          </button>
          <button 
            className={filter === 'DF' ? 'active' : ''}
            onClick={() => setFilter('DF')}
          >
            Difensori
          </button>
          <button 
            className={filter === 'MF' ? 'active' : ''}
            onClick={() => setFilter('MF')}
          >
            Centrocampisti
          </button>
          <button 
            className={filter === 'FW' ? 'active' : ''}
            onClick={() => setFilter('FW')}
          >
            Attaccanti
          </button>
        </div>
      </section>

      {/* Players Grid */}
      <section className="players-section">
        <h2>Giocatori ({filteredPlayers.length})</h2>
        <div className="players-grid">
          {filteredPlayers.map(player => (
            <PlayerCard 
              key={player.id} 
              player={player}
              onClick={() => console.log('Player clicked:', player.name)}
            />
          ))}
        </div>
      </section>

      {/* Legacy Notice */}
      <div className="legacy-notice">
        🚧 Questa pagina utilizza componenti placeholder. 
        I componenti saranno implementati con Tailwind CSS nelle prossime versioni.
      </div>
    </div>
  )
}

// TODO: Implementare:
// - Integrazione con dataset players
// - Filtri avanzati (età, valore, stato)
// - Ordinamento personalizzabile
// - Azioni bulk (vendita multipla)
// - Modal dettagli giocatore