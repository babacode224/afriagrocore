import { eq } from "drizzle-orm";
import { farmerProfiles, consultantProfiles, sellerProfiles, InsertFarmerProfile, InsertConsultantProfile, InsertSellerProfile } from "../drizzle/schema";
import { getDb } from "./db";

/**
 * Farmer Profile Operations
 */
export async function createFarmerProfile(data: InsertFarmerProfile) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(farmerProfiles).values(data);
}

export async function getFarmerProfile(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(farmerProfiles).where(eq(farmerProfiles.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateFarmerProfile(userId: number, data: Partial<InsertFarmerProfile>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(farmerProfiles).set(data).where(eq(farmerProfiles.userId, userId));
}

/**
 * Consultant Profile Operations
 */
export async function createConsultantProfile(data: InsertConsultantProfile) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(consultantProfiles).values(data);
}

export async function getConsultantProfile(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(consultantProfiles).where(eq(consultantProfiles.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getVerifiedConsultants() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(consultantProfiles).where(eq(consultantProfiles.verified, "verified"));
}

export async function updateConsultantProfile(userId: number, data: Partial<InsertConsultantProfile>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(consultantProfiles).set(data).where(eq(consultantProfiles.userId, userId));
}

/**
 * Seller Profile Operations
 */
export async function createSellerProfile(data: InsertSellerProfile) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(sellerProfiles).values(data);
}

export async function getSellerProfile(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(sellerProfiles).where(eq(sellerProfiles.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getVerifiedSellers() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(sellerProfiles).where(eq(sellerProfiles.verified, "verified"));
}

export async function updateSellerProfile(userId: number, data: Partial<InsertSellerProfile>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(sellerProfiles).set(data).where(eq(sellerProfiles.userId, userId));
}
