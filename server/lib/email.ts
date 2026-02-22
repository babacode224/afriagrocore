import nodemailer from 'nodemailer';
import { getDb } from '../db';
import { emailLogs } from '../../drizzle/schema';

/**
 * Email service using Gmail SMTP
 */

// Email configuration from environment variables
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // Use STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  // Connection pooling settings
  pool: true,
  maxConnections: 3,
  maxMessages: 10,
  rateDelta: 1000,
  rateLimit: 5,
  // Timeout settings
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
};

// Create reusable transporter
const transporter = nodemailer.createTransport(emailConfig);

// Verify connection on startup
transporter.verify((error: Error | null, success: boolean) => {
  if (error) {
    console.error('[Email] SMTP connection verification failed:', error);
  } else {
    console.log('[Email] SMTP server is ready to send emails');
  }
});

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  role: 'farmer' | 'partner' | 'investor';
  message: string;
  waitlistFeatures?: string[];
}

/**
 * Send admin notification email with contact form data
 */
export async function sendAdminNotification(data: ContactFormData): Promise<void> {
  const fromEmail = process.env.SMTP_USER || 'noreply@afriagrocore.solutions';
  const adminEmail = 'info@africybercore.com';

  const waitlistFeaturesHtml = data.waitlistFeatures && data.waitlistFeatures.length > 0
    ? `
      <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #10b981;">
        <h3 style="margin-top: 0; color: #059669;">Waitlist Features</h3>
        <ul style="margin: 10px 0; padding-left: 20px;">
          ${data.waitlistFeatures.map(feature => `<li style="margin: 5px 0;">${formatFeatureName(feature)}</li>`).join('')}
        </ul>
      </div>
    `
    : '';

  const mailOptions = {
    from: fromEmail,
    to: adminEmail,
    subject: `New Contact Form Submission - ${data.role.charAt(0).toUpperCase() + data.role.slice(1)}`,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
            </div>
            
            <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
              <div style="margin-bottom: 20px;">
                <h2 style="color: #10b981; margin-bottom: 15px; font-size: 20px;">Contact Information</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 120px;">Name:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${data.email}" style="color: #10b981; text-decoration: none;">${data.email}</a></td>
                  </tr>
                  ${data.phone ? `
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Phone:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.phone}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Role:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">
                      <span style="display: inline-block; padding: 5px 15px; background-color: #10b981; color: white; border-radius: 20px; font-size: 14px;">
                        ${data.role.charAt(0).toUpperCase() + data.role.slice(1)}
                      </span>
                    </td>
                  </tr>
                </table>
              </div>

              <div style="margin-top: 25px;">
                <h3 style="color: #10b981; margin-bottom: 10px;">Message:</h3>
                <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
                  ${data.message.replace(/\n/g, '<br>')}
                </div>
              </div>

              ${waitlistFeaturesHtml}

              <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
                <p style="margin: 0;">This email was sent from the AfriAgroCore contact form</p>
                <p style="margin: 5px 0 0 0;">Submitted on ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  
  // Log email to database
  try {
    const db = await getDb();
    if (db) {
      await db.insert(emailLogs).values({
        emailType: 'admin_notification',
        recipientEmail: adminEmail,
        recipientName: 'Admin',
        senderEmail: fromEmail,
        subject: mailOptions.subject || '',
        bodyHtml: mailOptions.html || '',
        bodyText: data.message,
        userRole: data.role,
        waitlistFeatures: data.waitlistFeatures ? JSON.stringify(data.waitlistFeatures) : null,
        status: 'sent',
        sentAt: new Date(),
        messageId: info.messageId,
        provider: 'gmail',
        attempts: 1,
      });
    }
  } catch (logError) {
    console.error('[Email] Failed to log admin notification:', logError);
  }
}

/**
 * Send confirmation email to user
 */
export async function sendUserConfirmation(data: ContactFormData): Promise<void> {
  const fromEmail = process.env.SMTP_USER || 'noreply@afriagrocore.solutions';

  const roleSpecificContent = {
    farmer: {
      title: 'Empowering African Farmers',
      message: 'We\'re excited to help you leverage AI technology to improve your farm\'s productivity and sustainability.',
      benefits: [
        'AI-powered disease and pest detection',
        'Climate-smart farming recommendations',
        'Real-time market price insights',
        'Access to agricultural experts',
      ],
    },
    partner: {
      title: 'Building Strategic Partnerships',
      message: 'Thank you for your interest in partnering with AfriAgroCore. We look forward to exploring collaboration opportunities.',
      benefits: [
        'Expand your reach in African agriculture',
        'Access to our growing farmer network',
        'Co-development opportunities',
        'Joint go-to-market strategies',
      ],
    },
    investor: {
      title: 'Investing in Africa\'s Agricultural Future',
      message: 'Thank you for your interest in AfriAgroCore. We\'re building the future of precision agriculture in Africa.',
      benefits: [
        'Massive $1T+ market opportunity',
        'Proven technology with 94% AI accuracy',
        '12,400+ active users and growing',
        'Strong social and environmental impact',
      ],
    },
  };

  const content = roleSpecificContent[data.role];

  const waitlistSection = data.waitlistFeatures && data.waitlistFeatures.length > 0
    ? `
      <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 10px; border: 2px solid #10b981;">
        <h3 style="color: #059669; margin-top: 0; font-size: 18px;">✨ You're on the Waitlist!</h3>
        <p style="color: #047857; margin: 10px 0;">You've expressed interest in these upcoming features:</p>
        <ul style="margin: 15px 0; padding-left: 20px; color: #065f46;">
          ${data.waitlistFeatures.map(feature => `<li style="margin: 8px 0; font-weight: 500;">${formatFeatureName(feature)}</li>`).join('')}
        </ul>
        <p style="color: #047857; margin: 15px 0 0 0; font-size: 14px;">
          We'll notify you as soon as these features launch! 🚀
        </p>
      </div>
    `
    : '';

  const mailOptions = {
    from: fromEmail,
    to: data.email,
    subject: 'Thank You for Contacting AfriAgroCore',
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f3f4f6;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">AfriAgroCore</h1>
              <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px;">${content.title}</p>
            </div>
            
            <div style="padding: 40px 30px;">
              <h2 style="color: #10b981; margin-top: 0; font-size: 24px;">Hello ${data.name}! 👋</h2>
              
              <p style="font-size: 16px; line-height: 1.8; color: #374151;">
                Thank you for reaching out to us. We've received your message and our team will get back to you within 24 hours.
              </p>

              <p style="font-size: 16px; line-height: 1.8; color: #374151;">
                ${content.message}
              </p>

              <div style="margin: 30px 0; padding: 25px; background-color: #f0fdf4; border-radius: 10px; border-left: 4px solid #10b981;">
                <h3 style="color: #059669; margin-top: 0; font-size: 18px;">What We Offer:</h3>
                <ul style="margin: 15px 0; padding-left: 20px; color: #065f46;">
                  ${content.benefits.map(benefit => `<li style="margin: 10px 0; font-size: 15px;">${benefit}</li>`).join('')}
                </ul>
              </div>

              ${waitlistSection}

              <div style="margin: 35px 0; text-align: center;">
                <a href="http://41.79.5.8:5173/" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);">
                  Try Our AI Disease Detection
                </a>
              </div>

              <div style="margin-top: 35px; padding-top: 25px; border-top: 2px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
                  <strong>Need immediate assistance?</strong><br>
                  Email: <a href="mailto:info@africybercore.com" style="color: #10b981; text-decoration: none;">info@africybercore.com</a><br>
                  Website: <a href="https://afriagrocore.solutions" style="color: #10b981; text-decoration: none;">afriagrocore.solutions</a>
                </p>
              </div>

              <div style="margin-top: 30px; text-align: center; color: #9ca3af; font-size: 13px;">
                <p style="margin: 0;">© 2025 AfriAgroCore. All rights reserved.</p>
                <p style="margin: 10px 0 0 0;">Empowering African Agriculture with AI</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  
  // Log email to database
  try {
    const db = await getDb();
    if (db) {
      await db.insert(emailLogs).values({
        emailType: 'user_confirmation',
        recipientEmail: data.email,
        recipientName: data.name,
        senderEmail: fromEmail,
        subject: mailOptions.subject || '',
        bodyHtml: mailOptions.html || '',
        bodyText: `Thank you for contacting AfriAgroCore. Role: ${data.role}`,
        userRole: data.role,
        waitlistFeatures: data.waitlistFeatures ? JSON.stringify(data.waitlistFeatures) : null,
        status: 'sent',
        sentAt: new Date(),
        messageId: info.messageId,
        provider: 'gmail',
        attempts: 1,
      });
    }
  } catch (logError) {
    console.error('[Email] Failed to log user confirmation:', logError);
  }
}

/**
 * Format feature name for display
 */
function formatFeatureName(feature: string): string {
  const featureNames: Record<string, string> = {
    'climate_forecasting': '🌤️ Climate & Weather Forecasting',
    'yield_optimization': '📈 Yield Optimization AI',
    'soil_health': '🌱 Soil Health Monitoring',
    'market_insights': '💹 Real-Time Market Insights',
    'voice_assistant': '🎤 Multilingual Voice Assistant',
    'expert_network': '👨‍🌾 Expert Consultation Network',
    'marketplace': '🛒 Agro-Chemical Marketplace',
  };
  return featureNames[feature] || feature;
}
