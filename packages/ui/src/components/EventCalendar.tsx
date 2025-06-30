import React, { useState } from 'react';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'match' | 'training' | 'medical' | 'meeting' | 'other';
  time?: string;
  location?: string;
  description?: string;
}

interface EventCalendarProps {
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  view?: 'month' | 'week' | 'day';
  className?: string;
  editable?: boolean;
}

export default function EventCalendar({ 
  events = [], 
  onEventClick, 
  view = 'month', 
  className = '',
  editable = false 
}: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'match': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'training': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'medical': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'meeting': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400 border-gray-200 dark:border-gray-800';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'match': return '⚽';
      case 'training': return '🏃';
      case 'medical': return '🏥';
      case 'meeting': return '👥';
      default: return '📅';
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday (0) to 6, Monday (1) to 0, etc.
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 bg-gray-50 dark:bg-gray-800/50" />
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`
            h-24 p-1 border border-gray-200 dark:border-gray-700 cursor-pointer
            hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
            ${isToday ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700' : 'bg-white dark:bg-gray-900'}
            ${isSelected ? 'ring-2 ring-blue-500' : ''}
          `}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map(event => (
              <div
                key={event.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onEventClick?.(event);
                }}
                className={`
                  text-xs px-1 py-0.5 rounded border truncate cursor-pointer
                  hover:scale-105 transition-transform
                  ${getEventTypeColor(event.type)}
                `}
                title={`${event.title}${event.time ? ` - ${event.time}` : ''}`}
              >
                <span className="mr-1">{getEventTypeIcon(event.type)}</span>
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 px-1">
                +{dayEvents.length - 2} altri
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {currentDate.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex gap-1">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              aria-label="Mese precedente"
            >
              ←
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              aria-label="Mese successivo"
            >
              →
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 
                     hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
          >
            Oggi
          </button>
          {editable && (
            <button className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors">
              + Evento
            </button>
          )}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-0 mb-2">
          {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          {renderMonthView()}
        </div>
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
            Eventi del {selectedDate.toLocaleDateString('it-IT', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long' 
            })}
          </h3>
          <div className="space-y-2">
            {getEventsForDate(selectedDate).map(event => (
              <div
                key={event.id}
                onClick={() => onEventClick?.(event)}
                className={`
                  p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-all
                  ${getEventTypeColor(event.type)}
                `}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{getEventTypeIcon(event.type)}</span>
                  <span className="font-medium">{event.title}</span>
                  {event.time && (
                    <span className="text-sm opacity-75">{event.time}</span>
                  )}
                </div>
                {event.location && (
                  <div className="text-sm opacity-75">📍 {event.location}</div>
                )}
                {event.description && (
                  <div className="text-sm opacity-75 mt-1">{event.description}</div>
                )}
              </div>
            ))}
            {getEventsForDate(selectedDate).length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Nessun evento programmato per questo giorno
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}