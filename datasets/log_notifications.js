export const log_notifications = {
  id: { type: 'UUID', primary: true },
  user_id: { type: 'Ref', ref: 'users', required: true },
  event_id: { type: 'Ref', ref: 'events_calendar', required: true },
  sent_at: { type: 'DateTime', required: true },
  channel_enum: { 
    type: 'Enum', 
    values: ['email', 'push', 'sms'], 
    required: true 
  },
  read_at: { type: 'DateTime', nullable: true },
  delivery_status: { 
    type: 'Enum', 
    values: ['sent', 'delivered', 'failed', 'bounced'], 
    default: 'sent' 
  },
  error_message: { type: 'Text', nullable: true },
  created_at: { type: 'DateTime', default: 'now' },
  updated_at: { type: 'DateTime', default: 'now' }
};

// Indici per performance
export const log_notifications_indexes = [
  { fields: ['user_id', 'read_at'] },
  { fields: ['event_id'] },
  { fields: ['sent_at'] },
  { fields: ['delivery_status'] }
];