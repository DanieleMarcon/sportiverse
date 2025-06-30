// ⚽ Dashboard - Pagina principale del gioco
// Implementa la dashboard documentata in docs/ui/overview.md

import React, { useState, useEffect } from 'react'

export function Dashboard() {
  const [gameState, setGameState] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Caricare stato del gioco
    // Implementare chiamata a GameService.getCurrentGameState()
    setTimeout(() => {
      setGameState({
        userTeam: { name: 'Aureliana', morale: 75, budget: 500000 },
        nextMatch: { opponent: 'Brioschese', date: '2024-01-15', venue: 'Casa' },
        recentNews: [
          'Nuovo acquisto in arrivo',
          'Vittoria convincente nell\'ultima partita',
          'Allenamento intensivo programmato'
        ]
      })
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-stadium">
          <div className="loading-field"></div>
          <div className="loading-text">Caricamento Dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <h1>🏠 Centro di Controllo</h1>
      
      {/* Quick Actions */}
      <section className="quick-actions" aria-labelledby="quick-actions-title">
        <h2 id="quick-actions-title">Azioni Rapide</h2>
        <div className="actions-grid">
          <button className="button button-primary button-large">
            <span>🎮</span>
            <span>Nuova Carriera</span>
          </button>
          <button className="button button-secondary button-large">
            <span>📁</span>
            <span>Carica Carriera</span>
          </button>
          <button className="button button-ghost">
            <span>💾</span>
            <span>Salva Partita</span>
          </button>
        </div>
      </section>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Team Summary */}
        <section className="card team-summary">
          <h3>⚽ La Tua Squadra</h3>
          {gameState?.userTeam && (
            <div className="team-info">
              <h4>{gameState.userTeam.name}</h4>
              <div className="team-stats">
                <div className="stat-item">
                  <span className="stat-label">Morale</span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${gameState.userTeam.morale}%` }}
                    ></div>
                  </div>
                  <span className="stat-value">{gameState.userTeam.morale}%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Budget</span>
                  <span className="stat-value">€{gameState.userTeam.budget.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Next Match */}
        <section className="card next-match">
          <h3>🎯 Prossima Partita</h3>
          {gameState?.nextMatch && (
            <div className="match-info">
              <div className="match-teams">
                <span className="home-team">{gameState.userTeam.name}</span>
                <span className="vs">VS</span>
                <span className="away-team">{gameState.nextMatch.opponent}</span>
              </div>
              <div className="match-details">
                <span className="match-date">{gameState.nextMatch.date}</span>
                <span className="match-venue">{gameState.nextMatch.venue}</span>
              </div>
              <button className="button button-primary">
                <span>⚽</span>
                <span>Prepara Partita</span>
              </button>
            </div>
          )}
        </section>

        {/* Recent News */}
        <section className="card recent-news">
          <h3>📰 Ultime Notizie</h3>
          <div className="news-list">
            {gameState?.recentNews?.map((news, index) => (
              <div key={index} className="news-item">
                <span className="news-icon">📢</span>
                <span className="news-text">{news}</span>
              </div>
            ))}
          </div>
          <button className="button button-ghost">
            <span>📺</span>
            <span>Vai alla Sala Stampa</span>
          </button>
        </section>

        {/* Quick Stats */}
        <section className="card quick-stats">
          <h3>📊 Statistiche Rapide</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">15</span>
              <span className="stat-label">Partite</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">8</span>
              <span className="stat-label">Vittorie</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">25</span>
              <span className="stat-label">Giocatori</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">3°</span>
              <span className="stat-label">Posizione</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

// TODO: Implementare:
// - Integrazione con GameService
// - Aggiornamenti real-time
// - Grafici interattivi
// - Personalizzazione dashboard
// - Responsive layout