// ⚽ Statistics Service - Servizio per calcoli statistici avanzati
// Gestisce tutte le statistiche e metriche del gioco

import type { Player, Team, Match } from '@common/types/GameTypes'
import type { PlayerStatistics, TeamStatistics } from '@common/types/PlayerTypes'

export class StatisticsService {
  /**
   * Calcola le statistiche di un giocatore per un periodo
   */
  static calculatePlayerStats(
    player: Player,
    matches: Match[],
    period: TimePeriod = 'season'
  ): PlayerStatistics {
    // TODO: Implementare calcolo statistiche giocatore
    // 1. Filter matches by period
    // 2. Aggregate statistics
    // 3. Calculate averages and ratios
    // 4. Generate performance metrics

    console.log(`📊 Calcolando statistiche per ${player.name}`)
    
    return {
      appearances: player.appearances || 0,
      starts: 0,
      minutesPlayed: player.minutesPlayed || 0,
      goals: player.goals || 0,
      assists: player.assists || 0,
      shotsTotal: 0,
      shotsOnTarget: 0,
      passesTotal: 0,
      passesCompleted: 0,
      passAccuracy: 0,
      tackles: 0,
      interceptions: 0,
      clearances: 0,
      yellowCards: player.yellowCards || 0,
      redCards: player.redCards || 0,
      foulsCommitted: 0,
      foulsReceived: 0
    }
  }

  /**
   * Calcola le statistiche di una squadra
   */
  static calculateTeamStats(
    team: Team,
    matches: Match[],
    period: TimePeriod = 'season'
  ): TeamStatistics {
    // TODO: Implementare calcolo statistiche squadra
    // 1. Aggregate team performance
    // 2. Calculate league position
    // 3. Generate form guide
    // 4. Calculate efficiency metrics

    console.log(`📊 Calcolando statistiche per ${team.name}`)
    
    return {
      position: 1,
      points: team.points || 0,
      played: team.wins + team.draws + team.losses || 0,
      wins: team.wins || 0,
      draws: team.draws || 0,
      losses: team.losses || 0,
      goalsFor: team.goalsFor || 0,
      goalsAgainst: team.goalsAgainst || 0,
      goalDifference: (team.goalsFor || 0) - (team.goalsAgainst || 0),
      form: [],
      averageRating: 0,
      cleanSheets: 0
    }
  }

  /**
   * Genera la classifica del campionato
   */
  static generateLeagueTable(teams: Team[]): LeagueStanding[] {
    // TODO: Implementare generazione classifica
    // 1. Sort teams by points, goal difference, goals scored
    // 2. Calculate positions
    // 3. Determine qualification zones
    // 4. Generate form guide

    console.log('📊 Generando classifica campionato')
    
    return teams
      .sort((a, b) => {
        // Sort by points, then goal difference, then goals scored
        if (a.points !== b.points) return b.points - a.points
        const aGD = (a.goalsFor || 0) - (a.goalsAgainst || 0)
        const bGD = (b.goalsFor || 0) - (b.goalsAgainst || 0)
        if (aGD !== bGD) return bGD - aGD
        return (b.goalsFor || 0) - (a.goalsFor || 0)
      })
      .map((team, index) => ({
        position: index + 1,
        team: team.name,
        played: team.wins + team.draws + team.losses,
        wins: team.wins || 0,
        draws: team.draws || 0,
        losses: team.losses || 0,
        goalsFor: team.goalsFor || 0,
        goalsAgainst: team.goalsAgainst || 0,
        goalDifference: (team.goalsFor || 0) - (team.goalsAgainst || 0),
        points: team.points || 0,
        form: []
      }))
  }

  /**
   * Calcola i top scorer del campionato
   */
  static getTopScorers(players: Player[], limit: number = 10): PlayerRanking[] {
    // TODO: Implementare classifica marcatori
    return players
      .filter(p => (p.goals || 0) > 0)
      .sort((a, b) => (b.goals || 0) - (a.goals || 0))
      .slice(0, limit)
      .map((player, index) => ({
        position: index + 1,
        playerId: player.id,
        playerName: player.name,
        teamName: '', // TODO: Get team name
        value: player.goals || 0,
        statType: 'goals'
      }))
  }

  /**
   * Calcola metriche avanzate per un giocatore
   */
  static calculateAdvancedMetrics(
    player: Player,
    matches: Match[]
  ): AdvancedPlayerMetrics {
    // TODO: Implementare metriche avanzate
    // - Expected goals (xG)
    // - Pass completion in final third
    // - Defensive actions per game
    // - Heat map data

    return {
      expectedGoals: 0,
      expectedAssists: 0,
      passCompletionFinalThird: 0,
      defensiveActionsPerGame: 0,
      averagePosition: { x: 50, y: 50 },
      distanceCovered: 0,
      sprintCount: 0
    }
  }
}

// === TYPES ===

export type TimePeriod = 'match' | 'week' | 'month' | 'season' | 'career'

export interface LeagueStanding {
  position: number
  team: string
  played: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
  form: string[]
}

export interface PlayerRanking {
  position: number
  playerId: string
  playerName: string
  teamName: string
  value: number
  statType: string
}

export interface AdvancedPlayerMetrics {
  expectedGoals: number
  expectedAssists: number
  passCompletionFinalThird: number
  defensiveActionsPerGame: number
  averagePosition: { x: number; y: number }
  distanceCovered: number
  sprintCount: number
}