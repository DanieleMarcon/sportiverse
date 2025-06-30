// ⚽ Calendar View - Vista calendario
// Implementa la pagina CalendarView.page documentata

import React, { useState, useEffect } from 'react'
import { CalendarGrid } from '../components/CalendarGrid'

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Caricare eventi calendario
    // Implementare chiamata ai Flow Calendar_FetchUpcomingEvents
    setTimeout(() => {
      setEvents([
        { 
          id: 1, 
          date: '2024-01-15', 
          type: 'match', 
          title: 'Aureliana vs Brioschese',
          description: 'Partita di campionato'
        },
        { 
          id: 2, 
          date: '2024-01-17', 
          type: 'training', 
          title: 'Allenamento Tattico',
          description: 'Preparazione partita'
        },
        { 
          id: 3, 
          date: '2024-01-20', 
          type: 'transfer', 
          title: 'Scadenza Trattativa',
          description: 'Offerta per Giovanni Silva'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    // TODO: Mostrare eventi del giorno selezionato
    console.log('Date selected:', date)
  }

  const handleAdvanceDay = () => {
    // TODO: Implementare avanzamento giorno
    // Collegare ai Flow GameFlow_AdvanceDay
    const nextDay = new Date(currentDate)
    nextDay.setDate(nextDay.getDate() + 1)
    setCurrentDate(nextDay)
    console.log('Advancing to:', nextDay)
  }

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-stadium">
          <div className="loading-field"></div>
          <div className="loading-text">Caricamento Calendario...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="calendar-view-page">
      <h1>📅 Calendario</h1>
      
      {/* Current Date & Controls */}
      <section className="date-controls">
        <div className="current-date">
          <h2>{currentDate.toLocaleDateString('it-IT', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</h2>
        </div>
        <div className="date-actions">
          <button 
            className="button button-primary"
            onClick={handleAdvanceDay}
          >
            <span>⏭️</span>
            <span>Avanza Giorno</span>
          </button>
          <button className="button button-secondary">
            <span>⏩</span>
            <span>Avanza Settimana</span>
          </button>
        </div>
      </section>

      {/* Calendar Grid */}
      <section className="calendar-section">
        <CalendarGrid 
          currentDate={currentDate}
          events={events}
          onDateSelect={handleDateSelect}
        />
      </section>

      {/* Upcoming Events */}
      <section className="events-section">
        <h2>📋 Prossimi Eventi</h2>
        <div className="events-list">
          {events.slice(0, 5).map(event => (
            <div key={event.id} className="event-item">
              <div className="event-date">
                {new Date(event.date).toLocaleDateString('it-IT')}
              </div>
              <div className="event-info">
                <h4>{event.title}</h4>
                <p>{event.description}</p>
                <span className={`event-type ${event.type}`}>
                  {event.type === 'match' ? '⚽ Partita' : 
                   event.type === 'training' ? '🏃 Allenamento' : 
                   event.type === 'transfer' ? '💰 Mercato' : 'Evento'}
                </span>
              </div>
              <div className="event-actions">
                <button className="button button-ghost">
                  Dettagli
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Date Details */}
      {selectedDate && (
        <section className="selected-date-section">
          <h2>📍 Eventi del {selectedDate.toLocaleDateString('it-IT')}</h2>
          <div className="selected-events">
            {events
              .filter(event => 
                new Date(event.date).toDateString() === selectedDate.toDateString()
              )
              .map(event => (
                <div key={event.id} className="selected-event">
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                </div>
              ))
            }
            {events.filter(event => 
              new Date(event.date).toDateString() === selectedDate.toDateString()
            ).length === 0 && (
              <p>Nessun evento programmato per questo giorno</p>
            )}
          </div>
        </section>
      )}

      {/* Legacy Notice */}
      <div className="legacy-notice">
        🚧 Il sistema calendario è in fase di sviluppo. 
        L'avanzamento automatico sarà implementato nelle prossime versioni.
      </div>
    </div>
  )
}

// TODO: Implementare:
// - Integrazione con GameFlow_AdvanceDay
// - Eventi automatici
// - Notifiche scadenze
// - Vista settimanale/mensile
// - Sincronizzazione con altri moduli