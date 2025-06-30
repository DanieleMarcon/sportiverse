import React from 'react';

interface Position {
  value: string;
  label: string;
  category: 'GK' | 'DF' | 'MF' | 'FW';
  icon?: string;
}

interface PositionPickerProps {
  value?: string;
  onChange?: (position: string) => void;
  positions?: Position[];
  disabled?: boolean;
  className?: string;
  showIcons?: boolean;
  allowEmpty?: boolean;
}

const DEFAULT_POSITIONS: Position[] = [
  // Portieri
  { value: 'GK', label: 'Portiere', category: 'GK', icon: '🥅' },
  
  // Difensori
  { value: 'CB', label: 'Difensore Centrale', category: 'DF', icon: '🛡️' },
  { value: 'LB', label: 'Terzino Sinistro', category: 'DF', icon: '⬅️' },
  { value: 'RB', label: 'Terzino Destro', category: 'DF', icon: '➡️' },
  { value: 'LWB', label: 'Esterno Sinistro', category: 'DF', icon: '↖️' },
  { value: 'RWB', label: 'Esterno Destro', category: 'DF', icon: '↗️' },
  
  // Centrocampisti
  { value: 'CDM', label: 'Mediano Difensivo', category: 'MF', icon: '🔒' },
  { value: 'CM', label: 'Centrocampista', category: 'MF', icon: '⚙️' },
  { value: 'CAM', label: 'Trequartista', category: 'MF', icon: '🎯' },
  { value: 'LM', label: 'Esterno Sinistro', category: 'MF', icon: '⬅️' },
  { value: 'RM', label: 'Esterno Destro', category: 'MF', icon: '➡️' },
  
  // Attaccanti
  { value: 'LW', label: 'Ala Sinistra', category: 'FW', icon: '🏃' },
  { value: 'RW', label: 'Ala Destra', category: 'FW', icon: '🏃' },
  { value: 'CF', label: 'Centravanti', category: 'FW', icon: '🎯' },
  { value: 'ST', label: 'Punta', category: 'FW', icon: '⚽' }
];

export default function PositionPicker({
  value,
  onChange,
  positions = DEFAULT_POSITIONS,
  disabled = false,
  className = '',
  showIcons = true,
  allowEmpty = false
}: PositionPickerProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'GK': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'DF': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'MF': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'FW': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'GK': return 'Portieri';
      case 'DF': return 'Difensori';
      case 'MF': return 'Centrocampisti';
      case 'FW': return 'Attaccanti';
      default: return 'Altro';
    }
  };

  const groupedPositions = positions.reduce((acc, position) => {
    if (!acc[position.category]) {
      acc[position.category] = [];
    }
    acc[position.category].push(position);
    return acc;
  }, {} as Record<string, Position[]>);

  const selectedPosition = positions.find(p => p.value === value);

  return (
    <div className={`relative ${className}`}>
      <select
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={`
          w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
          bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed
          appearance-none cursor-pointer
        `}
      >
        {allowEmpty && (
          <option value="">Seleziona posizione...</option>
        )}
        
        {Object.entries(groupedPositions).map(([category, categoryPositions]) => (
          <optgroup key={category} label={getCategoryLabel(category)}>
            {categoryPositions.map(position => (
              <option key={position.value} value={position.value}>
                {showIcons && position.icon ? `${position.icon} ` : ''}
                {position.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      {/* Custom dropdown arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Selected Position Badge */}
      {selectedPosition && (
        <div className="mt-2">
          <span className={`
            inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
            ${getCategoryColor(selectedPosition.category)}
          `}>
            {showIcons && selectedPosition.icon && (
              <span>{selectedPosition.icon}</span>
            )}
            <span>{selectedPosition.label}</span>
            <span className="opacity-75">({selectedPosition.value})</span>
          </span>
        </div>
      )}

      {/* Position Guide */}
      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        {Object.entries(groupedPositions).map(([category, categoryPositions]) => (
          <div key={category} className="space-y-1">
            <div className={`
              text-center py-1 px-2 rounded font-medium
              ${getCategoryColor(category)}
            `}>
              {getCategoryLabel(category)}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-center">
              {categoryPositions.length} ruoli
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Export utility functions
export const getPositionsByCategory = (category: string) => {
  return DEFAULT_POSITIONS.filter(p => p.category === category);
};

export const getPositionLabel = (value: string) => {
  const position = DEFAULT_POSITIONS.find(p => p.value === value);
  return position?.label || value;
};

export const getPositionIcon = (value: string) => {
  const position = DEFAULT_POSITIONS.find(p => p.value === value);
  return position?.icon || '⚽';
};