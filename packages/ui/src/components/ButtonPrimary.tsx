import React from 'react';

export default function ButtonPrimary() {
  return <button className="component px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
    ButtonPrimary TODO
  </button>;
}

// TODO: convertire a Tailwind + token
// Props: children (ReactNode), onClick (function), disabled (boolean), loading (boolean)
// Features: stati hover/focus, loading spinner, varianti colore, icone