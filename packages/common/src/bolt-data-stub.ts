// Stub locale per "bolt:data" (solo ambiente dev)
export const matches = {
  get: async (id: string) => null,
  find: async (query: any) => [],
  insert: async (data: any) => 'mock-id',
  update: async (id: string, data: any) => true,
  delete: async (id: string) => true
};

export const tactics = {
  get: async (id: string) => null,
  find: async (query: any) => [],
  insert: async (data: any) => 'mock-id',
  update: async (id: string, data: any) => true,
  delete: async (id: string) => true
};

export const players = {
  get: async (id: string) => null,
  find: async (query: any) => [],
  insert: async (data: any) => 'mock-id',
  update: async (id: string, data: any) => true,
  delete: async (id: string) => true
};

export const teams = {
  get: async (id: string) => null,
  find: async (query: any) => [],
  insert: async (data: any) => 'mock-id',
  update: async (id: string, data: any) => true,
  delete: async (id: string) => true
};

export const lineups = {
  get: async (id: string) => null,
  find: async (query: any) => [],
  insert: async (data: any) => 'mock-id',
  update: async (id: string, data: any) => true,
  delete: async (id: string) => true
};

export const lineup_players = {
  get: async (id: string) => null,
  find: async (query: any) => [],
  insert: async (data: any) => 'mock-id',
  update: async (id: string, data: any) => true,
  delete: async (id: string) => true,
  bulkInsert: async (data: any[]) => data.map(() => 'mock-id')
};

export const athletes = {
  get: async (id: string) => null,
  find: async (query: any) => [],
  insert: async (data: any) => 'mock-id',
  update: async (id: string, data: any) => true,
  delete: async (id: string) => true
};

export const athlete_notes = {
  get: async (id: string) => null,
  find: async (query: any) => [],
  insert: async (data: any) => 'mock-id',
  update: async (id: string, data: any) => true,
  delete: async (id: string) => true
};

export const documents = {
  get: async (id: string) => null,
  find: async (query: any) => [],
  insert: async (data: any) => 'mock-id',
  update: async (id: string, data: any) => true,
  delete: async (id: string) => true
};

export const log_notifications = {
  get: async (id: string) => null,
  find: async (query: any) => [],
  findOne: async (query: any) => null,
  insert: async (data: any) => 'mock-id',
  update: async (id: string, data: any) => true,
  delete: async (id: string) => true
};

export const events_calendar = {
  get: async (id: string) => null,
  find: async (query: any) => [],
  insert: async (data: any) => 'mock-id',
  update: async (id: string, data: any) => true,
  delete: async (id: string) => true
};

export const users = {
  get: async (id: string) => null,
  find: async (query: any) => [],
  insert: async (data: any) => 'mock-id',
  update: async (id: string, data: any) => true,
  delete: async (id: string) => true
};

// Export default per compatibilità
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