// ⚽ Match Live View - Vista live partita
// @todo Convertire in Tailwind + token quando si disegna la UI

import React from 'react'

interface MatchLiveViewProps {
  match?: any
  isLive?: boolean
  onControlAction?: (action: string) => void
  className?: string
}

export function MatchLiveView({ match, isLive, onControlAction, className = '' }: MatchLiveViewProps) {
  return (
    <div className={`component match-live-view ${className}`}>
      <h4>MatchLiveView TODO</h4>
      <div className="match-header">
        <div className="teams">
          <span className="home-team">{match?.homeTeam || 'Casa'}</span>
          <span className="score">{match?.homeScore || 0} - {match?.awayScore || 0}</span>
          <span className="away-team">{match?.awayTeam || 'Trasferta'}</span>
        </div>
        <div className="match-time">
          <span className="minute">{match?.minute || 0}'</span>
          <span className="status">{isLive ? 'LIVE' : 'Programmata'}</span>
        </div>
      </div>
      
      <div className="match-controls">
        <button onClick={() => onControlAction?.('play')}>▶️ Play</button>
        <button onClick={() => onControlAction?.('pause')}>⏸️ Pausa</button>
        <button onClick={() => onControlAction?.('fast')}>⏩ Veloce</button>
      </div>
      
      <div className="match-events">
        <h5>Eventi</h5>
        {match?.events?.length ? (
          match.events.map((event: any, index: number) => (
            <div key={index} className="event-item">
              <span className="event-time">{event.minute}'</span>
              <span className="event-text">{event.description}</span>
            </div>
          ))
        ) : (
          <p>Nessun evento</p>
        )}
      </div>
    </div>
  )
}

// TODO: Implementare:
// - Animazioni eventi
// - Campo 3D
// - Sostituzioni live
// - Statistiche real-time