// ⚽ Transfer Market - Mercato trasferimenti
// Implementa la pagina TransferMarket.page documentata

import React, { useState, useEffect } from 'react'
import { PlayerSearch } from '../components/PlayerSearch'
import { TransferList } from '../components/TransferList'

export function TransferMarket() {
  const [availablePlayers, setAvailablePlayers] = useState([])
  const [activeTransfers, setActiveTransfers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('search')

  useEffect(() => {
    // TODO: Caricare dati mercato
    // Implementare chiamata ai dataset players e transfers
    setTimeout(() => {
      setAvailablePlayers([
        { id: 1, name: 'Marco Verratti', position: 'MF', age: 28, price: 15000000 },
        { id: 2, name: 'Ciro Immobile', position: 'FW', age: 32, price: 8000000 }
      ])
      setActiveTransfers([
        { 
          id: 1, 
          playerName: 'Giovanni Silva', 
          fromTeam: 'Juventus', 
          toTeam: 'Aureliana',
          amount: 5000000,
          status: 'In negoziazione'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleSearch = (filters: any) => {
    // TODO: Implementare ricerca giocatori
    // Collegare ai Flow Transfer_Offer
    console.log('Search filters:', filters)
  }

  const handleTransferAction = (transferId: string, action: string) => {
    // TODO: Implementare azioni trasferimento
    // Collegare ai Flow Transfer_Process
    console.log('Transfer action:', transferId, action)
  }

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-stadium">
          <div className="loading-field"></div>
          <div className="loading-text">Caricamento Mercato...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="transfer-market-page">
      <h1>💰 Mercato Trasferimenti</h1>
      
      {/* Tab Navigation */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          🔍 Ricerca Giocatori
        </button>
        <button 
          className={`tab ${activeTab === 'transfers' ? 'active' : ''}`}
          onClick={() => setActiveTab('transfers')}
        >
          📋 Trattative Attive
        </button>
        <button 
          className={`tab ${activeTab === 'budget' ? 'active' : ''}`}
          onClick={() => setActiveTab('budget')}
        >
          💳 Budget
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'search' && (
          <section className="search-section">
            <h2>Cerca Giocatori</h2>
            <PlayerSearch onSearch={handleSearch} />
            
            <div className="search-results">
              <h3>Risultati ({availablePlayers.length})</h3>
              <div className="players-list">
                {availablePlayers.map(player => (
                  <div key={player.id} className="player-result">
                    <div className="player-info">
                      <h4>{player.name}</h4>
                      <p>{player.position} - {player.age} anni</p>
                    </div>
                    <div className="player-price">
                      <p>€{player.price.toLocaleString()}</p>
                      <button className="button button-primary">
                        Fai Offerta
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'transfers' && (
          <section className="transfers-section">
            <h2>Trattative Attive</h2>
            <TransferList 
              transfers={activeTransfers}
              onTransferAction={handleTransferAction}
            />
          </section>
        )}

        {activeTab === 'budget' && (
          <section className="budget-section">
            <h2>Gestione Budget</h2>
            <div className="budget-overview">
              <div className="budget-card">
                <h3>Budget Disponibile</h3>
                <p className="budget-amount">€2.500.000</p>
              </div>
              <div className="budget-card">
                <h3>Spese Stagionali</h3>
                <p className="budget-amount">€1.200.000</p>
              </div>
              <div className="budget-card">
                <h3>Entrate Previste</h3>
                <p className="budget-amount">€800.000</p>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Legacy Notice */}
      <div className="legacy-notice">
        🚧 Il sistema di trasferimenti è in fase di sviluppo. 
        Le trattative reali saranno implementate nelle prossime versioni.
      </div>
    </div>
  )
}

// TODO: Implementare:
// - Integrazione con TransferEngine
// - Sistema offerte real-time
// - Negoziazioni automatiche IA
// - Clausole contrattuali
// - Prestiti e opzioni