import React from 'react';

interface FeeStatusBadgeProps {
  status?: 'paid' | 'pending' | 'overdue' | 'partial';
  amount?: number;
  dueDate?: string;
  className?: string;
  showTooltip?: boolean;
}

export default function FeeStatusBadge({ 
  status = 'pending', 
  amount, 
  dueDate, 
  className = '',
  showTooltip = true 
}: FeeStatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'paid':
        return {
          color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
          icon: '✅',
          label: 'Pagato'
        };
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
          icon: '⏳',
          label: 'In attesa'
        };
      case 'overdue':
        return {
          color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
          icon: '⚠️',
          label: 'Scaduto'
        };
      case 'partial':
        return {
          color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
          icon: '📊',
          label: 'Parziale'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
          icon: '❓',
          label: 'Sconosciuto'
        };
    }
  };

  const config = getStatusConfig(status);
  const isOverdue = status === 'overdue';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <div 
        className={`
          inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
          transition-all duration-200 hover:scale-105
          ${config.color}
          ${isOverdue ? 'animate-pulse' : ''}
        `}
        title={showTooltip ? `Stato: ${config.label}${amount ? ` • ${formatCurrency(amount)}` : ''}${dueDate ? ` • Scadenza: ${formatDate(dueDate)}` : ''}` : undefined}
      >
        <span className="text-sm">{config.icon}</span>
        <span>{config.label}</span>
        {amount && (
          <span className="font-semibold">
            {formatCurrency(amount)}
          </span>
        )}
      </div>

      {/* Tooltip on Hover */}
      {showTooltip && (amount || dueDate) && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 
                       bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg
                       opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none
                       whitespace-nowrap z-10">
          <div className="space-y-1">
            {amount && (
              <div>Importo: <span className="font-semibold">{formatCurrency(amount)}</span></div>
            )}
            {dueDate && (
              <div>Scadenza: <span className="font-semibold">{formatDate(dueDate)}</span></div>
            )}
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 
                         border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
        </div>
      )}

      {/* Urgent Indicator for Overdue */}
      {isOverdue && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
      )}
    </div>
  );
}