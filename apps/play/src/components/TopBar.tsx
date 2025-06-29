// ⚽ Top Bar - Barra superiore con azioni rapide
// Implementa la top bar documentata in docs/ui/overview.md

import React from 'react'

interface TopBarProps {
  onToggleSidebar: () => void
  onQuickSave: () => void
  onNotifications: () => void
  onSettings: () => void
}

export function TopBar({ 
  onToggleSidebar, 
  onQuickSave, 
  onNotifications, 
  onSettings 
}: TopBarProps) {
  return (
    <header className="top-bar">
      <div className="top-bar-content">
        {/* App Title */}
        <div className="app-title">
          <span className="title-icon">⚽</span>
          <span className="title-text">Allenatore Nato</span>
          <span className="title-subtitle">Football Manager</span>
        </div>

        {/* Actions */}
        <div className="top-bar-actions">
          <button 
            className="button button-secondary"
            onClick={onQuickSave}
            aria-label="Salvataggio rapido"
          >
            <span>💾</span>
            <span>Salva</span>
          </button>

          <button 
            className="button button-ghost"
            onClick={onNotifications}
            aria-label="Notifiche e comunicati"
          >
            <span>🔔</span>
            <span className="notification-badge">3</span>
          </button>

          <button 
            className="button button-ghost"
            onClick={onSettings}
            aria-label="Impostazioni"
          >
            <span>⚙️</span>
          </button>
        </div>
      </div>
    </header>
  )
}

// TODO: Implementare:
// - Stato salvataggio (loading, success, error)
// - Contatore notifiche dinamico
// - Menu dropdown per azioni
// - Breadcrumb navigation
// - User profile menu