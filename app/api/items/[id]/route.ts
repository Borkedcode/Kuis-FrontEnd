import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request, {params}: {params: {id: string}}) {
  const id = Number(params.id);
  const item = await prisma.item.findUnique({ where: {id}});
  if (!item) return NextResponse.json({error: "Not found"}, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: Request, {params}: {params: { id: string }}) {
  const id = Number(params.id);
  const body = await req.json();
  const { title, content } = body;
  const updated = await prisma.item.update({
    where: { id },
    data: { title, content },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  try {
    await prisma.item.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}