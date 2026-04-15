"use client";

import { createSummarize } from "@/lib/articles/createSummarize";
import { useAuth } from "@clerk/nextjs";
import { ChangeEventHandler, useState } from "react";
import { SummarizedContent } from "./SummarizedSection";
import { ArticlesSection } from "./ArticlesSection";
import { createQuiz } from "@/lib/articles/createQuiz";

export const InputSections = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [summarized, setSummarized] = useState<{
    message: string;
    articleId: string;
    summary: string;
  } | null>(null);
  const { userId } = useAuth();

  const handleChangeTitle: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    setContent(event.target.value);
  };

  const onSubmit = async () => {
    if (!userId) return;

    try {
      setLoading(true);

      const summarizedContent = await createSummarize(title, content, userId);
      setSummarized(summarizedContent);

      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSubmitQuiz = async () => {
    const articles = {
      id: summarized?.articleId!,
      title,
      content,
    };

    if (!userId) return;

    try {
      setLoading(true);

      await createQuiz(articles);

      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {summarized ? (
        <SummarizedContent
          title={title}
          summarized={summarized}
          loading={loading}
          onSubmit={onSubmitQuiz}
        />
      ) : (
        <ArticlesSection
          title={title}
          content={content}
          loading={loading}
          onChangeTitle={handleChangeTitle}
          onChangeContent={handleChangeContent}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};
