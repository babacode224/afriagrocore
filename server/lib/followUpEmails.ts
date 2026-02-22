import nodemailer from 'nodemailer';
import { logEmail } from './emailLogger';

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
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
};

const createTransporter = () => {
  if (!emailConfig.auth.user || !emailConfig.auth.pass) {
    throw new Error('SMTP credentials not configured.');
  }
  return nodemailer.createTransport(emailConfig);
};

interface FollowUpEmailData {
  name: string;
  email: string;
  role: 'farmer' | 'partner' | 'investor';
}

/**
 * Send follow-up email to farmer
 */
async function sendFarmerFollowUp(data: FollowUpEmailData) {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: `"AfriAgroCore" <${emailConfig.auth.user}>`,
    to: data.email,
    subject: 'Exclusive Farming Tips & AI Tools from AfriAgroCore',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 40px 30px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; }
          .tip-box { background: #f0fdf4; border-left: 4px solid #059669; padding: 20px; margin: 20px 0; border-radius: 4px; }
          .cta-button { display: inline-block; background: #059669; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
          .feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
          .feature-card { background: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; }
          .footer { text-align: center; color: #94a3b8; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">🌾 Welcome Back, ${data.name}!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Your journey to smarter farming starts here</p>
          </div>
          <div class="content">
            <p style="font-size: 16px; color: #475569;">
              Thank you for reaching out to AfriAgroCore! We're excited to help you transform your farming operations with AI-powered solutions.
            </p>
            
            <div class="tip-box">
              <h3 style="color: #059669; margin: 0 0 15px 0;">🚀 Did You Know?</h3>
              <p style="margin: 0; color: #475569;">
                Our AI Disease Detection tool is <strong>already live</strong> and has helped over 12,000 farmers detect crop diseases 2-3 weeks before visible symptoms, increasing yields by an average of 28%!
              </p>
            </div>
            
            <h3 style="color: #059669; margin: 30px 0 15px 0;">🎯 Quick Farming Tips from Our Experts:</h3>
            <ul style="color: #475569; line-height: 1.8;">
              <li><strong>Early Detection Saves Crops:</strong> Check your crops weekly for signs of stress. Our AI tool can help you spot diseases before they spread.</li>
              <li><strong>Soil Health Matters:</strong> Test your soil pH every season. Optimal pH levels can increase yields by 15-20%.</li>
              <li><strong>Water Management:</strong> Use drip irrigation to save up to 50% water while improving crop health.</li>
              <li><strong>Crop Rotation:</strong> Rotate crops annually to prevent soil depletion and reduce pest buildup.</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://41.79.5.8:5173/" class="cta-button">Try AI Disease Detection Now →</a>
            </div>
            
            <h3 style="color: #059669; margin: 30px 0 15px 0;">🌟 Coming Soon Features:</h3>
            <div class="feature-grid">
              <div class="feature-card">
                <strong style="color: #059669;">🌤️ Climate Forecasting</strong>
                <p style="margin: 5px 0 0 0; font-size: 14px; color: #64748b;">7-day hyperlocal weather predictions</p>
              </div>
              <div class="feature-card">
                <strong style="color: #059669;">📊 Yield Optimization</strong>
                <p style="margin: 5px 0 0 0; font-size: 14px; color: #64748b;">AI-powered crop yield predictions</p>
              </div>
              <div class="feature-card">
                <strong style="color: #059669;">🌱 Soil Health Monitoring</strong>
                <p style="margin: 5px 0 0 0; font-size: 14px; color: #64748b;">Real-time soil nutrient analysis</p>
              </div>
              <div class="feature-card">
                <strong style="color: #059669;">🎤 Voice Assistant</strong>
                <p style="margin: 5px 0 0 0; font-size: 14px; color: #64748b;">Multilingual farming advice</p>
              </div>
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 6px; margin-top: 30px;">
              <h4 style="color: #059669; margin: 0 0 10px 0;">📞 Need Personalized Assistance?</h4>
              <p style="margin: 0; color: #475569;">
                Our team is here to help you get started. Reply to this email or call us at <strong>+234 (0) 8167205221</strong>
              </p>
            </div>
            
            <p style="margin-top: 30px; color: #475569;">
              We're committed to helping African farmers thrive with technology. Start using our AI Disease Detection tool today and see the difference!
            </p>
            
            <p style="color: #475569; margin-top: 20px;">
              Best regards,<br>
              <strong>The AfriAgroCore Team</strong><br>
              Transforming African Agriculture with AI
            </p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} AfriAgroCore. All rights reserved.</p>
            <p>Lagos, Nigeria | info@africybercore.com</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
  
  const info = await transporter.sendMail(mailOptions);
  
  // Log email
  await logEmail({
    emailType: 'follow_up',
    recipientEmail: data.email,
    recipientName: data.name,
    senderEmail: emailConfig.auth.user || '',
    subject: mailOptions.subject || '',
    bodyHtml: mailOptions.html || '',
    bodyText: 'Follow-up email for farmer',
    userRole: 'farmer',
    messageId: info.messageId,
  });
}

/**
 * Send follow-up email to partner
 */
async function sendPartnerFollowUp(data: FollowUpEmailData) {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: `"AfriAgroCore" <${emailConfig.auth.user}>`,
    to: data.email,
    subject: 'Partnership Opportunities with AfriAgroCore',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 40px 30px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; }
          .highlight-box { background: #f0fdf4; border-left: 4px solid #059669; padding: 20px; margin: 20px 0; border-radius: 4px; }
          .cta-button { display: inline-block; background: #059669; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
          .partnership-model { background: #f8fafc; padding: 20px; border-radius: 6px; margin: 15px 0; border: 1px solid #e2e8f0; }
          .footer { text-align: center; color: #94a3b8; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">🤝 Let's Transform Agriculture Together</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Partnership Opportunities at AfriAgroCore</p>
          </div>
          <div class="content">
            <p style="font-size: 16px; color: #475569;">
              Dear ${data.name},
            </p>
            
            <p style="font-size: 16px; color: #475569;">
              Thank you for your interest in partnering with AfriAgroCore. We're building the future of African agriculture, and we'd love to have you join us on this transformative journey.
            </p>
            
            <div class="highlight-box">
              <h3 style="color: #059669; margin: 0 0 10px 0;">📊 Our Impact So Far:</h3>
              <ul style="margin: 10px 0; color: #475569;">
                <li><strong>12,400+ farmers</strong> using our platform</li>
                <li><strong>47,000+ crops</strong> analyzed with AI</li>
                <li><strong>28% average yield increase</strong> for our users</li>
                <li><strong>Operating in 8 African countries</strong></li>
              </ul>
            </div>
            
            <h3 style="color: #059669; margin: 30px 0 15px 0;">🌟 Partnership Models:</h3>
            
            <div class="partnership-model">
              <h4 style="color: #059669; margin: 0 0 10px 0;">1. Technology Integration</h4>
              <p style="margin: 0; color: #475569;">
                Integrate our AI solutions into your existing agricultural platforms or services. White-label options available.
              </p>
            </div>
            
            <div class="partnership-model">
              <h4 style="color: #059669; margin: 0 0 10px 0;">2. Distribution Partnership</h4>
              <p style="margin: 0; color: #475569;">
                Help us reach more farmers through your network. Earn revenue share on every subscription.
              </p>
            </div>
            
            <div class="partnership-model">
              <h4 style="color: #059669; margin: 0 0 10px 0;">3. Research & Development</h4>
              <p style="margin: 0; color: #475569;">
                Collaborate on agricultural research, data collection, and AI model training for African crops.
              </p>
            </div>
            
            <div class="partnership-model">
              <h4 style="color: #059669; margin: 0 0 10px 0;">4. Government & NGO Programs</h4>
              <p style="margin: 0; color: #475569;">
                Deploy our solutions as part of agricultural development programs and farmer support initiatives.
              </p>
            </div>
            
            <h3 style="color: #059669; margin: 30px 0 15px 0;">💼 Why Partner with Us?</h3>
            <ul style="color: #475569; line-height: 1.8;">
              <li><strong>Proven Technology:</strong> AI models trained on 100,000+ African crop images</li>
              <li><strong>Scalable Platform:</strong> Cloud infrastructure supporting millions of users</li>
              <li><strong>Local Expertise:</strong> Deep understanding of African farming challenges</li>
              <li><strong>Flexible Integration:</strong> APIs, SDKs, and white-label solutions available</li>
              <li><strong>Revenue Opportunities:</strong> Multiple monetization models for partners</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:info@africybercore.com?subject=Partnership Inquiry - ${data.name}" class="cta-button">Schedule Partnership Discussion →</a>
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 6px; margin-top: 30px;">
              <h4 style="color: #059669; margin: 0 0 10px 0;">📞 Next Steps:</h4>
              <ol style="margin: 10px 0; color: #475569;">
                <li>Reply to this email to schedule a partnership call</li>
                <li>We'll send you our partnership deck and case studies</li>
                <li>We'll discuss custom solutions for your needs</li>
                <li>Sign partnership agreement and start integration</li>
              </ol>
            </div>
            
            <p style="margin-top: 30px; color: #475569;">
              We're excited about the possibility of working together to transform African agriculture. Let's schedule a call to discuss how we can create value together.
            </p>
            
            <p style="color: #475569; margin-top: 20px;">
              Best regards,<br>
              <strong>The AfriAgroCore Partnership Team</strong><br>
              Email: info@africybercore.com<br>
              Phone: +234 (0) 8167205221
            </p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} AfriAgroCore. All rights reserved.</p>
            <p>Lagos, Nigeria | info@africybercore.com</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
  
  const info = await transporter.sendMail(mailOptions);
  
  // Log email
  await logEmail({
    emailType: 'follow_up',
    recipientEmail: data.email,
    recipientName: data.name,
    senderEmail: emailConfig.auth.user || '',
    subject: mailOptions.subject || '',
    bodyHtml: mailOptions.html || '',
    bodyText: 'Follow-up email for partner',
    userRole: 'partner',
    messageId: info.messageId,
  });
}

/**
 * Send follow-up email to investor
 */
async function sendInvestorFollowUp(data: FollowUpEmailData) {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: `"AfriAgroCore" <${emailConfig.auth.user}>`,
    to: data.email,
    subject: 'Investment Opportunity: AfriAgroCore Pitch Deck & Details',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 40px 30px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; }
          .metric-box { background: #f0fdf4; padding: 20px; margin: 20px 0; border-radius: 6px; border: 1px solid #059669; }
          .metric { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
          .cta-button { display: inline-block; background: #059669; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
          .highlight { background: #fef3c7; padding: 2px 6px; border-radius: 3px; }
          .footer { text-align: center; color: #94a3b8; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">💰 Investment Opportunity</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Transforming African Agriculture with AI</p>
          </div>
          <div class="content">
            <p style="font-size: 16px; color: #475569;">
              Dear ${data.name},
            </p>
            
            <p style="font-size: 16px; color: #475569;">
              Thank you for your interest in AfriAgroCore. We're building the leading AI-powered agricultural platform for Africa, and we're excited to share our investment opportunity with you.
            </p>
            
            <div class="metric-box">
              <h3 style="color: #059669; margin: 0 0 15px 0;">📈 Key Metrics (Current):</h3>
              <div class="metric">
                <span style="color: #64748b;">Active Users</span>
                <strong style="color: #059669;">12,400+ farmers</strong>
              </div>
              <div class="metric">
                <span style="color: #64748b;">Crops Analyzed</span>
                <strong style="color: #059669;">47,000+</strong>
              </div>
              <div class="metric">
                <span style="color: #64748b;">Average Yield Increase</span>
                <strong style="color: #059669;">28%</strong>
              </div>
              <div class="metric">
                <span style="color: #64748b;">Countries Operating</span>
                <strong style="color: #059669;">8 African nations</strong>
              </div>
              <div class="metric" style="border-bottom: none;">
                <span style="color: #64748b;">AI Model Accuracy</span>
                <strong style="color: #059669;">94%</strong>
              </div>
            </div>
            
            <h3 style="color: #059669; margin: 30px 0 15px 0;">🎯 The Opportunity:</h3>
            <p style="color: #475569;">
              Africa's agriculture market is projected to reach <span class="highlight"><strong>$1 trillion by 2030</strong></span>, yet smallholder farmers (who produce 70% of Africa's food) lack access to modern technology. AfriAgroCore bridges this gap with AI-powered solutions designed specifically for African farming conditions.
            </p>
            
            <h3 style="color: #059669; margin: 30px 0 15px 0;">💡 Our Competitive Advantages:</h3>
            <ul style="color: #475569; line-height: 1.8;">
              <li><strong>Offline-First Technology:</strong> Works without internet connectivity</li>
              <li><strong>Multilingual AI:</strong> Supports 15 African languages</li>
              <li><strong>Local Expertise:</strong> Models trained on African crop data</li>
              <li><strong>Proven Traction:</strong> 12,400+ active users with 28% yield improvements</li>
              <li><strong>Multiple Revenue Streams:</strong> Subscriptions, partnerships, data licensing</li>
            </ul>
            
            <h3 style="color: #059669; margin: 30px 0 15px 0;">📊 Market Size & Growth:</h3>
            <ul style="color: #475569; line-height: 1.8;">
              <li><strong>TAM:</strong> $1 trillion African agriculture market by 2030</li>
              <li><strong>SAM:</strong> 33 million smallholder farmers in Sub-Saharan Africa</li>
              <li><strong>SOM:</strong> Targeting 1 million users by 2027</li>
              <li><strong>Growth Rate:</strong> 15% CAGR in African AgTech sector</li>
            </ul>
            
            <div style="background: #f0fdf4; border-left: 4px solid #059669; padding: 20px; margin: 20px 0; border-radius: 4px;">
              <h4 style="color: #059669; margin: 0 0 10px 0;">📄 Investment Documents Available:</h4>
              <ul style="margin: 10px 0; color: #475569;">
                <li>Executive Summary & Pitch Deck</li>
                <li>Financial Projections (3-year model)</li>
                <li>Market Analysis & Competitive Landscape</li>
                <li>Technology Overview & IP Portfolio</li>
                <li>Team Bios & Advisory Board</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:info@africybercore.com?subject=Investment Inquiry - ${data.name}" class="cta-button">Request Full Pitch Deck →</a>
            </div>
            
            <h3 style="color: #059669; margin: 30px 0 15px 0;">🚀 Use of Funds:</h3>
            <ul style="color: #475569; line-height: 1.8;">
              <li><strong>40%</strong> - Product Development (Climate Forecasting, Yield Optimization)</li>
              <li><strong>30%</strong> - Market Expansion (New countries, farmer onboarding)</li>
              <li><strong>20%</strong> - Team Growth (Engineers, agronomists, sales)</li>
              <li><strong>10%</strong> - Operations & Infrastructure</li>
            </ul>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 6px; margin-top: 30px;">
              <h4 style="color: #059669; margin: 0 0 10px 0;">📞 Next Steps:</h4>
              <ol style="margin: 10px 0; color: #475569;">
                <li>Reply to this email to request our full pitch deck</li>
                <li>Schedule a call with our founding team</li>
                <li>Review financials and due diligence materials</li>
                <li>Discuss investment terms and structure</li>
              </ol>
            </div>
            
            <p style="margin-top: 30px; color: #475569;">
              We're raising our Series A to accelerate growth across Africa. This is a unique opportunity to invest in a high-impact, high-growth AgTech company solving real problems for millions of farmers.
            </p>
            
            <p style="color: #475569; margin-top: 20px;">
              Looking forward to discussing this opportunity with you.
            </p>
            
            <p style="color: #475569; margin-top: 20px;">
              Best regards,<br>
              <strong>The AfriAgroCore Investment Team</strong><br>
              Email: info@africybercore.com<br>
              Phone: +234 (0) 8167205221
            </p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} AfriAgroCore. All rights reserved.</p>
            <p>Lagos, Nigeria | info@africybercore.com</p>
            <p style="margin-top: 10px; font-size: 11px;">This email contains confidential information intended only for the recipient.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
  
  const info = await transporter.sendMail(mailOptions);
  
  // Log email
  await logEmail({
    emailType: 'follow_up',
    recipientEmail: data.email,
    recipientName: data.name,
    senderEmail: emailConfig.auth.user || '',
    subject: mailOptions.subject || '',
    bodyHtml: mailOptions.html || '',
    bodyText: 'Follow-up email for investor',
    userRole: 'investor',
    messageId: info.messageId,
  });
}

/**
 * Send follow-up email based on role
 */
export async function sendFollowUpEmail(data: FollowUpEmailData) {
  try {
    switch (data.role) {
      case 'farmer':
        await sendFarmerFollowUp(data);
        break;
      case 'partner':
        await sendPartnerFollowUp(data);
        break;
      case 'investor':
        await sendInvestorFollowUp(data);
        break;
      default:
        throw new Error(`Unknown role: ${data.role}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error sending follow-up email:', error);
    throw error;
  }
}
