// ⚽ Team Overview - Panoramica squadra
// @todo Convertire in Tailwind + token quando si disegna la UI

import React from 'react'

interface TeamOverviewProps {
  team?: any
  className?: string
}

export function TeamOverview({ team, className = '' }: TeamOverviewProps) {
  return (
    <div className={`component team-overview ${className}`}>
      <h4>TeamOverview TODO</h4>
      {team && (
        <div className="team-summary">
          <h5>{team.name || 'Squadra'}</h5>
          <div className="team-stats">
            <p>Punti: {team.points || 0}</p>
            <p>Vittorie: {team.wins || 0}</p>
            <p>Morale: {team.morale || 0}%</p>
          </div>
        </div>
      )}
    </div>
  )
}

// TODO: Implementare:
// - Logo squadra
// - Statistiche campionato
// - Grafico morale
// - Link azioni rapide