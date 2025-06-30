import React from 'react';

interface Athlete {
  id: string;
  first_name: string;
  last_name: string;
  position: string;
  age?: number;
  rating?: number;
  status?: 'active' | 'injured' | 'suspended';
  photo_url?: string;
}

interface AthleteCardProps {
  athlete: Athlete;
  onClick?: (athlete: Athlete) => void;
  className?: string;
  showDetails?: boolean;
}

export default function AthleteCard({ 
  athlete, 
  onClick, 
  className = '', 
  showDetails = true 
}: AthleteCardProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'injured': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'suspended': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'active': return 'Disponibile';
      case 'injured': return 'Infortunato';
      case 'suspended': return 'Sospeso';
      default: return 'N/A';
    }
  };

  const getRatingColor = (rating?: number) => {
    if (!rating) return 'text-gray-500';
    if (rating >= 80) return 'text-green-600 dark:text-green-400';
    if (rating >= 70) return 'text-yellow-600 dark:text-yellow-400';
    if (rating >= 60) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div
      onClick={() => onClick?.(athlete)}
      className={`
        bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700
        shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer
        hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-1
        ${className}
      `}
    >
      <div className="p-4">
        {/* Header with Photo and Basic Info */}
        <div className="flex items-center gap-3 mb-3">
          {/* Photo or Avatar */}
          <div className="flex-shrink-0">
            {athlete.photo_url ? (
              <img
                src={athlete.photo_url}
                alt={`${athlete.first_name} ${athlete.last_name}`}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                  {athlete.first_name.charAt(0)}{athlete.last_name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Name and Position */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
              {athlete.first_name} {athlete.last_name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {athlete.position}
              {athlete.age && ` • ${athlete.age} anni`}
            </p>
          </div>

          {/* Rating Badge */}
          {athlete.rating && (
            <div className={`text-lg font-bold ${getRatingColor(athlete.rating)}`}>
              {athlete.rating}
            </div>
          )}
        </div>

        {/* Details Section */}
        {showDetails && (
          <div className="space-y-2">
            {/* Status Badge */}
            {athlete.status && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Stato:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(athlete.status)}`}>
                  {getStatusLabel(athlete.status)}
                </span>
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('View details:', athlete.id);
                }}
                className="flex-1 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 
                         hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
              >
                Dettagli
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Edit athlete:', athlete.id);
                }}
                className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 
                         hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
              >
                Modifica
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hover Effect Indicator */}
      <div className="h-1 bg-gradient-to-r from-blue-500 to-green-500 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-b-lg" />
    </div>
  );
}