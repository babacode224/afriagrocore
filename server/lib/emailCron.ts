import { getDb } from '../db';
import { contactSubmissions } from '../../drizzle/schema';
import { sendFollowUpEmail } from './followUpEmails';
import { sql, and, isNull, lt } from 'drizzle-orm';

/**
 * Check for contact submissions that need follow-up emails
 * Sends follow-up emails to submissions older than 24 hours that haven't received one yet
 */
export async function processFollowUpEmails() {
  try {
    const db = await getDb();
    if (!db) {
      console.log('[EmailCron] Database not available, skipping follow-up emails');
      return;
    }

    // Find submissions older than 24 hours without follow-up
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const pendingSubmissions = await db
      .select()
      .from(contactSubmissions)
      .where(
        and(
          isNull(contactSubmissions.followUpSentAt),
          lt(contactSubmissions.submittedAt, twentyFourHoursAgo)
        )
      )
      .limit(10); // Process max 10 per run to avoid overwhelming email server

    console.log(`[EmailCron] Found ${pendingSubmissions.length} submissions needing follow-up`);

    for (const submission of pendingSubmissions) {
      try {
        // Send role-specific follow-up email
        await sendFollowUpEmail({
          name: submission.name,
          email: submission.email,
          role: submission.role,
        });

        // Update database to mark follow-up as sent
        await db
          .update(contactSubmissions)
          .set({ followUpSentAt: new Date() })
          .where(sql`${contactSubmissions.id} = ${submission.id}`);

        console.log(`[EmailCron] Follow-up email sent to ${submission.email} (${submission.role})`);
      } catch (error) {
        console.error(`[EmailCron] Failed to send follow-up to ${submission.email}:`, error);
        // Continue with next submission even if this one fails
      }
    }

    console.log(`[EmailCron] Processed ${pendingSubmissions.length} follow-up emails`);
  } catch (error) {
    console.error('[EmailCron] Error processing follow-up emails:', error);
  }
}

/**
 * Start the cron job to run every hour
 */
export function startEmailCron() {
  // Run immediately on startup
  processFollowUpEmails();
  
  // Then run every hour
  const ONE_HOUR = 60 * 60 * 1000;
  setInterval(processFollowUpEmails, ONE_HOUR);
  
  console.log('[EmailCron] Automated follow-up email system started (runs every hour)');
}
