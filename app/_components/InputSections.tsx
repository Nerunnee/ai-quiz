"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createPrompt } from "@/lib/articles/createPrompt";
import { FileText } from "lucide-react";
import { ChangeEventHandler, useState } from "react";

export const InputSections = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleChangeTitle: ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeContent: ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = (event) => {
    setContent(event.target.value);
  };
  const onSubmit = async () => {
    const credentials = {
      title,
      content,
    };

    try {
      await createPrompt(credentials);
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
        <Input
          value={content}
          type="text"
          placeholder="Paste your article content here..."
          className="h-30"
          onChange={handleChangeContent}
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={onSubmit}>Generate summary</Button>
      </div>
    </div>
  );
};
