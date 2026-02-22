import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { products, productCategories } from './drizzle/schema.ts';
import { eq } from 'drizzle-orm';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

// Get categories
const categories = await db.select().from(productCategories);
const categoryMap = {};
categories.forEach(cat => {
  categoryMap[cat.name] = cat.id;
});

// Get the logged-in user's ID (you'll need to replace this with actual user ID)
const sellerId = 1; // Replace with actual seller user ID

const productsData = [
  // FARM INPUTS (5 products)
  {
    sellerId,
    categoryId: categoryMap['Farm Inputs'],
    name: 'NPK Fertilizer 15-15-15',
    slug: 'npk-fertilizer-15-15-15',
    description: 'Premium balanced NPK fertilizer for all crops. 50kg bag. Improves soil fertility and crop yield.',
    price: 45.00,
    currency: 'USD',
    stock: 500,
    unit: 'bag',
    images: JSON.stringify(['/products/8e7WNb4dh32I.jpg']),
    location: 'Kano, Nigeria',
    status: 'active',
    featured: 'yes'
  },
  {
    sellerId,
    categoryId: categoryMap['Farm Inputs'],
    name: 'Organic Compost Fertilizer',
    slug: 'organic-compost-fertilizer',
    description: 'Natural organic compost enriched with minerals. Perfect for organic farming. 25kg bag.',
    price: 30.00,
    currency: 'USD',
    stock: 300,
    unit: 'bag',
    images: JSON.stringify(['/products/0fMjrslUHL9C.jpg']),
    location: 'Ibadan, Nigeria',
    status: 'active',
    featured: 'no'
  },
  {
    sellerId,
    categoryId: categoryMap['Farm Inputs'],
    name: 'Sea-90 Soil Mineralizer',
    slug: 'sea-90-soil-mineralizer',
    description: 'Premium soil mineralizer with 90+ ocean minerals. Enhances plant health and productivity.',
    price: 55.00,
    currency: 'USD',
    stock: 200,
    unit: 'bag',
    images: JSON.stringify(['/products/Ut8vCM7UQUZZ.png']),
    location: 'Lagos, Nigeria',
    status: 'active',
    featured: 'yes'
  },
  {
    sellerId,
    categoryId: categoryMap['Farm Inputs'],
    name: 'Crop Protection Pesticide',
    slug: 'crop-protection-pesticide',
    description: 'Effective broad-spectrum pesticide for crop protection. Safe and eco-friendly formula.',
    price: 40.00,
    currency: 'USD',
    stock: 250,
    unit: 'liter',
    images: JSON.stringify(['/products/dE4pSsujnbHb.jpg']),
    location: 'Kaduna, Nigeria',
    status: 'active',
    featured: 'no'
  },
  {
    sellerId,
    categoryId: categoryMap['Farm Inputs'],
    name: 'Herbicide Weed Control',
    slug: 'herbicide-weed-control',
    description: 'Professional herbicide for effective weed control. Suitable for all crop types.',
    price: 35.00,
    currency: 'USD',
    stock: 180,
    unit: 'liter',
    images: JSON.stringify(['/products/T4VWv7ay9YWe.jpg']),
    location: 'Abuja, Nigeria',
    status: 'active',
    featured: 'no'
  },

  // FARM MACHINERY (5 products)
  {
    sellerId,
    categoryId: categoryMap['Farm Machinery'],
    name: 'John Deere Combine Harvester',
    slug: 'john-deere-combine-harvester',
    description: 'High-performance combine harvester for large-scale farming. Excellent condition, low hours.',
    price: 85000.00,
    currency: 'USD',
    stock: 2,
    unit: 'unit',
    images: JSON.stringify(['/products/tj03RSXxH3Mr.jpg']),
    location: 'Kano, Nigeria',
    status: 'active',
    featured: 'yes'
  },
  {
    sellerId,
    categoryId: categoryMap['Farm Machinery'],
    name: 'Multi-Purpose Farm Tractor',
    slug: 'multi-purpose-farm-tractor',
    description: 'Versatile tractor suitable for plowing, harrowing, and transportation. 75HP engine.',
    price: 45000.00,
    currency: 'USD',
    stock: 3,
    unit: 'unit',
    images: JSON.stringify(['/products/eTwrojpX81dd.jpg']),
    location: 'Jos, Nigeria',
    status: 'active',
    featured: 'yes'
  },
  {
    sellerId,
    categoryId: categoryMap['Farm Machinery'],
    name: 'Agricultural Equipment Set',
    slug: 'agricultural-equipment-set',
    description: 'Complete set of farm machinery including harvesters and attachments. Perfect for medium farms.',
    price: 65000.00,
    currency: 'USD',
    stock: 1,
    unit: 'set',
    images: JSON.stringify(['/products/sCAJpT2s80UG.jpg']),
    location: 'Kaduna, Nigeria',
    status: 'active',
    featured: 'no'
  },
  {
    sellerId,
    categoryId: categoryMap['Farm Machinery'],
    name: 'Irrigation System - Drip Kit',
    slug: 'irrigation-system-drip-kit',
    description: 'Modern drip irrigation system for efficient water management. Covers up to 5 hectares.',
    price: 3500.00,
    currency: 'USD',
    stock: 15,
    unit: 'kit',
    images: JSON.stringify(['/products/dE4pSsujnbHb.jpg']),
    location: 'Ogun, Nigeria',
    status: 'active',
    featured: 'no'
  },
  {
    sellerId,
    categoryId: categoryMap['Farm Machinery'],
    name: 'Grain Thresher Machine',
    slug: 'grain-thresher-machine',
    description: 'Electric grain thresher for rice, wheat, and maize. High capacity 500kg/hour.',
    price: 2800.00,
    currency: 'USD',
    stock: 8,
    unit: 'unit',
    images: JSON.stringify(['/products/eTwrojpX81dd.jpg']),
    location: 'Benue, Nigeria',
    status: 'active',
    featured: 'no'
  },

  // FARM PRODUCE (5 products)
  {
    sellerId,
    categoryId: categoryMap['Farm Produce'],
    name: 'Fresh Organic Vegetables Mix',
    slug: 'fresh-organic-vegetables-mix',
    description: 'Assorted fresh organic vegetables: carrots, broccoli, peppers, tomatoes. Farm-fresh daily.',
    price: 25.00,
    currency: 'USD',
    stock: 500,
    unit: 'kg',
    images: JSON.stringify(['/products/B46IxCj08k3R.jpg']),
    location: 'Plateau, Nigeria',
    status: 'active',
    featured: 'yes'
  },
  {
    sellerId,
    categoryId: categoryMap['Farm Produce'],
    name: 'Premium Rice - Long Grain',
    slug: 'premium-rice-long-grain',
    description: 'High-quality long grain rice. Locally grown, clean and well-processed. 50kg bag.',
    price: 60.00,
    currency: 'USD',
    stock: 200,
    unit: 'bag',
    images: JSON.stringify(['/products/SA0MKZ49Kxok.jpg']),
    location: 'Ebonyi, Nigeria',
    status: 'active',
    featured: 'yes'
  },
  {
    sellerId,
    categoryId: categoryMap['Farm Produce'],
    name: 'Yellow Maize Corn',
    slug: 'yellow-maize-corn',
    description: 'Fresh yellow maize for human consumption or animal feed. Dry and well-stored.',
    price: 35.00,
    currency: 'USD',
    stock: 300,
    unit: 'bag',
    images: JSON.stringify(['/products/SA0MKZ49Kxok.jpg']),
    location: 'Taraba, Nigeria',
    status: 'active',
    featured: 'no'
  },
  {
    sellerId,
    categoryId: categoryMap['Farm Produce'],
    name: 'Fresh Tomatoes',
    slug: 'fresh-tomatoes',
    description: 'Farm-fresh tomatoes harvested daily. Perfect for markets and processing. Bulk orders available.',
    price: 15.00,
    currency: 'USD',
    stock: 800,
    unit: 'basket',
    images: JSON.stringify(['/products/B46IxCj08k3R.jpg']),
    location: 'Kano, Nigeria',
    status: 'active',
    featured: 'no'
  },
  {
    sellerId,
    categoryId: categoryMap['Farm Produce'],
    name: 'Cassava Tubers',
    slug: 'cassava-tubers',
    description: 'Fresh cassava tubers for garri, fufu, or industrial processing. High starch content.',
    price: 20.00,
    currency: 'USD',
    stock: 600,
    unit: 'bag',
    images: JSON.stringify(['/products/B46IxCj08k3R.jpg']),
    location: 'Benue, Nigeria',
    status: 'active',
    featured: 'no'
  },

  // FARM TOOLS & EQUIPMENT (5 products)
  {
    sellerId,
    categoryId: categoryMap['Farm Tools & Equipment'],
    name: 'Professional Garden Hoe Set',
    slug: 'professional-garden-hoe-set',
    description: 'Durable steel hoe with wooden handle. Perfect for weeding and soil cultivation.',
    price: 18.00,
    currency: 'USD',
    stock: 150,
    unit: 'piece',
    images: JSON.stringify(['/products/D6DgRrWQgxKp.jpeg']),
    location: 'Lagos, Nigeria',
    status: 'active',
    featured: 'no'
  },
  {
    sellerId,
    categoryId: categoryMap['Farm Tools & Equipment'],
    name: 'Hand Tools Complete Set',
    slug: 'hand-tools-complete-set',
    description: 'Complete set of essential farm hand tools: hoe, rake, shovel, fork, and more.',
    price: 75.00,
    currency: 'USD',
    stock: 80,
    unit: 'set',
    images: JSON.stringify(['/products/1Rf2c5Rea4HB.jpg']),
    location: 'Oyo, Nigeria',
    status: 'active',
    featured: 'yes'
  },
  {
    sellerId,
    categoryId: categoryMap['Farm Tools & Equipment'],
    name: 'Knapsack Sprayer 20L',
    slug: 'knapsack-sprayer-20l',
    description: 'Manual knapsack sprayer for pesticides and herbicides. 20-liter capacity, adjustable nozzle.',
    price: 35.00,
    currency: 'USD',
    stock: 120,
    unit: 'piece',
    images: JSON.stringify(['/products/dE4pSsujnbHb.jpg']),
    location: 'Ondo, Nigeria',
    status: 'active',
    featured: 'no'
  },
  {
    sellerId,
    categoryId: categoryMap['Farm Tools & Equipment'],
    name: 'Wheelbarrow Heavy Duty',
    slug: 'wheelbarrow-heavy-duty',
    description: 'Strong metal wheelbarrow for farm transportation. 100kg load capacity.',
    price: 45.00,
    currency: 'USD',
    stock: 60,
    unit: 'piece',
    images: JSON.stringify(['/products/0Pvu3VpCS96v.jpeg']),
    location: 'Enugu, Nigeria',
    status: 'active',
    featured: 'no'
  },
  {
    sellerId,
    categoryId: categoryMap['Farm Tools & Equipment'],
    name: 'Pruning Shears Professional',
    slug: 'pruning-shears-professional',
    description: 'Sharp pruning shears for tree and plant maintenance. Ergonomic design, rust-resistant.',
    price: 22.00,
    currency: 'USD',
    stock: 90,
    unit: 'piece',
    images: JSON.stringify(['/products/D6DgRrWQgxKp.jpeg']),
    location: 'Cross River, Nigeria',
    status: 'active',
    featured: 'no'
  },

  // LIVESTOCK & POULTRY (5 products)
  {
    sellerId,
    categoryId: categoryMap['Livestock & Poultry'],
    name: 'Healthy Dairy Cows',
    slug: 'healthy-dairy-cows',
    description: 'High-yield dairy cows, vaccinated and healthy. Produces 15-20 liters per day.',
    price: 1200.00,
    currency: 'USD',
    stock: 15,
    unit: 'head',
    images: JSON.stringify(['/products/EPUX2wbdt5Ds.jpg']),
    location: 'Plateau, Nigeria',
    status: 'active',
    featured: 'yes'
  },
  {
    sellerId,
    categoryId: categoryMap['Livestock & Poultry'],
    name: 'Goats - West African Dwarf',
    slug: 'goats-west-african-dwarf',
    description: 'Hardy West African Dwarf goats. Disease-resistant, good for meat and milk production.',
    price: 180.00,
    currency: 'USD',
    stock: 50,
    unit: 'head',
    images: JSON.stringify(['/products/EPUX2wbdt5Ds.jpg']),
    location: 'Ogun, Nigeria',
    status: 'active',
    featured: 'yes'
  },
  {
    sellerId,
    categoryId: categoryMap['Livestock & Poultry'],
    name: 'Layer Chickens - Point of Lay',
    slug: 'layer-chickens-point-of-lay',
    description: 'Ready-to-lay chickens, 18 weeks old. Vaccinated and healthy. High egg production.',
    price: 8.00,
    currency: 'USD',
    stock: 500,
    unit: 'bird',
    images: JSON.stringify(['/products/pHObDN3V3bpY.jpg']),
    location: 'Oyo, Nigeria',
    status: 'active',
    featured: 'no'
  },
  {
    sellerId,
    categoryId: categoryMap['Livestock & Poultry'],
    name: 'Broiler Chickens',
    slug: 'broiler-chickens',
    description: 'Fast-growing broiler chickens, 6 weeks old. Ready for market. Well-fed and healthy.',
    price: 6.50,
    currency: 'USD',
    stock: 800,
    unit: 'bird',
    images: JSON.stringify(['/products/pHObDN3V3bpY.jpg']),
    location: 'Lagos, Nigeria',
    status: 'active',
    featured: 'no'
  },
  {
    sellerId,
    categoryId: categoryMap['Livestock & Poultry'],
    name: 'Mixed Farm Animals',
    slug: 'mixed-farm-animals',
    description: 'Assorted farm animals: cattle, goats, chickens. Perfect for starting a mixed farm.',
    price: 2500.00,
    currency: 'USD',
    stock: 5,
    unit: 'lot',
    images: JSON.stringify(['/products/P4TQjsKjk4pi.jpeg']),
    location: 'Kaduna, Nigeria',
    status: 'active',
    featured: 'yes'
  },
];

console.log('Seeding products with category-specific images...');

for (const product of productsData) {
  await db.insert(products).values(product);
  console.log(`✓ Added: ${product.name}`);
}

console.log(`\n✅ Successfully seeded ${productsData.length} products!`);

await connection.end();
