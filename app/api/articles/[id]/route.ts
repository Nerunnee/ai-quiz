import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    await prisma.$transaction(async (a) => {
      await a.quiz.deleteMany({
        where: { id },
      });

      await a.article.delete({
        where: { id },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: `ustgahad aldaaa garchlooooo ${error}`,
    });
  }
}
