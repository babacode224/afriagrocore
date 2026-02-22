import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { getDb } from './db';
import { productCategories, products, shoppingCart, orders, orderItems } from '../drizzle/schema';
import { eq, and, desc } from 'drizzle-orm';

describe('E-Commerce Database Tests', () => {
  let db: Awaited<ReturnType<typeof getDb>>;
  let testUserId: number;
  let testCategoryId: number;
  let testProductId: number;
  let testCartItemId: number;
  let testOrderId: number;

  beforeAll(async () => {
    db = await getDb();
    
    // Use a test user ID (assuming users exist from auth system)
    testUserId = 1;
  });

  afterAll(async () => {
    // Cleanup test data
    if (testCartItemId) {
      await db.delete(shoppingCart).where(eq(shoppingCart.id, testCartItemId));
    }
    if (testOrderId) {
      await db.delete(orderItems).where(eq(orderItems.orderId, testOrderId));
      await db.delete(orders).where(eq(orders.id, testOrderId));
    }
    if (testProductId) {
      await db.delete(products).where(eq(products.id, testProductId));
    }
    if (testCategoryId) {
      await db.delete(productCategories).where(eq(productCategories.id, testCategoryId));
    }
  });

  it('should have product categories seeded', async () => {
    const categories = await db.select().from(productCategories);
    
    expect(categories.length).toBeGreaterThan(0);
    expect(categories.some(c => c.name === 'Farm Produce')).toBe(true);
    expect(categories.some(c => c.name === 'Machinery & Equipment')).toBe(true);
    expect(categories.some(c => c.name === 'Agricultural Inputs')).toBe(true);
  });

  it('should create a product category', async () => {
    await db.insert(productCategories).values({
      name: 'Test Category E-Commerce',
      description: 'A test category for e-commerce',
      icon: '🧪',
    });

    const [category] = await db.select().from(productCategories)
      .where(eq(productCategories.name, 'Test Category E-Commerce'))
      .limit(1);

    expect(category).toBeDefined();
    expect(category.name).toBe('Test Category E-Commerce');
    testCategoryId = category.id;
  });

  it('should create a product', async () => {
    await db.insert(products).values({
      sellerId: testUserId,
      categoryId: testCategoryId,
      name: 'Test Product E-Commerce',
      description: 'A test product for e-commerce testing',
      price: 50000, // ₦500 in kobo
      stock: 100,
      unit: 'kg',
      images: JSON.stringify([]),
      status: 'active',
    });

    const [product] = await db.select().from(products)
      .where(eq(products.name, 'Test Product E-Commerce'))
      .limit(1);

    expect(product).toBeDefined();
    expect(product.name).toBe('Test Product E-Commerce');
    expect(product.price).toBe(50000);
    expect(product.stock).toBe(100);
    testProductId = product.id;
  });

  it('should add product to shopping cart', async () => {
    await db.insert(shoppingCart).values({
      userId: testUserId,
      productId: testProductId,
      quantity: 5,
    });

    const [cartItem] = await db.select().from(shoppingCart)
      .where(and(
        eq(shoppingCart.userId, testUserId),
        eq(shoppingCart.productId, testProductId)
      ))
      .limit(1);

    expect(cartItem).toBeDefined();
    expect(cartItem.quantity).toBe(5);
    testCartItemId = cartItem.id;
  });

  it('should retrieve cart items for user', async () => {
    const cartItems = await db.select().from(shoppingCart).where(
      eq(shoppingCart.userId, testUserId)
    );

    expect(cartItems.length).toBeGreaterThan(0);
    const testItem = cartItems.find(item => item.productId === testProductId);
    expect(testItem).toBeDefined();
    expect(testItem?.quantity).toBe(5);
  });

  it('should update cart item quantity', async () => {
    await db.update(shoppingCart)
      .set({ quantity: 10 })
      .where(eq(shoppingCart.id, testCartItemId));

    const [updated] = await db.select().from(shoppingCart)
      .where(eq(shoppingCart.id, testCartItemId))
      .limit(1);

    expect(updated.quantity).toBe(10);
  });

  it('should create an order', async () => {
    const orderNumber = `ORD-TEST-${Date.now()}`;
    
    await db.insert(orders).values({
      orderNumber,
      buyerId: testUserId,
      totalAmount: 500000, // ₦5000
      currency: 'NGN',
      status: 'pending',
      paymentMethod: 'demo',
      paymentStatus: 'pending',
      shippingAddress: '123 Test Street, Lagos, Nigeria',
      shippingPhone: '+234 800 000 0000',
    });

    const [order] = await db.select().from(orders)
      .where(eq(orders.orderNumber, orderNumber))
      .limit(1);

    expect(order).toBeDefined();
    expect(order.totalAmount).toBe(500000);
    expect(order.status).toBe('pending');
    testOrderId = order.id;

    // Create order items
    await db.insert(orderItems).values({
      orderId: order.id,
      productId: testProductId,
      sellerId: testUserId,
      quantity: 10,
      priceAtPurchase: 50000,
    });

    const [orderItem] = await db.select().from(orderItems)
      .where(eq(orderItems.orderId, order.id))
      .limit(1);

    expect(orderItem).toBeDefined();
    expect(orderItem.quantity).toBe(10);
  });

  it('should retrieve orders for buyer', async () => {
    const buyerOrders = await db.select().from(orders).where(
      eq(orders.buyerId, testUserId)
    );

    expect(buyerOrders.length).toBeGreaterThan(0);
    const testOrder = buyerOrders.find(o => o.id === testOrderId);
    expect(testOrder).toBeDefined();
  });

  it('should update order status', async () => {
    await db.update(orders)
      .set({ 
        status: 'paid',
        paymentStatus: 'completed'
      })
      .where(eq(orders.id, testOrderId));

    const [updated] = await db.select().from(orders)
      .where(eq(orders.id, testOrderId))
      .limit(1);

    expect(updated.status).toBe('paid');
    expect(updated.paymentStatus).toBe('completed');
  });

  it('should reduce product stock after order', async () => {
    const [product] = await db.select().from(products).where(
      eq(products.id, testProductId)
    ).limit(1);

    const newStock = product.stock - 10;

    await db.update(products)
      .set({ stock: newStock })
      .where(eq(products.id, testProductId));

    const [updated] = await db.select().from(products)
      .where(eq(products.id, testProductId))
      .limit(1);

    expect(updated.stock).toBe(product.stock - 10);
  });

  it('should clear cart after order', async () => {
    await db.delete(shoppingCart).where(
      eq(shoppingCart.id, testCartItemId)
    );

    const [cartItem] = await db.select().from(shoppingCart)
      .where(eq(shoppingCart.id, testCartItemId))
      .limit(1);

    expect(cartItem).toBeUndefined();
  });
});
