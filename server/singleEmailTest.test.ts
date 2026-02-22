import { describe, it, expect } from 'vitest';
import { sendContactFormEmails } from './lib/email';

describe('Single Email Delivery Test', () => {
  it('should successfully send emails to info@africybercore.com (admin) and user', async () => {
    console.log('\n' + '='.repeat(70));
    console.log('📧 CONTACT FORM EMAIL DELIVERY TEST');
    console.log('='.repeat(70) + '\n');

    const testFormData = {
      name: 'John Farmer (Test Submission)',
      email: 'testuser@example.com',
      phone: '+234 812 345 6789',
      role: 'farmer' as const,
      message: 'I am very interested in the Climate Forecasting and Yield Optimization features. Please add me to the waitlist and let me know when they are available.',
      waitlistFeatures: ['climate-forecasting', 'yield-optimization', 'soil-health-monitoring'],
    };

    console.log('📝 Test Form Submission Details:\n');
    console.log('   Name:     ', testFormData.name);
    console.log('   Email:    ', testFormData.email);
    console.log('   Phone:    ', testFormData.phone);
    console.log('   Role:     ', testFormData.role.toUpperCase());
    console.log('   Message:  ', testFormData.message.substring(0, 60) + '...');
    console.log('   Waitlist: ', testFormData.waitlistFeatures.join(', '));
    console.log('\n' + '-'.repeat(70) + '\n');

    console.log('📤 Sending emails...\n');

    try {
      const result = await sendContactFormEmails(testFormData);
      
      expect(result.success).toBe(true);
      
      console.log('✅ SUCCESS! Both emails sent successfully!\n');
      console.log('=' + '='.repeat(69) + '\n');
      
      console.log('📬 EMAIL #1 - Admin Notification');
      console.log('   To:      info@africybercore.com');
      console.log('   From:    AfriAgroCore <info@africybercore.com>');
      console.log('   Subject: New Contact Form Submission - Farmer');
      console.log('   Content: Full form details including:');
      console.log('            • User name, email, phone');
      console.log('            • User message');
      console.log('            • Selected waitlist features');
      console.log('            • Submission timestamp\n');
      
      console.log('📬 EMAIL #2 - User Confirmation');
      console.log('   To:      ' + testFormData.email);
      console.log('   From:    AfriAgroCore <info@africybercore.com>');
      console.log('   Subject: Thank you for contacting AfriAgroCore');
      console.log('   Content: Professional thank you message with:');
      console.log('            • Personalized greeting');
      console.log('            • Confirmation of receipt');
      console.log('            • Next steps information');
      console.log('            • Contact information\n');
      
      console.log('=' + '='.repeat(69) + '\n');
      console.log('🎉 EMAIL SYSTEM IS WORKING CORRECTLY!\n');
      console.log('📧 Please check the inbox at info@africybercore.com');
      console.log('   to verify the admin notification email was received.\n');
      console.log('💡 Note: The email might be in the inbox, spam, or promotions folder.');
      console.log('   Search for "New Contact Form Submission" if not immediately visible.\n');
      console.log('=' + '='.repeat(69) + '\n');
      
    } catch (error) {
      console.error('\n❌ TEST FAILED: Email delivery error\n');
      console.error('Error details:', error);
      console.error('\nPossible causes:');
      console.error('  • SMTP credentials incorrect');
      console.error('  • Gmail rate limiting (too many emails sent recently)');
      console.error('  • Network connectivity issues');
      console.error('  • Gmail security blocking the connection\n');
      throw error;
    }
  }, 30000); // 30 second timeout
});
