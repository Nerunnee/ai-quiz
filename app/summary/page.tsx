"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSummarize } from "@/lib/articles/createSummarize";
import { useAuth } from "@clerk/nextjs";

import { FileText, LoaderCircle } from "lucide-react";
import { ChangeEventHandler, useState } from "react";

export const InputSections = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { userId } = useAuth();

  const handleChangeTitle: ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeContent: ChangeEventHandler<
    HTMLTextAreaElement,
    HTMLTextAreaElement
  > = (event) => {
    setContent(event.target.value);
  };

  const onSubmit = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setSuccess(false);
      await createSummarize(title, content, userId);
      setSuccess(true);
      setTitle("");
      setContent("");
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
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
        {success && (
          <p className="text-sm text-green-600 font-medium">
            ✅ Summary successfully generated!
          </p>
        )}
      </div>
    </div>
  );
};
