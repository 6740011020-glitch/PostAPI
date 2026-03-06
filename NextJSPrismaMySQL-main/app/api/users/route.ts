import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// READ
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "user";

  if (type === "post") {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });
    return NextResponse.json(posts);
  }

  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// CREATE
export async function POST(req: Request) {
  const body = await req.json();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "user";

  if (type === "post") {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published || false,
        authorId: body.authorId,
      },
      include: {
        author: true,
      },
    });
    return NextResponse.json(post);
  }

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(user);
}

// UPDATE ✅
export async function PUT(req: Request) {
  const body = await req.json();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "user";

  if (type === "post") {
    const post = await prisma.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
      },
      include: {
        author: true,
      },
    });
    return NextResponse.json(post);
  }

  const user = await prisma.user.update({
    where: { id: body.id },   // 👈 ระบุว่าจะ update แถวไหน
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(user);
}

// DELETE
export async function DELETE(req: Request) {
  const body = await req.json();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "user";

  if (type === "post") {
    await prisma.post.delete({
      where: { id: body.id },
    });
    return NextResponse.json({ success: true });
  }

  await prisma.user.delete({
    where: { id: body.id },
  });

  return NextResponse.json({ success: true });
}