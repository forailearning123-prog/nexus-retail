import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// GET /api/products - list all products with optional filters
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const categoryId = searchParams.get("categoryId") || "";
    const sort = searchParams.get("sort") || "newest";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const where: any = {};
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }
    if (categoryId) {
      where.categoryId = categoryId;
    }

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price_asc") orderBy = { price: "asc" };
    if (sort === "price_desc") orderBy = { price: "desc" };
    if (sort === "name_asc") orderBy = { name: "asc" };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({ products, total, page, limit });
  } catch (error) {
    console.error("Products GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST /api/products - create a new product (admin)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, imageUrl, stock, categoryId } = body;

    if (!name || !description || !price || !categoryId) {
      return NextResponse.json({ error: "Missing required fields: name, description, price, categoryId" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl: imageUrl || null,
        stock: parseInt(stock) || 0,
        categoryId,
      },
      include: { category: true },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Products POST Error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
