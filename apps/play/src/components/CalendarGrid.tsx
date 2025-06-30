// ⚽ Calendar Grid - Griglia calendario
// @todo Convertire in Tailwind + token quando si disegna la UI

import React from 'react'

interface CalendarGridProps {
  currentDate?: Date
  events?: any[]
  onDateSelect?: (date: Date) => void
  className?: string
}

export function CalendarGrid({ currentDate, events, onDateSelect, className = '' }: CalendarGridProps) {
  const today = currentDate || new Date()
  
  return (
    <div className={`component calendar-grid ${className}`}>
      <h4>CalendarGrid TODO</h4>
      <div className="calendar-header">
        <button>← Mese precedente</button>
        <h5>{today.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}</h5>
        <button>Mese successivo →</button>
      </div>
      
      <div className="calendar-body">
        <div className="weekdays">
          {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        
        <div className="days-grid">
          {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
            <div 
              key={day} 
              className="day-cell"
              onClick={() => onDateSelect?.(new Date(today.getFullYear(), today.getMonth(), day))}
            >
              <span className="day-number">{day}</span>
              {events?.filter(e => new Date(e.date).getDate() === day).length > 0 && (
                <div className="event-indicator">•</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// TODO: Implementare:
// - Navigazione mesi
// - Eventi colorati per tipo
// - Vista settimanale/giornaliera
// - Drag & drop eventi