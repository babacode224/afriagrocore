import { describe, it, expect, beforeAll } from 'vitest';
import { getDb } from './db';
import { contactSubmissions } from '../drizzle/schema';
import { processFollowUpEmails } from './lib/emailCron';
import { sql } from 'drizzle-orm';

describe('Automated Follow-Up Email System', () => {
  beforeAll(async () => {
    // Clean up any test data from previous runs
    const db = await getDb();
    if (db) {
      await db.delete(contactSubmissions).where(sql`${contactSubmissions.email} LIKE '%test-followup%'`);
    }
  });

  it('should save contact submission to database', async () => {
    const db = await getDb();
    expect(db).toBeTruthy();

    if (!db) {
      throw new Error('Database not available');
    }

    // Insert a test submission
    const testSubmission = {
      name: 'Test Farmer',
      email: 'test-followup-farmer@example.com',
      phone: '+234 123 456 7890',
      role: 'farmer' as const,
      message: 'This is a test submission for automated follow-up emails.',
      waitlistFeatures: JSON.stringify(['climate-forecasting', 'yield-optimization']),
      status: 'new' as const,
      submittedAt: new Date(Date.now() - 25 * 60 * 60 * 1000), // 25 hours ago (should trigger follow-up)
    };

    const result = await db.insert(contactSubmissions).values(testSubmission);
    expect(result).toBeTruthy();

    // Verify submission was saved
    const saved = await db
      .select()
      .from(contactSubmissions)
      .where(sql`${contactSubmissions.email} = ${testSubmission.email}`)
      .limit(1);

    expect(saved.length).toBe(1);
    expect(saved[0].name).toBe(testSubmission.name);
    expect(saved[0].email).toBe(testSubmission.email);
    expect(saved[0].role).toBe(testSubmission.role);
    expect(saved[0].followUpSentAt).toBeNull();
  });

  it('should process follow-up emails for old submissions', async () => {
    const db = await getDb();
    if (!db) {
      throw new Error('Database not available');
    }

    // Run the cron job processor
    await processFollowUpEmails();

    // Check that follow-up was marked as sent
    const updated = await db
      .select()
      .from(contactSubmissions)
      .where(sql`${contactSubmissions.email} = 'test-followup-farmer@example.com'`)
      .limit(1);

    expect(updated.length).toBe(1);
    expect(updated[0].followUpSentAt).not.toBeNull();
    
    console.log('✓ Follow-up email sent and marked in database');
  });

  it('should not send duplicate follow-ups', async () => {
    const db = await getDb();
    if (!db) {
      throw new Error('Database not available');
    }

    // Get the current followUpSentAt timestamp
    const before = await db
      .select()
      .from(contactSubmissions)
      .where(sql`${contactSubmissions.email} = 'test-followup-farmer@example.com'`)
      .limit(1);

    const firstFollowUpTime = before[0].followUpSentAt;

    // Run the cron job again
    await processFollowUpEmails();

    // Verify followUpSentAt didn't change (no duplicate sent)
    const after = await db
      .select()
      .from(contactSubmissions)
      .where(sql`${contactSubmissions.email} = 'test-followup-farmer@example.com'`)
      .limit(1);

    expect(after[0].followUpSentAt?.getTime()).toBe(firstFollowUpTime?.getTime());
    
    console.log('✓ Duplicate follow-up emails prevented');
  });

  it('should handle different user roles correctly', async () => {
    const db = await getDb();
    if (!db) {
      throw new Error('Database not available');
    }

    // Insert test submissions for each role
    const roles = ['partner', 'investor'] as const;
    
    for (const role of roles) {
      await db.insert(contactSubmissions).values({
        name: `Test ${role}`,
        email: `test-followup-${role}@example.com`,
        phone: '+234 123 456 7890',
        role: role,
        message: `Test message for ${role} role`,
        waitlistFeatures: JSON.stringify(['climate-forecasting']),
        status: 'new' as const,
        submittedAt: new Date(Date.now() - 25 * 60 * 60 * 1000), // 25 hours ago
      });
    }

    // Process follow-ups
    await processFollowUpEmails();

    // Verify all roles received follow-ups
    for (const role of roles) {
      const result = await db
        .select()
        .from(contactSubmissions)
        .where(sql`${contactSubmissions.email} = ${`test-followup-${role}@example.com`}`)
        .limit(1);

      expect(result.length).toBe(1);
      expect(result[0].followUpSentAt).not.toBeNull();
      console.log(`✓ Follow-up sent for ${role} role`);
    }
  });
}, 60000); // 60 second timeout for email operations
