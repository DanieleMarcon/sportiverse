// Stub locale per "bolt:data" (solo ambiente dev)
export const matches = {
  get: async (_id: string) => null,
  find: async (_query: any) => [],
  insert: async (_data: any) => 'mock-id',
  update: async (_id: string, _data: any) => true,
  delete: async (_id: string) => true
};

export const tactics = {
  get: async (_id: string) => null,
  find: async (_query: any) => [],
  insert: async (_data: any) => 'mock-id',
  update: async (_id: string, _data: any) => true,
  delete: async (_id: string) => true
};

export const players = {
  get: async (_id: string) => null,
  find: async (_query: any) => [],
  insert: async (_data: any) => 'mock-id',
  update: async (_id: string, _data: any) => true,
  delete: async (_id: string) => true
};

export const teams = {
  get: async (_id: string) => null,
  find: async (_query: any) => [],
  insert: async (_data: any) => 'mock-id',
  update: async (_id: string, _data: any) => true,
  delete: async (_id: string) => true
};

export const lineups = {
  get: async (_id: string) => null,
  find: async (_query: any) => [],
  insert: async (_data: any) => 'mock-id',
  update: async (_id: string, _data: any) => true,
  delete: async (_id: string) => true
};

export const lineup_players = {
  get: async (_id: string) => null,
  find: async (_query: any) => [],
  insert: async (_data: any) => 'mock-id',
  update: async (_id: string, _data: any) => true,
  delete: async (_id: string) => true,
  bulkInsert: async (_data: any[]) => _data.map(() => 'mock-id')
};

export const athletes = {
  get: async (_id: string) => null,
  find: async (_query: any) => [],
  insert: async (_data: any) => 'mock-id',
  update: async (_id: string, _data: any) => true,
  delete: async (_id: string) => true
};

export const athlete_notes = {
  get: async (_id: string) => null,
  find: async (_query: any) => [],
  insert: async (_data: any) => 'mock-id',
  update: async (_id: string, _data: any) => true,
  delete: async (_id: string) => true
};

export const documents = {
  get: async (_id: string) => null,
  find: async (_query: any) => [],
  insert: async (_data: any) => 'mock-id',
  update: async (_id: string, _data: any) => true,
  delete: async (_id: string) => true
};

export const log_notifications = {
  get: async (_id: string) => null,
  find: async (_query: any) => [],
  findOne: async (_query: any) => null,
  insert: async (_data: any) => 'mock-id',
  update: async (_id: string, _data: any) => true,
  delete: async (_id: string) => true
};

export const events_calendar = {
  get: async (_id: string) => null,
  find: async (_query: any) => [],
  insert: async (_data: any) => 'mock-id',
  update: async (_id: string, _data: any) => true,
  delete: async (_id: string) => true
};

export const users = {
  get: async (_id: string) => null,
  find: async (_query: any) => [],
  insert: async (_data: any) => 'mock-id',
  update: async (_id: string, _data: any) => true,
  delete: async (_id: string) => true
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