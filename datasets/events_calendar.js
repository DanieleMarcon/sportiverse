export const events_calendar = {
  id: { type: 'UUID', primary: true },
  club_id: { type: 'Ref', ref: 'users', required: true },
  type_enum: {
    type: 'Enum',
    values: [
      'visita_medica',
      'compleanno',
      'convocazione',
      'scadenza_documento',
      'rinnovo_contratto',
      'allenamento',
      'partita'
    ],
    required: true
  },
  description: { type: 'Text', nullable: true },
  location: { type: 'Text', nullable: true },
  due_at: { type: 'DateTime', required: true },
  status: {
    type: 'Enum',
    values: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  created_at: { type: 'DateTime', default: 'now' },
  updated_at: { type: 'DateTime', default: 'now' }
};

export const events_calendar_indexes = [
  { fields: ['club_id', 'due_at'] },
  { fields: ['status'] }
];
