"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSummarize } from "@/lib/articles/createSummarize";
import { useAuth } from "@clerk/nextjs";

import { BookOpen, FileText, LoaderCircle } from "lucide-react";
import { ChangeEventHandler, useState } from "react";

export const InputSections = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [summarized, setSummarized] = useState<string>("");
  const { userId } = useAuth();

  console.log(summarized);

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

      const summary = await createSummarize(title, content, userId);

      setSummarized(summary);

      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {summarized ? (
        <div className="flex flex-col gap-5">
          <p className="text-sm font-semibold text-muted-foreground flex items-center mt-5">
            <BookOpen size={16} />
            <span className="ml-2">Summarized content</span>
          </p>
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p>{summarized}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <p className="text-muted-foreground mt-2">
            Paste your article below to generate a summarize and quiz question.
            Your articles will saved in the sidebar for future reference.
          </p>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <p className="flex gap-1 text-sm items-center text-muted-foreground font-semibold">
                <FileText size={15} />
                Article title
              </p>
              <Input
                value={title}
                type="text"
                placeholder="Enter a title for your article..."
                onChange={handleChangeTitle}
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="flex gap-1 text-sm items-center text-muted-foreground font-semibold">
                <FileText size={15} />
                Article content
              </p>
              <textarea
                value={content}
                placeholder="Paste your article content here..."
                className="h-30 border rounded-lg p-2"
                onChange={handleChangeContent}
              />
            </div>

            <div className="flex justify-between items-center">
              <Button
                onClick={onSubmit}
                disabled={loading}
                className="cursor-pointer"
              >
                {loading ? (
                  <LoaderCircle className="animate-spin w-8 h-8" />
                ) : (
                  "Generate summary"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
