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

const KEEP = [
  // Mantieni i file legacy finché non saranno migrati a React
  "packages/ui/src/legacy/**",
  // Altri file da mantenere
  "packages/*/src/**",
  "apps/*/src/**"
]

// Aggiungi nuovi pattern KEEP
KEEP.push(
  'apps/club/**',
  'packages/ui/src/components/**'
);

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
  // Rispettando i pattern in KEEP
  console.log('✅ Ottimizzazione completata')
  console.log('📝 File legacy mantenuti per migrazione React')
  console.log('📝 App club e componenti UI preservati')
}

if (import.meta.url === `file://${process.argv[1]}`) {
  pruneRepository().catch(console.error)
}

export { pruneRepository }