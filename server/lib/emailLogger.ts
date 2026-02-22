import { getDb } from '../db';
import { emailLogs } from '../../drizzle/schema';

/**
 * Helper function to log sent emails to database
 */
export async function logEmail(params: {
  emailType: 'admin_notification' | 'user_confirmation' | 'follow_up';
  recipientEmail: string;
  recipientName: string;
  senderEmail: string;
  subject: string;
  bodyHtml: string;
  bodyText?: string;
  userRole?: 'farmer' | 'partner' | 'investor';
  waitlistFeatures?: string[];
  messageId?: string;
  contactSubmissionId?: number;
}) {
  try {
    const db = await getDb();
    if (db) {
      await db.insert(emailLogs).values({
        emailType: params.emailType,
        recipientEmail: params.recipientEmail,
        recipientName: params.recipientName,
        senderEmail: params.senderEmail,
        subject: params.subject,
        bodyHtml: params.bodyHtml,
        bodyText: params.bodyText || params.subject,
        userRole: params.userRole,
        waitlistFeatures: params.waitlistFeatures ? JSON.stringify(params.waitlistFeatures) : null,
        contactSubmissionId: params.contactSubmissionId,
        status: 'sent',
        sentAt: new Date(),
        messageId: params.messageId,
        provider: 'gmail',
        attempts: 1,
      });
      console.log(`[EmailLogger] Logged ${params.emailType} to ${params.recipientEmail}`);
    }
  } catch (error) {
    console.error('[EmailLogger] Failed to log email:', error);
  }
}
