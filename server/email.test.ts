import { describe, it, expect } from 'vitest';
import { sendContactFormEmails } from './lib/email';

describe('Email Service', () => {
  it('should send contact form emails with valid SMTP credentials', async () => {
    const testFormData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+234 123 456 7890',
      role: 'farmer' as const,
      message: 'This is a test message to validate SMTP configuration.',
      waitlistFeatures: ['climate-forecasting', 'yield-optimization'],
    };

    try {
      const result = await sendContactFormEmails(testFormData);
      expect(result.success).toBe(true);
    } catch (error) {
      if (error instanceof Error) {
        // If SMTP credentials are not configured, fail with clear message
        if (error.message.includes('SMTP credentials not configured')) {
          throw new Error('SMTP credentials not set. Please provide SMTP_USER and SMTP_PASSWORD.');
        }
        // If authentication fails, fail with clear message
        if (error.message.includes('Invalid login') || error.message.includes('authentication failed')) {
          throw new Error('SMTP authentication failed. Please check your email and password are correct.');
        }
        // Other errors
        throw error;
      }
      throw error;
    }
  }, 30000); // 30 second timeout for email sending
});
