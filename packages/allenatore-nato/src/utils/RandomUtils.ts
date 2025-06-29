// ⚽ Random Utils - Utility per generazione casuale realistica
// Funzioni per eventi casuali e generazione procedurale

export class RandomUtils {
  private static seed: number = Date.now()

  /**
   * Imposta il seed per la generazione casuale
   */
  static setSeed(newSeed: number): void {
    this.seed = newSeed
  }

  /**
   * Generatore casuale con seed (Linear Congruential Generator)
   */
  static seededRandom(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280
    return this.seed / 233280
  }

  /**
   * Distribuzione normale (Box-Muller transform)
   */
  static normalDistribution(mean: number = 0, stdDev: number = 1): number {
    let u = 0, v = 0
    while (u === 0) u = Math.random() // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random()
    
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    return z * stdDev + mean
  }

  /**
   * Scelta pesata da un array di opzioni
   */
  static weightedChoice<T>(
    options: T[],
    weights: number[]
  ): T {
    if (options.length !== weights.length) {
      throw new Error('Options and weights arrays must have the same length')
    }

    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
    let random = Math.random() * totalWeight
    
    for (let i = 0; i < options.length; i++) {
      random -= weights[i]
      if (random <= 0) {
        return options[i]
      }
    }
    
    return options[options.length - 1]
  }

  /**
   * Genera un evento casuale basato su probabilità
   */
  static generateRandomEvent(
    events: Array<{ name: string; probability: number; data?: any }>
  ): { name: string; data?: any } | null {
    const random = Math.random()
    let cumulativeProbability = 0
    
    for (const event of events) {
      cumulativeProbability += event.probability
      if (random <= cumulativeProbability) {
        return { name: event.name, data: event.data }
      }
    }
    
    return null
  }

  /**
   * Distribuzione di Poisson (per eventi rari come gol)
   */
  static poissonDistribution(lambda: number): number {
    const L = Math.exp(-lambda)
    let k = 0
    let p = 1
    
    do {
      k++
      p *= Math.random()
    } while (p > L)
    
    return k - 1
  }

  /**
   * Genera una curva di performance realistica
   */
  static generatePerformanceCurve(
    baseValue: number,
    variance: number = 10,
    trend: number = 0
  ): number {
    // Combina trend lineare con rumore casuale
    const noise = this.normalDistribution(0, variance)
    const trendEffect = trend * Math.random()
    
    return Math.max(0, Math.min(100, baseValue + trendEffect + noise))
  }

  /**
   * Simula una serie di eventi binari (vittorie/sconfitte)
   */
  static generateFormSequence(
    probability: number,
    length: number
  ): boolean[] {
    const sequence: boolean[] = []
    
    for (let i = 0; i < length; i++) {
      // Aggiunge momentum: successi recenti aumentano la probabilità
      const momentum = sequence.slice(-3).filter(Boolean).length * 0.05
      const adjustedProbability = Math.min(0.9, probability + momentum)
      
      sequence.push(Math.random() < adjustedProbability)
    }
    
    return sequence
  }

  /**
   * Genera fluttuazioni realistiche del morale
   */
  static generateMoraleFluctuation(
    currentMorale: number,
    recentEvents: Array<{ type: 'positive' | 'negative'; impact: number }>
  ): number {
    let change = 0
    
    // Calcola l'impatto degli eventi recenti
    for (const event of recentEvents) {
      const impact = event.type === 'positive' ? event.impact : -event.impact
      change += impact * (Math.random() * 0.5 + 0.75) // 75-125% dell'impatto
    }
    
    // Tendenza naturale verso la media (regression to mean)
    const regressionToMean = (50 - currentMorale) * 0.02
    change += regressionToMean
    
    // Aggiunge rumore casuale
    change += this.normalDistribution(0, 2)
    
    return Math.max(0, Math.min(100, currentMorale + change))
  }

  /**
   * Genera eventi casuali di mercato
   */
  static generateMarketEvents(): Array<{ type: string; description: string; impact: number }> {
    const possibleEvents = [
      { type: 'injury_crisis', description: 'Crisi infortuni in una squadra rivale', impact: 0.1 },
      { type: 'financial_boost', description: 'Nuovo sponsor per il campionato', impact: 0.05 },
      { type: 'transfer_ban', description: 'Blocco mercato per una squadra', impact: 0.15 },
      { type: 'youth_prospect', description: 'Giovane talento emergente', impact: 0.08 },
      { type: 'contract_dispute', description: 'Disputa contrattuale', impact: 0.12 }
    ]
    
    const events: Array<{ type: string; description: string; impact: number }> = []
    
    for (const event of possibleEvents) {
      if (Math.random() < event.impact) {
        events.push(event)
      }
    }
    
    return events
  }

  /**
   * Genera condizioni meteorologiche realistiche
   */
  static generateWeatherConditions(season: string, location: string = 'italy'): {
    condition: string
    temperature: number
    humidity: number
    windSpeed: number
  } {
    const seasonalBias = {
      spring: { temp: 18, rain: 0.3 },
      summer: { temp: 28, rain: 0.1 },
      autumn: { temp: 15, rain: 0.4 },
      winter: { temp: 8, rain: 0.5 }
    }
    
    const bias = seasonalBias[season as keyof typeof seasonalBias] || seasonalBias.spring
    
    const conditions = ['sunny', 'cloudy', 'rainy', 'windy']
    const weights = [
      0.4 - bias.rain,
      0.3,
      bias.rain,
      0.2
    ]
    
    return {
      condition: this.weightedChoice(conditions, weights),
      temperature: Math.round(this.normalDistribution(bias.temp, 5)),
      humidity: Math.round(this.normalDistribution(60, 15)),
      windSpeed: Math.round(Math.random() * 20)
    }
  }

  /**
   * Genera un nome squadra casuale
   */
  static generateTeamName(): string {
    const prefixes = ['FC', 'AC', 'US', 'AS', 'SS']
    const cities = [
      'Milano', 'Roma', 'Napoli', 'Torino', 'Firenze', 'Bologna', 'Genova',
      'Palermo', 'Bari', 'Catania', 'Verona', 'Parma', 'Brescia', 'Modena'
    ]
    const suffixes = ['Calcio', 'Football Club', 'Sporting Club', '']
    
    const prefix = Math.random() < 0.7 ? this.weightedChoice(prefixes, [0.3, 0.25, 0.2, 0.15, 0.1]) : ''
    const city = this.weightedChoice(cities, cities.map(() => 1))
    const suffix = Math.random() < 0.3 ? this.weightedChoice(suffixes, [0.4, 0.3, 0.2, 0.1]) : ''
    
    return [prefix, city, suffix].filter(Boolean).join(' ')
  }
}

// Export utility functions
export const {
  setSeed,
  seededRandom,
  normalDistribution,
  weightedChoice,
  generateRandomEvent,
  poissonDistribution,
  generatePerformanceCurve,
  generateFormSequence,
  generateMoraleFluctuation,
  generateMarketEvents,
  generateWeatherConditions,
  generateTeamName
} = RandomUtils