import React from 'react';

interface ButtonPrimaryProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  icon?: React.ReactNode;
  className?: string;
}

export default function ButtonPrimary({
  children,
  onClick,
  disabled = false,
  loading = false,
  size = 'md',
  variant = 'primary',
  icon,
  className = ''
}: ButtonPrimaryProps) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 font-medium rounded-lg
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const variantClasses = {
    primary: `
      bg-blue-600 hover:bg-blue-700 text-white 
      focus:ring-blue-500 shadow-sm hover:shadow-md
    `,
    secondary: `
      bg-gray-600 hover:bg-gray-700 text-white 
      focus:ring-gray-500 shadow-sm hover:shadow-md
    `,
    success: `
      bg-green-600 hover:bg-green-700 text-white 
      focus:ring-green-500 shadow-sm hover:shadow-md
    `,
    warning: `
      bg-yellow-600 hover:bg-yellow-700 text-white 
      focus:ring-yellow-500 shadow-sm hover:shadow-md
    `,
    danger: `
      bg-red-600 hover:bg-red-700 text-white 
      focus:ring-red-500 shadow-sm hover:shadow-md
    `
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
      )}
      {icon && !loading && icon}
      {children}
    </button>
  );
}