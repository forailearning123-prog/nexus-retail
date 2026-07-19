import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// POST /api/seed - seeds the DB with initial categories and sample products
export async function POST() {
  try {
    // 1. Create categories
    const categories = await Promise.all([
      prisma.category.upsert({
        where: { name: "Bottles" },
        update: {},
        create: { name: "Bottles", description: "Premium water bottles, flasks, and drinkware for every lifestyle" },
      }),
      prisma.category.upsert({
        where: { name: "Home Decoration" },
        update: {},
        create: { name: "Home Decoration", description: "Elegant home décor items to beautify your living spaces" },
      }),
      prisma.category.upsert({
        where: { name: "Jewellery" },
        update: {},
        create: { name: "Jewellery", description: "Handcrafted jewellery — necklaces, rings, earrings, bracelets" },
      }),
    ]);

    const [bottles, homeDecor, jewellery] = categories;

    // 2. Seed sample products for each category
    const bottleProducts = [
      { name: "Hydra Stainless Bottle 1L", description: "Double-wall vacuum insulated stainless steel water bottle. Keeps drinks cold for 24 hours and hot for 12 hours. Leak-proof lid.", price: 1499, stock: 150, categoryId: bottles.id, imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80" },
      { name: "Crystal Glass Flask 750ml", description: "Borosilicate glass water bottle with bamboo lid. BPA-free, eco-friendly. Perfect for the health-conscious consumer.", price: 999, stock: 80, categoryId: bottles.id, imageUrl: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&q=80" },
      { name: "Nexus Sport Sipper 500ml", description: "High-performance sports water bottle with a fast-flow spout. Dishwasher-safe, shatter-resistant Tritan plastic.", price: 649, stock: 200, categoryId: bottles.id, imageUrl: "https://images.unsplash.com/photo-1575377222312-dd1a63a51638?w=600&q=80" },
      { name: "Copper Ayurvedic Bottle 1L", description: "100% pure copper water bottle. Traditional Ayurvedic design. Improves water quality and supports immunity.", price: 799, stock: 60, categoryId: bottles.id, imageUrl: "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=600&q=80" },
    ];

    const homeDecorProducts = [
      { name: "Macramé Wall Hanging", description: "Handwoven bohemian macramé wall art. Made from natural cotton rope. Adds texture and warmth to any room. Size: 45cm x 80cm.", price: 1299, stock: 40, categoryId: homeDecor.id, imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
      { name: "Terracotta Pot Set (3 pcs)", description: "Handmade terracotta pots with saucers. Ideal for succulents, herbs, and small plants. Earthy tones to elevate your décor.", price: 849, stock: 90, categoryId: homeDecor.id, imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80" },
      { name: "Scented Soy Wax Candle Set", description: "Set of 3 hand-poured soy wax candles. Scents: Jasmine, Sandalwood, Rose. 40-hour burn time each. Gift-ready packaging.", price: 1199, stock: 120, categoryId: homeDecor.id, imageUrl: "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=600&q=80" },
      { name: "Wooden Photo Frame Set (5 pcs)", description: "Rustic mango wood photo frames in 5 sizes. Mix & match to create a gallery wall. Includes hanging hardware.", price: 1899, stock: 55, categoryId: homeDecor.id, imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80" },
    ];

    const jewelleryProducts = [
      { name: "Silver Lotus Pendant Necklace", description: "925 Sterling silver lotus flower pendant on a 45cm chain. Symbolises purity and new beginnings. Comes in a premium gift box.", price: 2499, stock: 30, categoryId: jewellery.id, imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80" },
      { name: "Beaded Stone Bracelet", description: "Natural gemstone beaded bracelet with lava rock and turquoise beads. Stretchy, fits all wrist sizes. Promotes calm and balance.", price: 899, stock: 75, categoryId: jewellery.id, imageUrl: "https://images.unsplash.com/photo-1573408301185-9519f94815b9?w=600&q=80" },
      { name: "Gold-Plated Jhumka Earrings", description: "Traditional Indian jhumka earrings. 22K gold plated with intricate filigree work. Lightweight and comfortable for all-day wear.", price: 1599, stock: 50, categoryId: jewellery.id, imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80" },
      { name: "Oxidised Silver Ring Set (5 pcs)", description: "Set of 5 oxidised silver-tone midi and statement rings. Adjustable bands. Bohemian style, perfect for stacking.", price: 749, stock: 100, categoryId: jewellery.id, imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80" },
    ];

    const allProducts = [...bottleProducts, ...homeDecorProducts, ...jewelleryProducts];

    for (const product of allProducts) {
      await prisma.product.upsert({
        where: { id: product.name }, // using name as unique for seeding
        update: {},
        create: product,
      }).catch(async () => {
        // If upsert fails (no unique constraint on name), just create
        const exists = await prisma.product.findFirst({ where: { name: product.name } });
        if (!exists) {
          await prisma.product.create({ data: product });
        }
      });
    }

    const productCount = await prisma.product.count();
    const categoryCount = await prisma.category.count();

    return NextResponse.json({
      success: true,
      message: `Seeded ${categoryCount} categories and ${productCount} products.`,
      categories: categories.map(c => c.name),
    });
  } catch (error) {
    console.error("Seed Error:", error);
    return NextResponse.json({ error: "Seeding failed", details: String(error) }, { status: 500 });
  }
}
