import { describe, it, expect } from 'vitest';
import { events_calendar, log_notifications } from '../../packages/common/src/bolt-data-stub.ts';
import sendDailyAlerts from '../../services/notifications/sendDailyAlerts';

describe('sendDailyAlerts', () => {
  it('logs notification for upcoming event', async () => {
    const tomorrow = new Date(Date.now() + 6 * 60 * 60 * 1000);
    await events_calendar.insert({
      club_id: 'user-1',
      type_enum: 'allenamento',
      due_at: tomorrow,
      description: 'Test event',
      status: 'scheduled'
    });

    const result = await sendDailyAlerts();

    expect(result.success).toBe(true);
    const logs = await log_notifications.find();
    expect(logs.length).toBe(1);
    expect(logs[0].event_id).toBeDefined();
  });
});
