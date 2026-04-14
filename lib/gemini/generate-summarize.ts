import { GoogleGenAI } from "@google/genai";

export const genSummarize = async (title: string, content: string) => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Please provide a concise summary of the following article summarize: ${title} ${content}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  });

  return response?.text;
};
