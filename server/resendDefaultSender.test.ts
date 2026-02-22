import { describe, it, expect } from 'vitest';
import { sendAdminNotification, sendUserConfirmation } from './lib/email';

describe('Resend Default Sender Email Test', () => {
  it('should send admin notification email using Resend default sender', async () => {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      role: 'farmer' as const,
      message: 'This is a test message to verify Resend email delivery with default sender.',
      waitlistFeatures: ['climate_forecasting', 'yield_optimization'],
    };

    // Send admin notification
    await expect(sendAdminNotification(testData)).resolves.not.toThrow();
    
    console.log('✅ Admin notification sent successfully to info@africybercore.com');
  }, 15000);

  it('should send user confirmation email using Resend default sender', async () => {
    const testData = {
      name: 'Test Farmer',
      email: 'delivered@resend.dev', // Resend's test recipient
      phone: '+1234567890',
      role: 'farmer' as const,
      message: 'Testing user confirmation email with Resend default sender.',
      waitlistFeatures: ['soil_health', 'market_insights'],
    };

    // Send user confirmation
    await expect(sendUserConfirmation(testData)).resolves.not.toThrow();
    
    console.log('✅ User confirmation email sent successfully');
  }, 15000);

  it('should send emails to all role types', async () => {
    const roles: Array<'farmer' | 'partner' | 'investor'> = ['farmer', 'partner', 'investor'];
    
    for (const role of roles) {
      const testData = {
        name: `Test ${role.charAt(0).toUpperCase() + role.slice(1)}`,
        email: 'delivered@resend.dev',
        role,
        message: `Testing ${role} email template with Resend default sender.`,
        waitlistFeatures: ['voice_assistant'],
      };

      await expect(sendUserConfirmation(testData)).resolves.not.toThrow();
      console.log(`✅ ${role} confirmation email sent successfully`);
      
      // Small delay between emails to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }, 30000);
});
