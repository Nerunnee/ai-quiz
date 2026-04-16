import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.quiz.deleteMany({
        where: { articleId: id },
      });

      await tx.article.delete({
        where: { id },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Устгахад алдаа гарчлөө: ${error}` },
      { status: 500 },
    );
  }
}
