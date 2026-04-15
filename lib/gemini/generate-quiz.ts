import { GoogleGenAI } from "@google/genai";

type Article = {
  title: string;
  content: string;
};

export const genQuiz = async (article: Article) => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Generate 5 multiple choice questions based on this article: ${article.content}. Return the response in this exact JSON format:
      [
        {
          "question": "Question text here",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "answer": "0"
        }
      ]
      Make sure the response is valid JSON and the answer is the index (0-3) of the correct option.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log("response: ", response);

  return response?.text;
};
