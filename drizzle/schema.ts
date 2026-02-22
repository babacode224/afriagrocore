import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Farmer Profile Table
 */
export const farmerProfiles = mysqlTable("farmer_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  farmName: varchar("farmName", { length: 255 }),
  farmSize: varchar("farmSize", { length: 100 }),
  cropTypes: text("cropTypes"),
  location: varchar("location", { length: 255 }),
  yearsExperience: int("yearsExperience"),
  phoneNumber: varchar("phoneNumber", { length: 20 }),
  bio: text("bio"),
  profilePicture: varchar("profilePicture", { length: 500 }),
  verified: mysqlEnum("verified", ["pending", "verified", "rejected"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FarmerProfile = typeof farmerProfiles.$inferSelect;
export type InsertFarmerProfile = typeof farmerProfiles.$inferInsert;

/**
 * Consultant Profile Table
 */
export const consultantProfiles = mysqlTable("consultant_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  fullName: varchar("fullName", { length: 255 }),
  specializations: text("specializations"),
  certifications: text("certifications"),
  hourlyRate: int("hourlyRate"),
  bio: text("bio"),
  profilePicture: varchar("profilePicture", { length: 500 }),
  availability: varchar("availability", { length: 100 }),
  languages: text("languages"),
  rating: varchar("rating", { length: 10 }),
  verified: mysqlEnum("verified", ["pending", "verified", "rejected"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ConsultantProfile = typeof consultantProfiles.$inferSelect;
export type InsertConsultantProfile = typeof consultantProfiles.$inferInsert;

/**
 * Seller Profile Table
 */
export const sellerProfiles = mysqlTable("seller_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  businessName: varchar("businessName", { length: 255 }),
  registrationNumber: varchar("registrationNumber", { length: 100 }),
  productCategories: text("productCategories"),
  location: varchar("location", { length: 255 }),
  phoneNumber: varchar("phoneNumber", { length: 20 }),
  bio: text("bio"),
  profilePicture: varchar("profilePicture", { length: 500 }),
  rating: varchar("rating", { length: 10 }),
  verified: mysqlEnum("verified", ["pending", "verified", "rejected"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SellerProfile = typeof sellerProfiles.$inferSelect;
export type InsertSellerProfile = typeof sellerProfiles.$inferInsert;

/**
 * Product Categories Table
 */
export const productCategories = mysqlTable("product_categories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  parentId: int("parentId"), // For subcategories
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ProductCategory = typeof productCategories.$inferSelect;
export type InsertProductCategory = typeof productCategories.$inferInsert;

/**
 * Products Table
 */
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  sellerId: int("sellerId").notNull().references(() => users.id),
  categoryId: int("categoryId").notNull().references(() => productCategories.id),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  price: int("price").notNull(), // Price in cents/kobo
  currency: varchar("currency", { length: 3 }).default("NGN").notNull(),
  stock: int("stock").default(0).notNull(),
  unit: varchar("unit", { length: 50 }), // kg, bag, piece, etc.
  images: text("images"), // JSON array of image URLs
  location: varchar("location", { length: 255 }),
  status: mysqlEnum("status", ["draft", "active", "out_of_stock", "archived"]).default("active").notNull(),
  featured: mysqlEnum("featured", ["yes", "no"]).default("no").notNull(),
  views: int("views").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * Shopping Cart Table
 */
export const shoppingCart = mysqlTable("shopping_cart", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  productId: int("productId").notNull().references(() => products.id),
  quantity: int("quantity").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CartItem = typeof shoppingCart.$inferSelect;
export type InsertCartItem = typeof shoppingCart.$inferInsert;

/**
 * Orders Table
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  orderNumber: varchar("orderNumber", { length: 50 }).notNull().unique(),
  buyerId: int("buyerId").notNull().references(() => users.id),
  totalAmount: int("totalAmount").notNull(), // Total in cents/kobo
  currency: varchar("currency", { length: 3 }).default("NGN").notNull(),
  status: mysqlEnum("status", ["pending", "paid", "processing", "shipped", "delivered", "cancelled"]).default("pending").notNull(),
  paymentMethod: varchar("paymentMethod", { length: 50 }), // stripe, paystack, demo
  paymentStatus: mysqlEnum("paymentStatus", ["pending", "completed", "failed", "refunded"]).default("pending").notNull(),
  shippingAddress: text("shippingAddress"), // JSON object
  shippingPhone: varchar("shippingPhone", { length: 20 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Order Items Table
 */
export const orderItems = mysqlTable("order_items", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull().references(() => orders.id),
  productId: int("productId").notNull().references(() => products.id),
  sellerId: int("sellerId").notNull().references(() => users.id),
  quantity: int("quantity").notNull(),
  priceAtPurchase: int("priceAtPurchase").notNull(), // Price in cents/kobo at time of purchase
  currency: varchar("currency", { length: 3 }).default("NGN").notNull(),
  status: mysqlEnum("status", ["pending", "processing", "shipped", "delivered", "cancelled"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

/**
 * Reviews and Ratings Table
 */
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull().references(() => orders.id),
  productId: int("productId").notNull().references(() => products.id),
  buyerId: int("buyerId").notNull().references(() => users.id),
  sellerId: int("sellerId").notNull().references(() => users.id),
  rating: int("rating").notNull(), // 1-5
  review: text("review"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Shipping Tracking Table
 */
export const shippingTracking = mysqlTable("shipping_tracking", {
  id: int("id").autoincrement().primaryKey(),
  orderItemId: int("orderItemId").notNull().references(() => orderItems.id),
  status: varchar("status", { length: 100 }).notNull(),
  location: varchar("location", { length: 255 }),
  notes: text("notes"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type ShippingTracking = typeof shippingTracking.$inferSelect;
export type InsertShippingTracking = typeof shippingTracking.$inferInsert;

/**
 * Contact Submissions Table - Tracks all contact form submissions
 */
export const contactSubmissions = mysqlTable("contact_submissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  role: mysqlEnum("role", ["farmer", "partner", "investor"]).notNull(),
  message: text("message").notNull(),
  waitlistFeatures: text("waitlistFeatures"), // JSON array of selected features
  status: mysqlEnum("status", ["new", "contacted", "closed"]).default("new").notNull(),
  followUpSentAt: timestamp("followUpSentAt"),
  submittedAt: timestamp("submittedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

/**
 * Email Templates Table - Manage email templates with versioning
 */
export const emailTemplates = mysqlTable("email_templates", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["contact_admin", "contact_user", "followup_farmer", "followup_partner", "followup_investor"]).notNull(),
  subject: varchar("subject", { length: 500 }).notNull(),
  body: text("body").notNull(),
  variables: text("variables"), // JSON array of available variables like {{name}}, {{email}}
  isActive: mysqlEnum("isActive", ["yes", "no"]).default("yes").notNull(),
  version: int("version").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EmailTemplate = typeof emailTemplates.$inferSelect;
export type InsertEmailTemplate = typeof emailTemplates.$inferInsert;

/**
 * Email Logs Table - Comprehensive tracking of all sent emails
 */
export const emailLogs = mysqlTable("email_logs", {
  id: int("id").autoincrement().primaryKey(),
  // Email metadata
  emailType: mysqlEnum("emailType", ["admin_notification", "user_confirmation", "follow_up"]).notNull(),
  recipientEmail: varchar("recipientEmail", { length: 320 }).notNull(),
  recipientName: varchar("recipientName", { length: 255 }),
  senderEmail: varchar("senderEmail", { length: 320 }).notNull(),
  
  // Email content
  subject: varchar("subject", { length: 500 }).notNull(),
  bodyHtml: text("bodyHtml").notNull(), // Full HTML content
  bodyText: text("bodyText"), // Plain text version
  
  // Related data
  contactSubmissionId: int("contactSubmissionId").references(() => contactSubmissions.id),
  userRole: mysqlEnum("userRole", ["farmer", "partner", "investor"]),
  waitlistFeatures: text("waitlistFeatures"), // JSON array
  
  // Delivery tracking
  status: mysqlEnum("status", ["queued", "sending", "sent", "failed", "bounced"]).default("queued").notNull(),
  sentAt: timestamp("sentAt"),
  failedAt: timestamp("failedAt"),
  errorMessage: text("errorMessage"),
  attempts: int("attempts").default(0).notNull(),
  
  // SMTP details
  messageId: varchar("messageId", { length: 500 }), // SMTP message ID
  provider: varchar("provider", { length: 50 }), // gmail, resend, sendgrid, etc.
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EmailLog = typeof emailLogs.$inferSelect;
export type InsertEmailLog = typeof emailLogs.$inferInsert;

/**
 * Feedback Submissions Table - For embeddable widget feedback
 */
export const feedbackSubmissions = mysqlTable("feedback_submissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phoneNumber: varchar("phoneNumber", { length: 20 }).notNull(),
  rating: int("rating").notNull(), // 1-5 stars
  comment: text("comment").notNull(),
  sourceUrl: varchar("sourceUrl", { length: 1000 }), // URL where widget was embedded
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  emailSent: mysqlEnum("emailSent", ["yes", "no"]).default("no").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type FeedbackSubmission = typeof feedbackSubmissions.$inferSelect;
export type InsertFeedbackSubmission = typeof feedbackSubmissions.$inferInsert;
