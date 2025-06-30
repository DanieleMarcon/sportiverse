// ⚽ Game Layout - Layout principale per l'app di gioco
// Implementa la struttura UI documentata in docs/ui/overview.md

import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { MainContent } from './MainContent'

interface GameLayoutProps {
  children: React.ReactNode
}

export function GameLayout({ children }: GameLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')

  return (
    <div className="app-layout">
      {/* Stadium Atmosphere Background */}
      <div className="stadium-atmosphere" />
      
      {/* Top Bar - Stadium Control Room */}
      <TopBar 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onQuickSave={() => console.log('Quick save')}
        onNotifications={() => setCurrentPage('press')}
        onSettings={() => setCurrentPage('settings')}
      />

      {/* Sidebar Navigation - Team Dugout */}
      <Sidebar 
        isOpen={sidebarOpen}
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page)
          setSidebarOpen(false) // Chiudi su mobile
        }}
      />

      {/* Main Content - Playing Field */}
      <MainContent currentPage={currentPage}>
        {children}
      </MainContent>

      {/* Mobile Menu Toggle */}
      <button 
        className={`mobile-menu-toggle ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  )
}

// TODO: Implementare componenti:
// - TopBar con azioni rapide
// - Sidebar con navigazione modulare
// - MainContent con routing
// - Responsive behavior
// - Accessibility features