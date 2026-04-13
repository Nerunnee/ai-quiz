import { NextRequest } from "next/server";

export default async function POST(request: NextRequest) {
  const { title, content } = await request.json();

  // quiz = gemini
  // prisma save article, quiz
}
