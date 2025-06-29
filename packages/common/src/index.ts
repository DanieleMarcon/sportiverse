// TODO: Implementare utilities condivise
// - Tipi TypeScript
// - Hooks React
// - Costanti
// - Utilities

export const COMMON_VERSION = '1.0.0'

export interface User {
  id: string
  email: string
  role: 'admin' | 'club' | 'gamer'
}

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  LICENSING: '/api/licensing',
  GAME: '/api/game'
} as const