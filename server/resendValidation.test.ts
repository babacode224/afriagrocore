import { describe, it, expect } from 'vitest';
import { Resend } from 'resend';

describe('Resend API Key Validation', () => {
  it('should successfully validate Resend API key by sending a test email', async () => {
    // Check if API key is configured
    expect(process.env.RESEND_API_KEY).toBeDefined();
    expect(process.env.RESEND_API_KEY).toMatch(/^re_/);

    // Initialize Resend client
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send a test email
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev', // Resend's test sender
      to: 'delivered@resend.dev', // Resend's test recipient
      subject: 'AfriAgroCore - Resend API Key Validation',
      html: '<p>This is a test email to validate your Resend API key configuration.</p>',
    });

    // Check if email was sent successfully
    expect(result.error).toBeNull();
    expect(result.data).toBeDefined();
    expect(result.data?.id).toBeDefined();

    console.log('✅ Resend API key validated successfully!');
    console.log('Email ID:', result.data?.id);
  }, 15000); // 15 second timeout
});
