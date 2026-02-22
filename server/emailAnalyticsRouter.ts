import { z } from "zod";
import { protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { contactSubmissions, emailLogs } from "../drizzle/schema";
import { sql, and, gte, lte, eq } from "drizzle-orm";
import { emailQueue } from "./lib/emailQueue";
import { emailProviderManager } from "./lib/emailProviders";

export const emailAnalyticsRouter = router({
  /**
   * Get all email logs with filtering
   */
  getAllEmailLogs: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(200).default(50),
        offset: z.number().min(0).default(0),
        emailType: z.enum(['admin_notification', 'user_confirmation', 'follow_up']).optional(),
        status: z.enum(['queued', 'sending', 'sent', 'failed', 'bounced']).optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      const conditions = [];
      
      if (input.emailType) {
        conditions.push(eq(emailLogs.emailType, input.emailType));
      }
      
      if (input.status) {
        conditions.push(eq(emailLogs.status, input.status));
      }
      
      if (input.startDate) {
        conditions.push(gte(emailLogs.createdAt, new Date(input.startDate)));
      }
      
      if (input.endDate) {
        conditions.push(lte(emailLogs.createdAt, new Date(input.endDate)));
      }

      const logs = await db
        .select()
        .from(emailLogs)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(sql`${emailLogs.createdAt} DESC`)
        .limit(input.limit)
        .offset(input.offset);

      // Get total count
      const countResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(emailLogs)
        .where(conditions.length > 0 ? and(...conditions) : undefined);

      return {
        logs,
        total: Number(countResult[0]?.count || 0),
        limit: input.limit,
        offset: input.offset,
      };
    }),

  /**
   * Get email queue statistics
   */
  getQueueStats: adminProcedure.query(async () => {
    const stats = emailQueue.getStats();
    
    return {
      queue: stats,
      timestamp: new Date().toISOString(),
    };
  }),

  /**
   * Get email delivery statistics from database
   */
  getDeliveryStats: adminProcedure
    .input(
      z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      const startDate = input.startDate ? new Date(input.startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Default: last 30 days
      const endDate = input.endDate ? new Date(input.endDate) : new Date();

      // Get all submissions in date range
      const submissions = await db
        .select()
        .from(contactSubmissions)
        .where(
          and(
            gte(contactSubmissions.submittedAt, startDate),
            lte(contactSubmissions.submittedAt, endDate)
          )
        );

      // Calculate statistics
      const total = submissions.length;
      const byStatus = {
        new: submissions.filter(s => s.status === 'new').length,
        contacted: submissions.filter(s => s.status === 'contacted').length,
        closed: submissions.filter(s => s.status === 'closed').length,
      };

      const byRole = {
        farmer: submissions.filter(s => s.role === 'farmer').length,
        partner: submissions.filter(s => s.role === 'partner').length,
        investor: submissions.filter(s => s.role === 'investor').length,
      };

      // Calculate follow-up statistics
      const followUpSent = submissions.filter(s => s.followUpSentAt !== null).length;
      const followUpPending = submissions.filter(
        s => s.followUpSentAt === null && 
        new Date(s.submittedAt).getTime() < Date.now() - 24 * 60 * 60 * 1000
      ).length;

      // Calculate success rate (contacted / total)
      const successRate = total > 0 ? ((byStatus.contacted / total) * 100).toFixed(2) : '0';

      return {
        total,
        byStatus,
        byRole,
        followUp: {
          sent: followUpSent,
          pending: followUpPending,
          rate: total > 0 ? ((followUpSent / total) * 100).toFixed(2) : '0',
        },
        successRate,
        dateRange: {
          start: startDate.toISOString(),
          end: endDate.toISOString(),
        },
      };
    }),

  /**
   * Get recent email logs
   */
  getRecentLogs: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        status: z.enum(['new', 'contacted', 'closed']).optional(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      let query = db
        .select()
        .from(contactSubmissions)
        .orderBy(sql`${contactSubmissions.submittedAt} DESC`)
        .limit(input.limit);

      if (input.status) {
        query = query.where(eq(contactSubmissions.status, input.status)) as any;
      }

      const logs = await query;

      return logs.map(log => ({
        id: log.id,
        name: log.name,
        email: log.email,
        role: log.role,
        status: log.status,
        submittedAt: log.submittedAt,
        followUpSentAt: log.followUpSentAt,
        waitlistFeatures: log.waitlistFeatures ? JSON.parse(log.waitlistFeatures) : [],
      }));
    }),

  /**
   * Get email health metrics
   */
  getHealthMetrics: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    // Get submissions from last 24 hours
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentSubmissions = await db
      .select()
      .from(contactSubmissions)
      .where(gte(contactSubmissions.submittedAt, last24Hours));

    const total = recentSubmissions.length;
    const contacted = recentSubmissions.filter(s => s.status === 'contacted').length;
    const failureRate = total > 0 ? (((total - contacted) / total) * 100).toFixed(2) : '0';

    // Check if failure rate exceeds threshold
    const alert = parseFloat(failureRate) > 10 ? {
      level: 'warning',
      message: `Email failure rate (${failureRate}%) exceeds 10% threshold in the last 24 hours`,
      timestamp: new Date().toISOString(),
    } : null;

    return {
      last24Hours: {
        total,
        contacted,
        failureRate,
      },
      queueHealth: emailQueue.getStats(),
      alert,
    };
  }),

  /**
   * Get email provider health stats
   */
  getProviderHealth: adminProcedure.query(async () => {
    return emailProviderManager.getHealthStats();
  }),

  /**
   * Manually switch email provider
   */
  switchProvider: adminProcedure
    .input(
      z.object({
        provider: z.enum(['resend', 'sendgrid']),
      })
    )
    .mutation(async ({ input }) => {
      emailProviderManager.setProvider(input.provider);
      return {
        success: true,
        currentProvider: input.provider,
      };
    }),
});
