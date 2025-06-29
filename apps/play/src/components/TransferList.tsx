// ⚽ Transfer List - Lista trasferimenti
// @todo Convertire in Tailwind + token quando si disegna la UI

import React from 'react'

interface TransferListProps {
  transfers?: any[]
  onTransferAction?: (transferId: string, action: string) => void
  className?: string
}

export function TransferList({ transfers, onTransferAction, className = '' }: TransferListProps) {
  return (
    <div className={`component transfer-list ${className}`}>
      <h4>TransferList TODO</h4>
      <div className="transfers-container">
        {transfers?.length ? (
          transfers.map((transfer, index) => (
            <div key={transfer.id || index} className="transfer-item">
              <div className="player-info">
                <h5>{transfer.playerName || 'Giocatore'}</h5>
                <p>Da: {transfer.fromTeam || 'N/A'}</p>
                <p>A: {transfer.toTeam || 'N/A'}</p>
              </div>
              <div className="transfer-details">
                <p>Offerta: €{transfer.amount?.toLocaleString() || '0'}</p>
                <p>Stato: {transfer.status || 'In corso'}</p>
              </div>
              <div className="transfer-actions">
                <button onClick={() => onTransferAction?.(transfer.id, 'accept')}>
                  Accetta
                </button>
                <button onClick={() => onTransferAction?.(transfer.id, 'reject')}>
                  Rifiuta
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nessun trasferimento in corso</p>
        )}
      </div>
    </div>
  )
}

// TODO: Implementare:
// - Filtri e ricerca
// - Ordinamento
// - Dettagli contratto
// - Notifiche scadenze