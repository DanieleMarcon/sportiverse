# ⚽ Allenatore Nato – Demo

[![npm version](https://img.shields.io/npm/v/@sportiverse/allenatore-nato?style=flat-square)](https://www.npmjs.com/package/@sportiverse/allenatore-nato)
[![Documentation](https://img.shields.io/badge/docs-HTML-blue?style=flat-square)](https://sportiverse.github.io/allenatore-nato/)
[![License](https://img.shields.io/badge/license-PROPRIETARY-red?style=flat-square)](./LICENSE)

Web app manageriale calcistica realizzata interamente con **Bolt.new**, pensata per offrire un'esperienza moderna, scalabile e totalmente no-code.

---

## 🚀 Obiettivo

Ricreare in Bolt.new le logiche fondamentali di un gioco manageriale old school, mantenendo la profondità simulativa e adottando una UI moderna e giovane adatta al web del 2025.

---

## 📐 Architettura

Costruita interamente con tecnologie native Bolt:

- 🔧 **Bolt Flows** per logiche di gioco (simulazioni, avanzamenti, azioni)
- 📄 **Bolt Pages** per ogni sezione gestionale (rosa, match, mercato…)
- 📊 **Bolt Datasets** per modellazione dati persistenti (team, player, match…)
- 🧩 **Bolt Components** per UI riutilizzabile
- 💾 **Bolt Storage** per salvataggi utente (sessione e permanenti)

### 📁 Struttura progetto

bolt_src/
├── flows/ → Logica di gioco (match engine, training…)
├── pages/ → Interfacce per ogni sezione del gioco
├── datasets/ → Modelli dati persistenti (team, player…)
├── components/ → Componenti UI (PlayerCard, MatchStats…)
├── storage/ → Variabili e salvataggi Bolt

dist/
├── index.html → Interfaccia principale
├── main.js → Logica routing e eventi utente
├── style.css → Design System globale
├── assets/ → Icone, loghi, immagini statiche

deploy/
├── README_DEPLOY.md → Istruzioni deploy (es. SiteGround)
├── deploy.sh → Script di build e pacchettizzazione automatica

---

## 🧱 Moduli principali

- **Gestione Squadra**: rosa, ruoli, filtri, stato e morale
- **Allenamento**: routine settimanali, crescita, stanchezza
- **Tattiche**: moduli, mentalità, marcature, ruoli
- **Partite**: engine testuale, eventi, sostituzioni, report
- **Mercato**: offerte, contratti, clausole, scouting
- **Scouting**: mascheramento, precisione, shortlist, report
- **Direzione**: finanze, sponsor, obiettivi board
- **Notizie**: comunicati dinamici, eventi, notifiche
- **Storico**: andamento attributi, prestazioni, timeline
- **Sistema**: salvataggi, impostazioni utente

---

## 🎨 UX/UI

- Design system personalizzato e documentato
- CSS nativo (`dist/style.css`) con componenti globali
- Responsive 100% (mobile, tablet, desktop, Smart TV)
- Accessibilità completa (focus, tastiera, ARIA, contrasto)
- 50+ componenti UI riutilizzabili
- Documentazione in `bolt_src/ui/ui_overview.md`

---

## 🔄 Flusso di lavoro

1. Sviluppo in Bolt.new (Flows, Datasets, Pages, Components)
2. Esportazione in `/dist` (HTML + JS + CSS)
3. Deploy manuale (es. FTP su SiteGround) o CI/CD GitHub
4. Aggiornamento documentazione in `*.md`
5. Versionamento via Git

---

## ☁️ Hosting consigliato

- 🔹 **SiteGround**: upload diretto in `public_html/`
- 🔹 **GitHub Pages**: hosting gratuito per versioni statiche
- 🔹 **Netlify**: deploy CI/CD con anteprime automatiche

✅ Il contenuto della cartella `dist/` è completo e autonomo.

---

## 📚 API Pubblica

### Core Game Functions

```typescript
// Gestione Partite
startMatch(homeTeam: Team, awayTeam: Team, tactics: Tactics): Promise<MatchResult>
simulateMatch(matchId: string, speed: MatchSpeed): Promise<MatchEvent[]>
pauseMatch(matchId: string): Promise<void>
getMatchStats(matchId: string): Promise<MatchStatistics>

// Avanzamento Gioco
advanceDay(days?: number): Promise<DayAdvanceResult>
advanceWeek(): Promise<WeekAdvanceResult>
getCurrentGameState(): Promise<GameState>

// Gestione Squadra
getTeamPlayers(teamId: string, filters?: PlayerFilters): Promise<Player[]>
updatePlayerPosition(playerId: string, position: PlayerPosition): Promise<void>
setTeamTactics(teamId: string, tactics: Tactics): Promise<void>
getTeamMorale(teamId: string): Promise<MoraleStatus>

// Allenamenti
createTrainingSession(config: TrainingConfig): Promise<Training>
processTraining(trainingId: string): Promise<TrainingResult>
getPlayerDevelopment(playerId: string): Promise<PlayerDevelopment>

// Trasferimenti
makeTransferOffer(playerId: string, offer: TransferOffer): Promise<NegotiationResult>
acceptTransfer(transferId: string): Promise<boolean>
rejectTransfer(transferId: string, reason?: string): Promise<void>
getMarketValue(playerId: string): Promise<number>

// Scouting
startScouting(playerIds: string[], scoutId: string): Promise<ScoutingAssignment[]>
getScoutingReport(playerId: string): Promise<ScoutingReport>
addToShortlist(playerId: string, priority: Priority): Promise<void>
revealPlayerAttributes(playerId: string, level: RevealLevel): Promise<PlayerAttributes>

// Salvataggi
saveGame(sessionName?: string): Promise<SaveResult>
loadGame(sessionId: string): Promise<LoadResult>
listSavedGames(): Promise<SavedSession[]>
deleteGame(sessionId: string): Promise<void>

// Statistiche
getPlayerStats(playerId: string, period?: TimePeriod): Promise<PlayerStatistics>
getTeamStats(teamId: string, period?: TimePeriod): Promise<TeamStatistics>
getLeagueTable(): Promise<LeagueStanding[]>
getTopScorers(limit?: number): Promise<PlayerRanking[]>
```

### Utility Functions

```typescript
// Calcoli
calculatePlayerRating(player: Player, position: string): number
calculateTeamChemistry(players: Player[], tactics: Tactics): number
calculateInjuryRisk(player: Player, intensity: number): number
calculateTransferValue(player: Player, market: MarketConditions): number

// Validazioni
validateFormation(formation: Formation, players: Player[]): ValidationResult
validateTransferBudget(team: Team, amount: number): boolean
validateContractTerms(contract: Contract): ValidationResult

// Generatori
generateRandomEvent(context: GameContext): GameEvent
generateAIDecision(team: Team, situation: GameSituation): AIDecision
generateMatchCommentary(event: MatchEvent): string
generatePlayerName(nationality: string): PlayerName
```

---

## 🗓️ Roadmap di Sviluppo

| Sprint | Durata | Obiettivi | Deliverable | Status |
|--------|--------|-----------|-------------|---------|
| **Sprint 1** | 2 settimane | **Setup & Core** | Base funzionante | ✅ **Completato** |
| | | • Setup monorepo e Bolt workspace | | |
| | | • Creazione dataset principali (teams, players, matches) | | |
| | | • Flow base (StartNewGame, AdvanceDay) | | |
| | | • Dashboard e navigazione | | |
| | | • Sistema salvataggio/caricamento | | |
| **Sprint 2** | 3 settimane | **Match Engine** | Simulazione partite | 🚧 **In Corso** |
| | | • Motore simulazione partite completo | | |
| | | • Sistema tattiche e formazioni | | |
| | | • Eventi live e statistiche | | |
| | | • Report post-partita | | |
| | | • Integrazione morale e fitness | | |
| **Sprint 3** | 3 settimane | **Gestione Squadra** | Management completo | 📋 **Pianificato** |
| | | • Sistema allenamenti avanzato | | |
| | | • Sviluppo attributi giocatori | | |
| | | • Gestione infortuni e recuperi | | |
| | | • Staff tecnico e competenze | | |
| | | • Calendario eventi automatici | | |
| **Sprint 4** | 4 settimane | **Mercato & Scouting** | Sistema trasferimenti | 📋 **Pianificato** |
| | | • Mercato trasferimenti completo | | |
| | | • Sistema scouting con mascheramento | | |
| | | • Negoziazioni automatiche IA | | |
| | | • Contratti e clausole | | |
| | | • Shortlist e report scout | | |
| **Sprint 5** | 2 settimane | **Polish & Deploy** | Versione finale | 📋 **Pianificato** |
| | | • Ottimizzazioni performance | | |
| | | • UI/UX refinement | | |
| | | • Testing completo | | |
| | | • Documentazione finale | | |
| | | • Deploy produzione | | |

### 🎯 Milestone Chiave

- **M1** (Fine Sprint 1): ✅ **Demo giocabile base**
- **M2** (Fine Sprint 2): 🚧 **Partite simulate complete**
- **M3** (Fine Sprint 3): 📋 **Gestione squadra avanzata**
- **M4** (Fine Sprint 4): 📋 **Mercato e scouting funzionali**
- **M5** (Fine Sprint 5): 📋 **Versione 1.0 production-ready**

### 📊 Metriche di Successo

| Metrica | Target Sprint 5 | Attuale |
|---------|-----------------|---------|
| **Funzionalità Core** | 100% | 25% |
| **Coverage Test** | ≥ 90% | 15% |
| **Performance** | < 2s load time | ~3s |
| **Mobile Responsive** | 100% | 80% |
| **Accessibilità** | WCAG AA | Parziale |

---

## 📄 Documentazione tecnica

La documentazione completa è suddivisa in sezioni:

- `modules_overview.md` → panoramica moduli principali
- `datasets_overview.md` → struttura e relazioni dataset
- `flows_overview.md` → logica di gioco e flussi interni
- `ui_overview.md` → layout, componenti e accessibilità
- `roadmap.md` → milestone e obiettivi futuri

---

## 🔧 Requisiti per collaborare

- ✅ Account su [Bolt.new](https://bolt.new)
- ✅ Familiarità con Bolt Flows, Datasets e Pages
- ✅ Conoscenza Git + GitHub per versionamento
- ✅ Editor consigliato: **VS Code**

---

## ✅ Obiettivo finale

Una **demo funzionante e completa** di un manageriale calcistico moderno, progettata per essere:

- Esportabile e deployabile ovunque
- Modulare e documentata
- Pronta per diventare un progetto **commerciale**, **educativo** o **open-source**

---

## ➡️ Avvio rapido in locale

Per testare la demo senza bundler è sufficiente avviare un piccolo server HTTP
dalla **root** del repository (ad esempio con l'estensione *Live Server* di VS
Code oppure con `npx serve`).  L'importante è che la cartella corrente sia la
radice del progetto, così i percorsi a `bolt_src/` risultano validi:

```bash
npx serve -s .
```

In questo modo non si incorrerà in errori 404 nel caricamento di
`bolt_src/styles/components.css` e il loader dei componenti funzionerà anche
aprendo `index.html` direttamente.

---

*Aggiornato a: Giugno 2025*
*Versione: 1.1*
*Compatibilità: Bolt.new latest + tutti i browser moderni*