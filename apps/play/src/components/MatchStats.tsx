// ⚽ Match Stats - Componente per statistiche partita
// @todo Convertire in Tailwind + token quando si disegna la UI

import React from 'react'

interface MatchStatsProps {
  homeStats?: any
  awayStats?: any
  className?: string
}

export function MatchStats({ homeStats, awayStats, className = '' }: MatchStatsProps) {
  return (
    <div className={`component match-stats ${className}`}>
      <h4>MatchStats TODO</h4>
      <div className="stats-comparison">
        <div className="home-stats">
          <h5>Casa</h5>
          {homeStats && (
            <div>
              <p>Possesso: {homeStats.possession || 0}%</p>
              <p>Tiri: {homeStats.shots || 0}</p>
            </div>
          )}
        </div>
        <div className="away-stats">
          <h5>Trasferta</h5>
          {awayStats && (
            <div>
              <p>Possesso: {awayStats.possession || 0}%</p>
              <p>Tiri: {awayStats.shots || 0}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// TODO: Implementare:
// - Grafici a barre comparative
// - Statistiche dettagliate
// - Animazioni per aggiornamenti live
// - Export dati