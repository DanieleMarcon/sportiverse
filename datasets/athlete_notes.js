export const athlete_notes = {
  id: { type: 'UUID', primary: true },
  athlete_id: { type: 'Ref', ref: 'athletes', required: true },
  coach_id: { type: 'Ref', ref: 'users', required: true },
  note_text: { type: 'LongText', required: true, maxLength: 2000 },
  visibility: { 
    type: 'Enum', 
    values: ['private', 'team', 'staff'], 
    default: 'team' 
  },
  tags: { 
    type: 'Array', 
    items: { 
      type: 'Enum', 
      values: ['tattica', 'fisica', 'mentale', 'disciplinare', 'comportamento', 'sviluppo'] 
    },
    default: []
  },
  priority: { 
    type: 'Enum', 
    values: ['low', 'medium', 'high'], 
    default: 'medium' 
  },
  is_archived: { type: 'Boolean', default: false },
  created_at: { type: 'DateTime', default: 'now' },
  updated_at: { type: 'DateTime', default: 'now' }
};

// Indici per performance
export const athlete_notes_indexes = [
  { fields: ['athlete_id', 'is_archived'] },
  { fields: ['coach_id'] },
  { fields: ['created_at'] },
  { fields: ['tags'] },
  { fields: ['visibility'] }
];