import prisma from "@/lib/prisma";
import { QuizClient } from "./_component/Quizzes";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      quizzes: true,
    },
  });

  if (!article) {
    return <div>Not found article</div>;
  }

  const normalizedQuizzes = article.quizzes.map((quiz) => ({
    ...quiz,
    options: Array.isArray(quiz.options)
      ? quiz.options
      : JSON.parse(quiz.options as unknown as string),
  }));

  return (
    <div>
      {normalizedQuizzes.length > 0 ? (
        <QuizClient
          quizzes={normalizedQuizzes}
          title={article.title}
          content={article.content}
        />
      ) : (
        <p>Таны асуултуудыг бэлдэж байна...</p>
      )}
    </div>
  );
}
