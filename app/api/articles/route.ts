import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export default async function POST(request: NextRequest) {
  const credentials = await request.json();

  // quiz = gemini
  // prisma save article, quiz

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });

  const prompt = credentials;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return NextResponse.json({ response });
}
