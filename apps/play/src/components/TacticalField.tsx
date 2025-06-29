// ⚽ Tactical Field - Campo tattico interattivo
// @todo Convertire in Tailwind + token quando si disegna la UI

import React from 'react'

interface TacticalFieldProps {
  formation?: string
  players?: any[]
  onPlayerMove?: (playerId: string, position: { x: number, y: number }) => void
  className?: string
}

export function TacticalField({ formation, players, onPlayerMove, className = '' }: TacticalFieldProps) {
  return (
    <div className={`component tactical-field ${className}`}>
      <h4>TacticalField TODO</h4>
      <div className="field-container">
        <div className="football-field">
          <div className="field-markings">
            <div className="center-circle"></div>
            <div className="center-line"></div>
          </div>
          <div className="player-positions">
            {players?.map((player, index) => (
              <div 
                key={player.id || index}
                className="player-position"
                style={{ 
                  left: `${(player.x || 50)}%`, 
                  top: `${(player.y || 50)}%` 
                }}
              >
                {player.name || `P${index + 1}`}
              </div>
            ))}
          </div>
        </div>
        <div className="formation-info">
          <p>Formazione: {formation || '4-4-2'}</p>
        </div>
      </div>
    </div>
  )
}

// TODO: Implementare:
// - Drag & drop giocatori
// - Validazione posizioni
// - Animazioni tattiche
// - Preset formazioni