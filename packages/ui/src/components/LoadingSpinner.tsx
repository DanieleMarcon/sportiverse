import React from 'react';

export default function LoadingSpinner() {
  return <div className="component flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    <span className="ml-2 text-gray-600 dark:text-gray-400">LoadingSpinner TODO</span>
  </div>;
}

// TODO: convertire a Tailwind + token
// Props: size ('sm' | 'md' | 'lg'), text (string), overlay (boolean)
// Features: spinner animato, testi personalizzabili, overlay fullscreen