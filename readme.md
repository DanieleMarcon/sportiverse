# 🏟️ Sportiverse – README

**Sportiverse** è una piattaforma **SaaS modulare, smart e (un po’ ironica)** che riunisce tre prodotti complementari sotto lo stesso tetto cloud:

1. **Sport Manager** – il CRM dedicato alle società sportive (roster, finanza, tifosi, merchandising…).
2. **Allenatore Nato** – il gioco manageriale che simula campionati, tattiche e mercato (il primo sport implementato è il **calcio**, ma l’engine è pensato per essere esteso a qualunque sport di squadra).
3. **Remi** – l’assistente artificiale che analizza dati, genera report e orchestra agent‑to‑agent workflow a supporto di Sport Manager e Allenatore Nato.

Ogni organizzazione può abilitare solo i moduli coperti dalla **licenza** (ad es. gioco per gamer privato, CRM+AI per club professionale), senza installare software locale: basta un browser.

---

## 📌 Visione generale

Immagina Sportiverse come un **condominio digitale**: una sola reception (login) e tante stanze a cui accedi con la chiave che hai acquistato. Se sei un allenatore virtuale entri direttamente nella sala giochi di *Allenatore Nato*; se sei un club apri anche l’ufficio gestionale di *Sport Manager* e la glass room di **Remi** per l’analisi predittiva.

Tutto gira online: i tre moduli comunicano tramite API interne sicure, senza dipendenze da servizi esterni. Quando il cliente effettua un upgrade di licenza, la stanza si sblocca in tempo reale grazie al nostro sistema di **feature‑gating**.

---

## 🎯 Funzionalità chiave di Sport Manager (CRM)

| Modulo                  | Descrizione                                 | Pacchetto                      |
| ----------------------- | ------------------------------------------- | ------------------------------ |
| **Anagrafiche club**    | Gestione dati societari, impianti, branding | `packages/core`                |
| **Roster atleti**       | Contratti, attributi, stato fisico          | `packages/core`                |
| **Scouting & mercato**  | Short‑list, trattative, offerte             | `packages/core` + Remi         |
| **Allenamenti**         | Calendario sedute, carichi, progressi       | `packages/core`                |
| **Finanza & marketing** | Budget, sponsorship, merchandising          | `packages/core`                |
| **Fan engagement**      | CRM tifosi, newsletter, campagne social     | `apps/web`                     |
| **API interne**         | Sync bidirezionale con *Allenatore Nato*    | `packages/core` + `apps/admin` |

---

## 🎮 Funzionalità chiave di *Allenatore Nato*

| Modulo                      | Descrizione                                                           | Pacchetto       |
| --------------------------- | --------------------------------------------------------------------- | --------------- |
| **Motore di simulazione**   | Match‑engine con logica tattica e fisica (extensible to other sports) | `packages/game` |
| **Gestione tattiche**       | Editor formazioni/piani gara                                          | `packages/game` |
| **Allenamenti & staff**     | Planner sedute, progressi attributi                                   | `packages/game` |
| **Mercato dinamico**        | IA avversaria, aste, clausole, prestiti                               | `packages/game` |
| **Statistiche avanzate**    | xG, KPI, heat‑map, report partita                                     | `packages/game` |
| **Carriera multi‑stagione** | Salvataggi cloud, record storici                                      | `packages/game` |

---

## 🤖 Funzionalità chiave di **Remi**

| Servizio                  | Descrizione                                                      | Pacchetto     |
| ------------------------- | ---------------------------------------------------------------- | ------------- |
| **Scouting predittivo**   | Stima potenziale atleti usando ML + historical data              | `packages/ai` |
| **Analisi partita**       | Contromisure tattiche suggerite pre‑match                        | `packages/ai` |
| **Generazione contenuti** | Comunicati, post social, newsletter con tono di voce brand‑aware | `packages/ai` |
| **Leaderboard modelli**   | Dashboard Q/L/\$/R/C per scegliere il LLM ottimale               | `packages/ai` |
| **Model Router**          | Smista chiamate al modello più adatto in real‑time               | `packages/ai` |
| **AutoGen workflows**     | Catene agent‑to‑agent che raffinano report e simulano scenari    | `packages/ai` |

---

## 🛠️ Stack tecnologico

| Livello                 | Tecnologie / librerie                                                                      | Note                                               |
| ----------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| **Frontend**            | Bolt.new UI (React / JSX) · **Vite + Module Federation** · TypeScript                      | Code‑splitting per licenza                         |
| **Backend / Functions** | Bolt.new Functions · **Node 20 LTS**                                                       | Serverless, DDD                                    |
| **Database & Storage**  | Bolt.new Data Tables · Bolt Datasets · **Bolt KMS**                                        | Row‑Level Security, ﬁeld‑level encryption          |
| **AI & Agents**         | Model Leaderboard · Model Router · Semantic Kernel · AutoGen · **OpenAI Codex (dev‑only)** | Protocolli **A2A**, **MCP**                        |
| **Build / Bundle**      | **Vite** · Rollup · Module Federation Plugin                                               | Build‑time stripping (Basic/Pro/Ultimate)          |
| **CI / CD**             | GitHub Actions → Netlify (*staging*) → SiteGround (*prod*)                                 | Pipeline automatizzata, changelog ± release‑please |
| **Testing**             | Vitest (unit) · Playwright (e2e)                                                           | Coverage ≥ 90 %                                    |
| **Quality & Tooling**   | ESLint · Prettier · Commitlint · Husky · **PNPM Workspaces**                               | Conventional Commits, lint‑staged                  |
| **IDE / Editor**        | Visual Studio Code (+ Dev Containers, Bolt.new Extension)                                  | Ambiente consigliato                               |

> **Nota** l’API OpenAI Codex è usata solo in fase di sviluppo; in produzione l’app non fa call esterne.

---

## 🏗️ Architettura logica & struttura cartelle

### Struttura monorepo

```text
sportiverse/
├ apps/                     # Front‑end entrypoints (Module Federation remotes)
│  ├ play/                  # Portale gamer – Allenatore Nato
│  │   ├ src/
│  │   └ vite.config.ts
│  ├ club/                  # Portale business – Sport Manager & Remi
│  │   ├ src/
│  │   └ vite.config.ts
│  └ agents/                # Dashboard interna (Leaderboard, Router)
│      ├ src/
│      └ vite.config.ts
├ packages/
│  ├ sport‑manager/         # Domini CRM (roster, finanza, marketing, fan)
│  ├ allenatore‑nato/       # Motore simulazione, mercato, tattiche
│  ├ remi/              # Servizi Remi, prompts, workflows AutoGen
│  ├ ui/                    # Design system condiviso (React + Tailwind)
│  ├ common/                # Utils, tipi condivisi, hooks, constants
│  └ style/                 # style.css + design‑tokens; build → public/
├ services/                 # Bolt.new Functions (serverless µ‑services)
│  ├ auth/
│  ├ licensing/
│  ├ billing/
│  ├ game-api/
│  └ integrations/          # Adapters per CRM esterni
├ docs/                     # Markdown auto‑generati (datasets, flows, ui)
├ tests/                    # Playwright e2e & security smoke‑tests
└ .github/                  # Workflow CI/CD, release‑please configs
```

### Principi chiave

- **Module Federation**: ogni app in `apps/` esporta un `remoteEntry.js` per il caricamento dinamico.
- **Build‑time stripping**: `pnpm build --edition=sm,game,ai` produce bundle Basic/Pro/Ultimate privi del codice non licenziato.
- **Alias TypeScript** centralizzati in `tsconfig.base.json` per import puliti (`@ui`, `@sm`, `@game`).
- **Domain‑Driven Design**: pacchetti in `packages/` isolano la logica, evitando dipendenze circolari.
- **Serverless first**: nessun server monolitico; tutta la logica backend vive in Functions scalabili.

---

## 🏢 SaaS Architecture & Licensing Model

| Target                | Dominio                | Moduli disponibili                       |
| --------------------- | ---------------------- | ---------------------------------------- |
| Utente privato (🏠)   | `play.sportiverse.com` | **Allenatore Nato**                      |
| Società sportiva (🏢) | `app.sportiverse.com`  | Sport Manager • Allenatore Nato † • Remi |

† facoltativo: incluso solo se la licenza prevede `edition=SM+AN`.

*Resto dei dettagli di autenticazione, feature‑gating e sicurezza come nella versione precedente, aggiornato ai nuovi nomi.*

---

## 🚀 Workflow Bolt‑friendly & repository strategy

Per mantenere Sportiverse leggero dentro Bolt.new pur conservando **un monorepo completo** adottiamo un flusso “**branch bolt‑preview**”.

1. \*\*Sviluppo su \*\***`main`** → il repo contiene TUTTO (codice, test, asset originali).
2. **GitHub Actions** crea/aggiorna il branch **`bolt-preview`** ad ogni push su `main`:
   - esegue `node tools/bolt-prune.js` che
     - rimuove directory voluminose (`replays/`, `docs/static/`, export scaduti…);
     - sostituisce asset >1 MB con placeholder o URL CDN.
   - pusha forzatamente il risultato su `bolt-preview`.
3. **Workspace Bolt.new** clona \*\*solo \*\***`bolt-preview`** → < 2 000 file, < 150 MB.

Altre opzioni:

- **Sparse Checkout** locale: `git sparse-checkout set apps/play packages/ui …`.
- **Pacchetti privati**: i moduli pubblici (`sport‑manager`, `allenatore‑nato`, `remi`, `ui`) vengono pubblicati su GitHub Packages e installati come dipendenze, non clonati.
- **Workspaces dedicati** in Bolt (`core`, `game`, `ai`) definiti nel file `bolt.json` con la chiave `paths`.

Limiti Bolt evitati:

| Limite         | Valore   | Con branch preview |
| -------------- | -------- | ------------------ |
| File workspace | \~60 000 | **< 2 000**        |
| Clone time     | >1 min   | **< 15 s**         |
| Upload deploy  | >200 MB  | 40‑60 MB           |

---

## 📦 Setup Locale Rapido

```bash
# 1. Clona il repository e installa le dipendenze
$ git clone https://github.com/<org>/sportiverse.git
$ cd sportiverse
$ pnpm install   # oppure npm install

# 2. Configura le variabili d’ambiente
$ cp .env.example .env.local
#  Modifica BOLT_WORKSPACE_ID, BOLT_API_KEY, JWT_SECRET, ecc.

# 3. Avvia l’ambiente di sviluppo (tutti i remotes + Functions)
$ pnpm dev

# 4. Apri il browser
http://localhost:3000   # Portal play (gamer)
http://localhost:4000   # Portal club (business)
http://localhost:5000   # Dashboard agents (AI)
```

**Requisiti minimi**\
Node ≥ 20 · PNPM ≥ 8 (consigliato) · account Bolt.new · Docker (solo per test Playwright).

*Comandi utili*

| Comando                      | Azione                                              |
| ---------------------------- | --------------------------------------------------- |
| `pnpm test`                  | Esegue suite Vitest unitaria                        |
| `pnpm e2e`                   | Avvia Playwright su apps `play` e `club`            |
| `pnpm build --edition=sm,ai` | Build personalizzato per licenza sport‑manager + AI |
| `pnpm docs:update`           | Rigenera docs (`datasets_overview.md`, ecc.)        |

---

## 🔐 Sicurezza & GDPR

### Protezione dei dati

- **Field‑Level Encryption**: attributi sensibili (nome, email, preferenze) cifrati con Bolt KMS (`kms:encrypt`).
- **Row‑Level Security (RLS)**: policy SQL che limita l’accesso ai record del proprio tenant.
- **Export temporanei**: file CSV/JSON richiedono ruolo `admin` e vengono auto‑rimossi dopo 24 h da una Function schedulata.

### Conformità GDPR

| Requisito            | Implementazione                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------- |
| Consenso cookie      | Banner generato lato client; log preferenze in `user_settings`, immutabile.                             |
| Diritto all’oblio    | Endpoint `DELETE /gdpr/user/{id}` attiva workflow agent‑to‑agent per cancellare dati in tutti i moduli. |
| Portabilità dei dati | Export PGP‑signed disponibile su richiesta, valido 24 h.                                                |
| Data residency       | Tutti i dataset risiedono in EU‑West (Frankfurt).                                                       |

### Sicurezza applicativa

- JWT **RS256** con rotazione chiave (`kid`) e revoca licenze in tempo reale.
- **Module stripping** per impedire che codice non licenziato arrivi al client.
- **SCA** (Snyk/OSV‑Scanner) e **DAST** lightweight in pipeline CI.
- **Playwright security suite** su rotte critiche (OWASP Top 10).

---

## 📄 Licenza

Copyright © 2025 **Lavoro Sporco di Marcon Daniele**. Tutti i diritti riservati.

Questo software è protetto dalle leggi sul diritto d'autore.\
Non è consentito copiare, distribuire, modificare, decompilare, pubblicare, trasmettere, creare opere derivate,\
o utilizzare questo software in alcun modo, senza esplicita autorizzazione scritta dell'autore.

È vietato ogni uso commerciale o personale non autorizzato.

Per richieste di licenza o uso legittimo, contattare: [**info@lavorosporco.it**](mailto\:info@lavorosporco.it).

