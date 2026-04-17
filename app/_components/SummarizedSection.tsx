import { Button } from "@/components/ui/button";
import { BookOpen, LoaderCircle } from "lucide-react";
import { Article } from "../[id]/_component/Article";
import { SeeContent } from "./SeeContent";

type SummarizedContentProps = {
  title: string;
  content: string;
  summarized: { summary: string; articleId: string };
  loading: boolean;
  onSubmit: () => void;
};

export const SummarizedContent = (props: SummarizedContentProps) => {
  const { title, content, summarized, loading, onSubmit } = props;
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-semibold text-muted-foreground flex items-center mt-5">
        <BookOpen size={16} />
        <span className="ml-2">Summarized content</span>
      </p>

      <h3 className="text-2xl font-semibold">{title}</h3>

      <p>{summarized.summary}</p>

      <div className="flex justify-between items-center">
        <SeeContent content={content} title={title} />

        <Button
          onClick={onSubmit}
          disabled={loading}
          className="px-4 py-3 cursor-pointer"
        >
          {loading ? (
            <div className="flex gap-3 items-center">
              <LoaderCircle className="animate-spin w-8 h-8" />
              <p>Generating quiz...</p>
            </div>
          ) : (
            "Take a quiz"
          )}
        </Button>
      </div>
    </div>
  );
};
