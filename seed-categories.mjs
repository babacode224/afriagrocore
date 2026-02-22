import { drizzle } from "drizzle-orm/mysql2";
import { productCategories } from "./drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const categories = [
  { name: "Farm Produce", slug: "farm-produce", description: "Fresh agricultural produce including grains, vegetables, and fruits", icon: "🌾" },
  { name: "Farm Machinery", slug: "farm-machinery", description: "Tractors, plows, harvesters, and other heavy equipment", icon: "🚜" },
  { name: "Farm Inputs", slug: "farm-inputs", description: "Seeds, fertilizers, pesticides, and other agricultural inputs", icon: "🌱" },
  { name: "Livestock & Poultry", slug: "livestock-poultry", description: "Live animals, poultry, and related products", icon: "🐄" },
  { name: "Farm Tools & Equipment", slug: "farm-tools", description: "Hand tools, irrigation systems, and small equipment", icon: "🔧" },
];

async function seed() {
  console.log("Seeding product categories...");
  
  for (const category of categories) {
    await db.insert(productCategories).values(category).onDuplicateKeyUpdate({ set: { name: category.name } });
    console.log(`✓ ${category.name}`);
  }
  
  console.log("✅ Categories seeded successfully!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Error seeding categories:", error);
  process.exit(1);
});
