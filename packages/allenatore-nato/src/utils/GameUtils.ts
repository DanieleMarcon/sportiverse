// ⚽ Game Utils - Utility functions per il gioco
// Funzioni di supporto per calcoli e operazioni comuni

export class GameUtils {
  /**
   * Genera un numero casuale tra min e max
   */
  static randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  /**
   * Calcola la probabilità di successo basata su un valore
   */
  static calculateSuccessProbability(value: number, difficulty: number = 50): number {
    // Sigmoid function for realistic probability curve
    const x = (value - difficulty) / 20
    return 1 / (1 + Math.exp(-x))
  }

  /**
   * Genera un nome giocatore casuale
   */
  static generatePlayerName(nationality: string = 'IT'): { firstName: string; lastName: string } {
    const italianFirstNames = [
      'Marco', 'Luca', 'Andrea', 'Francesco', 'Alessandro', 'Matteo', 'Lorenzo', 'Davide',
      'Simone', 'Federico', 'Riccardo', 'Stefano', 'Gabriele', 'Antonio', 'Giuseppe'
    ]
    
    const italianLastNames = [
      'Rossi', 'Bianchi', 'Ferrari', 'Russo', 'Romano', 'Gallo', 'Costa', 'Fontana',
      'Ricci', 'Marino', 'Greco', 'Bruno', 'Galli', 'Conti', 'De Luca'
    ]

    // TODO: Add more nationalities
    const firstNames = nationality === 'IT' ? italianFirstNames : italianFirstNames
    const lastNames = nationality === 'IT' ? italianLastNames : italianLastNames

    return {
      firstName: firstNames[this.randomBetween(0, firstNames.length - 1)],
      lastName: lastNames[this.randomBetween(0, lastNames.length - 1)]
    }
  }

  /**
   * Calcola l'età di un giocatore dalla data di nascita
   */
  static calculateAge(birthDate: Date): number {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  /**
   * Formatta un valore monetario
   */
  static formatCurrency(amount: number, currency: string = 'EUR'): string {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  /**
   * Calcola la distanza tra due posizioni sul campo
   */
  static calculateDistance(
    pos1: { x: number; y: number },
    pos2: { x: number; y: number }
  ): number {
    const dx = pos1.x - pos2.x
    const dy = pos1.y - pos2.y
    return Math.sqrt(dx * dx + dy * dy)
  }

  /**
   * Converte minuti in formato MM:SS
   */
  static formatTime(minutes: number): string {
    const mins = Math.floor(minutes)
    const secs = Math.floor((minutes - mins) * 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  /**
   * Genera un ID univoco
   */
  static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  /**
   * Clamp un valore tra min e max
   */
  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
  }

  /**
   * Interpola linearmente tra due valori
   */
  static lerp(start: number, end: number, factor: number): number {
    return start + (end - start) * factor
  }

  /**
   * Calcola la media di un array di numeri
   */
  static average(numbers: number[]): number {
    if (numbers.length === 0) return 0
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length
  }

  /**
   * Shuffle un array (Fisher-Yates)
   */
  static shuffle<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  /**
   * Converte una posizione percentuale in coordinate pixel
   */
  static percentToPixel(
    percent: { x: number; y: number },
    fieldSize: { width: number; height: number }
  ): { x: number; y: number } {
    return {
      x: (percent.x / 100) * fieldSize.width,
      y: (percent.y / 100) * fieldSize.height
    }
  }

  /**
   * Determina se un evento casuale dovrebbe accadere
   */
  static shouldEventOccur(probability: number): boolean {
    return Math.random() < probability
  }

  /**
   * Calcola il rating complessivo di un giocatore
   */
  static calculateOverallRating(attributes: Record<string, number>): number {
    const values = Object.values(attributes).filter(v => typeof v === 'number')
    return Math.round(this.average(values))
  }

  /**
   * Genera una data casuale in un range
   */
  static randomDate(start: Date, end: Date): Date {
    const startTime = start.getTime()
    const endTime = end.getTime()
    const randomTime = startTime + Math.random() * (endTime - startTime)
    return new Date(randomTime)
  }
}

// Export utility functions as standalone functions for convenience
export const {
  randomBetween,
  calculateSuccessProbability,
  generatePlayerName,
  calculateAge,
  formatCurrency,
  calculateDistance,
  formatTime,
  generateId,
  clamp,
  lerp,
  average,
  shuffle,
  percentToPixel,
  shouldEventOccur,
  calculateOverallRating,
  randomDate
} = GameUtils