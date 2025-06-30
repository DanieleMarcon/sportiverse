// ⚽ Training Scheduler - Pianificazione allenamenti
// @todo Convertire in Tailwind + token quando si disegna la UI

import React from 'react'

interface TrainingSchedulerProps {
  schedule?: any[]
  onScheduleChange?: (newSchedule: any[]) => void
  className?: string
}

export function TrainingScheduler({ schedule, onScheduleChange, className = '' }: TrainingSchedulerProps) {
  return (
    <div className={`component training-scheduler ${className}`}>
      <h4>TrainingScheduler TODO</h4>
      <div className="weekly-schedule">
        {['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'].map((day, index) => (
          <div key={day} className="day-slot">
            <h5>{day}</h5>
            <div className="training-slot">
              {schedule?.[index] ? (
                <p>{schedule[index].type || 'Allenamento'}</p>
              ) : (
                <p>Riposo</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// TODO: Implementare:
// - Drag & drop allenamenti
// - Tipi allenamento
// - Intensità e durata
// - Conflitti calendario