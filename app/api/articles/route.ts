import { genQuiz } from "@/lib/gemini/generate-quiz";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type Article = {
  id: string;
  title: string;
  content: string;
};

type Quiz = {
  question: string;
  options: string[];
  answer: string;
};

export async function POST(request: NextRequest) {
  try {
    const { id, title, content }: Article = await request.json();

    const rawQuizzes = await genQuiz({ title, content });

    if (!rawQuizzes) {
      return NextResponse.json({ message: "not created" });
    }

    const cleaned = rawQuizzes
      .replace(/```json\n?/g, "")
      .replace(/```/g, "")
      .trim();

    const parse: Quiz[] = JSON.parse(cleaned);

    const savedQuizzes = await prisma.quiz.createMany({
      data: parse.map((q) => ({
        question: q.question,
        options: q.options,
        answer: String(q.answer),
        articleId: id,
      })),
    });

    revalidatePath(`/${id}`);

    return NextResponse.json({ savedQuizzes });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: String(error) }, { status: 500 });
  }
}
