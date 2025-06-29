#!/usr/bin/env node

/**
 * Script per ottimizzare il repository per Bolt.new
 * Rimuove file voluminosi e sostituisce asset con placeholder
 */

import { promises as fs } from 'fs'
import path from 'path'

const DIRECTORIES_TO_REMOVE = [
  'replays',
  'docs/static',
  'tests/fixtures/large',
  '.git/objects/pack'
]

const FILE_SIZE_LIMIT = 1024 * 1024 // 1MB

async function pruneRepository() {
  console.log('🔧 Ottimizzazione repository per Bolt.new...')
  
  // Rimuovi directory voluminose
  for (const dir of DIRECTORIES_TO_REMOVE) {
    try {
      await fs.rm(dir, { recursive: true, force: true })
      console.log(`✅ Rimossa directory: ${dir}`)
    } catch (error) {
      console.log(`⚠️  Directory non trovata: ${dir}`)
    }
  }
  
  // TODO: Implementare sostituzione asset voluminosi con placeholder
  console.log('✅ Ottimizzazione completata')
}

if (import.meta.url === `file://${process.argv[1]}`) {
  pruneRepository().catch(console.error)
}

export { pruneRepository }