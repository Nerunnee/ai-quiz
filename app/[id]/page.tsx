import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

export default async function Quizzes() {
  const quizzes = await prisma.quiz.findMany();

  return (
    <div>
      {quizzes.map((quiz) => (
        <div key={quiz.id}>
          <div>
            <p>{quiz.question}</p>
          </div>

          <p className="grid grid-cols-2 gap-2">{quiz.options}</p>
        </div>
      ))}
    </div>
  );
}
