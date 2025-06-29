import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// TODO: LEGACY IMPORT - Remove when migrating to React components
import initLegacy from "@ui/legacy/componentLoader";
initLegacy(document);
// TODO migrate legacy components to React & remove componentLoader

// Inizializza l'applicazione React
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Legacy router compatibility per main.js esistente
console.log('⚽ Allenatore Nato - React App inizializzata')
console.log('🚧 Legacy componentLoader attivo per compatibilità')