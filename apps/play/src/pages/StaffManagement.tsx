// ⚽ Staff Management - Gestione staff
// Implementa la pagina StaffManagement.page documentata

import React, { useState, useEffect } from 'react'
import { StaffCard } from '../components/StaffCard'

export function StaffManagement() {
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterRole, setFilterRole] = useState('all')

  useEffect(() => {
    // TODO: Caricare dati staff
    // Implementare chiamata al dataset staff
    setTimeout(() => {
      setStaff([
        {
          id: 1,
          name: 'Marco Allegri',
          role: 'head_coach',
          experience: 15,
          specialization: 'Tattica',
          contractEnd: '2025-06-30',
          technical: 85,
          motivation: 90
        },
        {
          id: 2,
          name: 'Giuseppe Fitness',
          role: 'fitness_coach',
          experience: 8,
          specialization: 'Preparazione Fisica',
          contractEnd: '2024-12-31',
          technical: 78,
          motivation: 82
        },
        {
          id: 3,
          name: 'Antonio Scout',
          role: 'scout',
          experience: 12,
          specialization: 'Scouting Giovani',
          contractEnd: '2025-03-15',
          technical: 88,
          motivation: 75
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleStaffAction = (staffId: number, action: string) => {
    // TODO: Implementare azioni staff
    // Collegare ai Flow Staff_AssignRole
    console.log('Staff action:', staffId, action)
  }

  const filteredStaff = staff.filter(member => 
    filterRole === 'all' || member.role === filterRole
  )

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-stadium">
          <div className="loading-field"></div>
          <div className="loading-text">Caricamento Staff...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="staff-management-page">
      <h1>👔 Gestione Staff</h1>
      
      {/* Staff Overview */}
      <section className="staff-overview">
        <h2>Panoramica Staff</h2>
        <div className="overview-stats">
          <div className="stat-card">
            <h4>Staff Totale</h4>
            <span className="stat-value">{staff.length}</span>
          </div>
          <div className="stat-card">
            <h4>Competenza Media</h4>
            <span className="stat-value">
              {Math.round(staff.reduce((acc, s) => acc + s.technical, 0) / staff.length)}%
            </span>
          </div>
          <div className="stat-card">
            <h4>Contratti in Scadenza</h4>
            <span className="stat-value">1</span>
          </div>
        </div>
      </section>

      {/* Staff Filters */}
      <section className="filters-section">
        <h2>Filtri Staff</h2>
        <div className="filter-buttons">
          <button 
            className={filterRole === 'all' ? 'active' : ''}
            onClick={() => setFilterRole('all')}
          >
            Tutti
          </button>
          <button 
            className={filterRole === 'head_coach' ? 'active' : ''}
            onClick={() => setFilterRole('head_coach')}
          >
            Allenatore
          </button>
          <button 
            className={filterRole === 'fitness_coach' ? 'active' : ''}
            onClick={() => setFilterRole('fitness_coach')}
          >
            Preparatore
          </button>
          <button 
            className={filterRole === 'scout' ? 'active' : ''}
            onClick={() => setFilterRole('scout')}
          >
            Scout
          </button>
        </div>
      </section>

      {/* Staff List */}
      <section className="staff-list-section">
        <h2>Staff ({filteredStaff.length})</h2>
        <div className="staff-grid">
          {filteredStaff.map(member => (
            <StaffCard 
              key={member.id}
              staff={member}
              onAction={(action) => handleStaffAction(member.id, action)}
            />
          ))}
        </div>
      </section>

      {/* Hiring Section */}
      <section className="hiring-section">
        <h2>Assunzioni</h2>
        <div className="hiring-controls">
          <button className="button button-primary">
            <span>🔍</span>
            <span>Cerca Nuovo Staff</span>
          </button>
          <button className="button button-secondary">
            <span>📋</span>
            <span>Candidature Ricevute</span>
          </button>
          <button className="button button-ghost">
            <span>💼</span>
            <span>Promuovi da Settore Giovanile</span>
          </button>
        </div>
      </section>

      {/* Legacy Notice */}
      <div className="legacy-notice">
        🚧 Il sistema di gestione staff è in fase di sviluppo. 
        Le funzionalità avanzate saranno implementate nelle prossime versioni.
      </div>
    </div>
  )
}

// TODO: Implementare:
// - Integrazione con dataset staff
// - Sistema assunzioni
// - Negoziazione contratti
// - Valutazione performance
// - Specializzazioni avanzate