import React, { useState } from 'react'
import { GameLayout } from './components/GameLayout'
import { Dashboard } from './pages/Dashboard'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      default:
        return (
          <div className="page-placeholder">
            <h2>🚧 Pagina in sviluppo</h2>
            <p>La pagina "{currentPage}" sarà disponibile nelle prossime versioni.</p>
            <button 
              className="button button-primary"
              onClick={() => setCurrentPage('dashboard')}
            >
              Torna alla Dashboard
            </button>
          </div>
        )
    }
  }

  return (
    <GameLayout>
      {renderPage()}
    </GameLayout>
  )
}

export default App