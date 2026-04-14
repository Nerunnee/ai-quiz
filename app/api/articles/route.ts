import { genQuiz } from "@/lib/gemini/generate-quiz";
import { NextRequest, NextResponse } from "next/server";

type Article = {
  title: string;
  content: string;
};
export async function POST(request: NextRequest) {
  const article: Article = await request.json();
  console.log(article);

  const quizzes = await genQuiz(article);

  if (!quizzes) {
    return NextResponse.json({ message: "not created" });
  }

  const cleaned = quizzes
    .replace(/```json\n?/g, "")
    .replace(/```/g, "")
    .trim();

  const parse = JSON.parse(cleaned);

  return NextResponse.json({ parse });
}
