import { describe, it, expect } from 'vitest';
import nodemailer from 'nodemailer';

describe('SMTP Configuration Verification', () => {
  it('should verify SMTP connection to Gmail is configured correctly', async () => {
    console.log('\n' + '='.repeat(70));
    console.log('🔐 SMTP CONNECTION VERIFICATION TEST');
    console.log('='.repeat(70) + '\n');

    const emailConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    };

    console.log('📋 SMTP Configuration:\n');
    console.log('   Host:     ', emailConfig.host);
    console.log('   Port:     ', emailConfig.port);
    console.log('   Secure:   ', emailConfig.secure ? 'Yes (SSL)' : 'No (STARTTLS)');
    console.log('   User:     ', emailConfig.auth.user);
    console.log('   Password: ', emailConfig.auth.pass ? '********** (configured)' : '(NOT SET)');
    console.log('\n' + '-'.repeat(70) + '\n');

    expect(emailConfig.auth.user).toBeTruthy();
    expect(emailConfig.auth.pass).toBeTruthy();
    console.log('✅ SMTP credentials are configured\n');

    console.log('🔌 Testing SMTP connection...\n');

    const transporter = nodemailer.createTransport(emailConfig);

    try {
      // Verify connection without sending email
      await transporter.verify();
      
      console.log('✅ SMTP CONNECTION SUCCESSFUL!\n');
      console.log('=' + '='.repeat(69) + '\n');
      console.log('🎉 EMAIL SYSTEM IS PROPERLY CONFIGURED!\n');
      console.log('📧 Admin Email: info@africybercore.com');
      console.log('📤 Sending Status: READY\n');
      console.log('=' + '='.repeat(69) + '\n');
      console.log('✅ When users submit the contact form:');
      console.log('   1. Admin notification → info@africybercore.com');
      console.log('   2. User confirmation → [user\'s email address]');
      console.log('   3. After 24 hours → Automated follow-up email\n');
      console.log('💡 To test live: Submit the contact form on your website');
      console.log('   and check the inbox at info@africybercore.com\n');
      console.log('=' + '='.repeat(69) + '\n');
      
      expect(true).toBe(true);
      
    } catch (error) {
      console.error('\n❌ SMTP CONNECTION FAILED\n');
      console.error('Error:', error);
      console.error('\nPossible causes:');
      console.error('  • SMTP credentials are incorrect');
      console.error('  • Gmail App Password is invalid');
      console.error('  • Network/firewall blocking SMTP port 587');
      console.error('  • Gmail security settings blocking access\n');
      throw error;
    }
  }, 15000); // 15 second timeout
});
