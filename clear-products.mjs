import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { products } from './drizzle/schema.ts';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

console.log('Clearing existing products...');
await db.delete(products);
console.log('Products cleared successfully!');

await connection.end();
