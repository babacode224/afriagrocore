import { describe, it, expect } from 'vitest';
import { appRouter } from './routers';
import type { Context } from './_core/trpc';

describe('Feedback Widget Integration', () => {
  it('should have feedback router registered', () => {
    expect(appRouter._def.procedures).toHaveProperty('feedback.submit');
    expect(appRouter._def.procedures).toHaveProperty('feedback.getAll');
  });

  it('should validate feedback submission input', async () => {
    const mockContext = {
      req: {
        headers: {},
        socket: { remoteAddress: '127.0.0.1' },
      },
      res: {},
      user: null,
    } as unknown as Context;

    const caller = appRouter.createCaller(mockContext);

    // Test with invalid email
    await expect(
      caller.feedback.submit({
        name: 'Test User',
        email: 'invalid-email',
        phoneNumber: '+234 XXX XXX XXXX',
        rating: 5,
        comment: 'Great service!',
      })
    ).rejects.toThrow();

    // Test with invalid rating (too high)
    await expect(
      caller.feedback.submit({
        name: 'Test User',
        email: 'test@example.com',
        phoneNumber: '+234 XXX XXX XXXX',
        rating: 6,
        comment: 'Great service!',
      })
    ).rejects.toThrow();

    // Test with invalid rating (too low)
    await expect(
      caller.feedback.submit({
        name: 'Test User',
        email: 'test@example.com',
        phoneNumber: '+234 XXX XXX XXXX',
        rating: 0,
        comment: 'Great service!',
      })
    ).rejects.toThrow();

    // Test with missing required fields
    await expect(
      caller.feedback.submit({
        name: '',
        email: 'test@example.com',
        phoneNumber: '+234 XXX XXX XXXX',
        rating: 5,
        comment: 'Great service!',
      })
    ).rejects.toThrow();
  });

  it('should return empty array when no feedback exists', async () => {
    const mockContext = {
      req: { headers: {} },
      res: {},
      user: null,
    } as unknown as Context;

    const caller = appRouter.createCaller(mockContext);
    const result = await caller.feedback.getAll();
    
    expect(Array.isArray(result)).toBe(true);
  });
});
