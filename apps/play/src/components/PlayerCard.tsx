// ⚽ Player Card - Componente per visualizzare giocatori
// @todo Convertire in Tailwind + token quando si disegna la UI

import React from 'react'

interface PlayerCardProps {
  player?: any
  onClick?: () => void
  className?: string
}

export function PlayerCard({ player, onClick, className = '' }: PlayerCardProps) {
  return (
    <div className={`component player-card ${className}`} onClick={onClick}>
      <div className="player-card-content">
        <h4>PlayerCard TODO</h4>
        {player && (
          <div className="player-info">
            <p>Nome: {player.name || 'N/A'}</p>
            <p>Posizione: {player.position || 'N/A'}</p>
            <p>Rating: {player.rating || 'N/A'}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// TODO: Implementare:
// - Foto giocatore
// - Attributi principali
// - Stato fisico e morale
// - Azioni rapide (vendi, rinnova)
// - Hover states e micro-interactions