import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './drizzle/schema.ts';

// Helper function to generate slug
const generateSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

// Get user and categories
const users = await db.select().from(schema.users).limit(1);
if (users.length === 0) {
  console.error('No users found.');
  process.exit(1);
}
const userId = users[0].id;

const categories = await db.select().from(schema.productCategories);
const catMap = {};
categories.forEach(cat => { catMap[cat.name] = cat.id; });

const products = [
  // Farm Inputs
  ['NPK 15-15-15 Fertilizer', 'Farm Inputs', 'Balanced NPK fertilizer for all crops. 50kg bag covers 1 acre.', 45, 500, 'Lagos'],
  ['Hybrid Maize Seeds (10kg)', 'Farm Inputs', 'High-yielding hybrid maize seeds. Maturity: 90-100 days.', 85, 200, 'Kano'],
  ['Organic Pesticide Spray', 'Farm Inputs', 'Eco-friendly pesticide. 5-liter container.', 32, 150, 'Ibadan'],
  ['Tomato Seedlings (100)', 'Farm Inputs', 'Healthy Roma tomato seedlings. 4-6 weeks old.', 25, 80, 'Jos'],
  ['Poultry Feed (25kg)', 'Farm Inputs', 'Complete layer feed. 16% protein.', 18.50, 300, 'Ogun'],
  
  // Farm Machinery
  ['75HP Farm Tractor', 'Farm Machinery', '4-wheel drive tractor. Low fuel consumption.', 12500, 5, 'Kaduna'],
  ['Maize Sheller Machine', 'Farm Machinery', 'Electric sheller. 300-400kg/hour capacity.', 850, 15, 'Abuja'],
  ['Drip Irrigation System (1Ha)', 'Farm Machinery', 'Complete kit for 1 hectare. Saves 60% water.', 1200, 20, 'Lagos'],
  ['Rice Harvester Machine', 'Farm Machinery', 'Walk-behind harvester. 1.2m cutting width.', 3200, 8, 'Kebbi'],
  ['Solar Water Pump', 'Farm Machinery', '2HP solar pump. 40,000 liters/day.', 1800, 12, 'Sokoto'],
  
  // Farm Produce
  ['Fresh Tomatoes (25kg)', 'Farm Produce', 'Farm-fresh Roma tomatoes. Delivered within 24hrs.', 28, 100, 'Plateau'],
  ['White Maize (100kg)', 'Farm Produce', 'Premium white maize. Moisture below 13%.', 55, 200, 'Benue'],
  ['Raw Cashew Nuts (50kg)', 'Farm Produce', 'Grade A cashew nuts. Organic farms.', 120, 80, 'Oyo'],
  ['Fresh Yam Tubers (100kg)', 'Farm Produce', 'Premium white yam. Large sizes.', 75, 150, 'Enugu'],
  ['Dried Cocoa Beans (100kg)', 'Farm Produce', 'Premium fermented cocoa. Grade 1 quality.', 180, 60, 'Cross River'],
  
  // Tools & Equipment
  ['Cutlass/Machete Set (5pc)', 'Tools & Equipment', 'Heavy-duty cutlasses with wooden handles.', 35, 200, 'Lagos'],
  ['Knapsack Sprayer (20L)', 'Tools & Equipment', 'Manual sprayer with adjustable nozzle.', 42, 100, 'Ogun'],
  ['Wheelbarrow (Heavy Duty)', 'Tools & Equipment', 'Steel tray. 150kg capacity. Rust-resistant.', 65, 50, 'Abuja'],
  ['Garden Hoe Set (3 sizes)', 'Tools & Equipment', 'Professional hoes. Ergonomic handles.', 28, 120, 'Kano'],
  ['Pruning Shears & Secateurs', 'Tools & Equipment', 'Stainless steel blades. Spring-loaded.', 22, 80, 'Plateau'],
  
  // Livestock
  ['Broiler Chickens (50 birds)', 'Livestock', 'Healthy 6-week broilers. 2.5kg average.', 250, 20, 'Oyo'],
  ['WAD Goats (Pair)', 'Livestock', 'Breeding pair. 8-12 months old.', 180, 15, 'Ogun'],
  ['Point of Lay (100 birds)', 'Livestock', 'Ready-to-lay pullets. 18-20 weeks.', 850, 10, 'Lagos'],
  ['Catfish Fingerlings (1000)', 'Livestock', 'Healthy fingerlings. 5-7cm size.', 120, 30, 'Delta'],
  ['Dairy Cow (Holstein)', 'Livestock', 'Productive cow. 15-20 liters/day.', 1500, 3, 'Jos']
];

console.log(`Seeding ${products.length} demo products...`);

for (const [name, catName, desc, price, stock, location] of products) {
  const categoryId = catMap[catName] || categories[0].id;
  await db.insert(schema.products).values({
    sellerId: userId,
    categoryId,
    name,
    slug: generateSlug(name),
    description: desc,
    price,
    stock,
    images: JSON.stringify(['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800']),
    location: `${location}, Nigeria`,
    status: 'active'
  });
  console.log(`✓ ${name}`);
}

console.log(`\n✅ Successfully seeded ${products.length} products!`);
await connection.end();
