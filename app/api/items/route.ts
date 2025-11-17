import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const items = await prisma.item.findMany({orderBy: {createdAt: "desc"}});
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, content } = body;
  if (!title) return NextResponse.json({error: "Title required"}, {status: 400});

  const item = await prisma.item.create({data: {title, content}});
  return NextResponse.json(item, { status: 201 });
}
