// ⚽ Player Search - Ricerca giocatori
// @todo Convertire in Tailwind + token quando si disegna la UI

import React, { useState } from 'react'

interface PlayerSearchProps {
  onSearch?: (filters: any) => void
  onPlayerSelect?: (player: any) => void
  className?: string
}

export function PlayerSearch({ onSearch, onPlayerSelect, className = '' }: PlayerSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    position: '',
    ageMin: '',
    ageMax: '',
    maxPrice: ''
  })

  return (
    <div className={`component player-search ${className}`}>
      <h4>PlayerSearch TODO</h4>
      <div className="search-form">
        <div className="search-input">
          <input
            type="text"
            placeholder="Cerca giocatore..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => onSearch?.({ ...filters, name: searchTerm })}>
            🔍 Cerca
          </button>
        </div>
        
        <div className="filters">
          <select 
            value={filters.position}
            onChange={(e) => setFilters({...filters, position: e.target.value})}
          >
            <option value="">Tutte le posizioni</option>
            <option value="GK">Portiere</option>
            <option value="DF">Difensore</option>
            <option value="MF">Centrocampista</option>
            <option value="FW">Attaccante</option>
          </select>
          
          <input
            type="number"
            placeholder="Età min"
            value={filters.ageMin}
            onChange={(e) => setFilters({...filters, ageMin: e.target.value})}
          />
          
          <input
            type="number"
            placeholder="Età max"
            value={filters.ageMax}
            onChange={(e) => setFilters({...filters, ageMax: e.target.value})}
          />
          
          <input
            type="number"
            placeholder="Prezzo max"
            value={filters.maxPrice}
            onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
          />
        </div>
      </div>
    </div>
  )
}

// TODO: Implementare:
// - Filtri avanzati
// - Ricerca intelligente
// - Suggerimenti automatici
// - Salvataggio ricerche