import { events_calendar, log_notifications, users } from 'bolt:data';
import { sendMail } from './utils';

/**
 * Function schedulata per invio notifiche giornaliere
 * Trigger: cron "0 7 * * *" (07:00 UTC daily)
 */
export default async function sendDailyAlerts() {
  console.log('[CRON] Starting daily alerts job...');
  
  try {
    // Calcola finestra temporale (prossime 24 ore)
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    console.log(`[CRON] Checking events between ${now.toISOString()} and ${tomorrow.toISOString()}`);
    
    // Trova eventi in scadenza nelle prossime 24 ore
    const upcomingEvents = await events_calendar.find({
      due_at: { 
        $gte: now,
        $lte: tomorrow 
      },
      status: { $ne: 'completed' } // Solo eventi non completati
    });
    
    console.log(`[CRON] Found ${upcomingEvents.length} upcoming events`);
    
    let sentCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    for (const event of upcomingEvents) {
      try {
        // Verifica se già notificato
        const existingNotification = await log_notifications.findOne({ 
          event_id: event.id,
          channel_enum: 'email'
        });
        
        if (existingNotification) {
          console.log(`[CRON] Event ${event.id} already notified, skipping`);
          skippedCount++;
          continue;
        }
        
        // Trova utente target (club owner o responsabile)
        const targetUser = await users.get(event.club_id);
        if (!targetUser || !targetUser.email) {
          console.warn(`[CRON] No valid email for club ${event.club_id}, skipping event ${event.id}`);
          skippedCount++;
          continue;
        }
        
        // Prepara contenuto email
        const emailSubject = `⚠️ Promemoria: ${formatEventType(event.type_enum)} in scadenza`;
        const emailBody = generateEmailBody(event, targetUser);
        
        // Invia email
        const deliveryResult = await sendMail(targetUser.email, {
          subject: emailSubject,
          body: emailBody,
          html: generateEmailHTML(event, targetUser)
        });
        
        // Log notifica inviata
        await log_notifications.insert({
          event_id: event.id,
          user_id: event.club_id,
          channel_enum: 'email',
          sent_at: new Date(),
          delivery_status: deliveryResult.success ? 'sent' : 'failed',
          error_message: deliveryResult.error || null
        });
        
        if (deliveryResult.success) {
          sentCount++;
          console.log(`[CRON] ✅ Notification sent for event ${event.id} to ${targetUser.email}`);
        } else {
          errorCount++;
          console.error(`[CRON] ❌ Failed to send notification for event ${event.id}: ${deliveryResult.error}`);
        }
        
      } catch (eventError) {
        errorCount++;
        console.error(`[CRON] Error processing event ${event.id}:`, eventError);
        
        // Log errore
        try {
          await log_notifications.insert({
            event_id: event.id,
            user_id: event.club_id,
            channel_enum: 'email',
            sent_at: new Date(),
            delivery_status: 'failed',
            error_message: eventError.message
          });
        } catch (logError) {
          console.error('[CRON] Failed to log error notification:', logError);
        }
      }
    }
    
    // Summary log
    console.log(`[CRON] Daily alerts completed: ${sentCount} sent, ${skippedCount} skipped, ${errorCount} errors`);
    
    return {
      success: true,
      summary: {
        totalEvents: upcomingEvents.length,
        sent: sentCount,
        skipped: skippedCount,
        errors: errorCount
      }
    };
    
  } catch (error) {
    console.error('[CRON] Fatal error in daily alerts job:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Formatta tipo evento per display
 */
function formatEventType(type: string): string {
  const typeMap = {
    'visita_medica': 'Visita Medica',
    'compleanno': 'Compleanno',
    'convocazione': 'Convocazione',
    'scadenza_documento': 'Scadenza Documento',
    'rinnovo_contratto': 'Rinnovo Contratto',
    'allenamento': 'Allenamento',
    'partita': 'Partita'
  };
  
  return typeMap[type] || type.charAt(0).toUpperCase() + type.slice(1);
}

/**
 * Genera corpo email testuale
 */
function generateEmailBody(event: any, user: any): string {
  const eventDate = new Date(event.due_at).toLocaleDateString('it-IT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return `
Ciao ${user.first_name || 'Utente'},

Ti ricordiamo che hai un evento in scadenza:

📅 Evento: ${formatEventType(event.type_enum)}
🕐 Data: ${eventDate}
📝 Descrizione: ${event.description || 'Nessuna descrizione'}

${event.location ? `📍 Luogo: ${event.location}` : ''}

Per maggiori dettagli, accedi alla tua dashboard Sport Manager.

Cordiali saluti,
Il team Sportiverse

---
Questa è una notifica automatica. Non rispondere a questa email.
  `.trim();
}

/**
 * Genera corpo email HTML
 */
function generateEmailHTML(event: any, user: any): string {
  const eventDate = new Date(event.due_at).toLocaleDateString('it-IT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Promemoria Evento - Sportiverse</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
    .content { background: #f8fafc; padding: 20px; }
    .event-card { background: white; border-left: 4px solid #1e40af; padding: 15px; margin: 15px 0; }
    .footer { text-align: center; font-size: 12px; color: #666; margin-top: 20px; }
    .btn { display: inline-block; background: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚽ Sportiverse</h1>
      <p>Promemoria Evento</p>
    </div>
    
    <div class="content">
      <p>Ciao <strong>${user.first_name || 'Utente'}</strong>,</p>
      
      <p>Ti ricordiamo che hai un evento in scadenza:</p>
      
      <div class="event-card">
        <h3>📅 ${formatEventType(event.type_enum)}</h3>
        <p><strong>Data:</strong> ${eventDate}</p>
        <p><strong>Descrizione:</strong> ${event.description || 'Nessuna descrizione'}</p>
        ${event.location ? `<p><strong>Luogo:</strong> ${event.location}</p>` : ''}
      </div>
      
      <p style="text-align: center;">
        <a href="https://app.sportiverse.com/calendar" class="btn">Vai al Calendario</a>
      </p>
    </div>
    
    <div class="footer">
      <p>Questa è una notifica automatica. Non rispondere a questa email.</p>
      <p>&copy; 2025 Sportiverse - Sport Manager CRM</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}