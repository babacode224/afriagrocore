import { Resend } from 'resend';
import sendgrid from '@sendgrid/mail';

/**
 * Email Provider System with Resend as Primary
 * 
 * Uses Resend for reliable transactional email delivery with SendGrid as fallback.
 * Resend is purpose-built for developers and offers better deliverability than SMTP.
 */

export type EmailProvider = 'resend' | 'sendgrid';

interface ProviderHealth {
  consecutiveFailures: number;
  lastFailure: Date | null;
  totalSent: number;
  totalFailed: number;
}

class EmailProviderManager {
  private currentProvider: EmailProvider = 'resend';
  private health: Record<EmailProvider, ProviderHealth> = {
    resend: { consecutiveFailures: 0, lastFailure: null, totalSent: 0, totalFailed: 0 },
    sendgrid: { consecutiveFailures: 0, lastFailure: null, totalSent: 0, totalFailed: 0 },
  };
  private maxConsecutiveFailures = 3;
  private resendClient: Resend | null = null;

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders() {
    // Initialize Resend
    if (process.env.RESEND_API_KEY) {
      this.resendClient = new Resend(process.env.RESEND_API_KEY);
      console.log('[EmailProvider] Resend initialized');
    } else {
      console.warn('[EmailProvider] RESEND_API_KEY not found. Email functionality will be limited.');
    }

    // Initialize SendGrid as fallback
    if (process.env.SENDGRID_API_KEY) {
      sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
      console.log('[EmailProvider] SendGrid initialized as fallback');
    }
  }

  /**
   * Send email using current provider with automatic fallback
   */
  async sendEmail(options: {
    from: string;
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    try {
      if (this.currentProvider === 'resend') {
        await this.sendViaResend(options);
      } else {
        await this.sendViaSendGrid(options);
      }

      // Success! Reset failure count
      this.health[this.currentProvider].consecutiveFailures = 0;
      this.health[this.currentProvider].totalSent++;
      console.log(`[EmailProvider] Email sent successfully via ${this.currentProvider}`);

    } catch (error) {
      console.error(`[EmailProvider] Failed to send via ${this.currentProvider}:`, error);
      
      // Record failure
      this.health[this.currentProvider].consecutiveFailures++;
      this.health[this.currentProvider].lastFailure = new Date();
      this.health[this.currentProvider].totalFailed++;

      // Check if we should switch providers
      if (this.health[this.currentProvider].consecutiveFailures >= this.maxConsecutiveFailures) {
        console.warn(`[EmailProvider] ${this.currentProvider} has ${this.health[this.currentProvider].consecutiveFailures} consecutive failures. Switching provider...`);
        this.switchProvider();
        
        // Retry with new provider
        return this.sendEmail(options);
      }

      throw error;
    }
  }

  /**
   * Send email via Resend API
   */
  private async sendViaResend(options: {
    from: string;
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    if (!this.resendClient || !process.env.RESEND_API_KEY) {
      throw new Error('Resend API key not configured');
    }

    const result = await this.resendClient.emails.send({
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    if (result.error) {
      throw new Error(`Resend error: ${result.error.message}`);
    }
  }

  /**
   * Send email via SendGrid API
   */
  private async sendViaSendGrid(options: {
    from: string;
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('SendGrid API key not configured');
    }

    await sendgrid.send({
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  }

  /**
   * Switch to alternative provider
   */
  private switchProvider() {
    const oldProvider = this.currentProvider;
    this.currentProvider = this.currentProvider === 'resend' ? 'sendgrid' : 'resend';
    
    console.log(`[EmailProvider] Switched from ${oldProvider} to ${this.currentProvider}`);
    
    // Reset failure count for old provider (give it a chance to recover)
    this.health[oldProvider].consecutiveFailures = 0;
  }

  /**
   * Manually set provider
   */
  setProvider(provider: EmailProvider) {
    console.log(`[EmailProvider] Manually switching to ${provider}`);
    this.currentProvider = provider;
    this.health[provider].consecutiveFailures = 0; // Reset on manual switch
  }

  /**
   * Get current provider
   */
  getCurrentProvider(): EmailProvider {
    return this.currentProvider;
  }

  /**
   * Get health statistics for all providers
   */
  getHealthStats() {
    return {
      currentProvider: this.currentProvider,
      providers: {
        resend: {
          ...this.health.resend,
          successRate: this.calculateSuccessRate('resend'),
          isHealthy: this.health.resend.consecutiveFailures < this.maxConsecutiveFailures,
          configured: !!process.env.RESEND_API_KEY,
        },
        sendgrid: {
          ...this.health.sendgrid,
          successRate: this.calculateSuccessRate('sendgrid'),
          isHealthy: this.health.sendgrid.consecutiveFailures < this.maxConsecutiveFailures,
          configured: !!process.env.SENDGRID_API_KEY,
        },
      },
    };
  }

  /**
   * Calculate success rate for a provider
   */
  private calculateSuccessRate(provider: EmailProvider): string {
    const { totalSent, totalFailed } = this.health[provider];
    const total = totalSent + totalFailed;
    if (total === 0) return '0';
    return ((totalSent / total) * 100).toFixed(2);
  }
}

// Singleton instance
export const emailProviderManager = new EmailProviderManager();
