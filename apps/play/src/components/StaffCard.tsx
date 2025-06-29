// ⚽ Staff Card - Scheda membro staff
// @todo Convertire in Tailwind + token quando si disegna la UI

import React from 'react'

interface StaffCardProps {
  staff?: any
  onAction?: (action: string) => void
  className?: string
}

export function StaffCard({ staff, onAction, className = '' }: StaffCardProps) {
  return (
    <div className={`component staff-card ${className}`}>
      <h4>StaffCard TODO</h4>
      {staff && (
        <div className="staff-info">
          <div className="staff-header">
            <h5>{staff.name || 'Staff Member'}</h5>
            <span className="staff-role">{staff.role || 'Ruolo'}</span>
          </div>
          
          <div className="staff-details">
            <p>Esperienza: {staff.experience || 0} anni</p>
            <p>Specializzazione: {staff.specialization || 'N/A'}</p>
            <p>Contratto: {staff.contractEnd || 'N/A'}</p>
          </div>
          
          <div className="staff-competencies">
            <h6>Competenze:</h6>
            <div className="competency-bars">
              <div className="competency">
                <span>Tecnica</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${staff.technical || 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="competency">
                <span>Motivazione</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${staff.motivation || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="staff-actions">
            <button onClick={() => onAction?.('renew')}>Rinnova</button>
            <button onClick={() => onAction?.('release')}>Licenzia</button>
          </div>
        </div>
      )}
    </div>
  )
}

// TODO: Implementare:
// - Foto staff
// - Grafico competenze radar
// - Storico performance
// - Negoziazione contratti