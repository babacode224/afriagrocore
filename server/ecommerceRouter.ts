import { z } from "zod";
import { protectedProcedure, publicProcedure, adminProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { 
  productCategories, 
  products, 
  shoppingCart, 
  orders, 
  orderItems,
  reviews,
  shippingTracking,
  sellerProfiles
} from "../drizzle/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const ecommerceRouter = router({
  // ============= PRODUCT CATEGORIES =============
  categories: router({
    list: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
      return await db.select().from(productCategories).orderBy(productCategories.name);
    }),

    create: adminProcedure
      .input(z.object({
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
        parentId: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
        const [category] = await db.insert(productCategories).values(input);
        return category;
      }),
  }),

  // ============= PRODUCTS =============
  products: router({
    list: publicProcedure
      .input(z.object({
        categoryId: z.number().optional(),
        sellerId: z.number().optional(),
        status: z.enum(["draft", "active", "out_of_stock", "archived"]).optional(),
        limit: z.number().default(50),
        offset: z.number().default(0),
      }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
        
        // Build where conditions
        const conditions = [];
        if (input.categoryId) {
          conditions.push(eq(products.categoryId, input.categoryId));
        }
        if (input.sellerId) {
          conditions.push(eq(products.sellerId, input.sellerId));
        }
        if (input.status) {
          conditions.push(eq(products.status, input.status));
        }

        let query = db.select({
          id: products.id,
          sellerId: products.sellerId,
          categoryId: products.categoryId,
          name: products.name,
          slug: products.slug,
          description: products.description,
          price: products.price,
          currency: products.currency,
          stock: products.stock,
          unit: products.unit,
          images: products.images,
          location: products.location,
          status: products.status,
          featured: products.featured,
          views: products.views,
          createdAt: products.createdAt,
          updatedAt: products.updatedAt,
          sellerName: sellerProfiles.businessName,
          sellerRating: sellerProfiles.rating,
        })
        .from(products)
        .leftJoin(sellerProfiles, eq(products.sellerId, sellerProfiles.userId))
        .orderBy(desc(products.createdAt))
        .limit(input.limit)
        .offset(input.offset);

        if (conditions.length > 0) {
          query = query.where(and(...conditions)) as any;
        }

        return await query;
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
        
        const [product] = await db.select({
          id: products.id,
          sellerId: products.sellerId,
          categoryId: products.categoryId,
          name: products.name,
          slug: products.slug,
          description: products.description,
          price: products.price,
          currency: products.currency,
          stock: products.stock,
          unit: products.unit,
          images: products.images,
          location: products.location,
          status: products.status,
          featured: products.featured,
          views: products.views,
          createdAt: products.createdAt,
          updatedAt: products.updatedAt,
          sellerName: sellerProfiles.businessName,
          sellerRating: sellerProfiles.rating,
          sellerLocation: sellerProfiles.location,
        })
        .from(products)
        .leftJoin(sellerProfiles, eq(products.sellerId, sellerProfiles.userId))
        .where(eq(products.id, input.id));

        if (!product) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
        }

        // Increment view count
        await db.update(products)
          .set({ views: sql`${products.views} + 1` })
          .where(eq(products.id, input.id));

        return product;
      }),

    create: protectedProcedure
      .input(z.object({
        categoryId: z.number(),
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        price: z.number(),
        currency: z.string().default("NGN"),
        stock: z.number(),
        unit: z.string().optional(),
        images: z.string().optional(),
        location: z.string().optional(),
        status: z.enum(["draft", "active", "out_of_stock", "archived"]).default("active"),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
        
        // Check if user has seller profile
        const [sellerProfile] = await db.select()
          .from(sellerProfiles)
          .where(eq(sellerProfiles.userId, ctx.user.id));

        if (!sellerProfile) {
          throw new TRPCError({ 
            code: "FORBIDDEN", 
            message: "You must have a seller profile to create products" 
          });
        }

        const [product] = await db.insert(products).values({
          ...input,
          sellerId: ctx.user.id,
        });

        return product;
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        categoryId: z.number().optional(),
        name: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
        stock: z.number().optional(),
        unit: z.string().optional(),
        images: z.string().optional(),
        location: z.string().optional(),
        status: z.enum(["draft", "active", "out_of_stock", "archived"]).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
        
        const { id, ...updateData } = input;

        // Verify ownership
        const [product] = await db.select()
          .from(products)
          .where(eq(products.id, id));

        if (!product) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
        }

        if (product.sellerId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN", message: "You can only update your own products" });
        }

        await db.update(products)
          .set(updateData)
          .where(eq(products.id, id));

        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
        
        // Verify ownership
        const [product] = await db.select()
          .from(products)
          .where(eq(products.id, input.id));

        if (!product) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
        }

        if (product.sellerId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN", message: "You can only delete your own products" });
        }

        await db.delete(products).where(eq(products.id, input.id));
        return { success: true };
      }),
  }),

  // ============= SHOPPING CART =============
  cart: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
      
      const cartItems = await db.select({
        id: shoppingCart.id,
        productId: shoppingCart.productId,
        quantity: shoppingCart.quantity,
        productName: products.name,
        productPrice: products.price,
        productCurrency: products.currency,
        productImages: products.images,
        productStock: products.stock,
        productUnit: products.unit,
        sellerId: products.sellerId,
        sellerName: sellerProfiles.businessName,
      })
      .from(shoppingCart)
      .leftJoin(products, eq(shoppingCart.productId, products.id))
      .leftJoin(sellerProfiles, eq(products.sellerId, sellerProfiles.userId))
      .where(eq(shoppingCart.userId, ctx.user.id));

      return cartItems;
    }),

    add: protectedProcedure
      .input(z.object({
        productId: z.number(),
        quantity: z.number().default(1),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
        
        // Check if product exists and has stock
        const [product] = await db.select()
          .from(products)
          .where(eq(products.id, input.productId));

        if (!product) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
        }

        if (product.stock < input.quantity) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Insufficient stock" });
        }

        // Check if item already in cart
        const [existingItem] = await db.select()
          .from(shoppingCart)
          .where(and(
            eq(shoppingCart.userId, ctx.user.id),
            eq(shoppingCart.productId, input.productId)
          ));

        if (existingItem) {
          // Update quantity
          await db.update(shoppingCart)
            .set({ quantity: existingItem.quantity + input.quantity })
            .where(eq(shoppingCart.id, existingItem.id));
        } else {
          // Add new item
          await db.insert(shoppingCart).values({
            userId: ctx.user.id,
            productId: input.productId,
            quantity: input.quantity,
          });
        }

        return { success: true };
      }),

    updateQuantity: protectedProcedure
      .input(z.object({
        cartItemId: z.number(),
        quantity: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
        
        // Verify ownership
        const [cartItem] = await db.select()
          .from(shoppingCart)
          .where(eq(shoppingCart.id, input.cartItemId));

        if (!cartItem) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Cart item not found" });
        }

        if (cartItem.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Unauthorized" });
        }

        await db.update(shoppingCart)
          .set({ quantity: input.quantity })
          .where(eq(shoppingCart.id, input.cartItemId));

        return { success: true };
      }),

    remove: protectedProcedure
      .input(z.object({ cartItemId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
        
        // Verify ownership
        const [cartItem] = await db.select()
          .from(shoppingCart)
          .where(eq(shoppingCart.id, input.cartItemId));

        if (!cartItem) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Cart item not found" });
        }

        if (cartItem.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Unauthorized" });
        }

        await db.delete(shoppingCart).where(eq(shoppingCart.id, input.cartItemId));
        return { success: true };
      }),

    clear: protectedProcedure.mutation(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
      
      await db.delete(shoppingCart).where(eq(shoppingCart.userId, ctx.user.id));
      return { success: true };
    }),
  }),

  // ============= ORDERS =============
  orders: router({
    create: protectedProcedure
      .input(z.object({
        shippingAddress: z.string(),
        shippingPhone: z.string(),
        paymentMethod: z.string(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
        
        // Get cart items
        const cartItems = await db.select({
          productId: shoppingCart.productId,
          quantity: shoppingCart.quantity,
          price: products.price,
          currency: products.currency,
          sellerId: products.sellerId,
          stock: products.stock,
        })
        .from(shoppingCart)
        .leftJoin(products, eq(shoppingCart.productId, products.id))
        .where(eq(shoppingCart.userId, ctx.user.id));

        if (cartItems.length === 0) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Cart is empty" });
        }

        // Check stock availability
        for (const item of cartItems) {
          if (item.stock! < item.quantity) {
            throw new TRPCError({ 
              code: "BAD_REQUEST", 
              message: `Insufficient stock for product ${item.productId}` 
            });
          }
        }

        // Calculate total
        const totalAmount = cartItems.reduce((sum: number, item) => sum + (item.price! * item.quantity), 0);

        // Generate order number
        const orderNumber = `ORD-${Date.now()}-${ctx.user.id}`;

        // Create order
        const [order] = await db.insert(orders).values({
          orderNumber,
          buyerId: ctx.user.id,
          totalAmount,
          currency: cartItems[0].currency!,
          shippingAddress: input.shippingAddress,
          shippingPhone: input.shippingPhone,
          paymentMethod: input.paymentMethod,
          notes: input.notes,
          status: "pending",
          paymentStatus: input.paymentMethod === "demo" ? "completed" : "pending",
        });

        // Create order items
        for (const item of cartItems) {
          await db.insert(orderItems).values({
            orderId: order.insertId,
            productId: item.productId,
            sellerId: item.sellerId!,
            quantity: item.quantity,
            priceAtPurchase: item.price!,
            currency: item.currency!,
          });

          // Update product stock
          await db.update(products)
            .set({ stock: sql`${products.stock} - ${item.quantity}` })
            .where(eq(products.id, item.productId));
        }

        // Clear cart
        await db.delete(shoppingCart).where(eq(shoppingCart.userId, ctx.user.id));

        // If demo payment, mark as paid
        if (input.paymentMethod === "demo") {
          await db.update(orders)
            .set({ status: "paid", paymentStatus: "completed" })
            .where(eq(orders.id, order.insertId));
        }

        return { orderId: order.insertId, orderNumber };
      }),

    list: protectedProcedure
      .input(z.object({
        type: z.enum(["buyer", "seller"]),
      }))
      .query(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
        
        if (input.type === "buyer") {
          return await db.select()
            .from(orders)
            .where(eq(orders.buyerId, ctx.user.id))
            .orderBy(desc(orders.createdAt));
        } else {
          // Get orders containing seller's products
          const sellerOrders = await db.select({
            orderId: orderItems.orderId,
            orderNumber: orders.orderNumber,
            totalAmount: orders.totalAmount,
            currency: orders.currency,
            status: orders.status,
            paymentStatus: orders.paymentStatus,
            createdAt: orders.createdAt,
          })
          .from(orderItems)
          .leftJoin(orders, eq(orderItems.orderId, orders.id))
          .where(eq(orderItems.sellerId, ctx.user.id))
          .orderBy(desc(orders.createdAt));

          return sellerOrders;
        }
      }),

    getById: protectedProcedure
      .input(z.object({ orderId: z.number() }))
      .query(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
        
        const [order] = await db.select()
          .from(orders)
          .where(eq(orders.id, input.orderId));

        if (!order) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Order not found" });
        }

        // Verify access
        if (order.buyerId !== ctx.user.id) {
          // Check if user is a seller in this order
          const [sellerItem] = await db.select()
            .from(orderItems)
            .where(and(
              eq(orderItems.orderId, input.orderId),
              eq(orderItems.sellerId, ctx.user.id)
            ));

          if (!sellerItem) {
            throw new TRPCError({ code: "FORBIDDEN", message: "Unauthorized" });
          }
        }

        // Get order items
        const items = await db.select({
          id: orderItems.id,
          productId: orderItems.productId,
          quantity: orderItems.quantity,
          priceAtPurchase: orderItems.priceAtPurchase,
          currency: orderItems.currency,
          status: orderItems.status,
          productName: products.name,
          productImages: products.images,
          sellerName: sellerProfiles.businessName,
        })
        .from(orderItems)
        .leftJoin(products, eq(orderItems.productId, products.id))
        .leftJoin(sellerProfiles, eq(orderItems.sellerId, sellerProfiles.userId))
        .where(eq(orderItems.orderId, input.orderId));

        return { order, items };
      }),

    updateStatus: protectedProcedure
      .input(z.object({
        orderItemId: z.number(),
        status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
        
        // Verify seller owns this order item
        const [orderItem] = await db.select()
          .from(orderItems)
          .where(eq(orderItems.id, input.orderItemId));

        if (!orderItem) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Order item not found" });
        }

        if (orderItem.sellerId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Unauthorized" });
        }

        await db.update(orderItems)
          .set({ status: input.status })
          .where(eq(orderItems.id, input.orderItemId));

        return { success: true };
      }),
  }),

  // ============= REVIEWS =============
  reviews: router({
    create: protectedProcedure
      .input(z.object({
        orderId: z.number(),
        productId: z.number(),
        sellerId: z.number(),
        rating: z.number().min(1).max(5),
        review: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
        
        // Verify order belongs to user and is delivered
        const [order] = await db.select()
          .from(orders)
          .where(eq(orders.id, input.orderId));

        if (!order) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Order not found" });
        }

        if (order.buyerId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Unauthorized" });
        }

        if (order.status !== "delivered") {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Can only review delivered orders" });
        }

        // Check if review already exists
        const [existingReview] = await db.select()
          .from(reviews)
          .where(and(
            eq(reviews.orderId, input.orderId),
            eq(reviews.productId, input.productId),
            eq(reviews.buyerId, ctx.user.id)
          ));

        if (existingReview) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Review already exists" });
        }

        await db.insert(reviews).values({
          orderId: input.orderId,
          productId: input.productId,
          buyerId: ctx.user.id,
          sellerId: input.sellerId,
          rating: input.rating,
          review: input.review,
        });

        return { success: true };
      }),

    listByProduct: publicProcedure
      .input(z.object({ productId: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
        
        return await db.select()
          .from(reviews)
          .where(eq(reviews.productId, input.productId))
          .orderBy(desc(reviews.createdAt));
      }),
  }),
});
