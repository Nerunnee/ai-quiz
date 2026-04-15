import { genSummarize } from "@/lib/gemini/generate-summarize";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Articles = {
  userId: string;
  title: string;
  content: string;
};

export async function POST(request: NextRequest) {
  try {
    const { title, content, userId } = (await request.json()) as Articles;

    if (!content || !title || !userId) {
      console.log("userId, title and content are required");
    }

    const summary = (await genSummarize(title, content)) as string;

    const createdArticles = await prisma.article.create({
      data: { title, content, summary, userId },
    });

    return NextResponse.json(
      {
        message: "Summarize completed",
        articleId: createdArticles.id,
        summary: createdArticles.summary,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Invalid JSON, ${error}` },
      { status: 400 },
    );
  }
}
