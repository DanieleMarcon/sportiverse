// ⚽ Attribute Utils - Utility per gestione attributi giocatori
// Funzioni per calcoli e manipolazione attributi

import type { PlayerAttributes } from '@common/types/PlayerTypes'
import { PlayerPosition } from '@common/types/PlayerTypes'
import { GameUtils } from './GameUtils'

export class AttributeUtils {
  /**
   * Pesi degli attributi per posizione
   */
  static readonly POSITION_WEIGHTS: Record<PlayerPosition, Record<string, number>> = {
    [PlayerPosition.GK]: {
      diving: 0.25,
      handling: 0.25,
      kicking: 0.15,
      reflexes: 0.25,
      speed: 0.05,
      positioning_gk: 0.05
    },
    [PlayerPosition.CB]: {
      defending: 0.3,
      physical: 0.25,
      positioning: 0.2,
      passing: 0.15,
      pace: 0.1
    },
    [PlayerPosition.LB]: {
      defending: 0.25,
      pace: 0.25,
      passing: 0.2,
      physical: 0.15,
      dribbling: 0.15
    },
    [PlayerPosition.RB]: {
      defending: 0.25,
      pace: 0.25,
      passing: 0.2,
      physical: 0.15,
      dribbling: 0.15
    },
    [PlayerPosition.LWB]: {
      pace: 0.3,
      passing: 0.25,
      defending: 0.2,
      dribbling: 0.15,
      physical: 0.1
    },
    [PlayerPosition.RWB]: {
      pace: 0.3,
      passing: 0.25,
      defending: 0.2,
      dribbling: 0.15,
      physical: 0.1
    },
    [PlayerPosition.CDM]: {
      defending: 0.25,
      passing: 0.25,
      positioning: 0.2,
      physical: 0.15,
      vision: 0.15
    },
    [PlayerPosition.CM]: {
      passing: 0.3,
      vision: 0.2,
      positioning: 0.2,
      physical: 0.15,
      dribbling: 0.15
    },
    [PlayerPosition.CAM]: {
      passing: 0.25,
      vision: 0.25,
      dribbling: 0.2,
      shooting: 0.15,
      positioning: 0.15
    },
    [PlayerPosition.LM]: {
      pace: 0.25,
      passing: 0.2,
      dribbling: 0.25,
      physical: 0.15,
      vision: 0.15
    },
    [PlayerPosition.RM]: {
      pace: 0.25,
      passing: 0.2,
      dribbling: 0.25,
      physical: 0.15,
      vision: 0.15
    },
    [PlayerPosition.LW]: {
      pace: 0.3,
      dribbling: 0.25,
      shooting: 0.2,
      passing: 0.15,
      physical: 0.1
    },
    [PlayerPosition.RW]: {
      pace: 0.3,
      dribbling: 0.25,
      shooting: 0.2,
      passing: 0.15,
      physical: 0.1
    },
    [PlayerPosition.CF]: {
      shooting: 0.3,
      positioning: 0.25,
      dribbling: 0.2,
      physical: 0.15,
      pace: 0.1
    },
    [PlayerPosition.ST]: {
      shooting: 0.35,
      positioning: 0.25,
      physical: 0.2,
      pace: 0.15,
      dribbling: 0.05
    }
  }

  /**
   * Calcola il rating per una posizione specifica
   */
  static calculatePositionRating(
    attributes: PlayerAttributes,
    position: PlayerPosition
  ): number {
    const weights = this.POSITION_WEIGHTS[position]
    if (!weights) return 0

    let totalRating = 0
    let totalWeight = 0

    for (const [attr, weight] of Object.entries(weights)) {
      const value = (attributes as any)[attr]
      if (typeof value === 'number') {
        totalRating += value * weight
        totalWeight += weight
      }
    }

    return totalWeight > 0 ? Math.round(totalRating / totalWeight) : 0
  }

  /**
   * Genera attributi casuali per un giocatore
   */
  static generateRandomAttributes(
    position: PlayerPosition,
    overallLevel: number = 70,
    variance: number = 10
  ): PlayerAttributes {
    const attributes: any = {}
    const weights = this.POSITION_WEIGHTS[position]

    // Attributi base per tutti i giocatori
    const baseAttributes = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical']
    
    for (const attr of baseAttributes) {
      const weight = weights[attr] || 0.1
      const targetValue = overallLevel + (weight - 0.2) * 20 // Boost per attributi importanti
      attributes[attr] = GameUtils.clamp(
        Math.round(targetValue + GameUtils.randomBetween(-variance, variance)),
        30, 99
      )
    }

    // Attributi mentali
    const mentalAttributes = ['workRate', 'aggression', 'positioning', 'vision', 'composure']
    for (const attr of mentalAttributes) {
      attributes[attr] = GameUtils.clamp(
        Math.round(overallLevel + GameUtils.randomBetween(-variance, variance)),
        30, 99
      )
    }

    // Attributi portiere (solo per GK)
    if (position === PlayerPosition.GK) {
      const gkAttributes = ['diving', 'handling', 'kicking', 'reflexes', 'speed', 'positioning_gk']
      for (const attr of gkAttributes) {
        attributes[attr] = GameUtils.clamp(
          Math.round(overallLevel + GameUtils.randomBetween(-variance, variance)),
          30, 99
        )
      }
    }

    return attributes
  }

  /**
   * Calcola il potenziale di crescita di un attributo
   */
  static calculateGrowthPotential(
    currentValue: number,
    age: number,
    potential: number
  ): number {
    // Giovani giocatori crescono più velocemente
    const ageFactor = age < 21 ? 1.5 : age < 25 ? 1.2 : age < 28 ? 1.0 : 0.8
    
    // Più difficile migliorare attributi già alti
    const valueFactor = currentValue < 70 ? 1.2 : currentValue < 80 ? 1.0 : 0.7
    
    // Potenziale limita la crescita massima
    const potentialFactor = Math.max(0, (potential - currentValue) / 20)
    
    return ageFactor * valueFactor * potentialFactor
  }

  /**
   * Applica l'effetto dell'allenamento su un attributo
   */
  static applyTrainingEffect(
    currentValue: number,
    trainingType: string,
    intensity: number,
    age: number,
    potential: number
  ): number {
    const growthPotential = this.calculateGrowthPotential(currentValue, age, potential)
    const trainingEffect = this.getTrainingEffect(trainingType, intensity)
    
    const improvement = growthPotential * trainingEffect * GameUtils.randomBetween(0.5, 1.5)
    
    return GameUtils.clamp(
      Math.round(currentValue + improvement),
      currentValue, // Non può peggiorare
      99 // Massimo valore
    )
  }

  /**
   * Calcola l'effetto dell'allenamento per tipo
   */
  private static getTrainingEffect(trainingType: string, intensity: number): number {
    const baseEffect = intensity / 100 // 0.01 - 0.10
    
    const typeMultipliers: Record<string, number> = {
      'fitness': 0.8,
      'technical': 1.2,
      'tactical': 1.0,
      'mental': 0.9,
      'recovery': 0.3,
      'match_preparation': 0.6
    }
    
    return baseEffect * (typeMultipliers[trainingType] || 1.0)
  }

  /**
   * Calcola il declino naturale degli attributi con l'età
   */
  static calculateAgeDecline(
    attributes: PlayerAttributes,
    age: number
  ): PlayerAttributes {
    if (age < 30) return attributes // Nessun declino prima dei 30

    const declineRate = age < 33 ? 0.002 : age < 36 ? 0.005 : 0.01
    const result = { ...attributes }

    // Attributi fisici declinano più velocemente
    const physicalAttributes = ['pace', 'physical']
    const technicalAttributes = ['shooting', 'passing', 'dribbling', 'defending']
    const mentalAttributes = ['workRate', 'aggression', 'positioning', 'vision', 'composure']

    for (const attr of physicalAttributes) {
      const value = (result as any)[attr]
      if (typeof value === 'number') {
        (result as any)[attr] = GameUtils.clamp(
          Math.round(value * (1 - declineRate * 2)),
          30, value
        )
      }
    }

    for (const attr of technicalAttributes) {
      const value = (result as any)[attr]
      if (typeof value === 'number') {
        (result as any)[attr] = GameUtils.clamp(
          Math.round(value * (1 - declineRate)),
          30, value
        )
      }
    }

    // Attributi mentali migliorano leggermente con l'esperienza
    for (const attr of mentalAttributes) {
      const value = (result as any)[attr]
      if (typeof value === 'number') {
        (result as any)[attr] = GameUtils.clamp(
          Math.round(value * (1 + declineRate * 0.5)),
          value, 99
        )
      }
    }

    return result
  }

  /**
   * Confronta due set di attributi
   */
  static compareAttributes(
    attributes1: PlayerAttributes,
    attributes2: PlayerAttributes
  ): Record<string, number> {
    const comparison: Record<string, number> = {}
    
    for (const key in attributes1) {
      const value1 = (attributes1 as any)[key]
      const value2 = (attributes2 as any)[key]
      
      if (typeof value1 === 'number' && typeof value2 === 'number') {
        comparison[key] = value2 - value1
      }
    }
    
    return comparison
  }
}

// Export utility functions
export const {
  calculatePositionRating,
  generateRandomAttributes,
  calculateGrowthPotential,
  applyTrainingEffect,
  calculateAgeDecline,
  compareAttributes
} = AttributeUtils