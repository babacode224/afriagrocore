import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { sendAdminNotification, sendUserConfirmation } from "./lib/email";
import { emailQueue } from "./lib/emailQueue";
import { getDb } from "./db";
import { contactSubmissions } from "../drizzle/schema";

export const contactRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        phone: z.string().optional(),
        role: z.enum(["farmer", "partner", "investor"]),
        message: z.string().min(10, "Message must be at least 10 characters"),
        waitlistFeatures: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Save submission to database
        const db = await getDb();
        
        if (db) {
          await db.insert(contactSubmissions).values({
            name: input.name,
            email: input.email,
            phone: input.phone,
            role: input.role,
            message: input.message,
            waitlistFeatures: input.waitlistFeatures ? JSON.stringify(input.waitlistFeatures) : null,
            status: "new",
          });
        }

        // Add email to queue for reliable delivery with retry logic
        // This prevents SMTP timeouts from blocking the API response
        const emailJobId = await emailQueue.addToQueue('contact_form', {
          name: input.name,
          email: input.email,
          phone: input.phone,
          role: input.role,
          message: input.message,
          waitlistFeatures: input.waitlistFeatures,
        });
        
        console.log(`[ContactRouter] Contact form submission saved and email queued (job ID: ${emailJobId}`);

        return {
          success: true,
          message: "Thank you for contacting us! We'll get back to you within 24 hours.",
        };
      } catch (error) {
        console.error("Error processing contact form:", error);
        
        // Log error but don't expose internal details to user
        console.error("[ContactRouter] Error details:", error);
        
        // Check if it's a database error or email error
        if (error instanceof Error) {
          if (error.message.includes('database')) {
            throw new Error('Unable to save your submission. Please try again later.');
          }
          if (error.message.includes('SMTP')) {
            throw new Error('Email service temporarily unavailable. Your message was saved and we\'ll respond soon.');
          }
        }
        
        throw new Error("Unable to process your request. Please try again or contact us directly at info@africybercore.com");
      }
    }),
});
