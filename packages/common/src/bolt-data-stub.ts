import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const seedsDir = join(__dirname, '../../datasets/seeds');

function loadSeed(file: string) {
  try {
    return JSON.parse(readFileSync(join(seedsDir, file), 'utf-8'));
  } catch {
    return [];
  }
}

function generateId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2)}-${Date.now()}`;
}

function match(item: any, query: any) {
  for (const key of Object.keys(query)) {
    const cond = query[key];
    const val = item[key];
    if (cond && typeof cond === 'object') {
      if (cond.$gte && val < cond.$gte) return false;
      if (cond.$lte && val > cond.$lte) return false;
      if (cond.$ne !== undefined && val === cond.$ne) return false;
    } else if (val !== cond) {
      return false;
    }
  }
  return true;
}

function createDataset(store: any[], prefix: string, bulk = false) {
  return {
    get: async (id: string) => store.find(i => i.id === id) || null,
    find: async (query: any = {}) => store.filter(i => match(i, query)),
    findOne: async (query: any = {}) => store.find(i => match(i, query)) || null,
    insert: async (data: any) => {
      const id = data.id || generateId(prefix);
      store.push({ ...data, id });
      return id;
    },
    update: async (id: string, data: any) => {
      const idx = store.findIndex(i => i.id === id);
      if (idx === -1) return false;
      store[idx] = { ...store[idx], ...data };
      return true;
    },
    delete: async (id: string) => {
      const idx = store.findIndex(i => i.id === id);
      if (idx === -1) return false;
      store.splice(idx, 1);
      return true;
    },
    ...(bulk && {
      bulkInsert: async (items: any[]) =>
        items.map(item => {
          const id = item.id || generateId(prefix);
          store.push({ ...item, id });
          return id;
        })
    })
  } as any;
}

const matchesStore = loadSeed('matches.seed.json');
const athletesStore = loadSeed('athletes.seed.json');
const documentsStore = loadSeed('documents.seed.json');
const usersStore = loadSeed('users.seed.json');

const tacticsStore: any[] = [];
const playersStore: any[] = [];
const teamsStore: any[] = [];
const lineupsStore: any[] = [];
const lineupPlayersStore: any[] = [];
const athleteNotesStore: any[] = [];
const logNotificationsStore: any[] = [];
const eventsCalendarStore: any[] = [];

export const matches = createDataset(matchesStore, 'match');
export const tactics = createDataset(tacticsStore, 'tactic');
export const players = createDataset(playersStore, 'player');
export const teams = createDataset(teamsStore, 'team');
export const lineups = createDataset(lineupsStore, 'lineup');
export const lineup_players = createDataset(lineupPlayersStore, 'lp', true);
export const athletes = createDataset(athletesStore, 'athlete');
export const athlete_notes = createDataset(athleteNotesStore, 'note');
export const documents = createDataset(documentsStore, 'doc');
export const log_notifications = createDataset(logNotificationsStore, 'log');
export const events_calendar = createDataset(eventsCalendarStore, 'event');
export const users = createDataset(usersStore, 'user');

export const data = {
  matches,
  tactics,
  players,
  teams,
  lineups,
  lineup_players,
  athletes,
  athlete_notes,
  documents,
  log_notifications,
  events_calendar,
  users
};

const bolt = { data };
export default bolt;
