import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { QuizClient } from "./_component/Quizzes";

export default async function QuizPage() {
  const quizzes = await prisma.quiz.findMany();

  const normalized = quizzes.map((quiz) => ({
    ...quiz,
    options: Array.isArray(quiz.options)
      ? quiz.options
      : JSON.parse(quiz.options as unknown as string),
  }));

  return <QuizClient quizzes={normalized} />;
}
