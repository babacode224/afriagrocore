import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { createFarmerProfile, getFarmerProfile, updateFarmerProfile, createConsultantProfile, getConsultantProfile, updateConsultantProfile, createSellerProfile, getSellerProfile, updateSellerProfile, getVerifiedConsultants, getVerifiedSellers } from "./profiles";

export const profilesRouter = router({
  // Farmer Profile
  farmer: router({
    create: protectedProcedure
      .input(z.object({
        farmName: z.string().optional(),
        farmSize: z.string().optional(),
        cropTypes: z.string().optional(), // JSON string
        location: z.string().optional(),
        yearsExperience: z.number().optional(),
        phoneNumber: z.string().optional(),
        bio: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await createFarmerProfile({
          userId: ctx.user.id,
          ...input,
        });
        return { success: true };
      }),

    get: protectedProcedure.query(async ({ ctx }) => {
      return await getFarmerProfile(ctx.user.id);
    }),

    update: protectedProcedure
      .input(z.object({
        farmName: z.string().optional(),
        farmSize: z.string().optional(),
        cropTypes: z.string().optional(),
        location: z.string().optional(),
        yearsExperience: z.number().optional(),
        phoneNumber: z.string().optional(),
        bio: z.string().optional(),
        profilePicture: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await updateFarmerProfile(ctx.user.id, input);
        return { success: true };
      }),
  }),

  // Consultant Profile
  consultant: router({
    create: protectedProcedure
      .input(z.object({
        fullName: z.string(),
        specializations: z.string().optional(), // JSON string
        certifications: z.string().optional(), // JSON string
        hourlyRate: z.number().optional(),
        bio: z.string().optional(),
        availability: z.string().optional(),
        languages: z.string().optional(), // JSON string
      }))
      .mutation(async ({ ctx, input }) => {
        await createConsultantProfile({
          userId: ctx.user.id,
          ...input,
          rating: "0",
        });
        return { success: true };
      }),

    get: protectedProcedure.query(async ({ ctx }) => {
      return await getConsultantProfile(ctx.user.id);
    }),

    update: protectedProcedure
      .input(z.object({
        fullName: z.string().optional(),
        specializations: z.string().optional(),
        certifications: z.string().optional(),
        hourlyRate: z.number().optional(),
        bio: z.string().optional(),
        availability: z.string().optional(),
        languages: z.string().optional(),
        profilePicture: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await updateConsultantProfile(ctx.user.id, input);
        return { success: true };
      }),

    getVerified: publicProcedure.query(async () => {
      return await getVerifiedConsultants();
    }),
  }),

  // Seller Profile
  seller: router({
    create: protectedProcedure
      .input(z.object({
        businessName: z.string(),
        registrationNumber: z.string().optional(),
        productCategories: z.string().optional(), // JSON string
        location: z.string().optional(),
        phoneNumber: z.string().optional(),
        bio: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await createSellerProfile({
          userId: ctx.user.id,
          ...input,
          rating: "0",
        });
        return { success: true };
      }),

    get: protectedProcedure.query(async ({ ctx }) => {
      return await getSellerProfile(ctx.user.id);
    }),

    update: protectedProcedure
      .input(z.object({
        businessName: z.string().optional(),
        registrationNumber: z.string().optional(),
        productCategories: z.string().optional(),
        location: z.string().optional(),
        phoneNumber: z.string().optional(),
        bio: z.string().optional(),
        profilePicture: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await updateSellerProfile(ctx.user.id, input);
        return { success: true };
      }),

    getVerified: publicProcedure.query(async () => {
      return await getVerifiedSellers();
    }),
  }),
});
