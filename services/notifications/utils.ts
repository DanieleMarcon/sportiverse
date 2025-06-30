/**
 * Utilities per invio notifiche
 * Integrazione con provider email (SMTP/SendGrid)
 */
import nodemailer from 'nodemailer';

interface EmailOptions {
  subject: string;
  body: string;
  html?: string;
  from?: string;
  replyTo?: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Invia email tramite provider configurato
 */
export async function sendMail(to: string, options: EmailOptions): Promise<EmailResult> {
  try {
    // Validazione input
    if (!to || !options.subject || !options.body) {
      throw new Error('Email, subject e body sono obbligatori');
    }
    
    // Validazione formato email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      throw new Error('Formato email non valido');
    }
    
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || 'noreply@sportiverse.com';

    if (smtpHost) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: smtpUser ? { user: smtpUser, pass: smtpPass } : undefined
      });

      const info = await transporter.sendMail({
        to,
        from: options.from || smtpFrom,
        replyTo: options.replyTo,
        subject: options.subject,
        text: options.body,
        html: options.html || generateSimpleHTML(options.body)
      });

      console.log('[EMAIL] ✅ Email sent successfully:', {
        to,
        subject: options.subject,
        messageId: info.messageId
      });

      return { success: true, messageId: info.messageId };
    }

    // Se SMTP non configurato, fallback mock
    console.log('[EMAIL] ℹ️ SMTP not configured, email simulated:', {
      to,
      subject: options.subject
    });

    return { success: true, messageId: `dev_${Date.now()}` };
    
  } catch (error) {
    console.error('[EMAIL] ❌ Failed to send email:', {
      to,
      subject: options.subject,
      error: (error as Error).message
    });
    
    return {
      success: false,
      error: (error as Error).message
    };
  }
}

/**
 * Genera HTML semplice da testo
 */
function generateSimpleHTML(text: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { border-bottom: 2px solid #1e40af; padding-bottom: 10px; margin-bottom: 20px; }
    .footer { border-top: 1px solid #ddd; padding-top: 10px; margin-top: 20px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h2>⚽ Sportiverse</h2>
  </div>
  
  <div class="content">
    ${text.split('\n').map(line => `<p>${line}</p>`).join('')}
  </div>
  
  <div class="footer">
    <p>&copy; 2025 Sportiverse - Sport Manager CRM</p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Invia notifica push (placeholder)
 */
export async function sendPushNotification(userId: string, title: string, body: string): Promise<EmailResult> {
  try {
    // TODO: Integra provider push notifications (Firebase, OneSignal, etc.)
    console.log('[PUSH] Notification sent:', { userId, title, body });
    
    return {
      success: true,
      messageId: `push_${Date.now()}`
    };
    
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message
    };
  }
}

/**
 * Invia SMS (placeholder)
 */
export async function sendSMS(phoneNumber: string, message: string): Promise<EmailResult> {
  try {
    // TODO: Integra provider SMS (Twilio, AWS SNS, etc.)
    console.log('[SMS] Message sent:', { phoneNumber, message });
    
    return {
      success: true,
      messageId: `sms_${Date.now()}`
    };
    
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message
    };
  }
}