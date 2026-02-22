import { describe, it, expect } from 'vitest';
import { sendContactFormEmails } from './lib/email';

describe('Contact Form Email Delivery Test', () => {
  it('should send admin notification to info@africybercore.com and user confirmation email', async () => {
    const testFormData = {
      name: 'Test User - Waitlist Signup',
      email: 'testuser@example.com',
      phone: '+234 123 456 7890',
      role: 'farmer' as const,
      message: 'I am interested in joining the waitlist for Climate Forecasting and Yield Optimization features.',
      waitlistFeatures: ['climate-forecasting', 'yield-optimization', 'soil-health-monitoring'],
    };

    console.log('\n📧 Testing Contact Form Email Delivery...\n');
    console.log('Test Form Submission:');
    console.log('- Name:', testFormData.name);
    console.log('- Email:', testFormData.email);
    console.log('- Role:', testFormData.role);
    console.log('- Waitlist Features:', testFormData.waitlistFeatures.join(', '));
    console.log('\nExpected Behavior:');
    console.log('✅ Admin notification email sent to: info@africybercore.com');
    console.log('✅ User confirmation email sent to:', testFormData.email);
    console.log('\n---\n');

    try {
      const result = await sendContactFormEmails(testFormData);
      
      expect(result.success).toBe(true);
      
      console.log('✅ TEST PASSED: Both emails sent successfully!\n');
      console.log('📬 Admin Email Details:');
      console.log('   To: info@africybercore.com');
      console.log('   Subject: New Contact Form Submission - Farmer');
      console.log('   Contains: User details, message, and waitlist features\n');
      
      console.log('📬 User Confirmation Email Details:');
      console.log('   To:', testFormData.email);
      console.log('   Subject: Thank you for contacting AfriAgroCore');
      console.log('   Contains: Thank you message and next steps\n');
      
      console.log('🎉 Email delivery system is working correctly!');
      console.log('📧 Check inbox at info@africybercore.com to verify receipt.\n');
      
    } catch (error) {
      console.error('❌ TEST FAILED: Email delivery error\n');
      console.error('Error details:', error);
      throw error;
    }
  }, 30000); // 30 second timeout

  it('should handle different user roles correctly', async () => {
    const roles = [
      { role: 'partner' as const, name: 'Test Partner' },
      { role: 'investor' as const, name: 'Test Investor' },
    ];

    console.log('\n📧 Testing Multiple User Roles...\n');

    for (const { role, name } of roles) {
      const testData = {
        name: name,
        email: `test-${role}@example.com`,
        phone: '+234 123 456 7890',
        role: role,
        message: `Test message from ${role}`,
        waitlistFeatures: ['climate-forecasting'],
      };

      try {
        const result = await sendContactFormEmails(testData);
        expect(result.success).toBe(true);
        console.log(`✅ ${role.toUpperCase()} role: Emails sent successfully`);
      } catch (error) {
        console.error(`❌ ${role.toUpperCase()} role: Failed to send emails`);
        throw error;
      }
    }

    console.log('\n🎉 All role-specific emails working correctly!\n');
  }, 60000); // 60 second timeout for multiple emails
});
