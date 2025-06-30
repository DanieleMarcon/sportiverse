// Common package exports
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

// Re-export models and types
export * from './models';
export * from './types/GameTypes';
export * from './types/PlayerTypes';