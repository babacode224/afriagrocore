import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './drizzle/schema.ts';

// Helper function to generate slug from product name
function generateSlug(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

// Get the user ID (owner)
const users = await db.select().from(schema.users).limit(1);
if (users.length === 0) {
  console.error('No users found. Please create a user first.');
  process.exit(1);
}
const userId = users[0].id;

// Get category IDs
const categories = await db.select().from(schema.productCategories);
const categoryMap = {};
categories.forEach(cat => {
  categoryMap[cat.name] = cat.id;
});

const demoProducts = [
  // Farm Inputs (5 products)
  {
    sellerId: userId,
    categoryId: categoryMap['Farm Inputs'] || categories[2].id,
    name: 'NPK 15-15-15 Fertilizer',
    slug: generateSlug('NPK 15-15-15 Fertilizer'),
    description: 'Balanced NPK fertilizer perfect for all crop types. Promotes healthy growth, strong roots, and increased yields. 50kg bag covers approximately 1 acre.',
    price: 45.00,
    stock: 500,
    images: JSON.stringify(['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800']),
    status: 'active',
    location: 'Lagos, Nigeria'
  },
  {
    sellerId: userId,
    categoryId: categoryMap['Farm Inputs'] || categories[2].id,
    name: 'Hybrid Maize Seeds (10kg)',
    slug: generateSlug('Hybrid Maize Seeds (10kg)'),
    description: 'High-yielding hybrid maize seeds resistant to drought and common diseases. Maturity period: 90-100 days. Expected yield: 4-6 tons per hectare.',
    price: 85.00,
    stock: 200,
    images: JSON.stringify(['https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800']),
    status: 'active',
    location: 'Kano, Nigeria'
  },
  {
    sellerId: userId,
    categoryId: categoryMap['Farm Inputs'] || categories[2].id,
    name: 'Organic Pesticide Spray',
    slug: generateSlug('Organic Pesticide Spray'),
    description: 'Eco-friendly organic pesticide effective against aphids, whiteflies, and caterpillars. Safe for beneficial insects. 5-liter container.',
    price: 32.00,
    stock: 150,
    images: JSON.stringify(['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800']),
    status: 'active',
    location: 'Ibadan, Nigeria'
  },
  {
    sellerId: userId,
    categoryId: categoryMap['Farm Inputs'] || categories[2].id,
    name: 'Tomato Seedlings (100 plants)',
    description: 'Healthy Roma tomato seedlings ready for transplanting. Disease-resistant variety with excellent fruit quality. 4-6 weeks old.',
    price: 25.00,
    stock: 80,
    images: JSON.stringify(['https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800']),
    status: 'active',
    location: 'Jos, Nigeria'
  },
  {
    sellerId: userId,
    categoryId: categoryMap['Farm Inputs'] || categories[2].id,
    name: 'Poultry Feed (25kg)',
    description: 'Complete layer feed with balanced nutrition for optimal egg production. Contains 16% protein, vitamins, and minerals.',
    price: 18.50,
    stock: 300,
    images: JSON.stringify(['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800']),
    status: 'active',
    location: 'Ogun, Nigeria'
  },

  // Farm Machinery (5 products)
  {
    sellerId: userId,
    categoryId: categoryMap['Farm Machinery'] || categories[1].id,
    name: '75HP Farm Tractor',
    description: 'Reliable 4-wheel drive tractor suitable for plowing, harrowing, and transportation. Low fuel consumption, easy maintenance. Includes warranty.',
    price: 12500.00,
    stock: 5,
    images: JSON.stringify(['https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800']),
    status: 'active',
    location: 'Kaduna, Nigeria'
  },
  {
    sellerId: userId,
    categoryId: categoryMap['Farm Machinery'] || categories[1].id,
    name: 'Maize Sheller Machine',
    description: 'Electric maize shelling machine. Capacity: 300-400kg/hour. Reduces labor costs and processing time. Durable steel construction.',
    price: 850.00,
    stock: 15,
    images: JSON.stringify(['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800']),
    status: 'active',
    location: 'Abuja, Nigeria'
  },
  {
    sellerId: userId,
    categoryId: categoryMap['Farm Machinery'] || categories[1].id,
    name: 'Drip Irrigation System (1 Hectare)',
    description: 'Complete drip irrigation kit for 1 hectare. Includes pipes, drippers, filters, and fittings. Saves water up to 60%. Easy installation.',
    price: 1200.00,
    stock: 20,
    images: JSON.stringify(['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800']),
    status: 'active',
    location: 'Lagos, Nigeria'
  },
  {
    sellerId: userId,
    categoryId: categoryMap['Farm Machinery'] || categories[1].id,
    name: 'Rice Harvester Machine',
    description: 'Walk-behind rice harvester with cutting width of 1.2m. Fuel-efficient engine. Suitable for small to medium farms. Includes spare parts.',
    price: 3200.00,
    stock: 8,
    images: JSON.stringify(['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800']),
    status: 'active',
    location: 'Kebbi, Nigeria'
  },
  {
    sellerId: userId,
    categoryId: categoryMap['Farm Machinery'] || categories[1].id,
    name: 'Solar Water Pump',
    description: '2HP solar-powered water pump for irrigation. No electricity costs. Pumps up to 40,000 liters/day. Includes solar panels and controller.',
    price: 1800.00,
    stock: 12,
    images: JSON.stringify(['https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800']),
    status: 'active',
    location: 'Sokoto, Nigeria'
  },

  // Farm Produce (5 products)
  {
    sellerId: userId,
    categoryId: categoryMap['Farm Produce'] || categories[0].id,
    name: 'Fresh Tomatoes (25kg crate)',
    description: 'Farm-fresh Roma tomatoes, hand-picked at peak ripeness. Perfect for cooking, processing, or resale. Delivered within 24 hours of harvest.',
    price: 28.00,
    stock: 100,
    images: JSON.stringify(['https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=800']),
    status: 'active',
    location: 'Plateau, Nigeria'
  },
  {
    sellerId: userId,
    categoryId: categoryMap['Farm Produce'] || categories[0].id,
    name: 'White Maize (100kg bag)',
    description: 'Premium quality white maize, properly dried and cleaned. Moisture content below 13%. Ideal for milling or animal feed.',
    price: 55.00,
    stock: 200,
    images: JSON.stringify(['https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800']),
    status: 'active',
    location: 'Benue, Nigeria'
  },
  {
    sellerId: userId,
    categoryId: categoryMap['Farm Produce'] || categories[0].id,
    name: 'Raw Cashew Nuts (50kg)',
    description: 'Grade A raw cashew nuts from organic farms. High kernel outturn ratio. Perfect for processing or export. Properly sun-dried.',
    price: 120.00,
    stock: 80,
    images: JSON.stringify(['https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800']),
    status: 'active',
    location: 'Oyo, Nigeria'
  },
  {
    sellerId: userId,
    categoryId: categoryMap['Farm Produce'] || categories[0].id,
    name: 'Fresh Yam Tubers (100kg)',
    description: 'Premium white yam tubers from disease-free farms. Large sizes, excellent for pounding or frying. Harvested within the week.',
    price: 75.00,
    stock: 150,
    images: JSON.stringify(['https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800']),
    status: 'active',
    location: 'Enugu, Nigeria'
  },
  {
    sellerId: userId,
    categoryId: categoryMap['Farm Produce'] || categories[0].id,
    name: 'Dried Cocoa Beans (100kg)',
    description: 'Premium fermented and dried cocoa beans. Moisture content 7%. Grade 1 quality suitable for export. Rich chocolate flavor.',
    price: 180.00,
    stock: 60,
    images: JSON.stringify(['https://images.unsplash.com/photo-1511381939415-e44015466834?w=800']),
    status: 'active',
    location: 'Cross River, Nigeria'
  },

  // Tools & Equipment (5 products)
  {
    sellerId: userId,
    categoryId: categoryMap['Tools & Equipment'] || categories[4].id,
    name: 'Cutlass/Machete Set (5 pieces)',
    description: 'Heavy-duty farm cutlasses with wooden handles. Hardened steel blades for cutting grass, clearing bushes. Includes protective sheaths.',
    price: 35.00,
    stock: 200,
    images: JSON.stringify(['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800']),
    status: 'active',
    location: 'Lagos, Nigeria'
  },
  {
    sellerId: userId,
    categoryId: categoryMap['Tools & Equipment'] || categories[4].id,
    name: 'Knapsack Sprayer (20L)',
    description: 'Manual knapsack sprayer with adjustable nozzle. Perfect for pesticide and herbicide application. Comfortable shoulder straps.',
    price: 42.00,
    stock: 100,
    images: JSON.stringify(['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800']),
    status: 'active',
    location: 'Ogun, Nigeria'
  },
  {
    sellerId: userId,
    categoryId: categoryMap['Tools & Equipment'] || categories[4].id,
    name: 'Wheelbarrow (Heavy Duty)',
    description: 'Industrial-grade wheelbarrow with steel tray and pneumatic tire. Load capacity: 150kg. Rust-resistant coating.',
    price: 65.00,
    stock: 50,
    images: JSON.stringify(['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800']),
    status: 'active',
    location: 'Abuja, Nigeria'
  },
  {
    sellerId: userId,
    categoryId: categoryMap['Tools & Equipment'] || categories[4].id,
    name: 'Garden Hoe Set (3 sizes)',
    description: 'Professional garden hoes for weeding and soil preparation. Ergonomic handles reduce fatigue. Includes small, medium, and large sizes.',
    price: 28.00,
    stock: 120,
    images: JSON.stringify(['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800']),
    status: 'active',
    location: 'Kano, Nigeria'
  },
  {
    sellerId: userId,
    categoryId: categoryMap['Tools & Equipment'] || categories[4].id,
    name: 'Pruning Shears & Secateurs',
    description: 'Professional pruning tools for fruit trees and ornamentals. Sharp stainless steel blades. Spring-loaded for easy operation.',
    price: 22.00,
    stock: 80,
    images: JSON.stringify(['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800']),
    status: 'active',
    location: 'Plateau, Nigeria'
  },

  // Livestock & Poultry (5 products)
  {
    sellerId: userId,
    categoryId: categoryMap['Livestock'] || categories[3].id,
    name: 'Broiler Chickens (50 birds)',
    description: 'Healthy 6-week-old broiler chickens, average weight 2.5kg. Vaccinated and dewormed. Ready for market or further rearing.',
    price: 250.00,
    stock: 20,
    images: JSON.stringify(['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800']),
    status: 'active',
    location: 'Oyo, Nigeria'
  },
  {
    sellerId: userId,
    categoryId: categoryMap['Livestock'] || categories[3].id,
    name: 'West African Dwarf Goats (Pair)',
    description: 'Healthy breeding pair of WAD goats (1 male, 1 female). Age: 8-12 months. Disease-resistant breed, low maintenance. Good for meat and breeding.',
    price: 180.00,
    stock: 15,
    images: JSON.stringify(['https://images.unsplash.com/photo-1533318087102-b3ad366ed041?w=800']),
    status: 'active',
    location: 'Ogun, Nigeria'
  },
  {
    sellerId: userId,
    categoryId: categoryMap['Livestock'] || categories[3].id,
    name: 'Point of Lay Chickens (100 birds)',
    description: 'Ready-to-lay pullets, 18-20 weeks old. Vaccinated against major diseases. Expected egg production: 280-300 eggs/year per bird.',
    price: 850.00,
    stock: 10,
    images: JSON.stringify(['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800']),
    status: 'active',
    location: 'Lagos, Nigeria'
  },
  {
    sellerId: userId,
    categoryId: categoryMap['Livestock'] || categories[3].id,
    name: 'Catfish Fingerlings (1000 pieces)',
    description: 'Healthy catfish fingerlings, 4-6 weeks old. Average size: 5-7cm. Suitable for pond or tank culture. Fast-growing strain.',
    price: 120.00,
    stock: 30,
    images: JSON.stringify(['https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800']),
    status: 'active',
    location: 'Delta, Nigeria'
  },
  {
    sellerId: userId,
    categoryId: categoryMap['Livestock'] || categories[3].id,
    name: 'Dairy Cow (Holstein Friesian)',
    description: 'Productive dairy cow, 3 years old. Currently producing 15-20 liters/day. Healthy, vaccinated, and dewormed. Good temperament.',
    price: 1500.00,
    stock: 3,
    images: JSON.stringify(['https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800']),
    status: 'active',
    location: 'Jos, Nigeria'
  }
];

console.log(`Seeding ${demoProducts.length} demo products...`);

for (const product of demoProducts) {
  await db.insert(schema.products).values(product);
  console.log(`✓ Added: ${product.name}`);
}

console.log('\n✅ Successfully seeded all demo products!');
console.log(`Total products added: ${demoProducts.length}`);
console.log('Categories: Farm Inputs (5), Farm Machinery (5), Farm Produce (5), Tools & Equipment (5), Livestock (5)');

await connection.end();
process.exit(0);
