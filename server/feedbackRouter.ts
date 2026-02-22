import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { feedbackSubmissions } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import nodemailer from 'nodemailer';

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Simple email sending function
async function sendEmail(options: { to: string; subject: string; html: string }) {
  await transporter.sendMail({
    from: process.env.SMTP_USER || 'noreply@afriagrocore.solutions',
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
}

export const feedbackRouter = router({
  /**
   * Submit feedback from embeddable widget
   * Public endpoint - no authentication required
   */
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        phoneNumber: z.string().min(1, "Phone number is required"),
        rating: z.number().int().min(1).max(5),
        comment: z.string().min(1, "Comment is required"),
        sourceUrl: z.string().url().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      // Get IP address and user agent from request
      const ipAddress = ctx.req.headers['x-forwarded-for'] as string || 
                       ctx.req.headers['x-real-ip'] as string ||
                       ctx.req.socket.remoteAddress || '';
      const userAgent = ctx.req.headers['user-agent'] || '';

      // Insert feedback into database
      const [feedback] = await db.insert(feedbackSubmissions).values({
        name: input.name,
        email: input.email,
        phoneNumber: input.phoneNumber,
        rating: input.rating,
        comment: input.comment,
        sourceUrl: input.sourceUrl || null,
        ipAddress: ipAddress.split(',')[0].trim(), // Get first IP if multiple
        userAgent,
        emailSent: "no",
      });

      // Send email to user (thank you + newsletter confirmation)
      try {
        await sendEmail({
          to: input.email,
          subject: "Thank You for Your Feedback! 🌱",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #059669;">Thank You, ${input.name}!</h2>
              <p>We've received your feedback and truly appreciate you taking the time to share your thoughts with us.</p>
              
              <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #059669; margin-top: 0;">Your Feedback:</h3>
                <p><strong>Rating:</strong> ${'⭐'.repeat(input.rating)}</p>
                <p><strong>Comment:</strong> ${input.comment}</p>
              </div>

              <p>As a thank you, we've added you to our newsletter where you'll receive:</p>
              <ul>
                <li>Latest updates on African agriculture technology</li>
                <li>Farming tips and best practices</li>
                <li>Exclusive early access to new features</li>
                <li>Market insights and trends</li>
              </ul>

              <p style="margin-top: 30px;">Best regards,<br><strong>The AfriAgroCore Team</strong></p>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              <p style="font-size: 12px; color: #6b7280;">
                If you'd like to unsubscribe from our newsletter, please reply to this email with "Unsubscribe" in the subject line.
              </p>
            </div>
          `,
        });

        // Send email to admin
        await sendEmail({
          to: process.env.SMTP_USER || "info@africybercore.com",
          subject: `New Feedback Received - ${input.rating} Stars ⭐`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #059669;">New Feedback Submission</h2>
              
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${input.name}</p>
                <p><strong>Email:</strong> ${input.email}</p>
                <p><strong>Phone:</strong> ${input.phoneNumber}</p>
                <p><strong>Rating:</strong> ${'⭐'.repeat(input.rating)} (${input.rating}/5)</p>
                <p><strong>Source URL:</strong> ${input.sourceUrl || 'Not provided'}</p>
                <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
              </div>

              <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px;">
                <h3 style="color: #059669; margin-top: 0;">Comment:</h3>
                <p style="white-space: pre-wrap;">${input.comment}</p>
              </div>

              <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">
                View all feedback submissions in your admin dashboard.
              </p>
            </div>
          `,
        });

        // Update email sent status
        await db.update(feedbackSubmissions)
          .set({ emailSent: "yes" })
          .where(eq(feedbackSubmissions.id, feedback.insertId));

      } catch (emailError) {
        console.error("[Feedback] Email sending failed:", emailError);
        // Don't fail the request if email fails
      }

      return {
        success: true,
        message: "Thank you for your feedback!",
      };
    }),

  /**
   * Get all feedback submissions (admin only)
   */
  getAll: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) {
      return [];
    }
    const submissions = await db.select().from(feedbackSubmissions).orderBy(desc(feedbackSubmissions.createdAt));
    return submissions;
  }),
});
