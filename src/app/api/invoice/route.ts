import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true
          }
        },
        user: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Generate PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    page.drawText("INVOICE", { x: 50, y: 730, size: 24, font: boldFont });
    page.drawText(`Order ID: ${order.id}`, { x: 50, y: 700, size: 12, font });
    page.drawText(`Date: ${order.createdAt.toISOString().split('T')[0]}`, { x: 50, y: 685, size: 12, font });
    
    page.drawText("Billed To:", { x: 50, y: 650, size: 12, font: boldFont });
    page.drawText(order.user?.name || "Guest User", { x: 50, y: 635, size: 12, font });
    page.drawText(order.user?.email || "N/A", { x: 50, y: 620, size: 12, font });

    let yOffset = 570;
    page.drawText("Item", { x: 50, y: yOffset, size: 12, font: boldFont });
    page.drawText("Qty", { x: 350, y: yOffset, size: 12, font: boldFont });
    page.drawText("Price", { x: 450, y: yOffset, size: 12, font: boldFont });
    
    yOffset -= 20;

    for (const item of order.items) {
      page.drawText(item.product.name.substring(0, 40), { x: 50, y: yOffset, size: 12, font });
      page.drawText(item.quantity.toString(), { x: 350, y: yOffset, size: 12, font });
      page.drawText(`INR ${item.price.toFixed(2)}`, { x: 450, y: yOffset, size: 12, font });
      yOffset -= 20;
    }

    yOffset -= 20;
    page.drawText(`Total Amount: INR ${order.totalAmount.toFixed(2)}`, { x: 350, y: yOffset, size: 14, font: boldFont });

    const pdfBytes = await pdfDoc.save();

    // Upload to R2
    const fileName = `invoices/${order.id}.pdf`;
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME || "nexus-retail",
      Key: fileName,
      Body: pdfBytes,
      ContentType: "application/pdf",
    });

    await S3.send(command);

    const invoiceUrl = `https://${process.env.R2_BUCKET_NAME}.r2.cloudflarestorage.com/${fileName}`;

    // Update Order with Invoice URL
    await prisma.order.update({
      where: { id: order.id },
      data: { invoiceUrl },
    });

    return NextResponse.json({ success: true, invoiceUrl }, { status: 200 });
  } catch (error) {
    console.error("Invoice API Error:", error);
    return NextResponse.json({ error: "Failed to generate invoice" }, { status: 500 });
  }
}
