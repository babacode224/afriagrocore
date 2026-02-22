import { getDb } from '../db';
import { contactSubmissions } from '../../drizzle/schema';
import { sql } from 'drizzle-orm';

/**
 * Email Queue System
 * 
 * Handles email sending with retry logic and exponential backoff
 * to prevent SMTP timeouts and handle high volumes gracefully
 */

interface EmailJob {
  id: string;
  type: 'contact_form' | 'follow_up';
  data: any;
  attempts: number;
  maxAttempts: number;
  nextRetry: Date;
  status: 'pending' | 'processing' | 'sent' | 'failed';
}

class EmailQueue {
  private queue: EmailJob[] = [];
  private processing = false;
  private maxConcurrent = 2; // Process max 2 emails at a time
  private retryDelays = [1000, 5000, 15000, 60000]; // 1s, 5s, 15s, 1min

  /**
   * Add email to queue
   */
  async addToQueue(type: EmailJob['type'], data: any): Promise<string> {
    const jobId = `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const job: EmailJob = {
      id: jobId,
      type,
      data,
      attempts: 0,
      maxAttempts: 3,
      nextRetry: new Date(),
      status: 'pending',
    };

    this.queue.push(job);
    console.log(`[EmailQueue] Added job ${jobId} to queue (type: ${type})`);
    
    // Start processing if not already running
    if (!this.processing) {
      this.processQueue();
    }

    return jobId;
  }

  /**
   * Process email queue with rate limiting
   */
  private async processQueue() {
    if (this.processing) return;
    this.processing = true;

    while (this.queue.length > 0) {
      const now = new Date();
      const readyJobs = this.queue.filter(
        job => job.status === 'pending' && job.nextRetry <= now
      );

      if (readyJobs.length === 0) {
        // No jobs ready, wait a bit
        await this.sleep(1000);
        continue;
      }

      // Process up to maxConcurrent jobs in parallel
      const jobsToProcess = readyJobs.slice(0, this.maxConcurrent);
      
      await Promise.all(
        jobsToProcess.map(job => this.processJob(job))
      );

      // Rate limiting: wait between batches
      await this.sleep(2000); // 2 second delay between batches
    }

    this.processing = false;
  }

  /**
   * Process a single email job with retry logic
   */
  private async processJob(job: EmailJob) {
    job.status = 'processing';
    job.attempts++;

    console.log(`[EmailQueue] Processing job ${job.id} (attempt ${job.attempts}/${job.maxAttempts})`);

    try {
      // Dynamically import to avoid circular dependencies
      const { sendAdminNotification, sendUserConfirmation } = await import('./email');
      const { sendFollowUpEmail } = await import('./followUpEmails');

      if (job.type === 'contact_form') {
        await sendAdminNotification(job.data);
        await sendUserConfirmation(job.data);
      } else if (job.type === 'follow_up') {
        await sendFollowUpEmail(job.data);
      }

      // Success!
      job.status = 'sent';
      this.removeFromQueue(job.id);
      console.log(`[EmailQueue] ✓ Job ${job.id} completed successfully`);

      // Update database status if this is a contact submission
      if (job.data.submissionId) {
        await this.updateSubmissionStatus(job.data.submissionId, 'sent');
      }

    } catch (error) {
      console.error(`[EmailQueue] ✗ Job ${job.id} failed (attempt ${job.attempts}):`, error);

      if (job.attempts >= job.maxAttempts) {
        // Max attempts reached, mark as failed
        job.status = 'failed';
        this.removeFromQueue(job.id);
        console.error(`[EmailQueue] Job ${job.id} permanently failed after ${job.maxAttempts} attempts`);

        // Update database status
        if (job.data.submissionId) {
          await this.updateSubmissionStatus(job.data.submissionId, 'failed');
        }
      } else {
        // Schedule retry with exponential backoff
        const delay = this.retryDelays[job.attempts - 1] || 60000;
        job.nextRetry = new Date(Date.now() + delay);
        job.status = 'pending';
        console.log(`[EmailQueue] Job ${job.id} will retry in ${delay}ms`);
      }
    }
  }

  /**
   * Remove job from queue
   */
  private removeFromQueue(jobId: string) {
    this.queue = this.queue.filter(job => job.id !== jobId);
  }

  /**
   * Update submission status in database
   */
  private async updateSubmissionStatus(submissionId: number, status: 'sent' | 'failed') {
    try {
      const db = await getDb();
      if (!db) return;

      await db
        .update(contactSubmissions)
        .set({ 
          status: status === 'sent' ? 'contacted' : 'closed',
          updatedAt: new Date(),
        })
        .where(sql`${contactSubmissions.id} = ${submissionId}`);
    } catch (error) {
      console.error('[EmailQueue] Failed to update submission status:', error);
    }
  }

  /**
   * Get queue statistics
   */
  getStats() {
    return {
      total: this.queue.length,
      pending: this.queue.filter(j => j.status === 'pending').length,
      processing: this.queue.filter(j => j.status === 'processing').length,
      failed: this.queue.filter(j => j.status === 'failed').length,
    };
  }

  /**
   * Sleep helper
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Singleton instance
export const emailQueue = new EmailQueue();
