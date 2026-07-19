import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// POST /api/orders - create an order (saves to DB)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, items, address, razorpayId, isGuest = true } = body;

    if (!email || !items || items.length === 0) {
      return NextResponse.json({ error: "Email and items are required" }, { status: 400 });
    }

    // Upsert the user (guest or registered)
    const user = await prisma.user.upsert({
      where: { email },
      update: { name },
      create: { email, name, isGuest },
    });

    // Calculate total amount from items
    const totalAmount = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

    // Create order with items
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount,
        status: "PENDING",
        razorpayId: razorpayId || null,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: { include: { product: true } },
        user: true,
      },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("Orders POST Error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

// GET /api/orders - list all orders (admin)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    
    const orders = await prisma.order.findMany({
      where: status ? { status } : {},
      include: {
        user: true,
        items: { include: { product: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Orders GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
