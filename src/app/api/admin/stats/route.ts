import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function GET() {
  try {
    const totalProducts = await prisma.product.count();
    const lowStockProducts = await prisma.product.count({ where: { stock: { lt: 10 } } });
    
    const orders = await prisma.order.findMany();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const pendingOrders = orders.filter(o => o.status === 'PENDING').length;

    return NextResponse.json({
      totalProducts,
      lowStockProducts,
      totalOrders,
      totalRevenue,
      pendingOrders,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
