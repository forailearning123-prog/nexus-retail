import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function GET(req: Request, { params }: { params: Promise<{ pageName: string }> }) {
  try {
    const { pageName } = await params;
    const cms = await prisma.cmsContent.findUnique({ where: { pageName } });
    if (!cms) {
      return NextResponse.json({ content: {} });
    }
    return NextResponse.json({ content: cms.content });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch CMS content" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ pageName: string }> }) {
  try {
    const { pageName } = await params;
    const { content } = await req.json();

    const cms = await prisma.cmsContent.upsert({
      where: { pageName },
      update: { content },
      create: { pageName, content },
    });

    return NextResponse.json({ content: cms.content });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update CMS content" }, { status: 500 });
  }
}
