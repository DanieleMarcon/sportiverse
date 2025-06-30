// ⚽ Training Management - Gestione allenamenti
// Implementa la pagina TrainingManagement.page documentata

import React, { useState, useEffect } from 'react'
import { TrainingScheduler } from '../components/TrainingScheduler'

export function TrainingManagement() {
  const [weeklySchedule, setWeeklySchedule] = useState([])
  const [availablePrograms, setAvailablePrograms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Caricare programmi allenamento
    // Implementare chiamata al dataset trainings
    setTimeout(() => {
      setWeeklySchedule([
        { day: 0, type: 'Tecnico', intensity: 7 },
        { day: 1, type: 'Fisico', intensity: 8 },
        { day: 2, type: 'Tattico', intensity: 6 },
        null, // Riposo
        { day: 4, type: 'Preparazione Partita', intensity: 5 },
        null, // Partita
        null  // Riposo
      ])
      setAvailablePrograms([
        { id: 1, name: 'Preparazione Fisica', type: 'Fisico', duration: 90 },
        { id: 2, name: 'Tecnica Individuale', type: 'Tecnico', duration: 60 },
        { id: 3, name: 'Schemi Tattici', type: 'Tattico', duration: 75 }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleScheduleChange = (newSchedule: any[]) => {
    // TODO: Implementare aggiornamento programma
    // Collegare ai Flow Player_Train
    console.log('Schedule changed:', newSchedule)
    setWeeklySchedule(newSchedule)
  }

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-stadium">
          <div className="loading-field"></div>
          <div className="loading-text">Caricamento Allenamenti...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="training-management-page">
      <h1>🏃 Gestione Allenamenti</h1>
      
      {/* Weekly Schedule */}
      <section className="schedule-section">
        <h2>Programma Settimanale</h2>
        <TrainingScheduler 
          schedule={weeklySchedule}
          onScheduleChange={handleScheduleChange}
        />
      </section>

      {/* Training Programs */}
      <section className="programs-section">
        <h2>Programmi Disponibili</h2>
        <div className="programs-grid">
          {availablePrograms.map(program => (
            <div key={program.id} className="program-card">
              <h4>{program.name}</h4>
              <p>Tipo: {program.type}</p>
              <p>Durata: {program.duration} min</p>
              <button className="button button-secondary">
                Aggiungi al Programma
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Training Settings */}
      <section className="settings-section">
        <h2>Impostazioni Allenamento</h2>
        <div className="training-settings">
          <div className="setting-group">
            <label>Intensità Generale</label>
            <input type="range" min="1" max="10" defaultValue="7" />
            <span>7/10</span>
          </div>
          <div className="setting-group">
            <label>Focus Principale</label>
            <select defaultValue="balanced">
              <option value="physical">Preparazione Fisica</option>
              <option value="technical">Tecnica</option>
              <option value="tactical">Tattica</option>
              <option value="balanced">Bilanciato</option>
            </select>
          </div>
          <div className="setting-group">
            <label>Gestione Infortuni</label>
            <select defaultValue="normal">
              <option value="conservative">Conservativa</option>
              <option value="normal">Normale</option>
              <option value="aggressive">Aggressiva</option>
            </select>
          </div>
        </div>
      </section>

      {/* Training Results */}
      <section className="results-section">
        <h2>Risultati Recenti</h2>
        <div className="results-summary">
          <div className="result-card">
            <h4>Miglioramenti</h4>
            <p>3 giocatori hanno migliorato attributi</p>
          </div>
          <div className="result-card">
            <h4>Fitness Medio</h4>
            <p>85% (+2% questa settimana)</p>
          </div>
          <div className="result-card">
            <h4>Infortuni</h4>
            <p>0 infortuni negli ultimi 7 giorni</p>
          </div>
        </div>
      </section>

      {/* Legacy Notice */}
      <div className="legacy-notice">
        🚧 Il sistema di allenamento è in fase di sviluppo. 
        Gli effetti sui giocatori saranno implementati nelle prossime versioni.
      </div>
    </div>
  )
}

// TODO: Implementare:
// - Integrazione con TrainingEngine
// - Effetti allenamento su attributi
// - Gestione carichi di lavoro
// - Prevenzione infortuni
// - Analisi performance allenamenti