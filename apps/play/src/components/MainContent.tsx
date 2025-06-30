// ⚽ Main Content - Area principale con routing
// Gestisce il contenuto principale e il routing delle pagine

import React from 'react'

interface MainContentProps {
  currentPage: string
  children: React.ReactNode
}

export function MainContent({ currentPage, children }: MainContentProps) {
  return (
    <main className="main-content" id="mainContent">
      <div id="pageContent">
        {/* Page Loading State */}
        {!children && (
          <div className="page-loading">
            <div className="loading-stadium">
              <div className="loading-field"></div>
              <div className="loading-text">Caricamento...</div>
            </div>
          </div>
        )}

        {/* Page Content */}
        {children}

        {/* Fallback for unknown pages */}
        {!children && currentPage && (
          <div className="error-page">
            <h2>🚫 Pagina in sviluppo</h2>
            <p>La pagina "{currentPage}" è in fase di sviluppo.</p>
            <p>Sarà disponibile nelle prossime versioni del gioco.</p>
          </div>
        )}
      </div>

      {/* Toast Container - Match Events */}
      <div id="toastContainer" className="toast-container"></div>
      
      {/* Modal Container - Stadium Big Screen */}
      <div id="modalContainer" className="modal-container"></div>
    </main>
  )
}

// TODO: Implementare:
// - Page routing system
// - Page transition animations
// - Error boundaries
// - Loading states per page
// - Toast notification system
// - Modal management