import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { parse } from 'csv-parse/sync';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const csvText = await file.text();
    // Expected columns: name, description, price, stock, categoryName, isFeatured, imageUrl
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    let successCount = 0;
    let errors: string[] = [];

    // Pre-fetch all categories to map categoryName to categoryId
    const categories = await prisma.category.findMany();
    const catMap = new Map(categories.map(c => [c.name.toLowerCase(), c.id]));

    for (const [index, row] of (records as Record<string, string>[]).entries()) {
      try {
        const { name, description, price, stock, categoryName, isFeatured, imageUrl } = row;
        
        if (!name || !price || !categoryName) {
          errors.push(`Row ${index + 2}: Missing required fields (name, price, categoryName)`);
          continue;
        }

        let categoryId = catMap.get(categoryName.toLowerCase());
        
        // Auto-create category if it doesn't exist
        if (!categoryId) {
          const newCat = await prisma.category.create({ data: { name: categoryName } });
          categoryId = newCat.id;
          catMap.set(categoryName.toLowerCase(), categoryId);
        }

        await prisma.product.create({
          data: {
            name,
            description: description || "",
            price: parseFloat(price),
            stock: parseInt(stock) || 0,
            imageUrl: imageUrl || null,
            isFeatured: isFeatured?.toLowerCase() === 'true',
            categoryId,
          }
        });
        successCount++;
      } catch (err: any) {
        errors.push(`Row ${index + 2}: ${err.message}`);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully imported ${successCount} products.`,
      errors 
    });

  } catch (error: any) {
    console.error("Bulk Import Error:", error);
    return NextResponse.json({ error: error.message || "Failed to process bulk import" }, { status: 500 });
  }
}
