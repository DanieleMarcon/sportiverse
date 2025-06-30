// ⚽ App - Componente principale dell'applicazione
// Gestisce il routing e il layout generale

import React, { useState, useEffect } from 'react'
import { GameLayout } from './components/GameLayout'
import { Router } from './router'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  useEffect(() => {
    // Gestione hash routing
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'dashboard'
      setCurrentPage(hash)
    }

    // Ascolta cambiamenti hash
    window.addEventListener('hashchange', handleHashChange)
    
    // Imposta pagina iniziale
    handleHashChange()

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const handleNavigate = (page: string) => {
    window.location.hash = page
    setCurrentPage(page)
  }

  return (
    <GameLayout>
      <Router currentPage={currentPage} />
    </GameLayout>
  )
}

export default App